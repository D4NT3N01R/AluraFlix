import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './notificacion.module.css';
import { BsCheckCircle } from "react-icons/bs";

const Notification = ({ message, onClose, color }) => {
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        onClose();
    };

    return (
        <div className={`${styles.notification} ${show ? styles.show : ''}`}
        style={{ backgroundColor: color }}>
            <div className={styles.notification_content}>
                <div className={styles.notification_icons}>
                    <BsCheckCircle className={styles.notification_icon} />
                </div>
                <p>{message}</p>
                <button className={styles.close_button} onClick={handleClose}>X</button>
            </div>
        </div>
    );
};

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    color: PropTypes.string
};



export default Notification;