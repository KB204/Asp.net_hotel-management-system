import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import Loading from "../../components/loading/Loading";
import { useParams } from "react-router-dom";

export default function Service() {
    const { facilitieId } = useParams();
    const [formData, setFormData] = useState({
        FacilitieName: "",
        FacilitieDescription: "",
        FacilitiePrice: "",
    });

    const [alertMessage, setAlertMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const fetchClientData = async () => {
            try {
                const response = await fetch(`https://localhost:7120/api/facilities/${facilitieId}`, {
                    method: "GET",
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
                }

                const clientData = await response.json();

                setFormData(clientData);
                setIsLoading(false);
            } catch (error) {
                setAlertMessage({ variant: "danger", message: `Error fetching service data: ${error.message}` });
            }
        };

        fetchClientData();
    }, [facilitieId]);

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
            const response = await fetch(`https://localhost:7120/api/facilities/${facilitieId}`, {
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

            setAlertMessage({ variant: "success", message: "Equipement modifier avec succes!" });
        } catch (error) {
            setAlertMessage({ variant: "danger", message: `Erreur lors de la modification du equipement: ${error.message}` });
        }
    };

    const handleAlertClose = () => {
        setAlertMessage(null);
    };

    return (
        <div className="updateUser">
            <h1 className="updateUserTitle">Modifier Equipement</h1>
            {alertMessage && (
                <Alert variant={alertMessage.variant} onClose={handleAlertClose} dismissible>
                    {alertMessage.message}
                </Alert>
            )}
            {isLoading ? (
                <Loading />
            ) : (
                <form className="updateUserForm" onSubmit={handleSubmit}>
                    <div className="updateUserItem">
                        <label>Equipement</label>
                        <input
                            type="text"
                            name="facilitieName"
                            value={formData.facilitieName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="updateUserItem">
                        <label>Description</label>
                        <input
                            type="text"
                            name="facilitieDescription"
                            value={formData.facilitieDescription}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="updateUserItem">
                        <label>Prix</label>
                        <input
                            type="number"
                            name="facilitiePrice"
                            value={formData.facilitiePrice}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="updateUserButton">
                        Modifier
                    </button>
                </form>
            )}
        </div>
    );

}
