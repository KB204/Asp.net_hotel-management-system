import "./SideBar.css";
import {
    LineStyle,
    PermIdentity,
    Storefront,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import BedIcon from '@mui/icons-material/Bed';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import ListAltIcon from '@mui/icons-material/ListAlt';
export default function SideBar() {

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/" className="link">
                            <li className="sidebarListItem active">
                                <LineStyle className="sidebarIcon" />
                                Home
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <Link to="/clients" className="link">
                            <li className="sidebarListItem">
                                <PermIdentity className="sidebarIcon" />
                                Clients
                            </li>
                        </Link>
                        <Link to="/categories" className="link">
                            <li className="sidebarListItem">
                                <Storefront className="sidebarIcon" />
                                Categories
                            </li>
                        </Link>
                        <Link to="/rooms" className="link">
                           <li className="sidebarListItem">
                              <BedIcon className="sidebarIcon" />
                              Chambres
                            </li>
                        </Link>
                        <Link to="/services" className="link">
                            <li className="sidebarListItem">
                                <DryCleaningIcon className="sidebarIcon" />
                                Services
                            </li>
                        </Link>
                        <Link to="/Roomservices" className="link">
                            <li className="sidebarListItem">
                                <RoomServiceIcon className="sidebarIcon" />
                                Room Services
                            </li>
                        </Link>
                        <Link to="/Facilities" className="link">
                            <li className="sidebarListItem">
                                <SelfImprovementIcon className="sidebarIcon" />
                                Equipements
                            </li>
                        </Link>
                        <Link to="/Reservations" className="link">
                            <li className="sidebarListItem">
                                <ListAltIcon className="sidebarIcon" />
                                Reservations
                            </li>
                        </Link>
                    </ul>
                </div>
                
            </div>
        </div>
    );
}