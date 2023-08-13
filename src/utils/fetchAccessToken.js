import auth from "../config";
import { fetchAccessTokenUrl } from "../config";

const fetchAccessToken = async () => {
    const url = fetchAccessTokenUrl;
    const clientId = auth.apiKey;
    const clientSecret = auth.secretKey;

    const data = {
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
    };

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data),
    };
    const apiRes = await fetch(url, requestOptions);
    console.log(apiRes.status);
    if (!apiRes.ok) {
        throw new Error(`Error in access token`);
    }

    return apiRes.json();
};

export default fetchAccessToken;
