import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useForm from '../hooks/useForm';
import { showToast } from '../utils/toastUtils';

/**
 * Generic form component with dynamic fields
 * @param {Object} props
 * @param {Object} props.initialValues - Initial form values
 * @param {Function} props.validate - Validation function
 * @param {Function} props.onSubmit - Submit handler
 * @param {string} props.submitLabel - Submit button label
 * @param {string} props.cancelPath - Cancel button navigation path
 * @param {Array} props.fields - Array of field configs
 * @returns {JSX.Element}
 */
const GenericForm = ({ initialValues, validate, onSubmit, submitLabel, cancelPath, fields }) => {
  const navigate = useNavigate();
  const { values, errors, loading, handleChange, handleSubmit } = useForm({
    initialValues,
    validate,
    onSubmit,
    onError: (err) => showToast(err.message, 'error'),
  });
  const [showPassword, setShowPassword] = useState({});

  const handleTogglePasswordVisibility = (fieldName) => {
    setShowPassword((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => {
        const isPasswordField = field.type === 'password' || field.name.includes('password');
        return (
          <TextField
            key={field.name}
            label={field.label}
            variant="outlined"
            fullWidth
            name={field.name}
            value={values[field.name]}
            onChange={handleChange}
            error={!!errors[field.name]}
            helperText={errors[field.name]}
            sx={{ mb: 2 }}
            multiline={field.multiline}
            rows={field.rows}
            type={isPasswordField && showPassword[field.name] ? 'text' : field.type || 'text'}
            required={field.required}
            InputProps={
              isPasswordField
                ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => handleTogglePasswordVisibility(field.name)}
                          edge="end"
                        >
                          {showPassword[field.name] ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                : field.InputProps
            }
          />
        );
      })}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
          {loading ? 'Processing...' : submitLabel}
        </Button>
        {cancelPath && (
          <Button variant="outlined" onClick={() => navigate(cancelPath)} fullWidth disabled={loading}>
            Cancel
          </Button>
        )}
      </Box>
    </form>
  );
};

export default GenericForm;