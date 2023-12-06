import Link from "next/link";
import Image from "next/image";
import SideBar from "components/SideBar";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const [sewaList, setSewaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kendaraanList, setKendaraanList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [mergedData, setMergedData] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [name, setName] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [price, setPrice] = useState(3000000);
  const [capacity, setCapacity] = useState(null);
  const [type, setType] = useState("");

  const bearerToken = Cookies.get("auth_info");
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    try {
      const username = jwtDecode(Cookies.get("auth_info")).username;
      if (username == "admin") {
        setIsAdmin(true);
      }
    } catch (err) {
      console.log("Error: ", err.message);
    }
  }, []);

  useEffect(() => {
    const apiUrl = `https://paw-kelompok-11-server.vercel.app/api/kendaraan?search=${
      name || ""
    }&sort=asc&hargaBelow=${price || ""}&capacity=${capacity || ""}&type=${
      type || ""
    }&kota=${selectedCity || ""}`;
    console.log("API URL:", apiUrl);
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((response) => {
        setkendaraanList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [name, price, capacity, type, selectedCity]);
  const handleNameChange = (query) => {
    resetFilter();
    setName(query);
  };
  const resetFilter = () => {
    setCapacity(null);
    setPrice(3000000);
    setType("");
    setSelectedCity("");
  };
  const resetSearch = () => {
    setName("");
  };
  const handleFiltersChange = (price, capacity, type, selectedCity) => {
    resetSearch();
    setCapacity(capacity);
    setPrice(price);
    setType(type);
    setSelectedCity(selectedCity);
    console.log("handleFilterChange price", price);
    console.log("handleFilterChange capacity", capacity);
    console.log("handleFilterChange type", type);
  };

  const handleStatusChange = (event, id) => {
    const newStatus = event.target.value;
    const updatedData = mergedData.map((data) => {
      if (data._id === id) {
        return { ...data, status: newStatus };
      }
      return data;
    });
    const updatedSelectedData = updatedData.find(
      (data) => data._id === selectedData._id
    );
    setSelectedData(updatedSelectedData);

    setIsUpdating(true);

    axios
      .put(
        `https://paw-kelompok-11-server.vercel.app/api/sewa/${id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      )
      .then((response) => {
        setMergedData(updatedData);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      })
      .finally(() => {
        setIsUpdating(false);
        window.location.reload();
      });
  };

  useEffect(() => {
    axios
      .get("https://paw-kelompok-11-server.vercel.app/api/sewa/", {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then((response) => {
        setSewaList(response.data);
        axios
          .get("https://paw-kelompok-11-server.vercel.app/api/kendaraan")
          .then((response) => {
            setKendaraanList(response.data);
            axios
              .get("https://paw-kelompok-11-server.vercel.app/api/customer")
              .then((response) => {
                setCustomerList(response.data);
                setLoading(false);
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
              });
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (
      sewaList.length > 0 &&
      kendaraanList.length > 0 &&
      customerList.length > 0
    ) {
      const merged = sewaList.map((sewa) => {
        const matchingKendaraan = kendaraanList.find(
          (kendaraan) => kendaraan._id === sewa.kendaraan_id
        );
        const matchingCustomer = customerList.find(
          (customer) => customer._id === sewa.customer_id
        );

        return {
          ...sewa,
          kendaraan: matchingKendaraan || {},
          customer: matchingCustomer || {},
        };
      });
      
      const validMerged = merged.filter((sewa) => sewa.kendaraan._id !== undefined);
      const invalidSewaIds = merged.filter((sewa) => sewa.kendaraan._id === undefined).map((sewa) => sewa._id);
  
      invalidSewaIds.forEach(async (id) => {
        try {
          await useAxios(`https://paw-kelompok-11-server.vercel.app/api/sewa/${id}`, 'DELETE', null, true);
        } catch (error) {
          console.error(`Error deleting sewa with id ${id}:`, error);
        }
      });
  
      setMergedData(validMerged);
      if (selectedData === null && validMerged.length > 0) {
        setSelectedData(validMerged[0]);
      }
    }
  }, [sewaList, kendaraanList, customerList, selectedData]);

  return (
    <>
      <Navbar
        onSearchSend={handleNameChange}
        onFilterSend={handleFiltersChange}
      />
      {isAdmin ? (
        <main className="min-h-screen pt-20 bg-[#F6F7F9] flex flex-col sm:flex-row justify-between">
          <div className="md:w-64 w-full">
            <SideBar />
          </div>

          <div className="flex-grow rounded-lg m-8 bg-white p-8">
            <h2 className="font-bold text-c-text-dark text-xl mb-[40px]">
              Details Rental
            </h2>
            {selectedData && (
              <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {selectedData.kendaraan.img_url && (
                    <div
                      style={{
                        width: "150px",
                        height: "75px",
                        position: "relative",
                        marginRight: "20px",
                      }}
                    >
                      <Image
                        src={selectedData.kendaraan.img_url[0]}
                        alt={selectedData.kendaraan.nama}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-[900] text-[24px]">
                      {selectedData.kendaraan.nama}
                    </p>
                    <p className="font-[500] text-c-text-grey">
                      {selectedData.kendaraan.type}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="font-semibold mt-[40px] text-[16px]">
                    {" "}
                    Nama :{" "}
                  </div>
                  <p className="font-semibold text-c-text-grey text-[16px]">
                    {selectedData.customer.nama}
                  </p>
                  <div className="font-semibold text-[16px]"> Email : </div>
                  <p className="font-semibold text-[16px] text-c-text-grey">
                    {selectedData.customer.email}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <img
                      src="/Calendar.png"
                      alt="Date Icon"
                      style={{ marginRight: "10px" }}
                    />
                    <div
                      className="font-semibold text-[16px]"
                      style={{ marginRight: "10px" }}
                    >
                      {" "}
                      Pick-Up
                    </div>
                  </div>
                  <div className="ml-[40px]">
                    <div className="font-bold text-[16px] mb-[7px]"> Date </div>
                    <div className="font-semibold text-c-text-grey text-[14px]">
                      {new Date(selectedData.tanggal_sewa).toLocaleDateString(
                        "id-ID",
                        { day: "numeric", month: "long", year: "numeric" }
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <img
                      src="/Calendar.png"
                      alt="Date Icon"
                      style={{ marginRight: "10px" }}
                    />
                    <div
                      className="font-semibold text-[16px]"
                      style={{ marginRight: "10px" }}
                    >
                      {" "}
                      Drop-Off
                    </div>
                  </div>
                  <div className="ml-[40px]">
                    <div className="font-bold text-[16px] mb-[7px]"> Date </div>
                    <div className="font-semibold text-c-text-grey text-[14px]">
                      {new Date(
                        selectedData.tanggal_kembali
                      ).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <p
                    className="font-bold text-[24px]"
                    style={{
                      textAlign: "right",
                      marginTop: "10px",
                      marginBottom: "40px",
                    }}
                  >
                    Rp{selectedData.total_harga.toLocaleString("id-ID")}
                  </p>
                  <div className style={{ textAlign: "right" }}>
                    <div className="font-bold text-[16px]"> Status </div>
                    <select
                      onChange={(event) =>
                        handleStatusChange(event, selectedData._id)
                      }
                      value={selectedData.status}
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.05em",
                        fontWeight: "semi-bold",
                        backgroundColor:
                          selectedData.status === "DITOLAK"
                            ? "#FFA37A"
                            : selectedData.status === "KONFIRMASI"
                            ? "#96FDF1"
                            : selectedData.status === "DISEWA"
                            ? "#7EC2FF"
                            : selectedData.status === "DIAJUKAN"
                            ? "#FFE488"
                            : "#BCE455",
                        color:
                          selectedData.status === "DITOLAK"
                            ? "#930B16"
                            : selectedData.status === "KONFIRMASI"
                            ? "#357672"
                            : selectedData.status === "DISEWA"
                            ? "#1A4393"
                            : selectedData.status === "DIAJUKAN"
                            ? "#7A4D0B"
                            : "#4C7A0B",
                        display: "inline-block",
                        padding: "0.3em 2em",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      <option
                        value="DIAJUKAN"
                        style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
                      >
                        DIAJUKAN
                      </option>
                      <option
                        value="KONFIRMASI"
                        style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
                      >
                        KONFIRMASI
                      </option>
                      <option
                        value="DISEWA"
                        style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
                      >
                        DISEWA
                      </option>
                      <option
                        value="DITOLAK"
                        style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
                      >
                        DITOLAK
                      </option>
                      <option
                        value="KEMBALI"
                        style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
                      >
                        KEMBALI
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex-grow rounded-lg m-8 md:ml-0 bg-white p-8">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 className="font-bold text-c-text-dark text-xl">
                Recent Transaction
              </h2>
              <Link href="/order-list">
                <button
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.02em",
                    fontWeight: "700",
                    color: "#3563E9",
                    display: "inline-block",
                    padding: "0.3em 2em",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  View All
                </button>
              </Link>
            </div>
            {mergedData.slice(0, 5).map((data) => (
              <div
                key={data._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "40px",
                  marginTop: "40px",
                }}
              >
                {data.kendaraan.img_url && (
                  <div
                  onClick={() => setSelectedData(data)}
                    style={{
                      width: "150px",
                      height: "75px",
                      position: "relative",
                      marginRight: "20px",
                      cursor: "pointer",
                    }}
                  >
                    <Image
                      src={data.kendaraan.img_url[0]}
                      alt={data.kendaraan.nama}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div>
                    <p className="font-bold text-c-text-dark tracking-wide mb-[6px]">
                      {data.kendaraan.nama}
                    </p>
                    <button
                      onClick={() => setSelectedData(data)}
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.05em",
                        fontWeight: "semi-bold",
                        backgroundColor:
                          data.status === "DITOLAK"
                            ? "#FFA37A"
                            : data.status === "KONFIRMASI"
                            ? "#96FDF1"
                            : data.status === "DISEWA"
                            ? "#7EC2FF"
                            : data.status === "DIAJUKAN"
                            ? "#FFE488"
                            : "#BCE455",
                        color:
                          data.status === "DITOLAK"
                            ? "#930B16"
                            : data.status === "KONFIRMASI"
                            ? "#357672"
                            : data.status === "DISEWA"
                            ? "#1A4393"
                            : data.status === "DIAJUKAN"
                            ? "#7A4D0B"
                            : "#4C7A0B",
                        display: "inline-block",
                        padding: "0.3em 2em",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      {isUpdating && data._id === selectedData._id
                        ? "Updating status..."
                        : data.status}
                    </button>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p className="mb-2 font-semibold text-c-text-grey">
                      {new Date(data.tanggal_sewa).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                      })}
                    </p>
                    <p className="font-bold text-[16px]">
                      Rp{data.total_harga.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      ) : (
        <div className="flex items-center justify-center h-screen pt-20">
          <span className="text-lg font-black">
            Anda tidak memiliki akses ke halaman ini
          </span>
        </div>
      )}
    </>
  );
}
