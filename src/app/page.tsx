'use client';
import { getCountries } from "@/api/country";
import ListCity from "@/components/listCity";
import Image from "next/image";
import { useEffect, useState } from "react";
import { isNull } from "util";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [btn_search, setBtn_search] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true); // État pour contrôler l'affichage de la div
  const [isHidden, setIsHidden] = useState(false); // État pour contrôler la classe hidden
  const [countryselected, setCountryselected] = useState(null);

  useEffect(() => {
    getCountries(search).then((data) => {
      if(data.status === "OK"){
        const obj = data.data;
        const transformedArray = Object.entries(obj).map(([key, value]) => {
          return {
            ...value, // Copier toutes les propriétés de l'objet d'origine
            code: key   // Ajouter la clé comme nouvelle propriété "code"
          };
        });
        setCountries(transformedArray);
      }
    });
  }, [btn_search, countryselected]);


  const toggleHeight = () => {
    if (isExpanded) {
      // Si l'élément est actuellement agrandi
      setIsExpanded(false); // Réduit l'élément
      setTimeout(() => setIsHidden(true), 651); // Masque l'élément après l'animation
    } else {
      // Si l'élément est caché
      setIsHidden(false); // Rendre l'élément visible
      setIsExpanded(true); // Agrandit l'élément
    }
  };

  return (
    <div className=" bg-[#0D3B66] w-full h-screen flex flex-col items-center my-auto mx-auto">
      <h1 className="text-6xl text-white font-bold h-56 flex items-center">
        MÉTÉO
      </h1>
      <div className=" w-[1047px] rounded-lg flex flex-col items-center justify-center gap-20">
        <div className="w-[1047px] h-[100px] flex flex-row items-center justify-between">
        <input type="text"
         placeholder="PAYS"
         className="w-[950px] h-[50px] rounded-lg bg-white text-black text-xl px-6
         flex items-center justify-center font-bold uppercase"
          onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="w-[80px] h-[50px] bg-white rounded-lg flex items-center justify-center cursor-pointer hover:scale-95 transition ease-in-out delay-100"
            onClick={() => setBtn_search(!btn_search)}
          >
            <img src="https://img.icons8.com/?size=100&id=7695&format=png&color=000000"
              className="w-10"
              alt="" />
          </button>

        </div> 
        <div className={"bg-white w-full px-[70px] py-[40px] rounded-lg flex flex-row flex-wrap  gap-28 overflow-y-auto transition-all ease-in-out duration-500 delay-150 " + (
          isExpanded ? "h-[360px]" : "h-0 px-[0px] py-[0px] overflow-hidden" // Si l'élément est agrandi, affiche-le, sinon cache-le
          + (isHidden ? " hidden" : "") // Si l'élément est caché, cache-le, sinon affiche-le

        )}>
          {
            countries && !countryselected && countries.map((country, k) => (
              <div 
              key={k} 
              className="bg-[#011627] w-[225px] h-[50px] text-white flex flex-row items-center justify-start gap-4 py-3 px-6 rounded-xl  cursor-pointer hover:scale-95 transition ease-in-out delay-100"
              onClick={() => {
                setCountryselected(country);
                toggleHeight();
              }}
              >
                <img src={`https://countryflagsapi.netlify.app/flag/${country.code}.svg`} 
                className="w-10"
                />
                <span className="text-xl font-bold">{country.country}</span>
            </div>
            )) 
            || (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-xl font-bold text-white">Aucun pays trouvé</span>
              </div>
            )
            
          }
        </div>
          {
            countryselected && (
              <ListCity country={countryselected} setCountryselected={() => {
                setCountryselected(null)
                toggleHeight()
              }}/>
            )
          }
      </div>
    </div>
  );
}
