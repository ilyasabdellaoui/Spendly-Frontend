import React from "react";
import TableTransactions from "../../components/Balance/TableTransactions";
import NewOps from "../../components/Operations/NewOps";
import NewBalance from "../../components/Balance/NewBalance";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";

const DashboardPage = () => {
    const user_id = localStorage.getItem('user_id');
    const config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    };
    const baseUrl = 'https://spendlyapi.vercel.app';
    console.log(user_id);
    console.log(config);
    console.log(baseUrl);
    const components = [
        <NewBalance config={config} user_id={user_id} baseUrl={baseUrl} />,
        <NewOps />,
        <TableTransactions config={config} user_id={user_id} baseUrl={baseUrl} />,
      ];      
    return (
        <DashboardLayout Components={ components } />
    );
}

export default DashboardPage;