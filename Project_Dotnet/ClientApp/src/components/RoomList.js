import React, { useState, useEffect } from 'react';
import RoomCard from './RoomCard';
import './RoomList.css';

const RoomList = ({ category }) => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRooms = async () => {
        try {
            const response = await fetch(`https://localhost:7120/api/rooms/category/${category}`);
            const data = await response.json();

            // Check if data is an array or has a property that contains an array
            const roomsArray = Array.isArray(data) ? data : data["$values"] || [];

            // Resolve references and fetch complete room objects
            const resolvedRooms = await Promise.all(
                roomsArray.map(async (room) => {
                    if (room.$ref) {
                        try {
                            // Fetch the referenced room and replace the reference with the actual room
                            const refResponse = await fetch(`https://localhost:7120/api/rooms/${room.$ref}`);
                            return await refResponse.json();
                        } catch (error) {
                            console.error(`Error fetching room by reference ${room.$ref}:`, error);
                            return null; // Handle fetch error by returning null
                        }
                    }
                    return room;
                })
            );

            // Filter out null values (rooms that couldn't be fetched)
            const validRooms = resolvedRooms.filter((room) => room !== null);

            setRooms(validRooms);
        } catch (error) {
            console.error('Error fetching room data:', error);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchRooms();
    }, [category]);

    return (
        <div className="cards">
            <h1>Available Rooms</h1>
            <div className="cards__container">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="cards_wrapper">
                        {rooms.map((room, index) => (
                            <RoomCard
                                key={
                                    room.RoomID && room.RoomNumber
                                        ? `${room.RoomID}_${room.RoomNumber}`
                                        : room.id ? `default-key_${room.id}` : `fallback-key-${index}`
                                }
                                room={room}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoomList;
