import { useState } from "react";
import { Alert } from "react-bootstrap";
import "./NewClient.css";
import PhoneInput from 'react-phone-number-input/input';
export default function NewClient() {
    const [formData, setFormData] = useState({
        Cin: "",
        Nom: "",
        Email: "",
        Telephone: "",
        Addresse: "",
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
            const response = await fetch("https://localhost:7120/api/clients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
            }

            setAlertMessage({ variant: "success", message: "Client cree avec succes!" });

            setFormData({
                Cin: "",
                Nom: "",
                Email: "",
                Telephone: "",
                Addresse: "",
            });
        } catch (error) {
            setAlertMessage({ variant: "danger", message: `Erreur lors de la creation du client: ${error.message}` });
        }
    };

    const handleAlertClose = () => {
        setAlertMessage(null);
    };

    return (
        <div className="newUser">
            <h1 className="newUserTitle">Nouveau Client</h1>
            {alertMessage && (
                <Alert variant={alertMessage.variant} onClose={handleAlertClose} dismissible>
                    {alertMessage.message}
                </Alert>
            )}
            <form className="newUserForm" onSubmit={handleSubmit}>
                <div className="newUserItem">
                    <label>Cin</label>
                    <input
                        type="text"
                        name="Cin"
                        placeholder="Entrez le numero de la carte national"
                        value={formData.Cin}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="newUserItem">
                    <label>Nom et Prenom</label>
                    <input
                        type="text"
                        name="Nom"
                        placeholder="Entrez le nom et prenom"
                        value={formData.Nom}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="newUserItem">
                    <label>Email</label>
                    <input
                        type="email"
                        name="Email"
                        placeholder="Entrez l'adresse e-mail"
                        value={formData.Email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="newUserItem">
                    <label>Telephone</label>
                    <PhoneInput
                        placeholder="Entrez le numero de telephone"
                        value={formData.Telephone}
                        onChange={(value) => handleChange({ target: { name: 'Telephone', value } })}
                        required
                    />
                </div>

                <div className="newUserItem">
                    <label>Adresse</label>
                    <input
                        type="text"
                        name="Addresse"
                        placeholder="Entrez l'adresse"
                        value={formData.Addresse}
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
