import "./FeaturedInfo.css";
import { ArrowUpward } from "@material-ui/icons";
import React, { useEffect, useState } from "react";

export default function FeaturedInfo() {
    const [totalGain, setTotalGain] = useState(0);
    const [mostReservedCategory, setMostReservedCategory] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const totalGainResponse = await fetch("https://localhost:7120/api/reservations/total-gain");

                if (!totalGainResponse.ok) {
                    throw new Error("Failed to fetch total gain");
                }

                const totalGainData = await totalGainResponse.json();
                setTotalGain(totalGainData);

                
                const mostReservedCategoryResponse = await fetch("https://localhost:7120/api/reservations/most-reserved-category");

                if (!mostReservedCategoryResponse.ok) {
                    throw new Error("Failed to fetch most reserved category");
                }

                const mostReservedCategoryData = await mostReservedCategoryResponse.json();
                setMostReservedCategory(mostReservedCategoryData);

            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Total de l'annee</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{totalGain.toFixed(2)}DH</span>
                    <ArrowUpward className="featuredIcon" />
                </div>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle">Categorie la plus Reservee</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{mostReservedCategory && mostReservedCategory.categoryName}</span>
                    <ArrowUpward className="featuredIcon" />
                </div>
            </div>

        </div>
    );
}
