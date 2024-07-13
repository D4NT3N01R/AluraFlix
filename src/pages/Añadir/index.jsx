import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AñadirVideo.module.css';
import categoryData from '../../data/DataCategory.json';
import { validateForm } from '../../functions/ValidarFormulario';
import OptionList from '../../components/Opciones';
import { useVideoContext } from '../../Context/videoContexto';
import FormButton from '../../components/Botones';
import Notification from '../../components/notificacion';
import ConfirmationDialog from '../../components/Confimacion/Index';

const initialFormData = {
    title: '',
    category: '',
    photo: '',
    link: '',
    description: '',
};

const initialTouchedFields = {
    title: false,
    category: false,
    photo: false,
    link: false,
    description: false,
};

const isFormFilled = (formData) => {
    return Object.values(formData).every(field => field.trim() !== '');
};

export const AñadirVideo = () => {
    const { addVideo } = useVideoContext();
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState(initialTouchedFields);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const descriptionRef = useRef(null);
    const navigateTo = useNavigate();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        const validateFormAndSetErrors = async () => {
            const formErrors = await validateForm(formData);
            setErrors(formErrors);
            setIsButtonDisabled(Object.keys(formErrors).length > 0 || !isFormFilled(formData));
        };
        validateFormAndSetErrors();
    }, [formData]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }, []);

    const handleFieldBlur = useCallback((field) => {
        setTouchedFields(prevState => ({ ...prevState, [field]: true }));
    }, []);

    const handleSave = useCallback(async (e) => {
        e.preventDefault();
        const formErrors = await validateForm(formData);
        setErrors(formErrors);
        if (isFormFilled(formData) && Object.keys(formErrors).length === 0) {
            setShowConfirmation(true);
        }
    }, [formData]);

    const handleConfirmSave = useCallback(() => {
        addVideo(formData);
        setNotificationMessage('El video se ha guardado exitosamente.');
        setShowConfirmation(false);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
            navigateTo('/');
        }, 3000);
    }, [addVideo, formData, navigateTo]);

    const handleCancelSave = useCallback(() => {
        setShowConfirmation(false);
    }, []);

    const handleCancel = useCallback(() => {
        setFormData(initialFormData);
        setErrors({});
        setTouchedFields(initialTouchedFields);
    }, []);

    return (
        <div className={styles.container_new_video}>
            <header className={styles.new_video_header}>
                <h1 className={styles.new_video_title}>NUEVO VIDEO</h1>
                <p className={styles.new_video_description}>
                    COMPLETE EL FORMULARIO PARA CREAR UNA NUEVA TARJETA DE VIDEO
                </p>
            </header>
            <form className={styles.new_video_form} onSubmit={handleSave}>
                <div className={styles.form_section}>
                    <div className={styles.form_section_left}>
                        <h2 className={styles.new_video_form_title}>Crear Tarjeta</h2>
                    </div>
                </div>
                <div className={styles.form_section}>
                    <div className={styles.form_section_left}>
                        <label className={`${styles.new_video_form_label} ${errors.title && touchedFields.title ? styles.error_label : ''}`}>
                            Título:
                            <input
                                className={`${styles.new_video_form_input} ${errors.title && touchedFields.title ? styles.error : ''}`}
                                type="text"
                                placeholder='Ingresar título del video'
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                onBlur={() => handleFieldBlur('title')}
                                maxLength="200"
                                required
                            />
                            {errors.title && touchedFields.title && <span className={styles.error_message}>{errors.title}</span>}
                        </label>
                    </div>
                    <div className={styles.form_section_right}>
                        <OptionList
                            clase={`${styles.new_video_form_input} ${styles.new_video_form_option} ${errors.category && touchedFields.category ? styles.error_label : ''}`}
                            clase2={styles.new_video_dropdown_option}
                            value={formData.category}
                            onChange={(e) => {
                                handleChange({ target: { name: 'category', value: e.target.value } });
                                handleFieldBlur('category');
                            }}
                            options={categoryData}
                        />
                        {errors.category && touchedFields.category && <span className={styles.error_message}>{errors.category}</span>}
                    </div>
                </div>
                <div className={styles.form_section}>
                    <div className={styles.form_section_left}>
                        <label className={`${styles.new_video_form_label} ${errors.photo && touchedFields.photo ? styles.error_label : ''}`}>
                            Imagen:
                            <input
                                className={`${styles.new_video_form_input} ${errors.photo && touchedFields.photo ? styles.error : ''}`}
                                type="url"
                                placeholder='Ingresar enlace de la imagen'
                                name="photo"
                                value={formData.photo}
                                onChange={handleChange}
                                onBlur={() => handleFieldBlur('photo')}
                                maxLength="200"
                                required
                            />
                            {errors.photo && touchedFields.photo && <span className={styles.error_message}>{errors.photo}</span>}
                        </label>
                    </div>
                    <div className={styles.form_section_right}>
                        <label className={`${styles.new_video_form_label} ${errors.link && touchedFields.link ? styles.error_label : ''}`}>
                            Video:
                            <input
                                className={`${styles.new_video_form_input} ${errors.link && touchedFields.link ? styles.error : ''}`}
                                type="url"
                                placeholder='Ingresar enlace del video'
                                name="link"
                                value={formData.link}
                                onChange={handleChange}
                                onBlur={() => handleFieldBlur('link')}
                                maxLength="200"
                                required
                            />
                            {errors.link && touchedFields.link && <span className={styles.error_message}>{errors.link}</span>}
                        </label>
                    </div>
                </div>
                <div className={styles.form_section}>
                    <div className={styles.form_section_left}>
                        <label className={`${styles.new_video_form_label} ${errors.description && touchedFields.description ? styles.error_label : ''}`}>
                            Descripción:
                            <textarea
                                className={`${styles.new_video_form_input} ${styles.new_video_form_textarea} ${errors.description && touchedFields.description ? styles.error : ''}`}
                                name="description"
                                placeholder='¿De qué se trata este vídeo?'
                                value={formData.description}
                                onChange={handleChange}
                                onBlur={() => handleFieldBlur('description')}
                                ref={descriptionRef}
                                rows="4"
                                maxLength="300"
                                required
                            />
                            {errors.description && touchedFields.description && <span className={styles.error_message}>{errors.description}</span>}
                        </label>
                    </div>
                </div>
                <div className={styles.new_video_form_buttons}>
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
            {showNotification && (
                <Notification
                    message={notificationMessage}
                    onClose={() => setShowNotification(false)}
                />
            )}
            {showConfirmation && (
                <ConfirmationDialog
                    message={`¿Estás seguro de que deseas guardar este nuevo video?`}
                    onConfirm={handleConfirmSave}
                    onCancel={handleCancelSave}
                />
            )}
        </div>
    );
};

export default AñadirVideo;
