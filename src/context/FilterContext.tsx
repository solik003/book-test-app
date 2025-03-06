
import React, { createContext, useContext, useState } from 'react';
import { DEFAULT_FILTER } from '../constants/filterConstants';

type FilterContextType = {
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    bookId: string | null;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [filter, setFilter] = useState<string>(DEFAULT_FILTER);

    return (
        <FilterContext.Provider value={{ filter, setFilter }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = (): FilterContextType => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
};
