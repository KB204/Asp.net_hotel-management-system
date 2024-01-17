import React, { useState, useEffect } from 'react';
import AuthService from '../../authService';
import { Alert } from "react-bootstrap";
import {
    MailOutline,
    PermIdentity,
    Publish,
} from "@material-ui/icons";
import './UserProfile.css';
import Loading from "../../components/loading/Loading";

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [alertMessage, setAlertMessage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await AuthService.getUserData();
                setUserData(data);
                setFormData({
                    name: data.name,
                    email: data.email,
                    role: data.role,
                });
                setIsLoading(false);
            } catch (error) {
                console.error('Fetch user data error:', error.message);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            
            await AuthService.updateUserInfo({
                name: formData.name,
                email: formData.email,
                role: formData.role,
            });

            
            const newData = await AuthService.getUserData();
            setUserData(newData);
            setAlertMessage({ variant: 'success', message: 'mise a jour des information avec succes' });
        } catch (error) {
            console.error('Update user information error:', error.message);
            setAlertMessage({ variant: 'danger', message: `Erreur lors de la mise à jour des informations: ${error.message}` });
        }
    };

    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Profil de L'utilisateur </h1>
            </div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="userContainer">
                    <div className="userShow">
                        <div className="userShowTop">
                            <img
                                alt=""
                                className="userShowImg"
                            />
                            <div className="userShowTopTitle">
                                <span className="userShowUsername">{userData.name}</span>
                            </div>
                        </div>
                        <div className="userShowBottom">
                            <span className="userShowTitle">Details du compte</span>
                            <div className="userShowInfo">
                                <PermIdentity className="userShowIcon" />
                                <span className="userShowInfoTitle">{userData.name}</span>
                            </div>
                            <div className="userShowInfo">
                                <PermIdentity className="userShowIcon" />
                                <span className="userShowInfoTitle">{userData.role}</span>
                            </div>
                            <span className="userShowTitle">Details du contact</span>
                            <div className="userShowInfo">
                                <MailOutline className="userShowIcon" />
                                <span className="userShowInfoTitle">{userData.email}</span>
                            </div>
                        </div>
                    </div>
                    <div className="userUpdate">
                        <span className="userUpdateTitle">Modifier Mes donnees</span>
                        {alertMessage && (
                            <Alert variant={alertMessage.variant} onClose={() => setAlertMessage(null)} dismissible>
                                {alertMessage.message}
                            </Alert>
                        )}
                        <form className="userUpdateForm" onSubmit={handleUpdate}>
                            <div className="userUpdateLeft">
                                <div className="userUpdateItem">
                                    <label>Nom et prenom</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder={userData.name}
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="userUpdateInput"
                                    />
                                </div>
                                <div className="userUpdateItem">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder={userData.email}
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="userUpdateInput"
                                    />
                                </div>
                                <div className="userUpdateItem">
                                    <label>Role</label>
                                    <input
                                        type="text"
                                        name="role"
                                        placeholder={userData.role}
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="userUpdateInput"
                                    />
                                </div>
                            </div>
                            <div className="userUpdateRight">
                                <div className="userUpdateUpload">
                                    <img
                                        className="userUpdateImg"
                                        src={userData.profilePicture || 'https://via.placeholder.com/150'}
                                        alt=""
                                    />
                                    <label htmlFor="file">
                                        <Publish className="userUpdateIcon" />
                                    </label>
                                    <input type="file" id="file" style={{ display: 'none' }} />
                                </div>
                                <button type="submit" className="userUpdateButton">
                                    Modifier
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );

};

export default UserProfile;
