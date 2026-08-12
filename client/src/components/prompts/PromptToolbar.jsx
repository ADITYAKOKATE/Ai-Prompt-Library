import { FaSearch, FaFilter, FaStar } from "react-icons/fa";

import { CATEGORIES } from "../../utils/constants";

import "./PromptToolbar.css";

function PromptToolbar({
  searchInputRef,
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  favoritesOnly,
  onFavoritesChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="prompt-toolbar">

      <div className="search-wrapper">
        <FaSearch className="search-icon" />

        <input
          ref={searchInputRef}
          type="search"
          value={searchTerm}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search prompts..."
          aria-label="Search prompts"
        />

        <div className="search-shortcut">/</div>
      </div>

      <div className="filter-group">

        <div className="filter-select-wrapper">
          <FaFilter />

          <select
            value={categoryFilter}
            onChange={(event) =>
              onCategoryChange(event.target.value)
            }
          >
            <option value="All">
              All Categories
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
        </div>

        <button
          type="button"
          className={
            favoritesOnly
              ? "favorite-filter active"
              : "favorite-filter"
          }
          onClick={() =>
            onFavoritesChange(!favoritesOnly)
          }
        >
          <FaStar />

          Favorites
        </button>

        <select
          className="sort-select"
          value={sortBy}
          onChange={(event) =>
            onSortChange(event.target.value)
          }
        >
          <option value="custom">
            Custom Order
          </option>

          <option value="newest">
            Newest
          </option>

          <option value="oldest">
            Oldest
          </option>

          <option value="az">
            A → Z
          </option>

          <option value="za">
            Z → A
          </option>
        </select>

      </div>
    </div>
  );
}

export default PromptToolbar;