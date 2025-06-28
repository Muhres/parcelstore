parcel-shop/
├── public/
│   ├── index.html
│   ├── css/
│   │   ├── style.css
│   │   └── bootstrap.min.css
│   ├── js/
│   │   ├── script.js
│   │   ├── drag-drop.js  (Untuk fungsionalitas drag and drop)
│   │   ├── bootstrap.bundle.min.js
│   │   └── other-libs.js (Jika ada library JS tambahan)
│   ├── assets/
│   │   ├── images/
│   │   │   ├── item-buah/
│   │   │   ├── item-makanan/
│   │   │   └── item-minuman/
│   │   └── icons/
├── server/
│   ├── app.js             (File utama server)
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   └── authRoutes.js  (Jika ada autentikasi pengguna)
│   ├── models/
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── User.js
│   ├── config/
│   │   ├── db.js          (Konfigurasi database)
│   │   └── secrets.js     (Kunci API, dll.)
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   └── authController.js
├── .env                  (Variabel lingkungan)
├── package.json
├── package-lock.json
├── README.md

<!--  -->

