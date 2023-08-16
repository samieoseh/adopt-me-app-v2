import Search from "./components/Search";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchAccessToken from "./utils/fetchAccessToken";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./App.css";
<<<<<<< HEAD
import Header from "./components/Header";
import SearchResult from "./components/SearchParams";
=======
import { FilterProvider } from "./components/FilterContext";
import Header from "./components/Header";
>>>>>>> 334559e75737b1c9e8ee508bb2a31c977e5fe4ba

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
                    </Routes>
                </FilterProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
