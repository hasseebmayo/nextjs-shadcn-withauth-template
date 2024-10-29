import { useEffect } from "react";
export const useKeyPress = ({
  targetKey,
  onAction = () => {},
}: {
  targetKey: string;
  onAction: () => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        onAction();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [targetKey, onAction]);
};

export default useKeyPress;
