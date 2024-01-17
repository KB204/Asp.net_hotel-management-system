import React, { useState, useEffect } from "react";
import Chart from "../../components/Chart/Chart";
import FeaturedInfo from "../../components/FeaturedInfo/FeaturedInfo";
import "./Home.css";
import WidgetLg from "../../components/WidgetLg/WidgetLg";
import WidgetSm from "../../components/WidgetSm/WidgetSm";
export default function Home() {
    const [monthlyGainData, setMonthlyGainData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [roomOccupancyData, setRoomOccupancyData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://localhost:7120/api/reservations/monthly-gain");

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                setMonthlyGainData(data);

                const responseOccupancy = await fetch("https://localhost:7120/api/reservations/room-occupancy");
                const dataOccupancy = await responseOccupancy.json();
                setRoomOccupancyData(dataOccupancy);

                if (data.length > 0) {
                    setSelectedYear(data[0].year);
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="home">
            <FeaturedInfo />
            <Chart
                data={monthlyGainData}
                title={
                    <div style={{ fontFamily: 'YourCustomFont', fontWeight: 'bold', }}>
                        Statistique de L'annee {selectedYear}
                    </div>
                }
                grid
                dataKey="totalAmount"
            />
            <div className="homeWidgets">
                <WidgetLg roomOccupancyData={roomOccupancyData} />
                <WidgetSm />
            </div>
        </div>
    );
}
