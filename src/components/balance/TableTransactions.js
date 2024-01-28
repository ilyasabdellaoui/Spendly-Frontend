import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import useDropdown from '../useDropdown';

const TableTransactions = ({user_id, config, baseUrl}) => {
    // Fetch operations
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`${baseUrl}/balance/${user_id}/my-operations`, config);
                const sortedTransactions = response.data.sort((a, b) => b.entry_id - a.entry_id);
                setTransactions(sortedTransactions);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };
        fetchTransactions();
    }, []);

    const formatDateTime = (dateTimeString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateTimeString).toLocaleDateString('en-US', options);
    };

    // Fetch categories
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categoriesMapping, setCategoriesMapping] = useState({});

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${baseUrl}/categories/all`);
                setCategories(response.data);
                setCategoriesMapping(categoriesMapping);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleCheckboxChange = (category_id) => {
        setSelectedCategories((prevSelectedCategories) => {
            if (prevSelectedCategories.includes(category_id)) {
                return prevSelectedCategories.filter((id) => id !== category_id);
            } else {
                return [...prevSelectedCategories, category_id];
            }
        });
    };

    const filteredTransactions = transactions.filter((transaction) => {
        if (selectedCategories.length === 0) {
            return true;
        }
        return selectedCategories.includes(transaction.category);
    });

    const { isDropdownOpen: dropdown1, toggleDropdown: toggleDropdown1, dropdownRef: dropdownRef1 } = useDropdown('dropdownDefault');
    const { isDropdownOpen: dropdown2, toggleDropdown: toggleDropdown2, dropdownRef: dropdownRef2 } = useDropdown('transactions-dropdown');

    return (
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                {/* Card header */}
                <div className="items-center justify-between lg:flex">
                    <div className="mb-4 lg:mb-0">
                        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                            Transactions
                        </h3>
                        <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                            This is a list of latest transactions
                        </span>
                    </div>
                    <div className="items-center sm:flex">
                        <div className="flex items-center">
                            <button
                                id="dropdownDefault"
                                data-dropdown-toggle="dropdown"
                                className="mb-4 sm:mb-0 mr-4 inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                type="button"
                                onClick={toggleDropdown1}
                            >
                                Filter by Category
                                <svg
                                    className={`w-4 h-4 ml-2 ${dropdown1 ? 'rotate-180' : ''}`}
                                    aria-hidden="true"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            {/* Dropdown menu */}
                            <div
                                id="dropdown"
                                ref={dropdownRef1}
                                className={`z-10 ${dropdown1 ? 'block' : 'hidden'} w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700`}
                                style={{
                                    position: "absolute",
                                    inset: "0px auto auto 0px",
                                    margin: 0,
                                    transform: "translate3d(119.2px, 6156px, 0px)"
                                }}
                                data-popper-placement="bottom"
                            >
                                <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                                    Category
                                </h6>
                                <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
                                    {categories.map((category) => (
                                        <li key={category.category_id} className="flex items-center">
                                            <input
                                                id={category.category_id}
                                                type="checkbox"
                                                value={category.category_name}
                                                checked={selectedCategories.includes(category.category_name)}
                                                onChange={() => handleCheckboxChange(category.category_name)}
                                                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                            />
                                            <label
                                                htmlFor={category.category_id}
                                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                            >
                                                {category.category_name}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div date-rangepicker="" className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
                                        <path
                                            clipRule="evenodd"
                                            fillRule="evenodd"
                                            d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    name="start"
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 datepicker-input"
                                    placeholder="From"
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
                                        <path
                                            clipRule="evenodd"
                                            fillRule="evenodd"
                                            d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    name="end"
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 datepicker-input"
                                    placeholder="To"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Table */}
                <div className="flex flex-col mt-6">
                    <div className="overflow-x-auto rounded-lg">
                        <div className="inline-block min-w-full align-middle">
                            <div className="overflow-hidden shadow sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                                Operation
                                            </th>
                                            <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                                Date & Time
                                            </th>
                                            <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                                Amount
                                            </th>
                                            <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                                Category
                                            </th>
                                            <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                                                Operation number
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800">
                                        {filteredTransactions.map((transaction, index) => (
                                            <tr key={transaction.entry_id} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                                                <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                                    <span className="font-semibold">{transaction.description}</span>
                                                </td>
                                                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    {formatDateTime(transaction.entry_date)}
                                                </td>
                                                <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                                    {transaction.amount} €
                                                </td>
                                                <td className="p-4 whitespace-nowrap">
                                                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 border border-green-100 dark:border-green-500">
                                                        {transaction.category}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    {transaction.entry_id}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Card Footer */}
                <div className="flex items-center justify-between pt-3 sm:pt-6">
                    <div>
                        <button
                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            type="button"
                            id="transactions-dropdown"
                            onClick={toggleDropdown2}
                        >
                            Last 7 days{" "}
                            <svg
                                className={`w-4 h-4 ml-2 ${dropdown2 ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        {/* Dropdown menu */}
                        <div
                            id="transactions-dropdown"
                            ref={dropdownRef2}
                            className={`z-10 ${dropdown2 ? 'block' : 'hidden'} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
                            style={{
                                position: "absolute",
                                inset: "auto auto 0px 0px",
                                margin: 0,
                                transform: "translate3d(98.4px, 6155.2px, 0px)"
                            }}
                            data-popper-placement="top"
                        >
                            <div className="px-4 py-3" role="none">
                                <p
                                    className="text-sm font-medium text-gray-900 truncate dark:text-white"
                                    role="none"
                                >
                                    Sep 16, 2021 - Sep 22, 2021
                                </p>
                            </div>
                            <ul className="py-1" role="none">
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                        role="menuitem"
                                    >
                                        Yesterday
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                        role="menuitem"
                                    >
                                        Today
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                        role="menuitem"
                                    >
                                        Last 7 days
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                        role="menuitem"
                                    >
                                        Last 30 days
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                        role="menuitem"
                                    >
                                        Last 90 days
                                    </a>
                                </li>
                            </ul>
                            <div className="py-1" role="none">
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                    role="menuitem"
                                >
                                    Custom...
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <a
                            href="#"
                            className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Transactions Report
                            <svg
                                className="w-4 h-4 ml-1 sm:w-5 sm:h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableTransactions;