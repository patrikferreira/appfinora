import { ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  onClose: () => void;
  className?: string;
};

export default function Popover({ children, onClose, className }: Props) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={popoverRef}
      className={`origin-top absolute z-50 bg-(--bg-secondary) rounded-2xl border border-(--border) max-h-60 overflow-y-auto w-60 shadow cursor-auto ${className}`}
    >
      {children}
    </div>
  );
}
