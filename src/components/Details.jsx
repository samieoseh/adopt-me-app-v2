import { useLocation } from "react-router-dom";
import { fetchAnimalUrl } from "../utils/urls/";
import fetchApi from "../utils/fetchApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Details = ({ accessToken }) => {
    const location = useLocation();
    const id = location.state.id;

    const [animalParams, setAnimalParams] = useState({
        token: null,
        url: null,
    });

    useEffect(() => {
        setAnimalParams({
            token: accessToken,
            url: `${fetchAnimalUrl}/${id}`,
        });
    }, [id, accessToken]);

    const animalRes = useQuery(["id", animalParams], fetchApi);
    const [animal] = [animalRes?.data?.animal ?? [], animalRes.status];

    return <div>{animal.name}</div>;
};

export default Details;
