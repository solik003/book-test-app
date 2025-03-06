import React from 'react';
import { BOOK_TABLE_HEADERS } from '../constants/tableHeaders';

export const TableHeader: React.FC = () => {

    return (
        <thead className="bg-gray-100">
            <tr>
                {Object.entries(BOOK_TABLE_HEADERS).map(([key, header]) => (
                    <th key={key} className="px-6 py-4 text-left text-gray-700 text-xs sm:text-sm md:text-base">
                        {header}
                    </th>
                ))}
            </tr>
        </thead>
    );
};
