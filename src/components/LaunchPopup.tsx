import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";

const POPUP_IMAGE = "/popup/valorya4.webp";
const STORAGE_KEY = "neli-launch-popup-dismissed";

export default function LaunchPopup() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const hidden =
    location.pathname.startsWith("/panel") ||
    location.pathname.startsWith("/showcase");

  useEffect(() => {
    if (hidden) {
      setIsOpen(false);
      return;
    }

    try {
      const dismissed = sessionStorage.getItem(STORAGE_KEY);
      if (!dismissed) {
        setIsOpen(true);
      }
    } catch {
      setIsOpen(true);
    }
  }, [hidden]);

  const dismiss = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, dismiss]);

  if (!isOpen || hidden) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] overflow-hidden bg-black"
      role="dialog"
      aria-modal="true"
      aria-label="Duyuru"
    >
      <img
        src={POPUP_IMAGE}
        alt="Valorya duyurusu"
        className="block h-full w-full object-contain object-center"
        fetchPriority="high"
        draggable={false}
      />

      <button
        type="button"
        onClick={dismiss}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        aria-label="Kapat"
      >
        <X className="h-6 w-6" strokeWidth={2.25} />
      </button>
    </div>,
    document.body,
  );
}
