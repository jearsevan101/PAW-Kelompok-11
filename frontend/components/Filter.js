import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import React, { useState } from 'react';

const Filter =({onApplyFilters}) =>{
    const [price, setPrice] = useState(3000000);
    const [capacity, setCapacity] = useState(6);
    const [type, setType] = useState('');
    const handlePriceChange = (event) =>{
        setPrice(event.target.value);
        console.log("price change" + event.target.value)
    }
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
        console.log("Applying filters:", { price, capacity, type });
        onApplyFilters(price,capacity,type);
      };
    
      return (
        <div className="w-full mx-auto bg-slate-50 py-8 px-4 sm:px-10 shadow-md">
            <div className="container mx-auto grid sm:grid-cols-2 gap-2">
                <div className="text-sm font-semibold opacity-70">
                    <label>CITY</label>
                </div>
                <div className="flex items-center space-x-4 col-span-2">
                    <select id="city" className="border rounded px-2 py-1">
                        <option value="city1">City 1</option>
                        <option value="city2">City 2</option>
                    </select>
                </div>
                <div className="text-sm font-semibold opacity-70">
                    <label>CAPACITIES</label>
                </div>
                <div className="text-sm font-semibold opacity-70">
                    <label>TYPE</label>
                </div>
                <div className="flex items-center space-x-4">
                    <input
                        type="checkbox"
                        id="2"
                        checked={capacity === 2}
                        onChange={handleCapacityChange}
                    />
                    <label htmlFor="2">2 Person</label>
                    <input
                        type="checkbox"
                        id="4"
                        checked={capacity === 4}
                        onChange={handleCapacityChange}
                    />
                    <label htmlFor="4">4 Person</label>
                    <input
                        type="checkbox"
                        id="6"
                        checked={capacity === 6}
                        onChange={handleCapacityChange}
                    />
                    <label htmlFor="6">6 Person</label>
                    <input
                        type="checkbox"
                        id="8"
                        checked={capacity === 8}
                        onChange={handleCapacityChange}
                    />
                    <label htmlFor="8">8 Person</label>
                </div>
                <div className="flex items-center space-x-4 ">
                    <input type="checkbox" id="Auto" checked={type === "Auto"}
                        onChange={handleTypeChange} />
                    <label htmlFor="automatic">Automatic</label>
                    <input type="checkbox" id="Manual" checked={type === "Manual"}
                        onChange={handleTypeChange}/>
                    <label htmlFor="manual">Manual</label>
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
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleApplyFilters}>
                    Apply Filter
                    </button>
                </div>
            </div>
            
        </div>
      )
};
export default Filter;