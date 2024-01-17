import React, { useEffect, useState } from "react";
import "./WidgetSm.css";

const WidgetSm = () => {
    const [loyalCustomers, setLoyalCustomers] = useState([]);

    useEffect(() => {
        const fetchLoyalCustomers = async () => {
            try {
                const response = await fetch("https://localhost:7120/api/reservations/loyal-customers");

                if (!response.ok) {
                    throw new Error("Failed to fetch loyal customers");
                }

                const data = await response.json();
                setLoyalCustomers(data);
            } catch (error) {
                console.error("Error fetching loyal customers:", error.message);
            }
        };

        fetchLoyalCustomers();
    }, []);

    
    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">Clients Visitent Souvents</span>
            <ul className="widgetSmList">
                {loyalCustomers.map((customer) => (
                    <li key={customer.nom} className="widgetSmListItem">
                        <div className="widgetSmUser">
                            <span className="widgetSmLabel">Client:</span>
                            <span className="widgetSmValue">{customer.nom}</span>
                        </div>
                        <div className="widgetSmUser">
                            <span className="widgetSmLabel">Total des Reservations:</span>
                            <span className="widgetSmValue">{customer.reservationCount} Reservations</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WidgetSm;
