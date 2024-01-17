import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import NavMenu from './components/Navmenu/NavMenu';
import SideBar from './components/Sidebar/SideBar';
import Home from "./pages/Home/Home";
import ClientList from "./pages/Client/ClientList";
import Client from "./pages/Client/Client";
import NewClient from "./pages/Client/NewClient";
import CategorieList from "./pages/Categorie/CategorieList";
import NewCategorie from "./pages/Categorie/NewCategorie";
import Categorie from "./pages/Categorie/Categorie";
import RoomList from './pages/Room/RoomList';
import NewRoom from './pages/Room/NewRoom';
import Room from './pages/Room/Room';
import ServiceList from './pages/Service/ServiceList';
import NewService from './pages/Service/NewService';
import Service from './pages/Service/Service';
import RoomService from './pages/Roomservice/RoomService';
import NewRoomService from './pages/Roomservice/NewRoomService';
import UpdateRs from './pages/Roomservice/UpdateRs';
import FacilitieList from './pages/Facilitie/FacilitieList';
import NewFacilitie from './pages/Facilitie/NewFacilitie';
import Facilitie from './pages/Facilitie/Facilitie';
import ReservationList from './pages/Reservation/ReservationList';
import NewReservation from './pages/Reservation/NewReservation';
import Reservation from './pages/Reservation/Reservation';
import LoginForm from './components/Login/LoginForm';
import UserProfile from './pages/Profile/UserProfile';
import RegisterUser from './pages/Register/RegisterUser';
import './custom.css';

const AuthContext = createContext();

function Layout({ children }) {
    return (
        <div>
            <NavMenu />
            <div className="container">
                <SideBar />
                {children}
            </div>
        </div>
    );
}

function App() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('token') !== null;
        setAuthenticated(isAuthenticated);
    }, []);

    const navigate = useNavigate();

    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated, navigate }}>
            <Routes>
                <Route
                    path="/"
                    element={<AuthenticatedRoute />}
                >
                    <Route index element={<Layout><Home /></Layout>} />
                    <Route path="/clients" element={<Layout><ClientList /></Layout>} />
                    <Route path="/client/:clientId" element={<Layout><Client /></Layout>} />
                    <Route path="/newClient" element={<Layout><NewClient /></Layout>} />
                    <Route path="/categories" element={<Layout><CategorieList /></Layout>} />
                    <Route path="/newCategorie" element={<Layout><NewCategorie /></Layout>} />
                    <Route path="/categorie/:categorieId" element={<Layout><Categorie /></Layout>} />
                    <Route path="/rooms" element={<Layout><RoomList /></Layout>} />
                    <Route path="/newRoom" element={<Layout><NewRoom /></Layout>} />
                    <Route path="/room/:roomId" element={<Layout><Room /></Layout>} />
                    <Route path="/services" element={<Layout><ServiceList /></Layout>} />
                    <Route path="/newService" element={<Layout><NewService /></Layout>} />
                    <Route path="/service/:serviceId" element={<Layout><Service /></Layout>} />
                    <Route path="/Roomservices" element={<Layout><RoomService /></Layout>} />
                    <Route path="/newRoomService" element={<Layout><NewRoomService /></Layout>} />
                    <Route path="/roomservice/:roomServiceId" element={<Layout><UpdateRs /></Layout>} />
                    <Route path="/Facilities" element={<Layout><FacilitieList /></Layout>} />
                    <Route path="/newFacilitie" element={<Layout><NewFacilitie /></Layout>} />
                    <Route path="/facilitie/:facilitieId" element={<Layout><Facilitie /></Layout>} />
                    <Route path="/Reservations" element={<Layout><ReservationList /></Layout>} />
                    <Route path="/newReservation" element={<Layout><NewReservation /></Layout>} />
                    <Route path="/reservation/:reservationId" element={<Layout><Reservation /></Layout>} />
                    <Route path="/profile" element={<Layout><UserProfile /></Layout>} />
                    <Route path="/register" element={<Layout><RegisterUser /></Layout>} />
                </Route>
                <Route path="/login" element={<LoginForm setAuthenticated={setAuthenticated} />} />
            </Routes>
        </AuthContext.Provider>
    );
}

function AuthenticatedRoute({ children }) {
    const { authenticated } = useContext(AuthContext);

    return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default App;
