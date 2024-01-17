import React, { useEffect, useState } from "react";
import "./WidgetLg.css";

const WidgetLg = () => {
    const [roomOccupancyData, setRoomOccupancyData] = useState([]);
    const [reservationsPerMonth, setReservationsPerMonth] = useState([]);
    const [totalReservations, setTotalReservations] = useState(undefined);

    const monthNames = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "September", "October", "November", "December"];

    useEffect(() => {
        const fetchRoomOccupancyData = async () => {
            try {
                const response = await fetch("https://localhost:7120/api/reservations/room-occupancy");

                if (!response.ok) {
                    throw new Error("Failed to fetch room occupancy data");
                }

                const data = await response.json();
                setRoomOccupancyData(data);
            } catch (error) {
                console.error("Error fetching room occupancy data:", error.message);
            }
        };

        const fetchReservationsPerMonth = async () => {
            try {
                const response = await fetch("https://localhost:7120/api/reservations/reservations-per-month");

                if (!response.ok) {
                    throw new Error("Failed to fetch reservations per month data");
                }

                const data = await response.json();
                setReservationsPerMonth(data);
            } catch (error) {
                console.error("Error fetching reservations per month data:", error.message);
            }
        };

        const fetchTotalReservations = async () => {
            try {
                const response = await fetch("https://localhost:7120/api/reservations/total-reservations");

                if (!response.ok) {
                    throw new Error("Failed to fetch total reservations data");
                }

                const data = await response.json();
                setTotalReservations(data);
            } catch (error) {
                console.error("Error fetching total reservations data:", error.message);
            }
        };

        fetchRoomOccupancyData();
        fetchReservationsPerMonth();
        fetchTotalReservations();
    }, []);

    
    const monthlyData = monthNames.map((month, index) => {
        const dataForMonth = reservationsPerMonth.find((item) => item.month === index + 1);

        return {
            month,
            year: dataForMonth ? dataForMonth.year : "",
            reservationCount: dataForMonth ? dataForMonth.reservationCount : 0,
        };
    });

    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Occupation des Chambres</h3><br></br>
            <table className="widgetLgTable">
                <tr className="widgetLgTr">
                    <th className="widgetLgTh">Chambre Numero</th>
                    <th className="widgetLgTh">Annee</th>
                    <th className="widgetLgTh">Mois</th>
                    <th className="widgetLgTh">Nombre de Reservation</th>
                </tr>
                {roomOccupancyData.map((item) => (
                    <tr key={`${item.RoomNumber}-${item.Year}-${item.Month}`} className="widgetLgTr">
                        <td className="widgetLgDate">{item.roomNumber}</td>
                        <td className="widgetLgDate">{item.year}</td>
                        <td className="widgetLgAmount">{monthNames[item.month - 1]}</td>
                        <td className={`widgetLgAmount ${item.reservationCount === 0 ? 'red' : (item.reservationCount > 1 ? 'green' : '')}`}>
                            {item.reservationCount} Reservation
                        </td>
                    </tr>
                ))}
            </table>

            <br></br>

            <div className="widgetLgMonthlyReservations">
                <h3 className="widgetLgTitle">Reservations par mois</h3>
                <ul>
                    {monthlyData.map((entry, index) => (
                        <li key={index} className="widgetLgMonthlyReservationsItem">
                            <span className="widgetLgTh">Mois:  </span>
                            <span className="widgetLgDate">{entry.month}</span>
                            {entry.year !== undefined && entry.year !== null && (
                                <>
                                    <span className="widgetLgTh">  Annee:  </span>
                                    <span className="widgetLgDate">{entry.year}</span>
                                </>
                            )}
                            <span className="widgetLgTh">  Nombre de Reservations:  </span>
                            <span className={`widgetLgAmount ${entry.reservationCount === 0 ? 'red' : (entry.reservationCount > 1 ? 'green' : '')}`}>
                                {entry.reservationCount} Reservation
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="widgetLgTotalReservations">
                <h3 className="widgetLgTitle">Total des Reservations de l'annee</h3>
                <span className="widgetLgValue">{totalReservations} Reservations</span>
            </div>
        </div>
    );
};

export default WidgetLg;
