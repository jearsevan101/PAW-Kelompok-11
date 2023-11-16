import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import React, { useState } from 'react';

const Filter =() =>{
    const [price, setPrice] = useState (10000);
    const handlePriceChange = (event) =>{
        setPrice(event.target.value);
    }
    const [capacity, setCapacity] = useState(0);
    const [type, setType] = useState();
    const handleTypeChange = (event) =>{
        const {id, checked} = event.target;
        if(checked){
            setType(id);
        }else {
            setType();
        }
    }
    const handleCapacityChange = (event) => {
        const { id, checked } = event.target;
        // Ensure only one checkbox is checked at a time
        if (checked) {
        setCapacity(parseInt(id, 10));
        } else {
        // If unchecked, set capacity to 0
        setCapacity(0);
        }
    };

    const handleApplyFilters = () => {
        console.log("Filters applied!");
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
                    <input type="checkbox" id="automatic" checked={type === "automatic"}
                        onChange={handleTypeChange} />
                    <label htmlFor="automatic">Automatic</label>
                    <input type="checkbox" id="manual" checked={type === "manual"}
                        onChange={handleTypeChange}/>
                    <label htmlFor="manual">Manual</label>
                </div>
                <div className="col-span-2 text-sm font-semibold opacity-70">
                    <label>PRICE</label>
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
                    <Button children={"Apply Filter"} onClick={handleApplyFilters}/>
                </div>
            </div>
            
        </div>
      )
};
export default Filter;