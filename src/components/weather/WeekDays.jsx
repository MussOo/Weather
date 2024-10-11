import { getWeek } from "@/api/weather";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
     
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

let week_days = ["LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI", "DIMANCHE"];



export default function Today({ city_name, coor }) {
    const [chartData, setChartData] = useState([]);
    const [chartDiv, setChartDiv] = useState(null);


    useEffect(() => {
        getWeek(coor.lat, coor.lon)
        .then((response) => {
            
            if(response.data.timelines){
                let time_format = []
                let temp_format = []
                for(let i = 0; i < response.data.timelines[0].intervals.length; i++){
                    let temp = response.data.timelines[0].intervals[i].values.temperature;
                    let time = response.data.timelines[0].intervals[i].startTime;
                    let date = new Date(time);
                    let day = date.getDate();
                    let month = date.getMonth();
                    let year = date.getFullYear();
                    let day_of_week = week_days[date.getDay()];

                    let date_formated = `${day}/${month}/${year} (${day_of_week})`;

                    console.log(date_formated);
                    time_format.push(date_formated);
                    temp_format.push(temp);
                    
                }
                let div = (
                    <Line 
                    data={{
                      labels: time_format,
                      datasets: [
                        {
                          label: "Temperature",
                          data: temp_format,
                          fill: true,
                          backgroundColor: "rgba(75,192,192,0.2)",
                          borderColor: "rgba(1, 22, 39, 1)",
                          borderWidth: 2
                        }
                      ]
                    }} />
                )
                setChartDiv(div);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }, [coor]);


    return (
        <div>
            <div className="w-full h-96  flex justify-center items-center">
              {
                chartDiv ? (
                  chartDiv
                ) : (
                  <p>Loading...</p> 
                )
              }
            </div>
        </div>
    );
}