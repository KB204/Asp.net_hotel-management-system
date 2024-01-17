import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import Loading from "../../components/loading/Loading";
import { useParams } from "react-router-dom";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
export default function Room() {
    const { roomId } = useParams();
    const [formData, setFormData] = useState({
        categorieName: "",
        roomNumber: "",
        price: "",
        isAvailable: false,
    });

    const [categories, setCategories] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const fetchCategories = async () => {
            try {
                const response = await fetch("https://localhost:7120/api/categories");
                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
                }
                const categoriesData = await response.json();
                setCategories(categoriesData);
            } catch (error) {
                console.error(`Error fetching categories: ${error.message}`);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {

        const fetchClientData = async () => {
            try {
                const response = await fetch(`https://localhost:7120/api/rooms/${roomId}`, {
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
                setAlertMessage({ variant: "danger", message: `Error fetching room data: ${error.message}` });
            }
        };

        fetchClientData();
    }, [roomId]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://localhost:7120/api/rooms/${roomId}`, {
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

            setAlertMessage({ variant: "success", message: "chambre modifier avec succes!" });
        } catch (error) {
            setAlertMessage({ variant: "danger", message: `Erreur lors de la modification de la chambre: ${error.message}` });
        }
    };

    const handleAlertClose = () => {
        setAlertMessage(null);
    };

    return (
        <div className="updateUser">
            <h1 className="updateUserTitle">Modifier La Chambre</h1>
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
                            <select
                                name="categorieName"
                                value={formData.categorieName}
                                onChange={handleChange}
                                required
                            >
                                
                                {categories.map((category) => (
                                    <option key={category.categorieID} value={category.categorieName}>
                                        {category.categorieName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="updateUserItem">
                            <label>Numero de la chambre</label>
                            <input
                                type="text"
                                name="roomNumber"
                                value={formData.roomNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="updateUserItem">
                            <label>Prix nuitee</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="updateUserItem">
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Status</FormLabel>
                                <RadioGroup
                                    aria-label="Status"
                                    name="status"
                                    value={formData.isAvailable ? "disponible" : "non-disponible"}
                                    onChange={(e) => setFormData((prevData) => ({
                                        ...prevData,
                                        isAvailable: e.target.value === "disponible",
                                    }))}
                                >
                                    <FormControlLabel value="disponible" control={<Radio />} label="Disponible" />
                                    <FormControlLabel value="non-disponible" control={<Radio />} label="Non Disponible" />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <button type="submit" className="updateUserButton">
                            Modifier
                        </button>
                    </form>
            )}
        </div>
    );

}
