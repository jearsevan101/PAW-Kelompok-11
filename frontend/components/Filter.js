import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import React, { useState, useEffect } from 'react';

const Filter =({onApplyFilters}) =>{
    const [price, setPrice] = useState(3000000);
    const [capacity, setCapacity] = useState(6);
    const [type, setType] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [cities, setCities] = useState([]); // State to store the list of cities

    useEffect(() => {
        // Fetch cities from the backend when the component mounts
        const fetchCities = async () => {
        try {
            // Replace this URL with the correct URL to fetch cities from your backend
            const response = await fetch('https://paw-kelompok-11-server.vercel.app/api/kendaraan/kota');
            const data = await response.json();
            setCities(data.kota);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
        };

        fetchCities();
    }, []);
    const handlePriceChange = (event) =>{
        setPrice(event.target.value);
        console.log("price change" + event.target.value)
    }
    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
        console.log("Selected city:", event.target.value);
      };
    const handleTypeChange = (event) =>{
        const {id, checked} = event.target;
        if(checked){
            setType(id);
            console.log("type change" + id)
        }else {
            setType();
        }
    }
    const handleCapacityChange = (event) => {
        const { id, checked } = event.target;
        // Ensure only one checkbox is checked at a time
        if (checked) {
            setCapacity(parseInt(id, 10));
            console.log("capacity change" + parseInt(id, 10))
        } else {
            // If unchecked, set capacity to 0
            setCapacity(0);
        }
    };

    const handleApplyFilters = () => {
        console.log("Applying filters:", { price, capacity, type ,selectedCity});
        onApplyFilters(price,capacity,type,selectedCity);
    };
    const handleClearFilters = () => {}
    
    return (
        <div className="w-full mx-auto bg-slate-50 py-8 px-4 sm:px-10 shadow-md">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="text-sm font-semibold opacity-70">
                    <label>CITY</label>
                </div>
                <div className="flex items-center space-x-4 col-span-2">
                    <select id="city" className="border rounded px-2 py-1" onChange={handleCityChange} value={selectedCity}>
                        <option value="">All</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <div className="text-sm font-semibold opacity-70">
                        <label>CAPACITIES</label>
                    </div>
                    <div className="sm:flex sm:items-center space-x-4">
                        <input
                            type="checkbox"
                            id="2"
                            checked={capacity === 2}
                            onChange={handleCapacityChange}
                        />
                        <label htmlFor="2">{window.innerWidth <= 640 ? "2" : "2 Person"}</label>
                        <input
                            type="checkbox"
                            id="4"
                            checked={capacity === 4}
                            onChange={handleCapacityChange}
                        />
                        <label htmlFor="4">{window.innerWidth <= 640 ? "4" : "4 Person"}</label>
                        <input
                            type="checkbox"
                            id="6"
                            checked={capacity === 6}
                            onChange={handleCapacityChange}
                        />
                        <label htmlFor="6">{window.innerWidth <= 640 ? "6" : "6 Person"}</label>
                        <input
                            type="checkbox"
                            id="8"
                            checked={capacity === 8}
                            onChange={handleCapacityChange}
                        />
                        <label htmlFor="8">{window.innerWidth <= 640 ? "8" : "8 Person"}</label>
                    </div>
                </div>
                {/* Add a line break for small screens */}
                <div className="col-span-1">
                    <div className="col-span-2 text-sm font-semibold opacity-70">
                        <label>TYPE</label>
                    </div>
                    <div className="flex items-center space-x-4">
                        <input type="checkbox" id="Auto" checked={type === "Auto"} onChange={handleTypeChange} />
                        <label htmlFor="automatic">Automatic</label>
                        <input type="checkbox" id="Manual" checked={type === "Manual"} onChange={handleTypeChange} />
                        <label htmlFor="manual">Manual</label>
                    </div>
                </div>
                    
                <div className="col-span-2 text-sm font-semibold opacity-70">
                    <label>MAX PRICE</label>
                </div>
                <div className="flex items-center space-x-4 col-span-2 text-right">
                    <input
                        type="range"
                        id="price"
                        min="100000"
                        max="3000000"
                        step="20"
                        className="w-64"
                        value={price}
                        onChange={handlePriceChange}
                    />
                </div>
                <div className="text-sm font-semibold opacity-70">
                    <label>Rp {price}</label>
                </div>
                <div className="text-right mr-5">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleClearFilters}>
                        Clear Filter
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={handleApplyFilters}>
                        Apply Filter
                    </button>
                </div>
            </div>
        </div>
    )
};
export default Filter;