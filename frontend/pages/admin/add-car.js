import {useState} from 'react'
import Navbar from "@/components/navbar";
import SideBar from "@/components/SideBar";
import Form from "@/components/Form";
import Button from "@/components/Button";
import axios from "axios";

export default function AddCar() {
  const [nama, setNama] = useState("")
  const [deskripsi, setDeskripsi] = useState("")
  const [lokasi, setLokasi] = useState("")
  const [kota, setKota] = useState("")
  const [harga, setHarga] = useState("")
  const [available, setAvailable] = useState("")
  const [img_url, setImg_url] = useState(['', '', ''])
  const [capacity, setCapacity] = useState("")
  const [type, setType] = useState("")
  // const [jumlah_tersewa, setJumlah_tersewa] = useState(0)
  const [fuel_capacity, setFuel_capacity] = useState("")
  

  const handleClick = (e) => {
    e.preventDefault();
    createCar()
    
  };


  console.log(img_url)

  function createCar(){
    axios.post('https://paw-kelompok-11-server.vercel.app/api/kendaraan', {
      nama,
      deskripsi,
      lokasi,
      kota,
      harga,
      available,
      img_url,
      capacity,
      fuel_capacity,
      type,
      // jumlah_tersewa
    })
  .then(response => {
    // Handle success
    console.log('Data added successfully:', response.data);
    alert("Success Add Car");
  })
  .catch(error => {
    // Handle error
    console.error('Error adding data:', error);
    alert(error)
  });
  }

  const handleFormChange = (index, value) => {
    setImg_url((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = value;
      return newArray;
    });
  };

  const options = [
    { value: "Manual", label: "Manual" },
    { value: "Auto", label: "Automatic" },
  ];
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 bg-[#F6F7F9] flex flex-col md:flex-row justify-between">
        <div className="w-64 min-w-[200px] bg-white p-4">
          <SideBar />
        </div>
        <div className="flex-grow rounded-lg m-8 bg-white p-8">
          <h2 className="text-lg font-bold mb-4">Detail Rent Car</h2>

          <form>
            <div className="grid grid-cols-3 gap-x-4">
              <Form
                label="Link Image 1"
                name="link1"
                value={img_url[0]}
                setValue={(data)=> {
                  handleFormChange(0, data);
                }}
                type="text"
                placeholder="Enter your link"
              />
              <Form
                label="Link Image 2"
                name="link2"
                value={img_url[1]}
                setValue={(data)=> {
                  handleFormChange(1, data);
                }}
                type="text"
                placeholder="Enter your link"
              />
              <Form
                label="Link Image 3"
                name="link1"
                value={img_url[2]}
                setValue={(data)=> {
                  handleFormChange(2, data);
                }}
                type="text"
                placeholder="Enter your link"
              />
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <Form
                label="Car Name"
                name="name"
                value={nama}
                setValue={(data)=> {
                  setNama(data)
                }}
                type="text"
                placeholder="Enter your car name"
              />
              <Form
                label="Price/day"
                name="price"
                value={harga}
                setValue={(data)=> {
                  setHarga(data)
                }}
                type="number"
                placeholder="Enter your price"
              />
              <Form
                label="Address"
                name="address"
                value={lokasi}
                setValue={(data)=> {
                  setLokasi(data)
                }}
                type="string"
                placeholder="Enter your address"
              />
              <Form
                label="City"
                name="location"
                value={kota}
                setValue={(data)=> {
                  setKota(data)
                }}
                type="string"
                placeholder="Enter your city"
              />
              <Form label="Type" 
              type="select" 
              name="type" 
              options={options}
              value={type} 
              setValue={(data)=> {
                setType(data)
              }}/>
              <Form
                label="Capacity"
                name="capacity"
                value={capacity}
                setValue={(data)=> {
                  setCapacity(data)
                }}
                type="number"
                placeholder="Enter your capacity"
              />
              <Form
                label="Availability"
                name="availability"
                value={available}
                setValue={(data)=> {
                  setAvailable(data)
                }}
                type="number"
                placeholder="Enter your availability"
              />
              <Form
                label="Fuel Capacity"
                name="fuel_capacity"
                value={fuel_capacity}
                setValue={(data)=> {
                  setFuel_capacity(data)
                }}
                type="number"
                placeholder="Enter your fuel capacity"
              />
            </div>
            <Form
              label="Description"
              type="text"
              value={deskripsi}
              setValue={(data)=> {
                setDeskripsi(data)
              }}
              name="description"
              placeholder="Enter a description"
              isLongText
            />
            <Button className="w-full" onClick={handleClick}>
              Submit
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}
