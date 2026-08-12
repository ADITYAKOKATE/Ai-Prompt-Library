import Modal from "../common/Modal";
import PromptForm from "./PromptForm";

function AddPromptModal({
  isOpen,
  onClose,
  onSubmit,
  loading,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Prompt"
      size="medium"
    >
      <PromptForm
        onSubmit={onSubmit}
        onCancel={onClose}
        loading={loading}
      />
    </Modal>
  );
}

export default AddPromptModal;