import { useEffect, useRef } from "react";
import styles from "./ConfirmDialog.module.css";

interface ConfirmDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({ onConfirm, onCancel }: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog ref={dialogRef} onClose={onCancel} className={styles.dialog}>
      <h2 className={styles.title}>Excluir tarefa?</h2>
      <p className={styles.text}>A tarefa será removida permanentemente.</p>
      <div className={styles.actions}>
        <button
          type="button"
          onClick={onCancel}
          className={`${styles.button} ${styles.cancel}`}
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`${styles.button} ${styles.confirm}`}
        >
          Excluir
        </button>
      </div>
    </dialog>
  );
}

export default ConfirmDialog;
