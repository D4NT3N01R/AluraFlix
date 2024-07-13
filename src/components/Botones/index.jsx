import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const FormButton = ({ type, label, onClick, disabled, buttonType }) => {
    return (
        <button
            type={type}
            className={`${styles.form_button} ${styles[buttonType]}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

FormButton.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    buttonType: PropTypes.string.isRequired
};


export default FormButton;
