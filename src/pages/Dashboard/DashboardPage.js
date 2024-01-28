import React from "react";
import TableTransactions from "../../components/balance/TableTransactions";
import NewOps from "../../components/operations/NewOps";
import NewBalance from "../../components/balance/NewBalance";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

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
        <NewBalance key="/new-balance" config={config} user_id={user_id} baseUrl={baseUrl} />,
        <NewOps key="/new-ops"/>,
        <TableTransactions key="/tab-transactions" config={config} user_id={user_id} baseUrl={baseUrl} />,
      ];      
    return (
        <DashboardLayout Components={ components } />
    );
}

export default DashboardPage;