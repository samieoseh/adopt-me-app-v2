import useAccessToken from "./useAccessToken";

const useDataFetch = async (fetchFunc) => {
    const accessToken = await useAccessToken();

    fetchFunc(accessToken);
};

export default useDataFetch;
