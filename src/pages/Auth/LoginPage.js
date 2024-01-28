import React from "react";
import LoginForm from "../../components/Auth/LoginForm";

const LoginPage = ({ setLoggedIn }) => {
    return (
        <LoginForm setLoggedIn={setLoggedIn} />
    )
};

export default LoginPage;