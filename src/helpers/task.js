

const validateForm = (formData, setErrors, hasOptionalField = false) => {
    let isValid = true;
    const newErrors = {};

    // Validate title
    if (!formData.title?.trim()) {
        newErrors.title = "Title is required";
        isValid = false;
    } else if (formData.title?.trim().length > 20) {
        newErrors.title = "Title must not be greater than 20 characters long";
        isValid = false;
    }

    // Validate description
    if (!formData.description?.trim()) {
        newErrors.description = "Description is required";
        isValid = false;
    } else if (formData.description?.trim().length > 200) {
        newErrors.description = "Description must not be greater than 200 characters long";
        isValid = false;
    }

    if (hasOptionalField && formData.status==='') {
        newErrors.status = "Status is required";
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
};


const groupTasksByType = (data) => {
    let filteredData = {};
    data?.forEach((item) => {
        filteredData[item.status] = filteredData[item.status] || [];
        filteredData[item.status].push({ id: item.id, title: item.title, description: item.description, date: item.date });
    });

    return Object.keys(filteredData).map((key) => [key, filteredData[key]]);
}

const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};


export { validateForm, groupTasksByType, getCurrentDate };