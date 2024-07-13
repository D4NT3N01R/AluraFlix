import { Link } from "react-router-dom"
import styles from "./header.module.css"
import logo from "./LogoMain.png"
import CabeceraLink from "../headerlink"

 export const Header = ()=>{

    return(<header className={styles.cabecera}>
        <Link to="/">
            <section className={styles.logoContainer}>
                <img src={logo} alt="Logo AluraFlix"/> 
            </section>
        </Link>
        <nav className={styles.nav}>
            <div className={styles.linksNav}>
            <CabeceraLink url="./">
                Home
            </CabeceraLink>
            <CabeceraLink url="./Añadir">
               Añadir 
            </CabeceraLink>
            </div>
        </nav>
    </header>)

}

