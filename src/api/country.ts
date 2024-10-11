'use server';
import axios from "axios"




export const getCountries = async (search : string) => {
    return axios.get(`https://api.first.org/data/v1/countries?q=` + search,
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }
    )
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            console.error(error)
        })
}


export const getCity = async (country : string) => {
    return axios.post(`https://countriesnow.space/api/v0.1/countries/cities`,
        {
            "country" : country   
        }
    )
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            console.error(error)
        })
}