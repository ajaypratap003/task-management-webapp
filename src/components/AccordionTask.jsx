import React, { useEffect, useState, useDeferredValue } from 'react';
import { useSelector } from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Cards from './Cards';
import Fab from '@mui/material/Fab';
import { styled as styledMui } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { statusTypes, groupTasksByType } from '../helpers';
import SearchBarTask from './SearchBarTask';

const StyledFab = styledMui(Fab)({
    position: 'fixed',
    zIndex: 1,
    bottom: 12,
    right: 12,
    backgroundColor: '#034EA2'
});

const AccordionTask = () => {
    const tasks = useSelector((state) => state.task.taskList)
    const [query, setQuery] = useState("");
    const deferredValue=useDeferredValue(query);
    const navigate = useNavigate();
    const [filteredTasks, setFilteredTasks] = useState([]);

    const handleAddTask = () => {
        navigate('/add-task');
    };

    useEffect(() => {
        if (deferredValue === "" || deferredValue === undefined) {
            setFilteredTasks(tasks);
        } else {
            const filteredResults = tasks.filter((task) => statusTypes[task.status]?.toLowerCase() === deferredValue?.toLowerCase());
            setFilteredTasks(filteredResults);
        }
    }, [tasks, deferredValue]);

    const handleSearchQuery = (query) => {
        setQuery(query);
    }

    // Group tasks based on status type
    const data = groupTasksByType(filteredTasks);

    return (
        <>
            <SearchBarTask onChange={handleSearchQuery} />
            {data?.map((item) => {
                return (
                    <Accordion key={item[0]} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{
                                backgroundColor: "#F3F6F9",
                            }}
                        >
                            <Typography>{statusTypes[item[0]]} ({item[1].length})</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Cards status={item[0]} data={item[1]} />
                        </AccordionDetails>
                    </Accordion>
                );
            })}
            <StyledFab color="secondary" aria-label="add" onClick={handleAddTask}>
                <AddIcon />
            </StyledFab>
        </>
    );
};

export default AccordionTask;
