import Search from "./components/Search";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchAccessToken from "./utils/fetchAccessToken";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./App.css";
import { FilterProvider } from "./components/FilterContext";
import Header from "./components/Header";
import Details from "./components/Details";

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
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <FilterProvider>
                    <Header />
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={<Search accessToken={accessToken} />}
                        />
                        <Route
                            exact
                            path="/details/:id"
                            element={<Details accessToken={accessToken} />}
                        />
                    </Routes>
                </FilterProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
