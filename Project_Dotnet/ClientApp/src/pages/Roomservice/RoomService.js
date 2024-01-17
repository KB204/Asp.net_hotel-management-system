import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import InfoIcon from '@mui/icons-material/Info';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { Modal, Box, Typography, Button } from "@mui/material";

export default function RoomService() {
    const [roomservice, setRoomservice] = useState([]);
    const [roomserviceToDelete, setRoomserviceToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://localhost:7120/api/roomservices', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
            }

            const data = await response.json();
            const clientsWithIds = data.map((client, index) => ({ ...client, id: index }));
            setRoomservice(clientsWithIds);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    const showDeleteConfirmation = () => {
        if (!roomserviceToDelete) {
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete ${roomserviceToDelete.serviceName} for room number ${roomserviceToDelete.roomNumber} `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteConfirm();
            } else {
                setRoomserviceToDelete(null);
            }
        });
    };

    const handleDelete = (user) => {
        setRoomserviceToDelete(user);
        showDeleteConfirmation();
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(`https://localhost:7120/api/roomservices/${roomserviceToDelete.roomID}/${roomserviceToDelete.serviceID}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
            }

            setRoomservice((prevUsers) => prevUsers.filter((u) => u.roomID !== roomserviceToDelete.roomID && u.serviceID !== roomserviceToDelete.serviceID));
            setRoomserviceToDelete(null);
        } catch (error) {
            console.error('Error deleting room service:', error.message);
        }
    };

    const handleOpenModal = (room) => {
        setSelectedRoom(room);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedRoom(null);
        setOpenModal(false);
    };

    const columns = [
        { field: "roomNumber", headerName: <strong>Numero de la Chambre</strong>, width: 400 },
        { field: "serviceName", headerName: <strong>Service</strong>, width: 400 },
        {
            field: "action",
            headerName: <strong>Action</strong>,
            width: 150,
            renderCell: (params) => (
                <>
                    <InfoIcon className="userListInfo" onClick={() => handleOpenModal(params.row)} />
                    <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row)} />
                </>
            ),
        },
    ];

    const yourModalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className="userList" style={{ height: '550px' }}>
            <Link to="/newRoomService">
                <button className="userAddButton">Ajouter</button>
            </Link>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <DataGrid
                        rows={roomservice}
                        columns={columns}
                        pageSize={8}
                        checkboxSelection
                        rowsPerPageOptions={[8, 16, 24]}
                    />
                        <Modal
                            open={openModal}
                            onClose={handleCloseModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{ ...yourModalStyle }}>
                                {selectedRoom && (
                                    <>
                                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: 2, textAlign: 'center', }}>
                                            <strong>Chambre Numero:</strong> {selectedRoom.roomNumber}
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ marginBottom: 2 }}>
                                            <strong>Services associes:</strong>
                                            {roomservice
                                                .filter((service) => service.roomID === selectedRoom.roomID)
                                                .map((service) => (
                                                    <div key={service.serviceID}>- {service.serviceName}</div>
                                                ))}
                                        </Typography>

                                        <Button onClick={handleCloseModal} variant="contained" color="primary">
                                            Fermer
                                        </Button>
                                    </>
                                )}
                            </Box>
                        </Modal>
                </>
            )}
        </div>
    );
}
