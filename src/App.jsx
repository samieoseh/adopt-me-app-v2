import SearchParams from "./components/SearchParams";
import { useEffect, useState } from "react";
import fetchAccessToken from "./utils/fetchAccessToken";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 6000000,
            cacheTime: 6000000,
        },
    },
});

function App() {
    const [accessToken, setAccessToken] = useState(null);
    useEffect(() => {
        try {
            const results = fetchAccessToken();
            results.then((data) => setAccessToken(data));
            console.log(accessToken);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <SearchParams accessToken={accessToken} />
            </div>
        </QueryClientProvider>
    );
}

export default App;
