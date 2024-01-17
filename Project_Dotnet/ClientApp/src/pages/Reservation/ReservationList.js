
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { useEffect, useState } from "react";

export default function ReservationList() {
    const [reservations, setReservations] = useState([]);
    const [reservationToDelete, setReservationToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7120/api/reservations', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
                }

                const data = await response.json();
                const clientsWithIds = data.map((client, index) => ({ ...client, id: index }));
                setReservations(clientsWithIds);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);



    const showDeleteConfirmation = () => {
        if (!reservationToDelete) {
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete reservation that belongs to client ${reservationToDelete.nom} with the room number ${reservationToDelete.roomNumber}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteConfirm();
            } else {
                setReservationToDelete(null);
            }
        });
    };

    const handleDelete = (user) => {
        setReservationToDelete(user);
        showDeleteConfirmation();
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(`https://localhost:7120/api/reservations/${reservationToDelete.reservationID}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
            }

            setReservations((prevUsers) => prevUsers.filter((u) => u.reservationID !== reservationToDelete.reservationID));
            setReservationToDelete(null);
        } catch (error) {
            console.error('Error deleting user:', error.message);
        }
    };


    const columns = [
        { field: "nom", headerName: <strong>Client</strong>, width: 200 },
        { field: "roomNumber", headerName: <strong>Numero de la chambre</strong>, width: 300 },
        { field: "facilitieName", headerName: <strong>Equipement</strong>, width: 200, valueGetter: (params) => params.row.facilitieName || "aucun" },
        { field: "checkInDate", headerName: <strong>Date d'arrivee</strong>, width: 200 },
        { field: "checkOutDate", headerName: <strong>Date de depart</strong>, width: 200 },
        {
            field: "totalAmount",
            headerName: <strong>Montant total</strong>,
            width: 200,
            renderCell: (params) => (
                <>
                    {params.value} DH
                </>
            ),
        },

        {
            field: "action",
            headerName: <strong>Action</strong>,
            width: 150,
            renderCell: (params) => (
                <>
                    <Link to={`/reservation/${params.row.reservationID}`}>
                        <EditIcon className="userListEdit" />
                    </Link>

                    <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row)} />
                </>
            ),
        },
    ];



    return (
        <div className="userList" style={{ height: '550px' }}>
            <Link to="/newReservation">
                <button className="userAddButton">Ajouter</button>
            </Link>
            {isLoading ? (
                <Loading />
            ) : (
                <DataGrid
                    rows={reservations}
                    columns={columns}
                    pageSize={8}
                    checkboxSelection
                    rowsPerPageOptions={[8, 16, 24]}
                />
            )}
        </div>
    );

}
