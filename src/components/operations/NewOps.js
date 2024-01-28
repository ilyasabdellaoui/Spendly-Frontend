import React from "react";

const NewOps = () => {
    return (
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="flex space-x-4">
            <a
            href="/add-expense"
            className="text-center flex-1 p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-400 dark:text-black text-2xl font-bold"
            >
            Add Expense
            </a>
            <a
            href="/add-income"
            className="text-center flex-1 p-4 bg-green-500 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-green-600 text-white text-2xl font-bold"
            >
            Add Income
            </a>
        </div>
    </div>
    );
}

export default NewOps;