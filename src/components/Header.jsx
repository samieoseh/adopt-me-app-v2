import styles from "./styles/Header.module.css";
<<<<<<< HEAD
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
=======
import favIcon from "../assets/svg/favorite.svg";
import closeIcon from "../assets/svg/close.svg";
import filterIcon from "../assets/svg/filter.svg";
import { useFilterContext } from "../components/FilterContext";
import { useState } from "react";
import { fetchAnimalsUrl } from "../utils/urls";

const Header = () => {
    const { selectedFilter, setSelectedFilter } = useFilterContext();
    const [filterItem, setFilterItem] = useState({});
    const [filterBarStatus, setFilterBarStatus] = useState(false);

    const handleChange = (name, value) => {
        const updatedItem = {
            ...filterItem,
            [name]: value,
        };

        setFilterItem(updatedItem);
    };

    const handleFilterSubmit = () => {
        let filterUrl = "";
        for (const key in filterItem) {
            filterUrl = `${filterUrl}${key}=${filterItem[key]}&`;
        }
        setSelectedFilter(
            `${fetchAnimalsUrl}&${filterUrl.slice(0, filterUrl.length - 1)}`
        );
    };
    console.log(selectedFilter);
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
                        <div
                            className={styles.filter}
                            onClick={() => setFilterBarStatus(true)}
                        >
                            <img src={filterIcon} alt="favorite" />
                        </div>
                    </div>
                    <div
                        className={`${styles.filterBar} ${
                            filterBarStatus ? styles.filterBarActive : ""
                        }`}
                    >
                        <div
                            style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "flex-end",
                            }}
                        >
                            <div
                                className={styles.closeIcon}
                                onClick={() => setFilterBarStatus(false)}
                            >
                                <img src={closeIcon} alt="close icon" />
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
>>>>>>> 334559e75737b1c9e8ee508bb2a31c977e5fe4ba
        </header>
    );
};

export default Header;
