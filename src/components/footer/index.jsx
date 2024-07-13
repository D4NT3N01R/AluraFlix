import styles from "./Footer.module.css"
import logo from "./LogoMain.png"

export const Footer = ()=>{

    return(<footer className={styles.pie}>
        <div className={styles.logoContainer}>
         <img src={logo} alt="Alura"/>
         <h1 className={styles.texto}> Pagina hecha por Johann Andrés</h1>
         </div>

        </footer>)
}