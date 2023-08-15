import styles from "./styles/Header.module.css";
import favIcon from "../assets/svg/favorite.svg";
import filterIcon from "../assets/svg/filter.svg";

const Header = () => {
    return (
        <header>
            <h1>Logo</h1>
            <nav>
                <ul className={styles.navLinks}>
                    <li>
                        <a>Cat</a>
                    </li>
                    <li>
                        <a>Dog</a>
                    </li>
                </ul>

                <div className={styles.favorite}>
                    <img src={favIcon} alt="favorite" />
                </div>
                <div className={styles.filter}>
                    <img src={filterIcon} alt="favorite" />
                </div>
            </nav>
        </header>
    );
};

export default Header;
