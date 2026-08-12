import PromptCard from "./PromptCard";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import "./PromptGrid.css";

function PromptGrid({
  prompts,
  canReorder,
  onReorder,
  onFavorite,
  onPin,
  onCopy,
  onEdit,
  onDelete,
  onDuplicate,
}) {
  if (prompts.length === 0) {
    return (
      <div className="empty-state">
        <h3>No prompts found</h3>
        <p>Try changing your search or create a new prompt.</p>
      </div>
    );
  }

  if (!canReorder) {
    return (
      <div className="prompt-grid">
        {prompts.map((prompt) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            onFavorite={onFavorite}
            onPin={onPin}
            onCopy={onCopy}
            onEdit={onEdit}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
          />
        ))}
      </div>
    );
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onReorder}>
      <SortableContext
        items={prompts.map((prompt) => prompt._id)}
        strategy={rectSortingStrategy}
      >
        <div className="prompt-grid">
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt._id}
              prompt={prompt}
              onFavorite={onFavorite}
              onPin={onPin}
              onCopy={onCopy}
              onEdit={onEdit}
              onDelete={onDelete}
              onDuplicate={onDuplicate}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default PromptGrid;