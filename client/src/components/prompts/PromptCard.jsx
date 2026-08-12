import {
  FaStar,
  FaRegStar,
  FaThumbtack,
  FaCopy,
  FaEdit,
  FaTrash,
  FaClone,
  FaGripVertical,
} from "react-icons/fa";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./PromptCard.css";

function PromptCard({
  prompt,
  onFavorite,
  onPin,
  onCopy,
  onEdit,
  onDelete,
  onDuplicate,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: prompt._id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`prompt-card ${isDragging ? "dragging" : ""}`}
    >
      <div className="prompt-card-header">
        <button
          type="button"
          className="drag-handle"
          {...attributes}
          {...listeners}
          aria-label={`Drag ${prompt.title}`}
        >
          <FaGripVertical />
        </button>
        <div className="prompt-card-title-section">
          {prompt.isPinned && (
            <FaThumbtack className="pin-indicator" />
          )}

          <h3>{prompt.title}</h3>
        </div>

        <button
          className="card-icon-button"
          onClick={() => onFavorite(prompt._id)}
          title={
            prompt.isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          {prompt.isFavorite ? (
            <FaStar />
          ) : (
            <FaRegStar />
          )}
        </button>
      </div>

      <span className="prompt-category">
        {prompt.category}
      </span>

      {prompt.description && (
        <p className="prompt-description">
          {prompt.description}
        </p>
      )}

      <div className="prompt-content">
        {prompt.prompt}
      </div>

      <div className="prompt-tags">
        {prompt.tags?.map((tag) => (
          <span key={tag} className="prompt-tag">
            #{tag}
          </span>
        ))}
      </div>

      <div className="prompt-card-footer">
        <small>
          {new Date(prompt.createdAt).toLocaleDateString()}
        </small>

        <div className="prompt-actions">
          <button
            className="card-icon-button"
            onClick={() => onPin(prompt._id)}
            title={prompt.isPinned ? "Unpin" : "Pin"}
          >
            <FaThumbtack />
          </button>

          <button
            className="card-icon-button"
            onClick={() => onCopy(prompt.prompt)}
            title="Copy prompt"
          >
            <FaCopy />
          </button>

          <button
            className="card-icon-button"
            onClick={() => onEdit(prompt)}
            title="Edit prompt"
          >
            <FaEdit />
          </button>

          <button
            className="card-icon-button"
            onClick={() => onDuplicate(prompt)}
            title="Duplicate prompt"
          >
            <FaClone />
          </button>

          <button
            className="card-icon-button delete"
            onClick={() => onDelete(prompt)}
            title="Delete prompt"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </article>
  );
}

export default PromptCard;