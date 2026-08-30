import { useEffect } from "react";
import styles from "./Toast.module.css";

interface ToastProps {
  message: string;
  onDismiss: () => void;
}

function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <div role="status" aria-live="polite" className={styles.toast}>
      {message}
    </div>
  );
}

export default Toast;
