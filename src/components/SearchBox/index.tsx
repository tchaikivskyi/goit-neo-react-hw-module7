import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "@store/filtersSlice";
import type { RootState } from "@store/store";
import css from "./style.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filters.name);

  const [localFilter, setLocalFilter] = useState(filter);
  const [debouncedFilter] = useDebounce(localFilter, 300);

  useEffect(() => {
    setLocalFilter(filter);
  }, [filter]);

  useEffect(() => {
    dispatch(changeFilter(debouncedFilter));
  }, [debouncedFilter, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilter(e.target.value);
  };

  const handleClear = () => {
    setLocalFilter("");
    dispatch(changeFilter(""));
  };

  return (
    <div className={css.searchBox}>
      <div className={css.searchContainer}>
        <svg className={css.searchIcon} viewBox="0 0 24 24" fill="none">
          <path
            d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="text"
          name="filter"
          id="filter"
          value={localFilter}
          onChange={handleChange}
          placeholder="Search contacts by name..."
          className={css.input}
        />
        {localFilter && (
          <button
            onClick={handleClear}
            className={css.clearButton}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
