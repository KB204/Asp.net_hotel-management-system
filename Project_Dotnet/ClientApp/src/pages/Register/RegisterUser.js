import { useState } from "react";
import { Alert } from "react-bootstrap";
import AuthService from '../../authService';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "./RegisterUser.css";
export default function RegisterUser() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        passwordHash: '',
        confirmPassword: '',
        role: '',
    });

    const [alertMessage, setAlertMessage] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.passwordHash !== formData.confirmPassword) {
            setAlertMessage({ variant: "danger", message: "Les mots de passe ne correspondent pas." });
            return;
        }

        try {
            
            await AuthService.register(formData.nom, formData.email, formData.passwordHash, formData.role);

            setAlertMessage({ variant: "success", message: "Utilisateur cree avec succes!" });

            setFormData({
                nom: '',
                email: '',
                passwordHash: '',
                confirmPassword: '',
                role: '',
            });
        } catch (error) {
            setAlertMessage({ variant: "danger", message: `Erreur lors de la creation de l utilisateur: ${error.message}` });
        }
    };


    const handleAlertClose = () => {
        setAlertMessage(null);
    };

    return (
        <div className="newUser">
            <h1 className="newUserTitle">Nouveau Utilisateur</h1>
            {alertMessage && (
                <Alert variant={alertMessage.variant} onClose={handleAlertClose} dismissible>
                    {alertMessage.message}
                </Alert>
            )}
            
            <form className="newUserForm" onSubmit={handleSubmit}>
                

                <div className="newUserItem">
                    <label>Nom et Prenom</label>
                    <input
                        type="text"
                        name="nom"
                        placeholder="Entrez le nom et prenom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="newUserItem">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Entrez l'adresse e-mail"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="newUserItem">
                    <label>Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selectionnez un Role</option>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>

            
                <div className="newUserItem">
                    <label>Mot de passe</label>
                    <div className="passwordInputContainer">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            name="passwordHash"
                            placeholder="Entrez le mot de passe"
                            value={formData.passwordHash}
                            onChange={handleChange}
                            required
                        />
                        <IconButton
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            size="small"
                            aria-label="toggle password visibility"
                        >
                            {passwordVisible ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </div>
                </div>

                <div className="newUserItem">
                    <label>Confirmer Mot de passe</label>
                    <div className="passwordInputContainer">
                        <input
                            type={confirmPasswordVisible ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirmer le mot de passe"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <IconButton
                            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                            size="small"
                            aria-label="toggle confirm password visibility"
                        >
                            {confirmPasswordVisible ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </div>
                </div>

                <button type="submit" className="newUserButton">
                    Create
                </button>
                </form>
            
        </div>
    );
}
