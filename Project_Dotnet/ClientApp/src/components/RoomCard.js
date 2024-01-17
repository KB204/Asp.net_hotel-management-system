import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using axios for API calls

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField'; // Added for date inputs

export default function RoomCard({ room }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [facilities, setFacilities] = React.useState([]);
    const [selectedFacility, setSelectedFacility] = React.useState('');
    const [checkInDate, setCheckInDate] = React.useState('');
    const [checkOutDate, setCheckOutDate] = React.useState('');

    React.useEffect(() => {
        const fetchFacilities = async () => {
            try {
                const response = await fetch('https://localhost:7120/api/facilities');
                const data = await response.json();
                setFacilities(data);
            } catch (error) {
                console.error('Error fetching facilities:', error);
            }
        };

        fetchFacilities();
    }, []);

    const handleFacilityClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleFacilityClose = () => {
        setAnchorEl(null);
    };

    const handleFacilitySelect = (facility) => {
        setSelectedFacility(facility.facilitieID); // Use facility ID instead of name
        handleFacilityClose();
    };

    const handleBookNow = () => {
        const reservationData = {
            roomId: room.RoomNumber,
            checkInDate,
            checkOutDate,
            facilitieID: selectedFacility, // Send facility ID instead of name
        };

        // Make an API call to create the reservation using axios
        axios.post('https://localhost:7120/api/reservations', reservationData)
            .then((response) => {
                // Handle successful reservation
                console.log('Reservation created successfully:', response.data);
                alert('Reservation created successfully!');
            })
            .catch((error) => {
                // Handle reservation errors
                console.error('Error creating reservation:', error);
                alert('Error creating reservation!');
            });
    };

    return (
        <Card sx={{ maxWidth: 345, margin: '0 16px 16px 0' }}>
            <CardMedia
                component="img"
                alt="Room"
                height="140"
                image="images/category-img-2.jpg"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {room.RoomNumber}
                </Typography>
            </CardContent>
            <CardActions>
                <TextField
                    label="Check-in Date"
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                />
                <TextField
                    label="Check-out Date"
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                />
                <Button size="small" onClick={handleBookNow} disabled={!checkInDate || !checkOutDate}>
                    Book Now
                </Button>
                <Button size="small" onClick={handleFacilityClick}>
                    {selectedFacility || 'Facilities'}
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleFacilityClose}
                >
                    {facilities.map((facility) => (
                        <MenuItem key={facility.facilitieID} onClick={() => handleFacilitySelect(facility.facilitieName)}>
                            {facility.facilitieName}
                        </MenuItem>
                    ))}
                </Menu>
            </CardActions>
        </Card>
    );
}
