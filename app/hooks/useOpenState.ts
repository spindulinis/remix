import { useEffect, useRef, useState } from "react";

interface UseOpenStateResult {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  ref: React.RefObject<HTMLDivElement>;
}

export const useOpenState = (): UseOpenStateResult => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return {isOpen, setIsOpen, ref};
};