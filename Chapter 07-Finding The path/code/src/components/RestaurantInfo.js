import {useState, useEffect } from "react";
import { CORS_URL, REST_INFO_API_URL } from "../utilities/config";
import { IMG_URL } from "../utilities/config";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";


const RestaurantInfo = ()=>{ 
     
//Why do we use `UseState` Hook :- To hold and an update the data.
const [resInfo,setResinfo] = useState(null);
const [resMenu,setResmenu] = useState(null);
const [resMenuTitle,setResMenuTitle] = useState(null);
const [vegFood ,setVegFood] = useState('Veg');
const [newResMenu,setNewResMenu] = useState(null);
const [resNewInfo,setResNewInfo] = useState(null);

console.log(useState());

//`useParams` hook to fetch dynamic from router child.
const {resId} = useParams();

//`useEffect()` hook to fetch the API after the component will load with a dependancy array, it will render only at once intial phase.
useEffect(()=>{fetchInfo()},[]);

const fetchInfo = async ()=>{

    const data = await fetch(CORS_URL + REST_INFO_API_URL + resId);

    const json  = await data.json();

    setResinfo(json?.data?.cards[0]?.card?.card?.info);
    setResNewInfo(json?.data?.cards[0]?.card?.card?.info?.labels[1]);
    setResmenu(json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards);
    setResMenuTitle(json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card);
    setNewResMenu(json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards);
  };

//Before destructing the data, we need to fetch it as we don't know how long it will take to fetch and it will return undefined otherwise.
if(resMenu === null) return <Shimmer/>

const {name,cuisines,avgRating,costForTwoMessage,cloudinaryImageId,locality,totalRatingsString,avgRatingString} = resInfo;
const {lastMileTravelString,maxDeliveryTime} = resInfo?.sla;
const {title} = resMenuTitle;
const{message} = resNewInfo;
// console.log(resMenu);
return(
<div className="pages-container">
<div className="rest-menu">
      <div className="top-menu">
        <div className="top-menu-left">
        <img src={IMG_URL + cloudinaryImageId}></img>
        </div>
        <div className="top-menu-right">
          <h1>{name}</h1>
          <p>{cuisines.join(" , ")}</p>
          <p>{locality} -{lastMileTravelString}</p>
          <div className="top-menu-right-child">
            <p style={avgRating > 3.8? { backgroundColor: "darkgreen" }: { backgroundColor: "rgb(164, 14, 14)" }}>
              <i class="ri-star-fill"></i>
              {avgRating}
            </p>
            <span>|</span>
            <p>{maxDeliveryTime}mins</p>
            <span>|</span>
            <p>{costForTwoMessage}</p>
          </div>
        </div>
        <div className="ratings-container">
        <button className="RestaurantRatings_wrapper" >
          <span className="RestaurantRatings_avgRating" >
            <span className="icon-star"></span> 
            <span><i class="ri-star-fill"></i>{avgRatingString}</span> </span>
            <span className="RestaurantRatings_totalRatings" >{totalRatingsString}</span>
            </button>
        </div>
      </div>


      <div className="mid-menu">
        <button
          id="isVegBtn"
          role="switch"
          onClick={() =>{
            if (vegFood === "Veg") {
              setVegFood("All");
            } else {
              setVegFood("Veg");
            }
            if (vegFood === "All") {
              setResmenu(newResMenu);
            } else {
              const filteredRestMenu = resMenu?.filter(
                (rest) => rest.card.info.isVeg > 0
              );
              setResmenu(filteredRestMenu);
            }
          }}
          style={{ backgroundColor: vegFood === "Veg" ? "green" : "orange" }}>
          {vegFood}
        </button>
      </div>

      <li>
        <div className="main-menu">
          <h1>
            {title}
            <span>({resMenu?.length})</span>
          </h1>
          {/* Iterating the recommended list/array of objects using map() */ }
          {resMenu?.map((item) => (
            <div key={item.card.info.id} className="menu-card">
              <div className="menu-left">
                <h3>{item.card.info.name}</h3>
                <p>{"₹" + item.card.info.price / 100}</p>
                <p>{item.card.info.description}</p>
              </div>
              <div className="menu-right">
                <img src={IMG_URL + item.card.info.imageId}></img>
                <button id="addBtn">ADD</button>
              </div>
            </div>
          ))}
        </div>
      </li>
      
      <div className="bottom-menu">
      <div class="RestaurantLicence_wrapper__4BYQV">
        <div class="RestaurantLicence_licence__Oo5_q" aria-hidden="true">
          <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_120,h_60/fssai_final_edss9i" class="RestaurantLicence_image__2-5G_" alt="FSSAI"/>
          </div>
          <div>
            </div>
            </div>
      <div class="RestaurantFooterAddress_wrapper__16xqp" aria-hidden="true">
        <p class="RestaurantFooterAddress_name__deVKZ">{name}</p><br></br>
        <p>Outlet:{locality}</p><br></br>
        <div class="RestaurantFooterAddress_address__37uUA">
          <div class="icon-markerDark RestaurantFooterAddress_icon__2Kjdg"></div><p>{message}</p>
          </div>
          </div>
      </div>
    </div>
</div>
)
};

export default RestaurantInfo;