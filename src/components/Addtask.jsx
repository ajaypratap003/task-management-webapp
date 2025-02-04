import React, { useState, useId } from 'react';
import { useDispatch } from 'react-redux'
import AppLayout from './AppLayout';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { validateForm } from '../helpers';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { addTask } from '../store';
import i18n from '../i18n';

const AddTask = () => {
    const taskId = useId();
    const [formData, setFormData] = useState({ id: taskId, title: '', description: '', date: 'Wed 31, July 2024', status: 0 });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        validateForm(formData, setErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm(formData, setErrors)) {
            // Form is valid, you can submit or process the data here
            console.log("Form data submitted :", formData);
            setSubmitted(true); // Set a submitted flag

            // Call API to save the tasks then redirect user to listing page.
            dispatch(addTask(formData));

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
            <AppLayout title={i18n.addTaskTitle} goToPage={'/'} sx={{ mb: '10' }} />
            <Container maxWidth="sm" >
                {submitted && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" onClose={() => { }}> {i18n.saveSuccessMsg}</Alert>}

                <form noValidate onSubmit={handleSubmit}>
                    <TextField fullWidth margin='normal' placeholder={i18n.titlePlaceholderText} required
                        name='title'
                        onChange={handleInputChange}
                        error={errors.title} />

                    <TextField fullWidth margin='normal' placeholder={i18n.descriptionPlaceholderText}
                        name='description'
                        rows={4} multiline required value={formData.description}
                        error={errors.description}
                        onChange={handleInputChange} />

                    <Stack direction="row" spacing={2} sx={{
                        justifyContent: "space-between",
                        alignItems: "flex-start", margin: '20px',
                    }}>
                        <Button variant="outlined" onClick={handleCancel}>{i18n.cancelBtnLabel}</Button>
                        <Button variant="contained" disabled={!isFormValid} type="submit">{i18n.addBtnLabel}</Button>
                    </Stack>
                </form>
            </Container>
        </>
    );
};

export default AddTask;

