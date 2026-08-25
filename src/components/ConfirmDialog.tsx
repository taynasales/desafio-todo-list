interface ConfirmDialogProps {
  taskTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({ taskTitle, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <div>
      <p>Excluir "{taskTitle}"?</p>
      <button onClick={onCancel}>Cancelar</button>
      <button onClick={onConfirm}>Excluir</button>
    </div>
  );
}

export default ConfirmDialog;
