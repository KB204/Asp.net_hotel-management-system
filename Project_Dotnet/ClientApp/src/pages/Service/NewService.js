import { useState } from "react";
import { Alert } from "react-bootstrap";
export default function NewService() {
    const [formData, setFormData] = useState({
        ServiceName: "",
        ServiceDescription: "",
        Price: "",
    });

    const [alertMessage, setAlertMessage] = useState(null);

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
            const response = await fetch("https://localhost:7120/api/services", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            setAlertMessage({ variant: "success", message: "Service cree avec succes!" });

            setFormData({
                ServiceName: "",
                ServiceDescription: "",
                Price: "",
            });
        } catch (error) {
            setAlertMessage({ variant: "danger", message: `Erreur lors de la creation du service: ${error.message}` });
        }
    };

    const handleAlertClose = () => {
        setAlertMessage(null);
    };

    return (
        <div className="newUser">
            <h1 className="newUserTitle">Nouveau Service</h1>
            {alertMessage && (
                <Alert variant={alertMessage.variant} onClose={handleAlertClose} dismissible>
                    {alertMessage.message}
                </Alert>
            )}
            <form className="newUserForm" onSubmit={handleSubmit}>
                <div className="newUserItem">
                    <label>Service</label>
                    <input
                        type="text"
                        name="ServiceName"
                        placeholder="Entrez le service"
                        value={formData.ServiceName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="newUserItem">
                    <label>Description</label>
                    <input
                        type="text"
                        name="ServiceDescription"
                        placeholder="Entrez la description"
                        value={formData.ServiceDescription}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="newUserItem">
                    <label>Prix</label>
                    <input
                        type="number"
                        name="Price"
                        placeholder="Entrez le prix"
                        value={formData.Price}
                        onChange={handleChange}
                        required
                    />
                </div>


                <button type="submit" className="newUserButton">
                    Create
                </button>
            </form>
        </div>
    );
}
