import React, { useEffect, useState } from "react";
import "./Chart.css";
import {
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function Chart({ title, dataKey, grid, dataProp }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://localhost:7120/api/reservations/monthly-gain");

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const reservationsData = await response.json();

                setData(reservationsData);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData();
    }, []);

    const monthNames = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "September", "October", "November", "December"];

    
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p>{`Mois : ${monthNames[payload[0].payload.month - 1]}`}</p>
                    <p>{`Montant Total : ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="chart">
            <h3 className="chartTitle">{title}</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data}>
                    <XAxis dataKey="month" stroke="#5550bd" tickFormatter={(value) => monthNames[value - 1]} />
                    <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
                    <Tooltip content={<CustomTooltip />} />
                    {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
