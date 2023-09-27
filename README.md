# PAW-Kelompok-11
Tugas Pengembangan Aplikasi Web

## Dokumentasi Endpoint
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
