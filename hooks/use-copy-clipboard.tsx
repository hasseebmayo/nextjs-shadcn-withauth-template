const useCopyToClipboard = () => {
 const handleCopy = async (text: string) => {
  try {
   await navigator.clipboard.writeText(text);
  } catch (error) {
   console.error('Error copying to clipboard:', error);
  }
 };

 return { handleCopy };
};

export default useCopyToClipboard;
