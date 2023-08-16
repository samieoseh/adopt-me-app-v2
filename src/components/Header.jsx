import styles from "./styles/Header.module.css";
import favIcon from "../assets/svg/favorite.svg";
import filterIcon from "../assets/svg/filter.svg";

const Header = () => {
    return (
        <header>
            <div className={styles.container}>
                <h1>Adopt me!</h1>
                <nav>
                    <ul className={styles.navLinks}>
                        <li>
                            <a>Cat</a>
                        </li>
                        <li>
                            <a>Dog</a>
                        </li>
                        <li>
                            <a>Other Pets</a>
                        </li>
                    </ul>

                    <div className={styles.icons}>
                        <div className={styles.favorite}>
                            <img src={favIcon} alt="favorite" />
                        </div>
                        <div className={styles.filter}>
                            <img src={filterIcon} alt="favorite" />
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
