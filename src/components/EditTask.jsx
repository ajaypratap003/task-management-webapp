import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';
import AppLayout from './AppLayout';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { statusTypes, validateForm } from '../helpers';
import { CircleIconWrapper, ListItemTextWrapper, ContainerWrapper } from './style';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { editTask } from '../store';

const EditTask = () => {
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const { id, statusId } = useParams();
    const [formData, setFormData] = useState({ title: '', description: '', status: '' });
    const tasks = useSelector((state) => state.task.taskList);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        const data = tasks?.filter((item) => item.id === id);
        setFormData({ id: data[0].id, title: data[0].title, description: data[0].description, status: statusId });
    }, [id, statusId, tasks])


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
            dispatch(editTask(formData));

            setTimeout(function () {
                navigate('/');
            }, 1000);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    const isFormValid = Object.keys(errors).length === 0;

    return (
        <>
            <AppLayout title={t('Edit Task')} goToPage={'/'} />
            <ContainerWrapper maxWidth="sm">
                {submitted && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success"> {t('Task Updated Successfully!')} </Alert>}

                <form noValidate onSubmit={handleSubmit}>
                    <TextField fullWidth margin='normal' placeholder={t('Enter the title')} required
                        name='title'
                        value={formData.title}
                        onChange={handleInputChange}
                        error={errors.title} />

                    <TextField fullWidth margin='normal' placeholder={t('Enter the description')}
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
                        {Object.keys(statusTypes).map((_, index) =>
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
                        <Button variant="outlined" onClick={handleCancel}>{t('Cancel')}</Button>
                        <Button variant="contained" disabled={!isFormValid} type="submit">{t('Update')}</Button>
                    </Stack>
                </form>
            </ContainerWrapper>
        </>
    );
};

export default EditTask;

