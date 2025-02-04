import React, { useState, useEffect } from 'react';
import AppLayout from './AppLayout';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import cardData from './dummy';
import { useParams } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { statusTypes, validateForm} from '../helpers';
import { CircleIconWrapper, ListItemTextWrapper, ContainerWrapper } from './style';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import i18n from '../i18n';


const EditTask = () => {
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const { id, statusId } = useParams();
    const [formData, setFormData] = useState({ title: '', description: '', status: '' });

    useEffect(() => {
        const data = cardData.filter((item) => item.id === Number(id));
        setFormData({ title: data[0].title, description: data[0].content, status: statusId });
    }, [id, statusId])


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        validateForm(formData, setErrors, true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm(formData, setErrors, true)) {
            // Form is valid, you can submit or process the data here
            console.log("Form data submitted :", formData);
            setSubmitted(true); // Set a submitted flag

            // Call API to save the tasks then redirect user to listing page.

            setTimeout(function () {
                navigate('/');
            }, 1000);
        } else {
            // Form is not valid, display error messages
        }
    };

    const handleCancel = () => {
        navigate('/');
    };


    const isFormValid = Object.keys(errors).length === 0;

    return (
        <>
            <AppLayout title={i18n.editTaskTitle} goToPage={'/'} />
            <ContainerWrapper maxWidth="sm">
                {submitted && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success"> {i18n.updateSuccessMsg} </Alert>}

                <form noValidate onSubmit={handleSubmit}>
                    <TextField fullWidth margin='normal' placeholder={i18n.titlePlaceholderText} required
                        name='title'
                        value={formData.title}
                        onChange={handleInputChange}
                        error={errors.title} />

                    <TextField fullWidth margin='normal' placeholder={i18n.descriptionPlaceholderText}
                        name='description'
                        rows={4} multiline required value={formData.description}
                        error={errors.description}
                        onChange={handleInputChange} />

                    <Select
                        labelId="status-select"
                        id="status"
                        value={formData.status}
                        label="status"
                        fullWidth
                        name='status'
                        style={{ textAlign: 'left', }}
                        onChange={handleInputChange}
                    >
                        {statusTypes && Object.keys(statusTypes).map((item, index) =>
                            <MenuItem value={index}>
                                <CircleIconWrapper statusId={index} fontSize='5' />
                                {' '} <ListItemTextWrapper primary={statusTypes[index]} />

                            </MenuItem>
                        )}

                    </Select>

                    <Stack direction="row" spacing={2} sx={{
                        justifyContent: "space-between",
                        alignItems: "flex-start", margin: '20px',
                    }}>
                        <Button variant="outlined" onClick={handleCancel}>{i18n.cancelBtnLabel}</Button>
                        <Button variant="contained" disabled={!isFormValid} type="submit">{i18n.updateBtnLabel}</Button>
                    </Stack>
                </form>
            </ContainerWrapper>
        </>
    );
};

export default EditTask;

