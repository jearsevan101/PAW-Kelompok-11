import Image from "next/image";
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
  const [customerId, setCustomerId] = useState(null);

  const handleDelete = (id) => {
    const userConfirmation = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (userConfirmation) {
      axios
        .delete(`https://paw-kelompok-11-server.vercel.app/api/sewa/${id}`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        })
        .then((response) => {
          // Remove the deleted item from the local state
          const updatedData = mergedData.filter((data) => data._id !== id);
          setMergedData(updatedData);
          if (selectedData._id === id) {
            setSelectedData(updatedData[0] || null);
          }
          // Reload the window
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        });
    }
  };

  useEffect(() => {
    try {
      const cId = jwtDecode(Cookies.get("auth_info")).id;
      setCustomerId(cId);
    } catch (err) {
      console.log("Error: ", err.message);
    }
  });
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
        setkendaraanListSearch(response.data);
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
    event.preventDefault();
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
      .get(
        `https://paw-kelompok-11-server.vercel.app/api/sewa/customer/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      )
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
  }, [customerId]);

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
      setMergedData(merged);
      if (selectedData === null && merged.length > 0) {
        setSelectedData(merged[0]);
      }
    }
  }, [sewaList, kendaraanList, customerList, selectedData]);

  return (
    <>
      <Navbar
        onSearchSend={handleNameChange}
        onFilterSend={handleFiltersChange}
      />
      {customerId !== null && customerId.length > 0 ? (
        <main className="container min-h-screen pt-20 bg-[#F6F7F9] flex flex-col sm:flex-row justify-between px-4 sm:px-0">
          <div className="object-cover relative w-full sm:w-[720px] p-8 h-[screen] rounded-xl overflow-hidden bg-[#FFFFFF] ml-[24px] mb-[36px] mt-[36px]">
            <h2 className="font-bold text-c-text-dark text-xl mb-[40px]">
              Recent Rental
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
                    {selectedData.total_harga
                      ? `Rp ${selectedData.total_harga.toLocaleString("id-ID")}`
                      : "N/A"}
                  </p>
                  <div className style={{ textAlign: "center" }}>
                    <button
                      onClick={() => handleDelete(selectedData._id)}
                      style={{
                        fontSize: "15px",
                        width: "80%",
                        letterSpacing: "0.05em",
                        fontWeight: "semi-bold",
                        backgroundColor: "#FFA37A",
                        color: "#930B16",
                        display: "inline-block",
                        padding: "0.3em 2em",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="object-cover relative w-full sm:w-[720px] p-8 h-[screen] rounded-xl overflow-hidden bg-[#FFFFFF] mb-[36px] mt-[36px]">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 className="font-bold text-c-text-dark text-xl">
                History Transaction
              </h2>
            </div>
            {mergedData.map((data) => (
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
                    style={{
                      width: "150px",
                      height: "75px",
                      position: "relative",
                      marginRight: "20px",
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
                            ? "#FFF506"
                            : data.status === "DISEWA"
                            ? "#7EC2FF"
                            : data.status === "DIAJUKAN"
                            ? "#FFE488"
                            : "#BCE455",
                        color:
                          data.status === "DITOLAK"
                            ? "#930B16"
                            : data.status === "KONFIRMASI"
                            ? "#9E7B00"
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
                      {data.total_harga
                        ? `Rp ${data.total_harga.toLocaleString("id-ID")}`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      ) : (
        <span>Anda belum login</span>
      )}
    </>
  );
}
