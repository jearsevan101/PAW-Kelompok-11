import Link from 'next/link';
import Image from 'next/image';
import SideBar from 'components/SideBar';
import Navbar from "@/components/navbar";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [sewaList, setSewaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kendaraanList, setKendaraanList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [mergedData, setMergedData] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = (event, id) => {
    const newStatus = event.target.value;
    const updatedData = mergedData.map(data => {
      if (data._id === id) {
        return { ...data, status: newStatus };
      }
      return data;
    });
    const updatedSelectedData = updatedData.find(data => data._id === selectedData._id);
    setSelectedData(updatedSelectedData);

    setIsUpdating(true);

    axios
      .put(`https://paw-kelompok-11-server.vercel.app/api/sewa/${id}`, { status: newStatus })
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
      .get("https://paw-kelompok-11-server.vercel.app/api/sewa/")
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
    if (sewaList.length > 0 && kendaraanList.length > 0 && customerList.length > 0) {
      const merged = sewaList.map(sewa => {
        const matchingKendaraan = kendaraanList.find(kendaraan => kendaraan._id === sewa.kendaraan_id);
        const matchingCustomer = customerList.find(customer => customer._id === sewa.customer_id);

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

  const handleNameChange = (query) => {
    setName(query);
  };

  return (
    <>
      <Navbar onSearchSend={handleNameChange} />
      <main className="container min-h-screen pt-20 bg-[#F6F7F9] flex flex-col sm:flex-row justify-between px-4 sm:px-0">
        <div className="object-cover relative w-full sm:w-[250px] p-8 h-[screen] overflow-hidden bg-[#FFFFFF]">
          <SideBar />
        </div>
        <div className="object-cover relative w-full sm:w-[600px] p-8 h-[screen] rounded-xl overflow-hidden bg-[#FFFFFF] ml-[24px] mb-[36px] mt-[36px]">
          <h2 className="font-bold text-c-text-dark text-xl mb-[40px]">
            Details Rental
          </h2>
          {selectedData && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {selectedData.kendaraan.img_url && (
                  <div style={{ width: '150px', height: '75px', position: 'relative', marginRight: '20px' }}>
                    <Image src={selectedData.kendaraan.img_url[0]} alt={selectedData.kendaraan.nama} layout="fill" objectFit="contain" />
                  </div>
                )}
                <div>
                  <p className='font-[900] text-[24px]'>{selectedData.kendaraan.nama}</p>
                  <p className='font-[500] text-c-text-grey'>{selectedData.kendaraan.type}</p>
                </div>
              </div>
              <div>
                <div className='font-semibold mt-[40px] text-[16px]'> Nama : </div>
                <p className='font-semibold text-c-text-grey text-[16px]'>{selectedData.customer.nama}</p>
                <div className='font-semibold text-[16px]'> Email : </div>
                <p className='font-semibold text-[16px] text-c-text-grey'>{selectedData.customer.email}</p>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                  <img src="/Calendar.png" alt="Date Icon" style={{ marginRight: '10px' }} />
                  <div className='font-semibold text-[16px]' style={{ marginRight: '10px' }}> Pick-Up  
                  </div>
                </div>
                <div className='ml-[40px]'>
                  <div className='font-bold text-[16px] mb-[7px]'> Date </div>
                  <div className='font-semibold text-c-text-grey text-[14px]'>{new Date(selectedData.tanggal_sewa).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric'})}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                  <img src="/Calendar.png" alt="Date Icon" style={{ marginRight: '10px' }} />
                  <div className='font-semibold text-[16px]' style={{ marginRight: '10px' }}> Drop-Off  
                  </div>
                </div>
                <div className='ml-[40px]'>
                  <div className='font-bold text-[16px] mb-[7px]'> Date </div>
                  <div className='font-semibold text-c-text-grey text-[14px]'>{new Date(selectedData.tanggal_kembali).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric'})}</div>
                </div>
                <p className='font-bold text-[24px]' style={{ textAlign: 'right', marginTop: '10px', marginBottom: '40px' }} >Rp{selectedData.total_harga.toLocaleString('id-ID')}</p>
                <div className style={{textAlign: 'right'}}>
                <div className='font-bold text-[16px]'> Status </div>
                <select 
                  onChange={(event) => handleStatusChange(event, selectedData._id)} 
                  value={selectedData.status}
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.05em',
                    fontWeight: 'semi-bold',
                    backgroundColor: selectedData.status === 'Ditolak' ? '#FFA37A' : selectedData.status === 'Konfirmasi' ? '#7EC2FF' : '#BCE455',
                    color: selectedData.status === 'Ditolak' ? '#930B16' : selectedData.status === 'Konfirmasi' ? '#1A4393' : '#4C7A0B',
                    display: 'inline-block',
                    padding: '0.3em 2em',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Konfirmasi" style={{backgroundColor: '#FFFFFF'}}>Konfirmasi</option>
                  <option value="Diajukan" style={{backgroundColor: '#FFFFFF'}}>Diajukan</option>
                  <option value="Ditolak" style={{backgroundColor: '#FFFFFF'}}>Ditolak</option>
                </select>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="object-cover relative w-full sm:w-[600px] p-8 h-[screen] rounded-xl overflow-hidden bg-[#FFFFFF] ml-[24px] mb-[36px] mt-[36px] mr-[20px]">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="font-bold text-c-text-dark text-xl">Recent Transaction</h2>
            <button style={{
              fontSize: '12px',
              letterSpacing: '0.02em',
              fontWeight: '700',
              color: '#3563E9',
              display: 'inline-block',
              padding: '0.3em 2em',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              View All
            </button>
          </div>
          {mergedData.slice(0, 5).map(data => (
            <div key={data._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '40px',marginTop: '40px' }}>
              {data.kendaraan.img_url && (
                <div style={{ width: '150px', height: '75px', position: 'relative', marginRight: '20px' }}>
                  <Image src={data.kendaraan.img_url[0]} alt={data.kendaraan.nama} layout="fill" objectFit="contain" />
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div>
                  <p className='font-bold text-c-text-dark tracking-wide mb-[6px]'>{data.kendaraan.nama}</p>
                  <button onClick={() => setSelectedData(data)}
                    style={{
                      fontSize: '12px',
                      letterSpacing: '0.05em',
                      fontWeight: 'semi-bold',
                      backgroundColor: isUpdating && data._id === selectedData._id ? '#FFFFFF' : data.status === 'Ditolak' ? '#FFA37A' : data.status === 'Konfirmasi' ? '#7EC2FF' : '#BCE455',
                      color: isUpdating && data._id === selectedData._id ? '#000000' : data.status === 'Ditolak' ? '#930B16' : data.status === 'Konfirmasi' ? '#1A4393' : '#4C7A0B',
                      display: 'inline-block',
                      padding: '0.3em 2em',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}>
                    {isUpdating && data._id === selectedData._id ? "Updating status..." : data.status}
                  </button>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p className='mb-2 font-semibold text-c-text-grey'>{new Date(data.tanggal_sewa).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}</p>
                  <p className='font-bold text-[16px]'>Rp{data.total_harga.toLocaleString('id-ID')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};
