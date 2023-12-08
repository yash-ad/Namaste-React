// Importing necessary dependencies and components
import { IMG_URL } from "../utilities/config";
import Shimmer from "./Shimmer";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useRestaurantInfo from "../utilities/useRestaurantInfo";


// Defining the RestaurantInfo component
const RestaurantInfo = () => {
  const [vegFood, setVegFood] = useState('Veg');


  // useParams hook to fetch dynamic parameters from the router child.
  const { resId } = useParams();

  //Lets create our own custom hooks to take the tasks of fetching the data.
  const {resMenu,resInfo,resMenuTitle,newResMenu,resNewInfo} = useRestaurantInfo(resId);

  
  // Before destructuring the data, we need to fetch it as we don't know how long it will take to fetch, and it will return undefined otherwise.
  if (resMenu === null) return <Shimmer />;

  // Destructuring values from the fetched data
  const { name, cuisines, avgRating, costForTwoMessage, cloudinaryImageId, locality, totalRatingsString, avgRatingString } = resInfo;
  const { lastMileTravelString, maxDeliveryTime } = resInfo?.sla;
  const { title } = resMenuTitle;
  const { message } = resNewInfo;

  // Rendering the JSX structure
  return (
    <div className="pages-container">
      <div className="rest-menu">
        {/* Top Menu Section */}
        <div className="top-menu">
          <div className="top-menu-left">
            {/* Displaying the restaurant image */}
            <img src={IMG_URL + cloudinaryImageId} alt="Restaurant" />
          </div>
          <div className="top-menu-right">
            <h1>{name}</h1>
            <p>{cuisines.join(" , ")}</p>
            <p>{locality} - {lastMileTravelString}</p>
            <div className="top-menu-right-child">
              {/* Displaying restaurant ratings, delivery time, and cost for two */}
              <p style={avgRating > 3.8 ? { backgroundColor: "darkgreen" } : { backgroundColor: "rgb(164, 14, 14)" }}>
                <i className="ri-star-fill"></i>
                {avgRating}
              </p>
              <span>|</span>
              <p>{maxDeliveryTime}mins</p>
              <span>|</span>
              <p>{costForTwoMessage}</p>
            </div>
          </div>
          <div className="ratings-container">
            {/* Displaying restaurant ratings with an icon */}
            <button className="RestaurantRatings_wrapper" >
              <span className="RestaurantRatings_avgRating" >
                <span className="icon-star"></span>
                <span><i className="ri-star-fill"></i>{avgRatingString}</span>
              </span>
              <span className="RestaurantRatings_totalRatings" >{totalRatingsString}</span>
            </button>
          </div>
        </div>

        {/* Mid Menu Section */}
        <div className="mid-menu">
          <button
            id="isVegBtn"
            role="switch"
            onClick={() => {
              // Toggling between Veg and All options
              if (vegFood === "Veg") {
                setVegFood("All");
              } else {
                setVegFood("Veg");
              }
              // Filtering the menu based on Veg or All
              if (vegFood === "All") {
           setVegFood(newResMenu);
              } else {
                const filteredRestMenu = resMenu?.filter((rest) => rest.card.info.isVeg > 0);
                setVegFood(filteredRestMenu);
              }
            }}
            style={{ backgroundColor: vegFood === "Veg" ? "green" : "orange" }}>
            {vegFood}
          </button>
        </div>

        {/* Main Menu Section */}
        <li>
          <div className="main-menu">
            <h1>
              {title}
              <span>({resMenu?.length})</span>
            </h1>
            {/* Iterating over the recommended list/array of objects using map() */}
            {resMenu?.map((item) => (
              <div key={item.card.info.id} className="menu-card">
                <div className="menu-left">
                  <h3>{item.card.info.name}</h3>
                  <p>{"₹" + item.card.info.price / 100}</p>
                  <p>{item.card.info.description}</p>
                </div>
                <div className="menu-right">
                  <img src={IMG_URL + item.card.info.imageId} alt="Item" />
                  <button id="addBtn">ADD</button>
                </div>
              </div>
            ))}
          </div>
        </li>

        {/* Bottom Menu Section */}
        <div className="bottom-menu">
          <div className="RestaurantLicence_wrapper__4BYQV">
            <div className="RestaurantLicence_licence__Oo5_q" aria-hidden="true">
              {/* Displaying FSSAI image */}
              <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_120,h_60/fssai_final_edss9i" alt="FSSAI" className="RestaurantLicence_image__2-5G_" />
            </div>
            <div></div>
          </div>
          <div className="RestaurantFooterAddress_wrapper__16xqp" aria-hidden="true">
            <p className="RestaurantFooterAddress_name__deVKZ">{name}</p><br></br>
            <p>Outlet: {locality}</p><br></br>
            <div className="RestaurantFooterAddress_address__37uUA">
              <div className="icon-markerDark RestaurantFooterAddress_icon__2Kjdg"></div>
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting the RestaurantInfo component
export default RestaurantInfo;
