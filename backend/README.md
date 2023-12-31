## Dokumentasi Endpoint Backend
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
6.  Sort Kendaraan by Harga <br>
    Menampilkan semua kendaraan dan mengurutkannya berdasarkan harga secara asc (naik) atau desc (menurun)<br>
    Endpoint: <br>
    ```
    GET /api/kendaraan?sort=asc
    ```
7. Get all kota with kendaraan <br>
   Mendapatkan semua kota yang memiliki kendaraan untuk disewa<br>
   Endpoint: <br>
   ```
   GET /api/kendaraan/kota
   ```
8. Get Kendaraan by filter
   Mendapatkan kendaraan berdasarkan capacity, price, type, kota <br>
   Endpoint: <br>
   ```
   GET /api/kendaraan?hargaBelow=${price}&capacity=${capacity}&type=${type}&kota=${kota}
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
7.  get sorted sewa by params <br>
    Mendapatkan semua sewa dalam keadaan sorted <br>
    params: field, value: field yang ingin di sort <br>
    contoh request sort by status: GET /api/sewa/sort?field=status <br>
    ```
    GET /api/sewa/sort
    ```
8.  Get Sewa by CustomerID
    Mendapatkan sewa berdasarkan user CustomerID <br>
    Endpoint: <br>
    ```
    GET /api/sewa/customer/:customer_id
    ```
