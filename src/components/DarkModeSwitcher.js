import React, { useState, useEffect }  from "react";

const DarkModeSwitcher = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(
        localStorage.getItem('color-theme') === 'dark' ||
          (!('color-theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    
      useEffect(() => {
        if (isDarkTheme) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }, [isDarkTheme]);
    
      const handleToggleTheme = () => {
        setIsDarkTheme((prevTheme) => {
          const newTheme = !prevTheme ? 'dark' : 'light';
          localStorage.setItem('color-theme', newTheme);
          return !prevTheme;
        });
      };
    return (
        <button
            id="theme-toggle"
            type="button"
            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            onClick={handleToggleTheme}
        >
            {/* Dark Mode Icon */}
            <svg
                id="theme-toggle-dark-icon"
                className={!isDarkTheme ? 'w-5 h-5' : 'hidden'}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
            >
                <path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z" />
            </svg>

            {/* Light Mode Icon */}
            <svg
                id="theme-toggle-light-icon"
                className={isDarkTheme ? 'w-5 h-5' : 'hidden'}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                />
            </svg>
        </button>
    );
};

export default DarkModeSwitcher;