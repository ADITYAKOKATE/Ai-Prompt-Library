import { useMemo, useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import useDebounce from "../hooks/useDebounce";
import { arrayMove } from "@dnd-kit/sortable";

import PromptGrid from "../components/prompts/PromptGrid";
import AddPromptModal from "../components/prompts/AddPromptModal";
import EditPromptModal from "../components/prompts/EditPromptModal";
import DeleteConfirmation from "../components/prompts/DeleteConfirmation";
import PromptToolbar from "../components/prompts/PromptToolbar";
import LoadingSpinner from "../components/common/LoadingSpinner";

import usePrompts from "../hooks/usePrompts";

function PromptsPage() {
    const {
        prompts,
        error,
        loading,
        addPrompt,
        deletePrompts,
        updatePromptFunction,
        toggleFavorite,
        togglePin,
        updatePromptOrder,
    } = usePrompts();

    const [isAddOpen, setIsAddOpen] =
        useState(false);

    const [editingPrompt, setEditingPrompt] =
        useState(null);

    const [deletingPrompt, setDeletingPrompt] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [favoritesOnly, setFavoritesOnly] = useState(false);
    const [sortBy, setSortBy] = useState("custom");

    const searchInputRef = useRef(null);

    useEffect(() => {
        const handleShortcut = (event) => {
            if (
                event.key === "/" &&
                !["INPUT", "TEXTAREA", "SELECT"].includes(
                    document.activeElement?.tagName
                )
            ) {
                event.preventDefault();

                searchInputRef.current?.focus();
            }
        };

        document.addEventListener("keydown", handleShortcut);

        return () => {
            document.removeEventListener("keydown", handleShortcut);
        };
    }, []);

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const hasActiveFilters =
        searchTerm ||
        categoryFilter !== "All" ||
        favoritesOnly ||
        sortBy !== "newest";

    const displayedPrompts = useMemo(() => {
        let result = [...prompts];

        const search = debouncedSearchTerm
            .trim()
            .toLowerCase();

        // Search title + prompt content
        if (search) {
            result = result.filter((prompt) => {
                const title =
                    prompt.title?.toLowerCase() || "";

                const content =
                    prompt.prompt?.toLowerCase() || "";

                return (
                    title.includes(search) ||
                    content.includes(search)
                );
            });
        }

        // Category filter
        if (categoryFilter !== "All") {
            result = result.filter(
                (prompt) =>
                    prompt.category === categoryFilter
            );
        }

        // Favorite filter
        if (favoritesOnly) {
            result = result.filter(
                (prompt) => prompt.isFavorite
            );
        }

        // Pin + sort
        result.sort((a, b) => {
            if (a.isPinned !== b.isPinned) {
                return a.isPinned ? -1 : 1;
            }

            switch (sortBy) {
                case "custom":
                    return (a.order ?? 0) - (b.order ?? 0);

                case "newest":
                    return (
                        new Date(b.createdAt) -
                        new Date(a.createdAt)
                    );

                case "oldest":
                    return (
                        new Date(a.createdAt) -
                        new Date(b.createdAt)
                    );

                case "az":
                    return a.title.localeCompare(b.title);

                case "za":
                    return b.title.localeCompare(a.title);

                default:
                    return 0;
            }
        });

        return result;
    }, [
        prompts,
        debouncedSearchTerm,
        categoryFilter,
        favoritesOnly,
        sortBy,
    ]);

    const handleCreate = async (formData) => {
        try {
            await addPrompt(formData);

            setIsAddOpen(false);

            toast.success("Prompt created successfully");
        } catch (error) {
            toast.error("Failed to create prompt");
        }
    };

    const handleEdit = (prompt) => {
        setEditingPrompt(prompt);
    };

    const handleUpdate = async (formData) => {
        try {
            await updatePromptFunction(
                editingPrompt._id,
                formData
            );

            setEditingPrompt(null);

            toast.success("Prompt updated successfully");
        } catch (error) {
            toast.error("Failed to update prompt");
        }
    };

    const handleFavorite = async (id) => {
        try {
            await toggleFavorite(id);

            toast.success("Favorite status updated");
        } catch (error) {
            toast.error("Failed to update favorite");
        }
    };

    const handlePin = async (id) => {
        try {
            await togglePin(id);

            toast.success("Pin status updated");
        } catch (error) {
            toast.error("Failed to update pin");
        }
    };

    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);

            toast.success("Prompt copied to clipboard");
        } catch (error) {
            toast.error("Failed to copy prompt");
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await removePrompt(deletingPrompt._id);

            setDeletingPrompt(null);

            toast.success("Prompt deleted successfully");
        } catch (error) {
            toast.error("Failed to delete prompt");
        }
    };

    const handleDuplicate = async (prompt) => {
        try {
            const duplicateData = {
                title: `${prompt.title} Copy`,
                prompt: prompt.prompt,
                category: prompt.category,
                tags: prompt.tags || [],
                description: prompt.description || "",
            };

            await addPrompt(duplicateData);

            toast.success("Prompt duplicated successfully");
        } catch (error) {
            toast.error("Failed to duplicate prompt");
        }
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) {
            return;
        }

        const oldIndex = prompts.findIndex(
            (prompt) => prompt._id === active.id
        );
        const newIndex = prompts.findIndex(
            (prompt) => prompt._id === over.id
        );

        if (oldIndex === -1 || newIndex === -1) {
            return;
        }

        const reorderedPrompts = arrayMove(prompts, oldIndex, newIndex);
        const updatedPrompts = reorderedPrompts.map((prompt, index) => ({
            ...prompt,
            order: index,
        }));

        await updatePromptOrder(updatedPrompts);
    };

    const canReorder =
        sortBy === "custom" &&
        !searchTerm &&
        categoryFilter === "All" &&
        !favoritesOnly;

    if (loading && prompts.length === 0) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="empty-state">
                <h3>Something went wrong</h3>

                <p>{error}</p>

                <button
                    className="primary-button"
                    onClick={() => window.location.reload()}
                >
                    Retry
                </button>
            </div>
        );
    }
    return (
        <div>
            <div className="page-heading">
                <div>
                    <p className="page-eyebrow">
                        PROMPT LIBRARY
                    </p>

                    <h2>All Prompts</h2>

                    <p>
                        Create and manage your reusable AI prompts.
                    </p>
                </div>

                <button
                    className="primary-button"
                    onClick={() => setIsAddOpen(true)}
                >
                    + Add Prompt
                </button>
            </div>
            <PromptToolbar
                searchInputRef={searchInputRef}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                categoryFilter={categoryFilter}
                onCategoryChange={setCategoryFilter}
                favoritesOnly={favoritesOnly}
                onFavoritesChange={setFavoritesOnly}
                sortBy={sortBy}
                onSortChange={setSortBy}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0' }}>
                <div className="prompt-result-info">
                    <span>
                        {displayedPrompts.length}{" "}
                        {displayedPrompts.length === 1 ? "prompt" : "prompts"}
                    </span>

                    {searchTerm && (
                        <span> matching "{searchTerm}"</span>
                    )}

                    {canReorder && (
                        <span style={{ color: '#6b7280', fontSize: '13px', marginLeft: '12px' }}>
                            ⋮⋮ Drag cards to reorder
                        </span>
                    )}
                </div>

                {hasActiveFilters && (
                    <button
                        className="clear-filters-button"
                        onClick={() => {
                            setSearchTerm("");
                            setCategoryFilter("All");
                            setFavoritesOnly(false);
                            setSortBy("newest");
                        }}
                    >
                        Clear filters
                    </button>
                )}
            </div>

            {!displayedPrompts.length ? (
                <div className="empty-state">
                    <h3>No prompts found</h3>
                    <p>Try changing your search or filters.</p>
                </div>
            ) : (
                <>
                    {!canReorder && displayedPrompts.length > 0 && (
                        <div className="reorder-info" style={{ marginBottom: '16px', color: '#6b7280', fontSize: '13px', fontStyle: 'italic' }}>
                            Switch to Custom Order and clear filters to manually reorder prompts.
                        </div>
                    )}
                    <PromptGrid
                        prompts={displayedPrompts}
                        canReorder={canReorder}
                        onReorder={handleDragEnd}
                        onFavorite={handleFavorite}
                    onPin={handlePin}
                    onCopy={handleCopy}
                    onEdit={handleEdit}
                    onDelete={(prompt) => setDeletingPrompt(prompt)}
                    onDuplicate={handleDuplicate}
                />
                </>
            )}

            <AddPromptModal
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                onSubmit={handleCreate}
                loading={loading}
            />

            <EditPromptModal
                isOpen={Boolean(editingPrompt)}
                onClose={() => setEditingPrompt(null)}
                prompt={editingPrompt}
                onSubmit={handleUpdate}
                loading={loading}
            />

            <DeleteConfirmation
                isOpen={Boolean(deletingPrompt)}
                prompt={deletingPrompt}
                onCancel={() => setDeletingPrompt(null)}
                onConfirm={handleConfirmDelete}
                loading={loading}
            />
        </div>
    );
}

export default PromptsPage;