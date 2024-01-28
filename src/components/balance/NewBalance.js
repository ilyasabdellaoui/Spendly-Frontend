import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { getItemWithExpiry } from "../../utils/storage";

const NewBalance = ({config, user_id, baseUrl}) => {

    const [balance, setBalance] = useState([]);
    const [error, setError] = useState("");

    const currency = getItemWithExpiry('currency');

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get(`${baseUrl}/balance/${user_id}/my-balance`, config);
                setBalance(response.data);
                setError("");
            } catch (error) {
                if (error.response && error.response.data && error.response.data.detail) {
                    const errorMessage = error.response.data.detail;
                    if (errorMessage === 'Invalid token or expired token.') {
                        // Handle the specific error
                        console.error('Token error:', errorMessage);
                        window.location.href = "/";
                    } else {
                        console.error('API error:', error);
                        setError(errorMessage);
                    }
                } else {
                    console.error('Unexpected error:', error);
                    setError('An unexpected error occurred while fetching the balance.');
                }
                setBalance(null);
            }
        };
        fetchBalance();
    }, []);

    return (
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="w-full">
                <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">New Balance</h3>


                {error ? (
                    <span className="block sm:inline text-red-700"><strong className="font-bold">Error:</strong> {error}</span>
                ) : (
                    <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
                        {balance !== null ? balance : 'Unable to fetch balance'} {currency}
                    </span>
                )}


                <p className="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
                    <span className="flex items-center mr-1.5 text-sm text-green-500 dark:text-green-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"></path>
                        </svg>
                        12.5%
                    </span>
                    Since last month
                </p>
            </div>
        </div>
    </div>
    )
};

export default NewBalance;