import { motion } from 'framer-motion';
export default function FadeUp({
 children,
 delay = 0,
 duration = 0.5,
}: {
 children: React.ReactNode;
 delay?: number;
 duration?: number;
}) {
 return (
  <motion.div
   variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
   initial="hidden"
   whileInView="visible"
   viewport={{ once: true }}
   transition={{ delay, type: 'spring', duration }}
  >
   {children}
  </motion.div>
 );
}
