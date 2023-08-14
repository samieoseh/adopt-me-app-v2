import { useState, useEffect } from "react";
import { fetchAnimalsUrl, fetchTypesUrl } from "../utils/urls";
import noPetImage from "../assets/images/no-pet.jpg";
import fetchApi from "../utils/fetchApi";
import { useQuery } from "@tanstack/react-query";

// eslint-disable-next-line react/prop-types
const SearchResult = ({ accessToken }) => {
    console.log(accessToken);
    const [selectedOption, setSelectedOption] = useState("");

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

    const animalRes = useQuery(["animal-params", animalParams], fetchApi);
    const typeRes = useQuery(["type-params", typeParams], fetchApi);
    const [animals] = [animalRes?.data?.animals ?? [], animalRes.status];
    const [types] = [typeRes?.data?.types ?? [], typeRes.status];
    // const [pagination] = [results?.data?.pagination ?? [], results.status];

    const handleSubmit = () => {
        setAnimalParams({
            token: accessToken,
            url: `${fetchAnimalsUrl}?type=${selectedOption}&limit=100`,
        });
    };

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log("submitting");
                    handleSubmit();
                }}
            >
                <label htmlFor="location">
                    <input type="text" placeholder="Location" />
                </label>
                <label htmlFor="type">
                    <select
                        name="type"
                        id="type"
                        value={selectedOption}
                        onChange={(e) => {
                            setSelectedOption(e.target.value);
                        }}
                    >
                        <option key="blank"></option>
                        {types &&
                            types.map((type) => (
                                <option key={type.name}>{type.name}</option>
                            ))}
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
            <div className="container">
                {animals &&
                    animals.map((animal) => (
                        <div key={animal.id} className="card">
                            <h1 className="card-title">{animal.name}</h1>
                            <div className="card-img-container">
                                <img
                                    src={
                                        animal["primary_photo_cropped"]
                                            ? animal["primary_photo_cropped"]
                                                  .small
                                            : noPetImage
                                    }
                                    alt={animal.name}
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default SearchResult;
