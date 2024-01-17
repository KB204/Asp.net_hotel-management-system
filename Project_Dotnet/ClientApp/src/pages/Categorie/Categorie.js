import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import Loading from "../../components/loading/Loading";
import { useParams } from "react-router-dom";

export default function Categorie() {
    const { categorieId } = useParams();
    const [formData, setFormData] = useState({
        CategorieName: "",
        CategorieDescription: "",
        Capacity: "",
    });

    const [alertMessage, setAlertMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const fetchClientData = async () => {
            try {
                const response = await fetch(`https://localhost:7120/api/categories/${categorieId}`, {
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
                setAlertMessage({ variant: "danger", message: `Error fetching categorie data: ${error.message}` });
            }
        };

        fetchClientData();
    }, [categorieId]);

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
            const response = await fetch(`https://localhost:7120/api/categories/${categorieId}`, {
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

            setAlertMessage({ variant: "success", message: "Categorie modifier avec succes!" });
        } catch (error) {
            setAlertMessage({ variant: "danger", message: `Erreur lors de la modification du categorie: ${error.message}` });
        }
    };

    const handleAlertClose = () => {
        setAlertMessage(null);
    };

    return (
        <div className="updateUser">
            <h1 className="updateUserTitle">Modifier Categorie</h1>
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
                        <label>Categorie</label>
                        <input
                            type="text"
                            name="categorieName"
                            value={formData.categorieName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="updateUserItem">
                        <label>Description</label>
                        <input
                            type="text"
                            name="categorieDescription"
                            value={formData.categorieDescription}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="updateUserItem">
                        <label>Capacity</label>
                        <input
                            type="text"
                            name="capacity"
                            value={formData.capacity}
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
