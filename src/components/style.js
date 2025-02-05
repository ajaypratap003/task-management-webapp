
import styled, { css } from 'styled-components';
import AccordionSummary from '@mui/material/AccordionSummary';
import CircleIcon from '@mui/icons-material/Circle';
import Avatar from '@mui/material/Avatar';
import { statusTypes } from '../helpers';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';

const AccordionSummaryWrapper = styled(AccordionSummary)`
    .MuiAccordion-rounded {
        background-color: #F3F6F9;
    }
`;

const CircleIconWrapper = styled(CircleIcon)`
    cursor: not-allowed;
    ${({ statusId }) => statusTypes[statusId] === 'Pending' && css`color: #D0D0D0;`}
    ${({ statusId }) => statusTypes[statusId] === 'In Progress' && css`color: #FFB03C;`}
    ${({ statusId }) => statusTypes[statusId] === 'Completed' && css`color: #368A04;`}
    float: left;
    
    &.MuiSvgIcon-fontSize10{
        margin-top: 7px;
        margin-right:2px;
    }
`;

const ActionsWrapper = styled.div`
  display: flex;
  flex-display: row;
  gap: 10px;
`;

const NameWrapper = styled.div`
display: flex;
flex-display: row;
    width: auto;
    color: #034EA2;
`;

const StatusSection = styled.div`
    margin-left: auto;
    margin-right: 0;
    float: right;
    color: #231F20;
`;

const TodoIcon = styled(Avatar)`
    border: 1px solid #034EA2;
`;

const ContentWrapper = styled(Typography)`
    color: #231F20;
    display: 'block'
    max-width: 200px;
`;

const DateTimeWrapper = styled(Typography)`
    color: #767676;
`;

const ListItemTextWrapper = styled(ListItemText)`
    float: left;
    margin-left: 8px;
    &.css-tlelie-MuiListItemText-root span{
        margin-top: -9px;
    }
`;

const PageWrapper = styled(Paper)`
    &.css-q59b09-MuiPaper-root {
        box-shadow: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
    }
`;

const ContainerWrapper = styled(Container)`
    .css-q59b09-MuiPaper-root {
        box-shadow: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
    }
`;

const ListItemWrapper = styled(ListItem)`
    &.css-8nkmz4-MuiListItem-root:hover {
        background-color: #f9f9fa;
    }
`

export { AccordionSummaryWrapper, ActionsWrapper, CircleIconWrapper, StatusSection, NameWrapper, TodoIcon, ContentWrapper, DateTimeWrapper, ListItemTextWrapper, ContainerWrapper, PageWrapper, ListItemWrapper };