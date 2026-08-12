import Modal from "../common/Modal";
import PromptForm from "./PromptForm";

function EditPromptModal({
  isOpen,
  onClose,
  prompt,
  onSubmit,
  loading,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Prompt"
      size="medium"
    >
      <PromptForm
        initialData={prompt}
        onSubmit={onSubmit}
        onCancel={onClose}
        loading={loading}
      />
    </Modal>
  );
}

export default EditPromptModal;