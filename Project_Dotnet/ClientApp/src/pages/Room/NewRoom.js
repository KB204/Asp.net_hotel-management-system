import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";

export default function NewRoom() {
    const [formData, setFormData] = useState({
        categorieName: "",
        roomNumber: "",
        price: "",
        isAvailable: false,
    });

    const [categories, setCategories] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://localhost:7120/api/rooms", {
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

            setAlertMessage({ variant: "success", message: "Chambre cree avec succes!" });

            setFormData({
                categorieName: "",
                roomNumber: "",
                price: "",
                isAvailable: false,
            });
        } catch (error) {
            setAlertMessage({ variant: "danger", message: `Erreur lors de la creation de la chambre: ${error.message}` });
        }
    };



    const handleAlertClose = () => {
        setAlertMessage(null);
    };

    return (
        <div className="newUser">
            <h1 className="newUserTitle">Nouvelle Chambre</h1>
            {alertMessage && (
                <Alert variant={alertMessage.variant} onClose={handleAlertClose} dismissible>
                    {alertMessage.message}
                </Alert>
            )}
            <form className="newUserForm" onSubmit={handleSubmit}>
                <div className="newUserItem">
                    <label>Categorie</label>
                    <select
                        name="categorieName"
                        value={formData.categorieName}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selectionnez une categorie</option>
                        {categories.map((category) => (
                            <option key={category.categorieID} value={category.categorieName}>
                                {category.categorieName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="newUserItem">
                    <label>Numero de la chambre</label>
                    <input
                        type="text"
                        name="roomNumber"
                        placeholder="Entrez le numero de la chambre"
                        value={formData.roomNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="newUserItem">
                    <label>Prix nuitee</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Entrez le prix de la nuitee"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="newUserItem">
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

                <button type="submit" className="newUserButton">
                    Create
                </button>
            </form>
        </div>
    );
}