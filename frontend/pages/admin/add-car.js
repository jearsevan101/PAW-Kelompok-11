import Navbar from "@/components/navbar";
import SideBar from "@/components/SideBar";
import Form from "@/components/Form";
import Button from "@/components/Button";

export default function AddCar() {
  const handleClick = (e) => {
    e.preventDefault();
    alert("Success Add Car");
  };

  const options = [
    { value: "Manual", label: "Manual" },
    { value: "Automatic", label: "Automatic" },
  ];
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 bg-[#F6F7F9] flex flex-col md:flex-row justify-between">
        <div className="md:w-64 w-full">
          <SideBar />
        </div>

        <div className="flex-grow rounded-lg m-8 bg-white p-8">
          <h2 className="text-lg font-bold mb-4">Detail Rent Car</h2>

          <form>
            <div className="grid grid-cols-3 gap-x-4">
              <Form
                label="Link Image 1"
                name="link1"
                type="text"
                placeholder="Enter your link"
              />
              <Form
                label="Link Image 2"
                name="link2"
                type="text"
                placeholder="Enter your link"
              />
              <Form
                label="Link Image 3"
                name="link1"
                type="text"
                placeholder="Enter your link"
              />
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <Form
                label="Car Name"
                name="name"
                type="text"
                placeholder="Enter your car name"
              />
              <Form
                label="Price/day"
                name="price"
                type="number"
                placeholder="Enter your price"
              />
              <Form label="Type" type="select" name="type" options={options} />
              <Form
                label="Capacity"
                name="capacity"
                type="number"
                placeholder="Enter your capacity"
              />
              <Form
                label="Availability"
                name="availability"
                type="number"
                placeholder="Enter your availability"
              />
              <Form
                label="Fuel Capacity"
                name="fuel_capacity"
                type="number"
                placeholder="Enter your fuel capacity"
              />
            </div>
            <Form
              label="Description"
              type="text"
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
