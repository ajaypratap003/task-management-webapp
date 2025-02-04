import { useState } from "react";
import { TextField } from "@mui/material";
import cardData from './dummy';
import i18n from '../i18n';

const SearchBarTask = () => {
    const [input, setInput] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const handleInput = (e) => {
        setInput(e.target.value.toLowerCase());
        const filteredList = cardData.filter((element) => {
            if (input !== "") {
                return element.title.toLowerCase().includes(input) || element.content.toLowerCase().includes(input);
            }

            return [];
        });
        setFilteredData(filteredList);
    };

    return (
        <>
            <form style={{ display: "flex", alignItems: "center", top: '76px' }} onSubmit={(e) => e.preventDefault()}>
                <TextField
                    id="search-bar"
                    className="text"
                    onChange={handleInput}
                    onKeyDown={handleInput}
                    label={i18n.searchLabel}
                    variant="outlined"
                    placeholder={i18n.searchPlaceholder}
                    size="small"
                    sx={{
                        width: '382px',
                        margin: "10px auto",
                        height: '40px',
                    }}
                />
            </form>
        </>

    );
};

export default SearchBarTask;