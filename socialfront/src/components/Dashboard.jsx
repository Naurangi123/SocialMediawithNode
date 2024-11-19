import React, { useEffect, useState } from "react";

const Dashboard = ({ token }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:8000/api/auth/dashboard", {
                headers: { "x-auth-token": token },
            });
            const data = await res.json();
            setUserData(data);
        };

        fetchData();
    }, [token]);

    return (
        <div>
            <h2>Dashboard</h2>
            {userData && <p>Welcome, {userData.username}</p>}
        </div>
    );
};

export default Dashboard;
