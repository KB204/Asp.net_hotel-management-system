import { useState } from "react";
import { Alert } from "react-bootstrap";
export default function NewCategorie() {
    const [formData, setFormData] = useState({
        CategorieName: "",
        CategorieDescription: "",
        Capacity: "",
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
            const response = await fetch("https://localhost:7120/api/categories", {
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

            setAlertMessage({ variant: "success", message: "Categorie cree avec succes!" });

            setFormData({
                CategorieName: "",
                CategorieDescription: "",
                Capacity: "",
            });
        } catch (error) {
            setAlertMessage({ variant: "danger", message: `Erreur lors de la creation du categorie: ${error.message}` });
        }
    };

    const handleAlertClose = () => {
        setAlertMessage(null);
    };

    return (
        <div className="newUser">
            <h1 className="newUserTitle">Nouvelle Categorie</h1>
            {alertMessage && (
                <Alert variant={alertMessage.variant} onClose={handleAlertClose} dismissible>
                    {alertMessage.message}
                </Alert>
            )}
            <form className="newUserForm" onSubmit={handleSubmit}>
                <div className="newUserItem">
                    <label>Categorie</label>
                    <input
                        type="text"
                        name="CategorieName"
                        placeholder="Entrez la categorie"
                        value={formData.CategorieName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="newUserItem">
                    <label>Description</label>
                    <input
                        type="text"
                        name="CategorieDescription"
                        placeholder="Entrez la description"
                        value={formData.CategorieDescription}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="newUserItem">
                    <label>Capacite</label>
                    <input
                        type="text"
                        name="Capacity"
                        placeholder="Entrez la capacite"
                        value={formData.Capacity}
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
