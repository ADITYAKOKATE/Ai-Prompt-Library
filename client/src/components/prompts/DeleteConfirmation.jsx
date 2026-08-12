import Modal from "../common/Modal";

function DeleteConfirmation({
  isOpen,
  prompt,
  onCancel,
  onConfirm,
  loading,
}) {
  if (!prompt) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title="Delete Prompt"
      size="small"
    >
      <div className="delete-confirmation">
        <p>
          Are you sure you want to delete:
        </p>

        <strong>
          "{prompt.title}"
        </strong>

        <p>
          This action cannot be undone.
        </p>

        <div className="form-actions">
          <button
            className="secondary-button"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="danger-button"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading
              ? "Deleting..."
              : "Delete Prompt"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteConfirmation;