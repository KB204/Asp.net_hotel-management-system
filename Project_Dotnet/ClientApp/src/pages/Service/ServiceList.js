
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { useEffect, useState } from "react";

export default function ServiceList() {
    const [services, setServices] = useState([]);
    const [serviceToDelete, setServiceToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7120/api/services', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
                }

                const data = await response.json();
                const clientsWithIds = data.map((client, index) => ({ ...client, id: index }));
                setServices(clientsWithIds);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);



    const showDeleteConfirmation = () => {
        if (!serviceToDelete) {
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete service ${serviceToDelete.serviceName}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteConfirm();
            } else {
                setServiceToDelete(null);
            }
        });
    };

    const handleDelete = (user) => {
        setServiceToDelete(user);
        showDeleteConfirmation();
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(`https://localhost:7120/api/services/${serviceToDelete.serviceID}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
            }

            setServices((prevUsers) => prevUsers.filter((u) => u.serviceID !== serviceToDelete.serviceID));
            setServiceToDelete(null);
        } catch (error) {
            console.error('Error deleting service:', error.message);
        }
    };


    const columns = [
        { field: "serviceName", headerName: <strong>Service</strong>, width: 300 },

        { field: "serviceDescription", headerName: <strong>Description</strong>, width: 300 },

        {
            field: "price",
            headerName: <strong>Prix</strong>,
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
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/service/${params.row.serviceID}`}>
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
            <Link to="/newService">
                <button className="userAddButton">Ajouter</button>
            </Link>
            {isLoading ? (
                <Loading />
            ) : (
                <DataGrid
                    rows={services}
                    columns={columns}
                    pageSize={8}
                    checkboxSelection
                    rowsPerPageOptions={[8, 16, 24]}
                />
            )}
        </div>
    );

}
