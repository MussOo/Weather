'use server'

import axios from "axios"



export async function getCoordinates(city: string) {
    return await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=`+ city + `&appid=` + process.env.OPENWEATHER_API_KEY, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
    )
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        return error
    })

}

export async function getToday(lat : string, lon : string) {

    return await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=`+lat+`&longitude=`+lon+`&hourly=temperature_2m&forecast_days=1`, 
        {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
    )
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        return error
    })
}


export async function getWeek(lat : string, lon : string) {
    let now = new Date();
    let fiveDays = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);

    return await axios.get(`https://data.climacell.co/v4/timelines?apikey=` + process.env.TOMORROW_API_KEY + `&location=` +lat+`,`+lon+`&fields=temperature&timesteps=1d&units=metric&startTime=`+now.toISOString()+`&endTime=`+fiveDays.toISOString(), 
        {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
    )
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        return error
    })
}