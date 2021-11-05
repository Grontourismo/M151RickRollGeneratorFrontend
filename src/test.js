import "./showPrankStyle.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Chart } from "react-google-charts";

export const Test = () => {

    return (
        <div>
            <h1>dsjfkjdskfdsf</h1>
            <Chart
                width={'600px'}
                height={'400px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Task', 'Rick Rolled people from countries'],
                    ['Schweiz', 11],
                    ['Deutschland', 2],
                    ['Österrecih', 2],
                    ['Russland', 2],
                    ['USA', 7],
                ]}
                options={{
                    title: 'My Daily Activities',
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    );
}