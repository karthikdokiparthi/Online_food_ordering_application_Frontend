import React from 'react';
import './MiniDishList.css';
import { useDispatch } from 'react-redux';
import { setSelectedCategory, fetchAllDishes } from './restaurantSlice';

function MiniDishList() {
    const dispatch = useDispatch();

    const categories = [
        { name: "Biryani", img: 'https://img.freepik.com/free-psd/bowl-biryani-with-chicken-pieces-transparent-background_84443-1317.jpg' },
        { name: "Burger", img: 'https://img.freepik.com/free-photo/classic-cheese-burger-with-beef-cutlet-vegetables-onions-isolated-white-background_123827-29709.jpg' },
        { name: "Pizza", img: 'https://img.freepik.com/free-psd/delicious-veggie-pizza-freshly-baked-toppings-cheese-mushrooms-peppers-olives_84443-37364.jpg' },
        { name: "Shawarma", img: 'https://img.freepik.com/free-psd/delicious-grilled-meat-wrap-with-fresh-vegetables_84443-35312.jpg' },
        { name: "Shake", img: 'https://img.freepik.com/free-psd/delicious-chocolate-sundae-isolated-transparent-background_191095-9326.jpg' },
        { name: "Cake", img: 'https://img.freepik.com/free-psd/delicious-chocolate-raspberry-cake-slice-white-plate_632498-49218.jpg' },
        { name: "Chinese", img: 'https://img.freepik.com/free-psd/delicious-noodles-with-mushrooms-peppers-peas-asian-cuisine-bowl-tasty-food_84443-46443.jpg' },
        { name: "Momo", img: 'https://img.freepik.com/free-photo/delicious-meal-table_23-2150857700.jpg' },
        { name: "Dosa", img: 'https://img.freepik.com/free-psd/delicious-masala-dosa-with-chutneys-south-indian-breakfast-food_84443-34830.jpg' },
        { name: "South Indian", img: 'https://img.freepik.com/free-photo/gourmet-bowl-with-healthy-rice-meat-vegetables-generated-by-ai_188544-14076.jpg' },
        { name: "North Indian", img: 'https://img.freepik.com/free-psd/refreshing-fruit-juices-delightful-citrus-blend-healthy-lifestyle-choice_191095-90526.jpg' },
        { name: "Pure Veg", img: 'https://img.freepik.com/free-psd/palak-paneer-indian-cuisine-spinach-cheese-curry-dish-food-green_84443-35079.jpg' },
        { name: "Dessert", img: 'https://img.freepik.com/free-photo/pie-served-with-ice-cream-apple-slices-berry-sauce_141793-1234.jpg' },
        { name: "Non-Veg", img: 'https://img.freepik.com/free-psd/refreshing-fruit-juices-delightful-citrus-blend-healthy-lifestyle-choice_191095-90526.jpg' },
        { name: "Juice", img: 'https://img.freepik.com/free-psd/refreshing-fruit-juices-delightful-citrus-blend-healthy-lifestyle-choice_191095-90526.jpg' }
    ];

    return (
        <div className="mini-dish-list">
            <ul className="dish-categories">
                {categories.map((category) => (
                    <li
                        key={category.name}
                        onClick={() => dispatch(setSelectedCategory(category.name))}
                    >
                        <img src={category.img} alt={category.name} />
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MiniDishList;
