import React, { useState, useId } from 'react';
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';
import AppLayout from './AppLayout';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { validateForm, getCurrentDate } from '../helpers';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { addTask } from '../store';

const AddTask = () => {
    const taskId = useId();
    const currentDate = getCurrentDate();
    const [formData, setFormData] = useState({ id: taskId, title: '', description: '', date: currentDate, status: '0' });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleInputChange = (e) => {
        setFormData(prevState => {
            const updatedFormData = {
                ...prevState,
                [e.target.name]: e.target.value
            };
            validateForm(updatedFormData, setErrors);
            return updatedFormData;
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm(formData, setErrors)) {
            // Form is valid, you can submit or process the data here
            console.log("Form data submitted :", formData);
            setSubmitted(true); // Set a submitted flag

            dispatch(addTask(formData));

            setTimeout(function () {
                navigate('/');
            }, 1000);
        }
    }

    const handleCancel = () => {
        navigate('/');
    };

    const isFormValid = Object.keys(errors).length === 0;

    return (
        <>
            <AppLayout title={t('Add Task')} goToPage={'/'} sx={{ mb: '10' }} />
            <Container maxWidth="sm" >
                {submitted && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success"> {t('Task Added Successfully!')}</Alert>}

                <form noValidate onSubmit={handleSubmit}>
                    <TextField fullWidth margin='normal' placeholder={t('Enter the title')} required
                        name='title'
                        onChange={handleInputChange}
                        helperText={errors.title}
                        error={!!errors.title} />

                    <TextField fullWidth margin='normal' placeholder={t('Enter the description')}
                        name='description'
                        rows={4} multiline required value={formData.description}
                        error={!!errors.description}
                        helperText={errors.description}
                        onChange={handleInputChange} />

                    <Stack direction="row" spacing={2} sx={{
                        justifyContent: "space-between",
                        alignItems: "flex-start", margin: '20px',
                    }}>
                        <Button variant="outlined" onClick={handleCancel}>{t('Cancel')}</Button>
                        <Button variant="contained" disabled={!isFormValid} type="submit">{t('Add')}</Button>
                    </Stack>
                </form>
            </Container>
        </>
    );
};

export default AddTask;

