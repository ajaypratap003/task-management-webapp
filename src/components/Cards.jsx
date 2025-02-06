import React from 'react';
import { useDispatch } from 'react-redux'
import List from '@mui/material/List';
import { listItemClasses } from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AddCircle from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { CircleIconWrapper, StatusSection, NameWrapper, ContentWrapper, DateTimeWrapper, ListItemWrapper } from './style';
import { useNavigate } from 'react-router-dom';
import { statusTypes } from '../helpers';
import { deleteTask } from '../store';

const TaskCard = ({ item, index, status }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleEdit = (item, status) => {
        navigate(`/task/${item.id}/${status}`);
    };

    const handleDelete = (id) => {
        dispatch(deleteTask(id));
    }

    return (
        <>
            <ListItemWrapper alignItems="flex-start" key={item.id} sx={{
                [`& .${listItemClasses.root}:hover`]: {
                    backgroundColor: 'grey',
                }
            }}>
                <ListItemAvatar>
                    <AddCircle />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <NameWrapper sx={{ overflowWrap: 'break-word' }}>{item.title}
                            <StatusSection>
                                <Typography variant="caption" align="right">
                                    <CircleIconWrapper statusId={status} fontSize='10' />
                                    {' '}{statusTypes[status]}
                                </Typography>
                            </StatusSection>
                        </NameWrapper>
                    }
                    secondary={
                        <>
                            <ContentWrapper variant="caption" gutterBottom sx={{ display: 'block', overflowWrap: 'break-word' }}>{item.description}</ContentWrapper>
                            <DateTimeWrapper variant="caption" gutterBottom sx={{ display: 'block' }}>{item.date}
                                <DeleteForever color='error' style={{ float: 'right', cursor: 'pointer', marginLeft: '5px' }} fontSize='small' onClick={() => handleDelete(item.id)}></DeleteForever>
                                <EditIcon color='primary' style={{ float: 'right', cursor: 'pointer' }} fontSize='small' onClick={() => handleEdit(item, status)}></EditIcon>
                            </DateTimeWrapper>
                        </>
                    }
                />
            </ListItemWrapper>
            <Divider variant="inset" component="li" />
        </>
    );
}


const Cards = ({ status, data }) => {
    return (
        <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', }} >
            {data && data.map((item, index) => <TaskCard item={item} index={index} status={status} key={item.id} />)}
        </List>
    )
};

export default Cards;