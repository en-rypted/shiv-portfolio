import { useState } from 'react';

export function useFormValidation() {
  const [errors, setErrors] = useState({});

  const validate = (formData) => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Mobile number validation (10 digits, adjust regex as needed)
    if (!formData.contact) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Invalid contact number";
    }

    setErrors(newErrors);
    return {isValid: Object.keys(newErrors).length === 0, newErrors: newErrors};
  };

  return { errors, validate };
}