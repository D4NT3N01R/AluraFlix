import PropTypes from 'prop-types';
import styles from './card.module.css';
import { RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri";

const Card = ({ datos, primaryColor, onClick, onDelete, onEdit }) => {
    const { title, photo } = datos;

    const handleClick = () => {
        onClick();
        const bannerElement = document.getElementById('banner');
        if (bannerElement) {
            bannerElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={styles.card} style={{ cursor: 'pointer', '--primary-color': primaryColor }}>
            <figure className={styles.card_header}>
                <img src={photo} alt={title} onClick={handleClick} className={styles.card_image} />
                <figcaption className={styles.card_icons}>
                    <div  className={`${styles.card_icon_wrapper} ${styles.card_icon_delete}`}onClick={(e) => { e.stopPropagation(); onDelete(); }}>
                        <RiDeleteBin2Line className={styles.card_icon} />
                        <span className={styles.card_icon_text}>BORRAR</span>
                    </div>
                    <div className={`${styles.card_icon_wrapper} ${styles.card_icon_edit}`} onClick={(e) => { e.stopPropagation(); onEdit(datos); }}>
                        <RiEdit2Line className={styles.card_icon} />
                        <span className={styles.card_icon_text}>EDITAR</span>
                    </div>
                </figcaption>
            </figure>
        </div>
    );
    
};

Card.propTypes = {
    primaryColor: PropTypes.string.isRequired,
    datos: PropTypes.shape({
        photo: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
};

export default Card;