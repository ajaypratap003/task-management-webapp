import { useState, memo } from "react";
import { useTranslation } from 'react-i18next';
import { TextField } from "@mui/material";

/**
 * SearchBarTask component
 * 
 * @component
 * @param {Object} props - Component props
 * @param {function} props.onChange - Callback function to handle input change
 * @returns {JSX.Element} The rendered component
 */
const SearchBarTask = memo(({ onChange }) => {
    const [query, setQuery] = useState("");
    const { t } = useTranslation();

    const handleInput = (e) => {
        const value = e.target.value || "";
        setQuery(value);

        if (onChange) {
            onChange(value);
        }
    };

    return (
        <form style={{ display: "flex", alignItems: "center", top: '76px' }} onSubmit={(e) => e.preventDefault()}>
            <TextField
                id="search-bar"
                className="text"
                onChange={handleInput}
                value={query}
                variant="outlined"
                placeholder={t('Search...')}
                size="small"
                sx={{
                    width: '382px',
                    margin: "10px auto",
                    height: '40px',
                }}
            />
        </form>
    );
});

export default SearchBarTask;