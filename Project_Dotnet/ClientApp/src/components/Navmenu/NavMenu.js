import React from "react";
import "./NavMenu.css";
import { NotificationsNone, Language } from "@material-ui/icons";
import AccountMenu from "../Accountmenu/AccountMenu";

export default function NavMenu() {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">Riad Royal</span>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language />
                        <span className="topIconBadge">2</span>
                    </div>
                    <AccountMenu />
                </div>
            </div>
        </div>
    );
}