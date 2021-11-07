import "./showPrankStyle.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import {useEffect, useState} from "react";
import config from "./lib/config";
import {useParams} from "react-router-dom";
import {map} from "react-bootstrap/ElementChildren";
import {Chart} from "react-google-charts";

export const ShowPrankData = () => {
    const [prank, setPrank] = useState([]);
    const [prankStat, setPrankStat] = useState([]);
    const prankUID = useParams();

    useEffect(() => {
        fetch(config.apiEndpoint + "/prank/" + prankUID,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "GET",
            })
            .then(res => res.json())
            .then(json => setPrank(json));

        fetch(config.apiEndpoint + "/stat/" + prankUID,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "GET",
            })
            .then(res => res.json())
            .then(json => setPrankStat(json));
    })

    function getChartData(item) {
        let array = [['Task', 'Rick Rolled people from countries']];
        item.map(stat => {
            array.push([stat.country, stat.count]);
        });
        return array;
    }

    return (
        <div className="dataContainer">
            <h2>
                Here's the link:
            </h2>
            <p>{window.location.origin + item.title + "/" + item.uid}</p>
            <br/>
            <br/>
            <h2>Statistics</h2>
            <br/>
            <div className="row">
                <div className="col-sm-6">
                    <h3>From which country</h3>
                    <Chart
                        width={'600px'}
                        height={'400px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={getChartData(prankStat)}
                        options={{
                            title: 'Rick Rolled people from countries',
                        }}
                        rootProps={{'data-testid': '1'}}
                    />
                </div>
                <div className="col-sm-6">
                    <h3>You have rick rolled this many people</h3>
                    <h4>{item.count}</h4>
                </div>
            </div>
        </div>
    );
}