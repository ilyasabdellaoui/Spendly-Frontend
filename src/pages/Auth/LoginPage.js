import React from "react";
import LoginForm from "../../components/Auth/LoginForm";
import DarkModeSwitcher from "../../components/DarkModeSwitcher";

const LoginPage = ({ setLoggedIn }) => {
    return (
        <div className="flex items-center justify-center h-[100vh] w-[100hw] md:h-full lg:h-full xl:h-full">
            <div className="flex flex-col flex-1 items-end md:items-center absolute top-[1rem] right-[1rem]">
                <DarkModeSwitcher />
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 w-full h-full flex items-center justify-center">
                <LoginForm setLoggedIn={setLoggedIn} />
            </div>
        </div>
    )
};

export default LoginPage;