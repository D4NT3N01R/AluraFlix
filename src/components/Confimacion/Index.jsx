import PropTypes from 'prop-types';
import styles from './Confirmation.module.css';

const ConfirmationDialog = ({ message, primaryColor, onConfirm, onCancel }) => {
    return (
        <div className={styles.confirmation_dialog}>
            <p className={styles.confirmation_dialog_message}>
                {message} <span className={styles.confirmation_dialog_title} style={{ color: primaryColor }}></span>
            </p>
            <button className={styles.confirmation_yes} onClick={onConfirm}>Sí</button>
            <button className={styles.confirmation_no} onClick={onCancel}>No</button>
        </div>
    );
};

ConfirmationDialog.propTypes = {
    message: PropTypes.string.isRequired,
  
    primaryColor: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default ConfirmationDialog;