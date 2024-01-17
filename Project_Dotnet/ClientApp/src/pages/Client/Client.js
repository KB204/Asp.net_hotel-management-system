import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import "./Client.css";
import PhoneInput from 'react-phone-number-input/input';
import Loading from "../../components/loading/Loading";
import { useParams } from "react-router-dom";

export default function Client() {
    const { clientId } = useParams();
    const [formData, setFormData] = useState({
        Cin: "",
        Nom: "",
        Email: "",
        Telephone: "",
        Addresse: "",
    });

    const [alertMessage, setAlertMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
        const fetchClientData = async () => {
            try {
                const response = await fetch(`https://localhost:7120/api/clients/${clientId}`, {
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
                setAlertMessage({ variant: "danger", message: `Error fetching client data: ${error.message}` });
            }
        };

        fetchClientData();
    }, [clientId]);

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
            const response = await fetch(`https://localhost:7120/api/clients/${clientId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
            }

            setAlertMessage({ variant: "success", message: "Client modifier avec succes!" });
        } catch (error) {
            setAlertMessage({ variant: "danger", message: `Erreur lors de la modification du client: ${error.message}` });
        }
    };

    const handleAlertClose = () => {
        setAlertMessage(null);
    };

    return (
        <div className="updateUser">
            <h1 className="updateUserTitle">Modifier Client</h1>
            {alertMessage && (
                <Alert variant={alertMessage.variant} onClose={handleAlertClose} dismissible>
                    {alertMessage.message}
                </Alert>
            )}
            {isLoading ? (
                <Loading/>
            ) : (
                <form className="updateUserForm" onSubmit={handleSubmit}>
                    <div className="updateUserItem">
                        <label>Cin</label>
                        <input
                            type="text"
                            name="cin"
                            value={formData.cin}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="updateUserItem">
                        <label>Nom et Prenom</label>
                        <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="updateUserItem">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="updateUserItem">
                        <label>Telephone</label>
                        <PhoneInput
                            value={formData.telephone}
                            onChange={(value) => handleChange({ target: { name: 'telephone', value } })}
                            required
                        />
                    </div>

                    <div className="updateUserItem">
                        <label>Adresse</label>
                        <input
                            type="text"
                            name="addresse"
                            value={formData.addresse}
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
