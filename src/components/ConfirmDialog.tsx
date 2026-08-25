import { useEffect, useRef } from "react";

interface ConfirmDialogProps {
  taskTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({ taskTitle, onConfirm, onCancel }: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog ref={dialogRef} onClose={onCancel}>
      <h2>Excluir tarefa?</h2>
      <p>A tarefa "{taskTitle}" será removida permanentemente.</p>
      <button onClick={onCancel}>Cancelar</button>
      <button onClick={onConfirm}>Excluir</button>
    </dialog>
  );
}

export default ConfirmDialog;
