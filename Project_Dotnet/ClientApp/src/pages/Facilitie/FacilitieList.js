
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { useEffect, useState } from "react";

export default function FacilitieList() {
    const [facilities, setFacilities] = useState([]);
    const [facilitieToDelete, setFacilitieToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7120/api/facilities', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
                }

                const data = await response.json();
                const clientsWithIds = data.map((client, index) => ({ ...client, id: index }));
                setFacilities(clientsWithIds);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);



    const showDeleteConfirmation = () => {
        if (!facilitieToDelete) {
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete ${facilitieToDelete.facilitieName}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteConfirm();
            } else {
                setFacilitieToDelete(null);
            }
        });
    };

    const handleDelete = (user) => {
        setFacilitieToDelete(user);
        showDeleteConfirmation();
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(`https://localhost:7120/api/facilities/${facilitieToDelete.facilitieID}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
            }

            setFacilities((prevUsers) => prevUsers.filter((u) => u.facilitieID !== facilitieToDelete.facilitieID));
            setFacilitieToDelete(null);
        } catch (error) {
            console.error('Error deleting service:', error.message);
        }
    };


    const columns = [
        { field: "facilitieName", headerName: <strong>Equipement</strong>, width: 300 },

        { field: "facilitieDescription", headerName: <strong>Description</strong>, width: 300 },

        {
            field: "facilitiePrice",
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
                        <Link to={`/facilitie/${params.row.facilitieID}`}>
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
            <Link to="/newFacilitie">
                <button className="userAddButton">Ajouter</button>
            </Link>
            {isLoading ? (
                <Loading />
            ) : (
                <DataGrid
                    rows={facilities}
                    columns={columns}
                    pageSize={8}
                    checkboxSelection
                    rowsPerPageOptions={[8, 16, 24]}
                />
            )}
        </div>
    );

}
