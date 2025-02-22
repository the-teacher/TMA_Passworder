import { useState, useCallback, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "./hooks/useDebounce";
import AppIcon from "@components/AppIcon";

import "@ui-kit/buttons.scss";
import "@ui-kit/form-groups.scss";
import "@ui-kit/form-inputs.scss";

const MIN_SEARCH_LENGTH = 3;

type SearchFieldProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
};

const SearchField = ({
  onSearch,
  placeholder,
  debounceMs = 300
}: SearchFieldProps) => {
  const { t } = useTranslation("SearchField");
  const [query, setQuery] = useState("");

  const debouncedSearch = useDebounce((value: string) => {
    if (value.length >= MIN_SEARCH_LENGTH || value.length === 0) {
      onSearch(value);
    }
  }, debounceMs);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const handleClear = useCallback(() => {
    setQuery("");
    onSearch("");
  }, [onSearch]);

  const isButtonDisabled = query.length < MIN_SEARCH_LENGTH;

  return (
    <div className="search-field">
      <div className="form-group">
        <div className="form-group--input form-group__with-icon">
          <input
            type="text"
            className="form-input form-input__search"
            value={query}
            onChange={handleChange}
            placeholder={placeholder || t("placeholder")}
          />

          <button
            className="btn btn--icon"
            onClick={handleClear}
            disabled={isButtonDisabled}
            aria-label={t("clear")}
            title={t("clear")}
          >
            <AppIcon size={24} type="square-x" alt={t("clear")} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchField;
