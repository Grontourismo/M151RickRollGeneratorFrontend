import rickRollImage from "./lib/image/rick.gif"
import "./app.css"
import config from "./lib/config";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import axios from "axios";


export const ShowPrank = () => {
    const title = useParams();
    const prankUID = useParams();
    const [prank, setPrank] = useState([]);
    const [countryName, setCountryName] = useState([]);

    useEffect(() => {
        fetch(config.apiEndpoint + "/prank",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "GET",
                body: "{" +
                    "uid:" + prankUID +
                    "}"
            })
            .then(res => res.json())
            .then(json => setPrank(json));

        axios.get('https://ipapi.co/json/').then((response) => {
            let data = response.data;
            setCountryName(data.country_name);
        }).catch((error) => {
            console.log(error);
        });

        if (prank.active) {
            fetch(config.apiEndpoint + "/prank/clicked/" + prankUID,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST"
                }).then(r => console.log(r));

            fetch(config.apiEndpoint + "/stat/" + prankUID,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: "{" +
                        "country:" + countryName +
                        "count:" + 1 +
                        "}"
                })
                .then(res => console.log(res));
            window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        }
    });

    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={prank.description}/>
                <meta name="image" content={prank.imageURL}/>
            </Helmet>
            <br/>
            <br/>
            <p>Site is not active at the moment!</p>
            <p>Click this Link to redirect to site: <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Link</a></p>
        </div>
    );
}