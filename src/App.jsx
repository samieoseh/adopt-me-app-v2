import SearchParams from "./components/SearchParams";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchAccessToken from "./utils/fetchAccessToken";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./App.css";
import SearchResult from "./components/SearchParams";

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
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }, []);

    return (
        // <QueryClientProvider client={queryClient}>
        //     <BrowserRouter>
        //         <Routes>
        //             <Route
        //                 exact
        //                 path="/"
        //                 element={<SearchParams accessToken={accessToken} />}
        //             />
        //         </Routes>
        //     </BrowserRouter>
        // </QueryClientProvider>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route exact path="/results" element={<SearchResult />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
