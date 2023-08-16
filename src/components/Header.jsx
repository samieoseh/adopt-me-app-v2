import styles from "./styles/Header.module.css";
import favIcon from "../assets/svg/fav.svg";
import filterIcon from "../assets/svg/filter.svg";

const Header = () => {
    return (
        <header>
            <h1>Adopt Me</h1>

            <nav>
                <ul className={styles.navLinks}>
                    <li>
                        <a>Cats</a>
                    </li>
                    <li>
                        <a>Dogs</a>
                    </li>
                    <li>
                        <a>Other Pets</a>
                    </li>
                </ul>
                <ul className={styles.navIcons}>
                    <div>
                        <img src={favIcon} alt="favorite" />
                    </div>
                    <div>
                        <img src={filterIcon} alt="filter" />
                    </div>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
