import { useState } from "react";
import { Alert } from "react-bootstrap";
export default function NewFacilitie() {
    const [formData, setFormData] = useState({
        FacilitieName: "",
        FacilitieDescription: "",
        FacilitiePrice: "",
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
            const response = await fetch("https://localhost:7120/api/facilities", {
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

            setAlertMessage({ variant: "success", message: "Equipement cree avec succes!" });

            setFormData({
                FacilitieName: "",
                FacilitieDescription: "",
                FacilitiePrice: "",
            });
        } catch (error) {
            setAlertMessage({ variant: "danger", message: `Erreur lors de la creation du equipement: ${error.message}` });
        }
    };

    const handleAlertClose = () => {
        setAlertMessage(null);
    };

    return (
        <div className="newUser">
            <h1 className="newUserTitle">Nouveau Equipement</h1>
            {alertMessage && (
                <Alert variant={alertMessage.variant} onClose={handleAlertClose} dismissible>
                    {alertMessage.message}
                </Alert>
            )}
            <form className="newUserForm" onSubmit={handleSubmit}>
                <div className="newUserItem">
                    <label>Equipement</label>
                    <input
                        type="text"
                        name="FacilitieName"
                        placeholder="Entrez l'equipement"
                        value={formData.FacilitieName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="newUserItem">
                    <label>Description</label>
                    <input
                        type="text"
                        name="FacilitieDescription"
                        placeholder="Entrez la description"
                        value={formData.FacilitieDescription}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="newUserItem">
                    <label>Prix</label>
                    <input
                        type="number"
                        name="FacilitiePrice"
                        placeholder="Entrez le prix"
                        value={formData.FacilitiePrice}
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
