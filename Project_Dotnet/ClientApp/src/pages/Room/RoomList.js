
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { useEffect, useState } from "react";

export default function RoomList() {
    const [rooms, setRooms] = useState([]);
    const [roomToDelete, setRoomToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7120/api/rooms', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
                }

                const data = await response.json();
                const clientsWithIds = data.map((client, index) => ({ ...client, id: index }));
                setRooms(clientsWithIds);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);



    const showDeleteConfirmation = () => {
        if (!roomToDelete) {
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete room number ${roomToDelete.roomNumber}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteConfirm();
            } else {
                setRoomToDelete(null);
            }
        });
    };

    const handleDelete = (user) => {
        setRoomToDelete(user);
        showDeleteConfirmation();
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(`https://localhost:7120/api/rooms/${roomToDelete.roomID}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
            }

            setRooms((prevUsers) => prevUsers.filter((u) => u.roomID !== roomToDelete.roomID));
            setRoomToDelete(null);
        } catch (error) {
            console.error('Error deleting user:', error.message);
        }
    };


    const columns = [
        { field: "categorieName", headerName: <strong>Categorie</strong>, width: 200 },
        { field: "roomNumber", headerName: <strong>Numero de la chambre</strong>, width: 300 },
        {
            field: "price",
            headerName: <strong>Prix nuitee</strong>,
            width: 200,
            renderCell: (params) => (
                <>
                    {params.value} DH
                </>
            ),
        },

        {
            field: "isAvailable",
            headerName: <strong>Status</strong>,
            width: 200,
            renderCell: (params) => (
                <span style={{ color: params.value ? 'green' : 'red' }}>
                    {params.value ? 'Disponible' : 'Non Disponible'}
                </span>
            ),
        },
        {
            field: "action",
            headerName: <strong>Action</strong>,
            width: 150,
            renderCell: (params) => (
                <>
                    <Link to={`/room/${params.row.roomID}`}>
                        <EditIcon className="userListEdit" />
                    </Link>

                    <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row)} />
                </>
            ),
        },
    ];



    return (
        <div className="userList" style={{ height: '550px' }}>
            <Link to="/newRoom">
                <button className="userAddButton">Ajouter</button>
            </Link>
            {isLoading ? (
                <Loading />
            ) : (
                <DataGrid
                    rows={rooms}
                    columns={columns}
                    pageSize={8}
                    checkboxSelection
                    rowsPerPageOptions={[8, 16, 24]}
                />
            )}
        </div>
    );

}
