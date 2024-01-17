import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import Loading from "../../components/loading/Loading";
import { useParams } from "react-router-dom";

const UpdateRs = () => {
    const { roomServiceId } = useParams();
    const [formData, setFormData] = useState({
        roomNumber: "",
        serviceName: "",
    });

    const [rooms, setRooms] = useState([]);
    const [services, setServices] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch("https://localhost:7120/api/rooms");
                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
                }
                const roomsData = await response.json();
                setRooms(roomsData);
                setIsLoading(false);
            } catch (error) {
                console.error(`Error fetching rooms: ${error.message}`);
            }
        };

        const fetchServices = async () => {
            try {
                const response = await fetch("https://localhost:7120/api/services");
                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
                }
                const servicesData = await response.json();
                setServices(servicesData);
                setIsLoading(false);
            } catch (error) {
                console.error(`Error fetching services: ${error.message}`);
            }
        };

        fetchRooms();
        fetchServices();
    }, []);

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
            const response = await fetch(`https://localhost:7120/api/roomservices/${roomServiceId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                if (response.status === 409) {
                    throw new Error("Une combinaison de chambre et de service existe deja.Veuillez choisir une combinaison differente");
                }
                const errorText = await response.text();
                throw new Error(errorText);
            }

            setAlertMessage({ variant: "success", message: "RoomService ajoute avec succes !" });
        } catch (error) {
            setAlertMessage({ variant: "danger", message: `Erreur lors de l'ajout du RoomService: ${error.message}` });
        }
    };


    const handleAlertClose = () => {
        setAlertMessage(null);
    };

    return (
        <div className="newUser">
            <h1 className="newUserTitle">Ajouter un RoomService</h1>
            {alertMessage && (
                <Alert variant={alertMessage.variant} onClose={handleAlertClose} dismissible>
                    {alertMessage.message}
                </Alert>
            )}
            {isLoading ? (
                <Loading />
            ) : (
                <form className="newUserForm" onSubmit={handleSubmit}>
                    <div className="newUserItem">
                        <label>Chambre</label>
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

                    <div className="newUserItem">
                        <label>Service</label>
                        <select
                            name="serviceName"
                            value={formData.serviceName}
                            onChange={handleChange}
                            required
                        >
                            {services.map((service) => (
                                <option key={service.serviceID} value={service.serviceName}>
                                    {service.serviceName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="newUserButton">
                        Ajouter
                    </button>
                </form>
            )}
        </div>
    );
};

export default UpdateRs;
