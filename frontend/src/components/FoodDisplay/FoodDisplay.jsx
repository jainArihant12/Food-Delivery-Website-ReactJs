import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext)

    // If food list is empty or loading, show a message
    if (!food_list || food_list.length === 0) {
        return <p>Loading or no food items available.</p>
    }

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list.map((item) => {
                    if (category === 'All' || category === item.category) {
                        return (
                            <FoodItem
                                key={item._id}  // Use item._id as key for better performance
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                            />
                        )
                    }
                    return null; // If category doesn't match, don't render the item
                })}
            </div>
        </div>
    )
}

export default FoodDisplay
