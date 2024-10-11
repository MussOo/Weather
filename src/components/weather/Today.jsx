import { getToday } from "@/api/weather";
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
  
export default function Today({ city_name, coor }) {
    const [chartData, setChartData] = useState([]);
    const [chartDiv, setChartDiv] = useState(null);


    useEffect(() => {
        getToday(coor.lat, coor.lon)
        .then((response) => {
            if(response.hourly){
                console.log(response.hourly);
                let time = response.hourly.time;
                let temp = response.hourly.temperature_2m
                let time_format = []
                for(let i = 0; i < time.length; i++){
                    // get hours from time format hh:mm:ss
                    var d = new Date(time[i]); // for now
                    let heures = String(d.getHours()).padStart(2, '0');
                    let minutes = String(d.getMinutes()).padStart(2, '0');
                    let heureFormatee = `${heures}:${minutes}`;
                    
                    
                    time_format.push(heureFormatee);
                }
                
                let div = (
                    <Line 
                    data={{
                      labels: time_format,
                      datasets: [
                        {
                          label: "Temperature",
                          data: temp,
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


    console.log(chartData.length);
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