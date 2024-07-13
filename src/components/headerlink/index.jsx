import {NavLink } from "react-router-dom"
import styles from "./HeaderLink.module.css"
import PropTypes from "prop-types"

function CabeceraLink({url,children}){
    return(
        <NavLink 
        to={url} 
        className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.activeLink}` : styles.link
        }
    >
        {children}
        
        </NavLink>

    )
}
CabeceraLink.propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};



export default CabeceraLink