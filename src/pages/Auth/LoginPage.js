import React from "react";
import LoginForm from "../../Components/Auth/LoginForm";

const LoginPage = ({setLoggedIn}) => {

    return (
        <div className="flex items-center justify-center h-[90vh] md:h-full lg:h-full xl:h-full">
            <section className="bg-gray-50 dark:bg-gray-900 w-full">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <LoginForm setLoggedIn={setLoggedIn} />
                </div>
            </section>
        </div>
    )
};

export default LoginPage;