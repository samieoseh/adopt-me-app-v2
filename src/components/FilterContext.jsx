import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useFilterContext = () => useContext(FilterContext);

// eslint-disable-next-line react/prop-types
export const FilterProvider = ({ children }) => {
    const [selectedFilter, setSelectedFilter] = useState("");

    return (
        <FilterContext.Provider value={{ selectedFilter, setSelectedFilter }}>
            {children}
        </FilterContext.Provider>
    );
};
