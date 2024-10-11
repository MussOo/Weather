'use client'
import { getCity } from "@/api/country";
import { useEffect, useState } from "react";
import Today from "./weather/Today";
import WeekDays from "./weather/WeekDays";
import { getCoordinates } from "@/api/weather";
import recherchePartielle from "@/lib/search";
import loading_infinity from "../../public/Infinity.svg"

export default function ListCity({ country, setCountryselected }: { country: {
    country: string;
    code: string;
    region: string;
}, setCountryselected: any }) {
    const [cities, setCities] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false); // État pour contrôler l'affichage de la div
    const [isHidden, setIsHidden] = useState(true); // État pour contrôler la classe hidden
    const [cityselected, setCityselected] = useState(null);
    const [coordinates_cityselected, setCoordinates_cityselected] = useState({});
    const [period, setPeriod] = useState(1);
    const [searchcity, setSearchcity] = useState("");
    const [btnsearch, setBtnsearch] = useState(false);


    useEffect(() => {
        setTimeout(() => setIsExpanded(true), 651); // Masque l'élément après l'animation
        setTimeout(() => setIsHidden(false), 655); // Masque l'élément après l'animation

        getCity(country.country)
        .then((data) => {
            setCities(data.data)
        })
        .catch((error) => {
            console.error(error)
        })
    
    }, [country]);

    useEffect(() => {
        if(cityselected) {
            getCoordinates(cityselected)
            .then((data) => {
                if(data[0]){
                    setCoordinates_cityselected({
                        lat: data[0].lat,
                        lon: data[0].lon
                    })
                }

            })
            .catch((error) => {
                console.error(error)
            })
        }
    }, [cityselected])

    useEffect(() => {
        if(searchcity === ""){
            getCity(country.country)
            .then((data) => {
                setCities(data.data)
            })
            .catch((error) => {
                console.error(error)
            })
        }
        let result = recherchePartielle(cities, searchcity)
        setCities(result)
        console.log(result)
    }, [btnsearch])

    return (
        <div className={"bg-white w-[1047px]  flex flex-col items-center justify-start overflow-y-auto rounded-lg anuimation-all ease-in-out duration-1000 delay-150"
            + (isHidden ? " hidden" : "")
            + (isExpanded ? " h-[600px]" : " h-0 px-[0px] py-[0px] overflow-hidden")
        }>
            <div className="w-full relative flex flex-row items-end justify-end">
                {
                    cityselected && (
                        <a
                        className=" absolute left-5 top-5 text-xl font-bold text-black flex flex-row items-center gap-2"
                        onClick={() => {setCityselected(null)}}
                        > 
                        <img src="https://img.icons8.com/?size=25&id=98961&format=png&color=000000" alt="" />
                        Retour
                        </a>
                    )
                }
                <a 
                    className="absolute right-5 top-5 text-5xl font-bold text-red-500"
                    onClick={() => {
                        setCountryselected(null)
                    }}
                >X</a>
            </div>
            <div className="w-full h-full flex flex-col items-center justify-start p-5">
                <span className="text-4xl font-bold text-black w-1/2 flex gap-5 justify-center items-center">
                    <img src={`https://countryflagsapi.netlify.app/flag/${country.code}.svg`} 
                    className="w-24 border border-black rounded-sm"
                    />
                </span>
                {
                    cities && !cityselected && (
                        <div className="bg-white w-full px-[35px] rounded-lg flex flex-row flex-wrap  gap-5 overflow-y-auto transition-all ease-in-out duration-500 delay-150"> 
                        <div className="w-full flex flex-row  gap-5">
                            <input type="text"
                            placeholder="Rechercher une ville"
                            className="w-56 border-b-2 border-black py-1 px-4"
                            onChange={(e) => setSearchcity(e.target.value)}
                            />
                            <button className="bg-[#011627] text-white font-bold text-sm py-1 px-4 hover:scale-105 transition ease-in-out delay-100"
                            onClick={() => {
                                setBtnsearch(!btnsearch)
                            }}
                            >
                                SEARCH
                            </button>
                        </div>
                        <ul className="w-full flex flex-row flex-wrap justify-center items-center gap-5">
                            {
                                cities && !cityselected ? cities.map((city, k) => ( 
                                    <li key={k} className="w-60 list-disc text-2xl font-bold text-black cursor-pointer hover:text-red-500"
                                    onClick={() => {{
                                        setCityselected(city)
                                    }}}
                                    >
                                        <span className="text-xl font-bold">{city}</span>
                                    </li>
                                )) 
                                : (
                                    <div className="w-full flex flex-row justify-center items-center gap-5">
                                        <span className="text-xl font-bold text-black">
                                            LOADING...
                                        </span>
                                    </div>
                                )
                                

                            }
                            
                        </ul>
                    </div>  
                    )
                }
                {
                    cityselected && (
                        <div className="w-full ">
                            <div className="w-full flex flex-row gap-5 font-bold">
                                <button className={"border-b-2 border-black py-1 px-4 hover:scale-105 transition ease-in-out delay-100" + (period === 1 ? " bg-[#011627] text-white" : "")}
                                onClick={() => setPeriod(1)}    
                                >
                                    TODAY
                                </button>
                                <button className={"border-b-2 border-black py-1 px-4 hover:scale-105 transition ease-in-out delay-100" + (period === 5 ? " bg-[#011627] text-white" : "")}
                                onClick={() => setPeriod(5)}
                                >
                                    WEEEK
                                </button>
                            </div>
                            {
                                period === 1 && (
                                    <Today city_name={cityselected} coor={coordinates_cityselected} />
                                ) || period === 5 && (
                                    <WeekDays city_name={cityselected} coor={coordinates_cityselected} />
                                )
                            }
                        </div>
                    )
                }

            </div>
        </div>
    );
}