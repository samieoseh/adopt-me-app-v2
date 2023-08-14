const fetchApi = async ({ queryKey }) => {
    const accessToken = queryKey[1].token;
    const fetchUrl = queryKey[1].url;

    if (accessToken != null) {
        const auth = `${accessToken["token_type"]} ${accessToken["access_token"]}`;
        console.log("fetching ", fetchUrl);
        try {
            const res = await fetch(fetchUrl, {
                headers: {
                    authorization: auth,
                },
            });

            if (!res.ok) {
                console.log(res.status);
                throw new Error("Network response was not ok");
            }
            return res.json();
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    return [];
};

export default fetchApi;
