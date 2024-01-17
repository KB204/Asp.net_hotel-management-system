import "./ClientList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { useEffect, useState } from "react";

export default function ClientList() {
    const [clients, setClients] = useState([]);
    const [clientToDelete, setClientToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7120/api/clients', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
                }

                const data = await response.json();
                const clientsWithIds = data.map((client, index) => ({ ...client, id: index }));
                setClients(clientsWithIds);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);



    const showDeleteConfirmation = () => {
        if (!clientToDelete) {
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete client ${clientToDelete.nom}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteConfirm();
            } else {
                setClientToDelete(null);
            }
        });
    };

    const handleDelete = (user) => {
        setClientToDelete(user);
        showDeleteConfirmation();
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(`https://localhost:7120/api/clients/${clientToDelete.clientID}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
            }

            setClients((prevUsers) => prevUsers.filter((u) => u.clientID !== clientToDelete.clientID));
            setClientToDelete(null);
        } catch (error) {
            console.error('Error deleting user:', error.message);
        }
    };


    const columns = [
        { field: "cin", headerName: <strong>Cin</strong>, width: 200 },

        { field: "nom", headerName: <strong>Client</strong>, width: 200 },

        {
            field: "email", headerName: <strong>Email</strong>, width: 200
        },

        {
            field: "telephone", headerName: <strong>Telephone</strong>, width: 200 },

        {
            field: "addresse", headerName: <strong>Addresse</strong>, width: 200 },
        {
            field: "action",
            headerName: <strong>Action</strong>,
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/client/${params.row.clientID}`}>
                            <EditIcon className="userListEdit" />
                        </Link>

                        <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row)} />
                    </>
                );
            },
        },
    ];


    return (
        <div className="userList" style={{ height: '550px' }}>
            <Link to="/newClient">
                <button className="userAddButton">Ajouter</button>
            </Link>
            {isLoading ? (
                <Loading />
            ) : (
                <DataGrid
                    rows={clients}
                    columns={columns}
                    pageSize={8}
                    checkboxSelection
                    rowsPerPageOptions={[8, 16, 24]}
                />
            )}
        </div>
    );

}
