import {
  useEffect,
  useRef,
  useState,
} from "react";

import { CATEGORIES } from "../../utils/constants";

import "./PromptForm.css";

const emptyForm = {
  title: "",
  prompt: "",
  category: "",
  tags: [],
  description: "",
};

function PromptForm({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}) {
  const [formData, setFormData] = useState(emptyForm);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});

  const isEditing = Boolean(initialData);
const titleInputRef = useRef(null);
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        prompt: initialData.prompt || "",
        category: initialData.category || "",
        tags: initialData.tags || [],
        description: initialData.description || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const addTag = () => {
    const tag = tagInput.trim();

    if (!tag) return;

    if (formData.tags.includes(tag)) {
      setTagInput("");
      return;
    }

    setFormData((current) => ({
      ...current,
      tags: [...current.tags, tag],
    }));

    setTagInput("");
  };

  const removeTag = (tagToRemove) => {
    setFormData((current) => ({
      ...current,
      tags: current.tags.filter(
        (tag) => tag !== tagToRemove
      ),
    }));
  };

  const handleTagKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag();
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!formData.prompt.trim()) {
      newErrors.prompt = "Prompt content is required.";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    await onSubmit(formData);
  };

  useEffect(() => {
  titleInputRef.current?.focus();
}, []);
  return (
    <form
      className="prompt-form"
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor="title">
          Title <span>*</span>
        </label>

        <input
          id="title"
          name="title"
          ref={titleInputRef}
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. React Interview Questions"
          maxLength={100}
        />

        {errors.title && (
          <small className="form-error">
            {errors.title}
          </small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description">
          Description
        </label>

        <input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Short description of this prompt"
          maxLength={200}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">
            Category <span>*</span>
          </label>

          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">
              Select category
            </option>

            {CATEGORIES.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>

          {errors.category && (
            <small className="form-error">
              {errors.category}
            </small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="tagInput">
            Tags
          </label>

          <div className="tag-input-wrapper">
            <input
              id="tagInput"
              value={tagInput}
              onChange={(event) =>
                setTagInput(event.target.value)
              }
              onKeyDown={handleTagKeyDown}
              placeholder="Type and press Enter"
            />

            <button
              type="button"
              onClick={addTag}
              className="add-tag-button"
            >
              Add
            </button>
          </div>

          <div className="form-tags">
            {formData.tags.map((tag) => (
              <span key={tag}>
                #{tag}

                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="prompt">
          Prompt <span>*</span>
        </label>

        <textarea
          id="prompt"
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
          placeholder="Write your reusable AI prompt here..."
          rows={10}
        />

        <div className="character-count">
          {formData.prompt.length} characters
        </div>

        {errors.prompt && (
          <small className="form-error">
            {errors.prompt}
          </small>
        )}
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="primary-button"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : isEditing
              ? "Update Prompt"
              : "Create Prompt"}
        </button>
      </div>
    </form>
  );
}

export default PromptForm;