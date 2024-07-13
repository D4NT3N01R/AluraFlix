import { CirclePopLoader } from 'react-loaders-kit';
import styles from './cargando.module.css';

const Loading = () => {


    const loaderProps = {
        loading: true,
        size: 100,
        duration: 1,
    };

    return (
        <div className={styles.loading_container}>
            <CirclePopLoader {...loaderProps} />
            <h2>Cargando...</h2>
        </div>
    );
};

export default Loading;