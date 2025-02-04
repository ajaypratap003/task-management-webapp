import * as React from 'react';
import List from '@mui/material/List';
import { listItemClasses } from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { CircleIconWrapper, StatusSection, NameWrapper, ContentWrapper, DateTimeWrapper, ListItemWrapper, ActionsWrapper } from './style';
import { useNavigate } from 'react-router-dom';
import { statusTypes } from '../helpers';

const Card = ({ item, index, status }) => {
    const navigate = useNavigate();

    const handleEdit = (item, status) => {
        console.log('edit ', item);
        navigate(`/task/${item.id}/${status}`);
    };

    const handleDelete=()=>{

    }

    return (
        <>
            <ListItemWrapper alignItems="flex-start" key={item.id} sx={{
                [`& .${listItemClasses.root}:hover`]: {
                    backgroundColor: 'grey',
                }
            }}>
                <ListItemAvatar>
                    <Avatar alt="L" src={item.img} />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <NameWrapper>{item.title}
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
                            <ContentWrapper variant="caption" gutterBottom sx={{ display: 'block' }}>{item.description}</ContentWrapper>
                            <DateTimeWrapper variant="caption" gutterBottom sx={{ display: 'block' }}>{item.date}
                                <DeleteForever color='error' style={{ float: 'right', cursor: 'pointer', marginLeft: '5px' }} fontSize='small' onClick={() => handleEdit(item, status)}></DeleteForever>
                                <EditIcon color='primary' style={{ float: 'right', cursor: 'pointer' }} fontSize='small' onClick={() => handleDelete(item.id)}></EditIcon>
                            </DateTimeWrapper>
                        </>
                    }
                />

            </ListItemWrapper>
            {index === 0 && <Divider variant="inset" component="li" />}
        </>
    );
}


const Cards = ({ status, data }) => {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', }} >
            {data && data.map((item, index) => <Card item={item} index={index} status={status} key={item.id} />)}
        </List>
    )
};

export default Cards;