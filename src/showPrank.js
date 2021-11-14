import "./app.css"
import config from "./lib/config";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import axios from "axios";


export const ShowPrank = () => {
    const params = useParams();
    const [prank, setPrank] = useState([]);
    const [countryName, setCountryName] = useState([]);

    useEffect(() => {
        console.log("sjdkjfksdjf")
        fetch(config.apiEndpoint + "/prank/" + params.prankUID,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "GET"
            })
            .then(res => res.json())
            .then(json => setPrank(json)).catch((error) => {
            console.log(error)
        });
    }, []);

    useEffect(() => {
        console.log(prank)
        if (prank.active) {
            fetch(config.apiEndpoint + "/prank/clicked/" + params.prankUID,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST"
                }).then(r => console.log(r)).catch((error) => {
                console.log(error)
            });

            axios.get('https://ipapi.co/json/').then((response) => {
                let data = response.data;
                setCountryName(data.country_name);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [prank])

    useEffect(() => {
        const statBody = JSON.stringify({"country": countryName, "count": 1})
        console.log(statBody)
        fetch(config.apiEndpoint + "/stat/" + prank.id,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: statBody
            })
            .then(res => console.log(res))
            .catch((error) => {
                console.log(error)
            });

        setTimeout(() => {
            window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        }, 300)
    }, [countryName])

    return (
        <div>
            <Helmet>
                <title>{params.title}</title>
                <meta name="description" content={prank.description}/>
                <meta name="image" content={prank.imageURL}/>
                <link rel="icon" href={prank.imageURL} />
            </Helmet>
            <br/>
            <br/>
            <p>Site is not active at the moment!</p>
            <p>Click this Link to redirect to site: <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Link</a></p>
        </div>
    );
}