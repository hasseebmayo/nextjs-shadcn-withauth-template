import { useEffect, useState } from 'react';

const base64ToUint8Array = (base64: string): Uint8Array => {
 const padding = '='.repeat((4 - (base64.length % 4)) % 4);
 const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');

 const rawData = window.atob(b64);
 const outputArray = new Uint8Array(rawData.length);

 for (let i = 0; i < rawData.length; ++i) {
  outputArray[i] = rawData.charCodeAt(i);
 }
 return outputArray;
};

const usePushNotification = () => {
 const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
 const [subscription, setSubscription] = useState<PushSubscription | null>(
  null
 );
 const [registration, setRegistration] =
  useState<ServiceWorkerRegistration | null>(null);

 useEffect(() => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
   // run only in browser
   navigator.serviceWorker.ready.then(reg => {
    setRegistration(reg);
    reg.pushManager
     .getSubscription()
     .then(sub => {
      console.log(sub);
      if (
       sub &&
       !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)
      ) {
       setSubscription(sub);
       setIsSubscribed(true);
      }
     })
     .catch(err => {
      console.log('Service worker registration error', err);
     });
   });
  }
 }, []);

 const subscribe = async () => {
  if (registration) {
   const sub = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: base64ToUint8Array(
     process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY as string
    ),
   });
   // TODO: Call your API to save subscription data on the server
   setSubscription(sub);
   setIsSubscribed(true);
   console.log('Web push subscribed!');
   console.log(sub);
  } else {
   console.error('Service worker registration is not available.');
  }
 };

 const unsubscribe = async () => {
  if (subscription) {
   await subscription.unsubscribe();
   // TODO: Call your API to delete or invalidate subscription data on the server
   setSubscription(null);
   setIsSubscribed(false);
   console.log('Web push unsubscribed!');
  } else {
   console.error('No subscription available.');
  }
 };

 const sendNotification = async () => {
  if (subscription) {
   await fetch('/api/notification', {
    method: 'POST',
    headers: {
     'Content-type': 'application/json',
    },
    body: JSON.stringify({ subscription }),
   });
  } else {
   console.error('Web push not subscribed');
  }
 };

 return { isSubscribed, subscribe, unsubscribe, sendNotification };
};

export default usePushNotification;
