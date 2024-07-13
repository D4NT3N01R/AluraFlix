import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import styles from './Modal.module.css';
import categoryData from '../../data/DataCategory.json';
import ConfirmationDialog from '../Confimacion/Index.jsx';
import OptionList from '../Opciones/index.jsx';
import { validateForm } from '../../functions/ValidarFormulario.jsx';
import FormButton from '../Botones/index.jsx';

const Modal = ({ card, isOpen, onClose, onSave }) => {
    const initialFormData = useMemo(() => ({
        title: '',
        category: '',
        photo: '',
        link: '',
        description: '',
    }), []);

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setFormData(card || initialFormData);
            setErrors({});
        }
    }, [isOpen, card, initialFormData]);

    useEffect(() => {
        const validate = async () => {
            const formErrors = await validateForm(formData);
            setErrors(formErrors);
            setIsButtonDisabled(Object.keys(formErrors).length > 0);
        };
        validate();
    }, [formData]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    }, []);

    const handleSave = useCallback(async (e) => {
        e.preventDefault();
        const formErrors = await validateForm(formData);
        setErrors(formErrors);
        if (Object.keys(formErrors).length === 0) {
            setShowConfirmation(true);
        }
    }, [formData]);

    const handleConfirmSave = useCallback(() => {
        onSave(formData);
        setShowConfirmation(false);
        onClose();
    }, [onSave, formData, onClose]);

    const handleCancelSave = useCallback(() => {
        setShowConfirmation(false);
    }, []);

    const handleCancel = useCallback(() => {
        setFormData(initialFormData);
        setErrors({});
        setIsButtonDisabled(true);
    }, [initialFormData]);

    if (!isOpen) return null;

    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <IoMdCloseCircleOutline className={styles.close_icon} onClick={onClose} />
                <h1>EDITAR CARD:</h1>
                <form className={styles.modal_form} onSubmit={handleSave}>
                    <label>
                        Título:
                        <input
                            className={`${styles.modal_form_input} ${errors.title ? styles.error : ''}`}
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            maxLength="200"
                            required
                        />
                        {errors.title && <span className={styles.error_message}>{errors.title}</span>}
                    </label>
                    <OptionList
                        clase={`${styles.modal_form_input} ${styles.modal_form_option} ${errors.category ? styles.error : ''}`}
                        clase2={styles.dropdown_option}
                        value={formData.category}
                        onChange={(e) => handleChange({ target: { name: 'category', value: e.target.value } })}
                        options={categoryData}
                    />
                    {errors.category && <span className={styles.error_message}>{errors.category}</span>}
                    <label>
                        Imagen:
                        <input
                            className={`${styles.modal_form_input} ${errors.photo ? styles.error : ''}`}
                            type="url"
                            name="photo"
                            value={formData.photo}
                            onChange={handleChange}
                            maxLength="200"
                            required
                        />
                        {errors.photo && <span className={styles.error_message}>{errors.photo}</span>}
                    </label>
                    <label>
                        Video:
                        <input
                            className={`${styles.modal_form_input} ${errors.link ? styles.error : ''}`}
                            type="url"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            maxLength="200"
                            required
                        />
                        {errors.link && <span className={styles.error_message}>{errors.link}</span>}
                    </label>
                    <label>
                        Descripción:
                        <textarea
                            className={`${styles.modal_form_input} ${styles.modal_form_textarea} ${errors.description ? styles.error : ''}`}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            maxLength="500"
                            required
                        />
                        {errors.description && <span className={styles.error_message}>{errors.description}</span>}
                    </label>
                    <div className={styles.modal_form_buttons}>
                        <FormButton
                            type="submit"
                            label="GUARDAR"
                            disabled={isButtonDisabled}
                            buttonType="form_button_save"
                        />
                        <FormButton
                            type="button"
                            label="LIMPIAR"
                            onClick={handleCancel}
                            buttonType="form_button_cancel"
                        />
                    </div>
                </form>
            </div>
            {showConfirmation && (
                <ConfirmationDialog
                    message="¿Estás seguro de que deseas guardar los cambios?"
                    onConfirm={handleConfirmSave}
                    onCancel={handleCancelSave}
                />
            )}
        </div>
    );
};

Modal.propTypes = {
    card: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default Modal;
