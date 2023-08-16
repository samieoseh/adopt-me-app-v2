import { useState, useEffect } from "react";
import { fetchAnimalsUrl, fetchTypesUrl } from "../utils/urls";
import noPetImage from "../assets/images/no-pet.jpg";
import fetchApi from "../utils/fetchApi";
import { useQuery } from "@tanstack/react-query";
import ReactLoading from "react-loading";
import { useFilterContext } from "./FilterContext";

import styles from "./styles/Search.module.css";
import searchIcon from "../assets/svg/search.svg";

// eslint-disable-next-line react/prop-types
const Search = ({ accessToken }) => {
    const [selectedOption, setSelectedOption] = useState("");
    const [location, setLocation] = useState("");

    const [animalParams, setAnimalParams] = useState({
        token: null,
        url: null,
    });
    const [typeParams, setTypeParams] = useState({
        token: null,
        url: null,
    });

    useEffect(() => {
        setAnimalParams({
            token: accessToken,
            url: `${fetchAnimalsUrl}?limit=100`,
        });
        setTypeParams({
            token: accessToken,
            url: fetchTypesUrl,
        });
    }, [accessToken]);

    const handleSearch = () => {
        location == ""
            ? setAnimalParams({
                  token: accessToken,
                  url: `${fetchAnimalsUrl}?type=${selectedOption}&limit=100`,
              })
            : setAnimalParams({
                  token: accessToken,
                  url: `${fetchAnimalsUrl}?type=${selectedOption}&location=${location}&limit=100`,
              });
    };

    const animalRes = useQuery(["animal-params", animalParams], fetchApi, {
        onError: (error) => console.log(error),
    });

    const typeRes = useQuery(["type-params", typeParams], fetchApi);
    const [animals] = [animalRes?.data?.animals ?? [], animalRes.status];
    const [types] = [typeRes?.data?.types ?? [], typeRes.status];
    const { selectedFilter } = useFilterContext();
    console.log(selectedFilter);
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div className={styles.searchContainer}>
                <div className={styles.selectContainer}>
                    <select
                        className={styles.customSelect}
                        onChange={(e) => {
                            setSelectedOption(e.target.value);
                        }}
                    >
                        <option value="blank"></option>
                        {types &&
                            types.map((type) => (
                                <option key={type.name}>{type.name}</option>
                            ))}
                    </select>
                </div>
                <input
                    type="text"
                    placeholder="Location e.g CA, NJ, CO, DE"
                    onChange={(e) => setLocation(e.target.value)}
                />
                <div className={styles.search} onClick={() => handleSearch()}>
                    <img src={searchIcon} alt="Search icon" />
                </div>
            </div>
            <div className={styles.resultContainer}>
                {selectedOption != "blank" && location != "" ? (
                    <h2>
                        {selectedOption} from {location}
                    </h2>
                ) : (
                    <h2>Browse Adoptable Pets</h2>
                )}
                {animalRes.error ? (
                    <h2>No Pet Found</h2>
                ) : animalRes.isLoading ? (
                    <ReactLoading
                        type="spin"
                        color="#111"
                        height={50}
                        width={50}
                    />
                ) : (
                    <div className={styles.container}>
                        {animals &&
                            animals.map((animal) => (
                                <div key={animal.id} className={styles.card}>
                                    <h3 className={styles.cardTitle}>
                                        {animal.name}
                                    </h3>
                                    <div>
                                        <img
                                            src={
                                                animal["primary_photo_cropped"]
                                                    ? animal[
                                                          "primary_photo_cropped"
                                                      ].small
                                                    : noPetImage
                                            }
                                            alt={animal.name}
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
