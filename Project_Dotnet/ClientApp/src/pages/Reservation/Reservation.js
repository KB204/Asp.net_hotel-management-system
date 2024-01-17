import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function Reservation() {
    const { reservationId } = useParams();
    const [formData, setFormData] = useState({
        nom: "",
        roomNumber: "",
        facilitieName: "",
        checkInDate: "",
        checkOutDate: "",
        totalAmount: "",
    });

    const [clients, setClients] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch("https://localhost:7120/api/clients");
                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
                }
                const clientsData = await response.json();
                setClients(clientsData);
            } catch (error) {
                console.error(`Error fetching clients: ${error.message}`);
            }
        };

        const fetchRooms = async () => {
            try {
                const response = await fetch("https://localhost:7120/api/rooms");
                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
                }
                const roomsData = await response.json();
                setRooms(roomsData);
            } catch (error) {
                console.error(`Error fetching rooms: ${error.message}`);
            }
        };

        const fetchFacilities = async () => {
            try {
                const response = await fetch("https://localhost:7120/api/facilities");
                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
                }
                const facilitiesData = await response.json();
                setFacilities(facilitiesData);
            } catch (error) {
                console.error(`Error fetching facilities: ${error.message}`);
            }
        };

        const fetchReservation = async () => {
            try {
                const response = await fetch(`https://localhost:7120/api/reservations/${reservationId}`);
                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
                }
                const reservationData = await response.json();
                setFormData(reservationData);
            } catch (error) {
                console.error(`Error fetching reservation: ${error.message}`);
            }
        };

        fetchClients();
        fetchRooms();
        fetchFacilities();
        fetchReservation();
    }, [reservationId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://localhost:7120/api/reservations/${reservationId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            setAlertMessage({ variant: "success", message: "Reservation modifiee avec succes!" });
        } catch (error) {
            setAlertMessage({ variant: "danger", message: `Erreur lors de la modification de la reservation: ${error.message}` });
        }
    };

    const handleAlertClose = () => {
        setAlertMessage(null);
    };

    return (
        <div className="updateUser">
            <h1 className="updateUserTitle">Modifier la Reservation</h1>
            {alertMessage && (
                <Alert variant={alertMessage.variant} onClose={handleAlertClose} dismissible>
                    {alertMessage.message}
                </Alert>
            )}
            <form className="updateUserForm" onSubmit={handleSubmit}>
                <div className="updateUserItem">
                    <label>Client</label>
                    <select
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                    >
                        {clients.map((client) => (
                            <option key={client.clientID} value={client.nom}>
                                {client.nom}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="updateUserItem">
                    <label>Numero de la chambre</label>
                    <select
                        name="roomNumber"
                        value={formData.roomNumber}
                        onChange={handleChange}
                        required
                    >
                        {rooms.map((room) => (
                            <option key={room.roomID} value={room.roomNumber}>
                                {room.roomNumber}
                            </option>
                        ))}
                    </select>
                </div>


                <div className="updateUserItem">
                    <label>Equipement</label>
                    <select
                        name="facilitieName"
                        value={formData.facilitieName}
                        onChange={handleChange}
                    >
                        <option value="">Selectionnez un equipement</option>
                        {facilities.map((facility) => (
                            <option key={facility.facilitieID} value={facility.facilitieName}>
                                {facility.facilitieName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="updateUserItem">
                    <label>Date d'arrivee</label>
                    <input
                        
                        name="checkInDate"
                        value={formData.checkInDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="updateUserItem">
                    <label>Date de depart</label>
                    <input
                        
                        name="checkOutDate"
                        value={formData.checkOutDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="updateUserItem">
                    <label>Total</label>
                    <input
                        type="number"
                        name="totalAmount"
                        value={formData.totalAmount}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="updateUserButton">
                    Modifier
                </button>
            </form>
        </div>
    );
}
