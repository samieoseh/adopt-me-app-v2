import styles from "./styles/Header.module.css";
import favIcon from "../assets/svg/favorite.svg";
import filterIcon from "../assets/svg/filter.svg";
import { useFilterContext } from "../components/FilterContext";
import { useState } from "react";
import { fetchAnimalsUrl } from "../utils/urls";

const Header = () => {
    const { selectedFilter, setSelectedFilter } = useFilterContext();
    const [filterItem, setFilterItem] = useState({});

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
                            onClick={() => handleFilterChange()}
                        >
                            <img src={filterIcon} alt="favorite" />
                        </div>
                    </div>
                    <div className={styles.filterBar}>
                        <select
                            name="breed"
                            id=""
                            onChange={(e) =>
                                handleChange("gender", e.target.value)
                            }
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <select
                            name="gender"
                            id=""
                            onChange={(e) =>
                                handleChange("title", e.target.value)
                            }
                        >
                            <option value="mr">Mr</option>
                            <option value="mrs">Mrs</option>
                        </select>
                        <button onClick={() => handleFilterSubmit()}>
                            Submit
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
