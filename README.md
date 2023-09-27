# PAW-Kelompok-11
Tugas Pengembangan Aplikasi Web

## Dokumentasi Endpoint
### Customer
1.  Get all customers <br>
    Mendapatkan semua customer yang ada di database <br>
    Endpoint: <br>
    ```
    GET /api/customer
    ```
2.  Get Customer By Id <br>
    Mendapatkan customer sesuai dengan id yang diberikan <br>
    Endpoint: <br>
    ```
    GET /api/customer/:id
    ```
3.  Create new Customer <br>
    Membuat customer baru <br>
    Endpoint: <br>
    ```
    POST /api/customer
    ```
4.  Delete existing customer <br>
    Menghapus customer yang ada di database berdasarkan Id <br>
    Endpoint: <br>
    ```
    DELETE /api/customer/:id
    ```
5.  Update Customer by Id <br>
    Merubah data customer berdasarkan Id <br>
    Endpoint: <br>
    ```
    PUT /api/customer/:id
    ```
### Kendaraan
1.  Get all Kendaraan <br>
    Mendapatkan semua kendaraan yang ada di database <br>
    Endpoint: <br>
    ```
    GET /api/kendaraan
    ```
2.  Get Kendaraan By Id <br>
    Mendapatkan kendaraan sesuai dengan id yang diberikan <br>
    Endpoint: <br>
    ```
    GET /api/kendaraan/:id
    ```
3.  Create new Kendaraan <br>
    Membuat data kendaraan baru <br>
    Endpoint: <br>
    ```
    POST /api/kendaraan
    ```
4.  Delete existing Kendaraan <br>
    Menghapus kendaraan yang ada di database berdasarkan Id <br>
    Endpoint: <br>
    ```
    DELETE /api/kendaraan/:id
    ```
5.  Update Kendaraan by Id <br>
    Merubah data customer berdasarkan Id <br>
    Endpoint: <br>
    ```
    PUT /api/kendaraan/:id
    ```
### Sewa
1.  Get all Sewa <br>
    Mendapatkan semua data Sewa yang ada di database <br>
    Endpoint: <br>
    ```
    GET /api/sewa
    ```
2.  Get Sewa By Id <br>
    Mendapatkan data sewa sesuai dengan id yang diberikan <br>
    Endpoint: <br>
    ```
    GET /api/sewa/:id
    ```
3.  Create new Sewa <br>
    Membuat data sewa baru <br>
    Endpoint: <br>
    ```
    POST /api/sewa
    ```
4.  Delete existing Sewa <br>
    Menghapus sewa yang ada di database berdasarkan Id <br>
    Endpoint: <br>
    ```
    DELETE /api/sewa/:id
    ```
5.  Update sewa by Id <br>
    Merubah data sewa berdasarkan Id <br>
    Endpoint: <br>
    ```
    PUT /api/sewa/:id
    ```
6.  Update Status sewa by Id <br>
    Merubah data status sewa pada Sewa dan Customer berdasarkan Id <br>
    Endpoint: <br>
    ```
    PUT /api/sewa/status/:id
    ```
## How to Run this Project in Local
- [Download](https://nodejs.org/en/download/) and install **Node.js** version `16.15` or higher.
- Clone this project on your computer.
  ```bash
     https://github.com/jearsevan101/PAW-Kelompok-11.git
   ```

### Backend

Go to the server project directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
