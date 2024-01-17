
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { useEffect, useState } from "react";

export default function CategorieList() {
    const [categories, setCategories] = useState([]);
    const [categorieToDelete, setCategorieToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7120/api/categories', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
                }

                const data = await response.json();
                const clientsWithIds = data.map((client, index) => ({ ...client, id: index }));
                setCategories(clientsWithIds);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);



    const showDeleteConfirmation = () => {
        if (!categorieToDelete) {
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete category ${categorieToDelete.categorieName}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteConfirm();
            } else {
                setCategorieToDelete(null);
            }
        });
    };

    const handleDelete = (user) => {
        setCategorieToDelete(user);
        showDeleteConfirmation();
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(`https://localhost:7120/api/categories/${categorieToDelete.categorieID}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status} (${response.statusText})`);
            }

            setCategories((prevUsers) => prevUsers.filter((u) => u.categorieID !== categorieToDelete.categorieID));
            setCategorieToDelete(null);
        } catch (error) {
            console.error('Error deleting categorie:', error.message);
        }
    };


    const columns = [
        { field: "categorieName", headerName: <strong>Categorie</strong>, width: 300 },

        { field: "categorieDescription", headerName: <strong>Description</strong>, width: 300 },

        {
            field: "capacity", headerName: <strong>Capacite</strong>, width: 300
        },
        {
            field: "action",
            headerName: <strong>Action</strong>,
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/categorie/${params.row.categorieID}`}>
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
            <Link to="/newCategorie">
                <button className="userAddButton">Ajouter</button>
            </Link>
            {isLoading ? (
                <Loading />
            ) : (
                <DataGrid
                    rows={categories}
                    columns={columns}
                    pageSize={8}
                    checkboxSelection
                    rowsPerPageOptions={[8, 16, 24]}
                />
            )}
        </div>
    );

}
