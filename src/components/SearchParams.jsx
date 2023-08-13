import { useState } from "react";
import { fetchAnimalsUrl, fetchTypeUrl } from "../../config";
import fetchApi from "../utils/fetchApi";
import { useQuery } from "@tanstack/react-query";

// eslint-disable-next-line react/prop-types
const SearchParams = ({ accessToken }) => {
    const [selectedOption, setSelectedOption] = useState("");

    const [animalParams, setAnimalParams] = useState({
        token: accessToken,
        url: `${fetchAnimalsUrl}?limit=100`,
    });
    const animalRes = useQuery(["params", animalParams], fetchApi);
    const typeRes = useQuery(
        ["params", { token: accessToken, url: fetchTypeUrl }],
        fetchApi
    );
    const [animals] = [animalRes?.data?.animals ?? [], animalRes.status];
    const [types] = [typeRes?.data?.types ?? [], typeRes.status];
    // const [pagination] = [results?.data?.pagination ?? [], results.status];
    console.log(animals);

    const handleSubmit = () => {
        setAnimalParams({
            token: accessToken,
            url: `${fetchAnimalsUrl}?type=${selectedOption}&limit=100`,
        });
    };
    console.log("Gello");
    console.log("Hello");
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
                        onChange={(e) => setSelectedOption(e.target.value)}
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
            <div>
                {animals &&
                    animals.map((animal) => (
                        <div key={animal.id}>
                            <h1>{animal.name}</h1>
                            <div>
                                <img
                                    src={animal["primary_photo_cropped"]?.small}
                                    alt={animal.name}
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default SearchParams;
