import "./showPrankStyle.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Chart } from "react-google-charts";
import {useEffect, useState} from "react";
import axios from "axios";

export const Test = () => {

    const [countryName, setCountryName] = useState([]);

    useEffect(() => {
        const getGeoInfo = () => {
            axios.get('https://ipapi.co/json/').then((response) => {
                let data = response.data;
                setCountryName(data.country_name);
            }).catch((error) => {
                console.log(error);
            });
        };
        getGeoInfo();
    })

    return (
        <div>
            <h1>dsjfkjdskfdsf</h1>
            <p>{countryName}</p>
        </div>
    );
}