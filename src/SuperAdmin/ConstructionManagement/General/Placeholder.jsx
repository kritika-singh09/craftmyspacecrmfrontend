import React from 'react';

const Placeholder = ({ title }) => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-brand-600">
                <p className="text-gray-800">This module is currently under development.</p>
            </div>
        </div>
    );
};

export default Placeholder;
