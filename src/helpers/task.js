

const validateForm = (formData, setErrors, hasOptionalField = false) => {
    let isValid = true;
    const newErrors = {};

    // Validate title
    if (!formData.title?.trim()) {
        newErrors.title = "Title is required";
        isValid = false;
    }

    // Validate description
    if (!formData.description?.trim()) {
        newErrors.description = "Description is required";
        isValid = false;
    }

    if (hasOptionalField && !formData.status) {
        newErrors.status = "Status is required";
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
};


const filterDataByType = (data) => {
    let filteredData = {};
    data?.forEach((item) => {
        filteredData[item.status] = filteredData[item.status] || [];
        filteredData[item.status].push({ id: item.id, title: item.title, description: item.description, date: item.date });
    });

    return Object.keys(filteredData).map((key) => [key, filteredData[key]]);
}



export { validateForm, filterDataByType };