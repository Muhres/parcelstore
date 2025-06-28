// public/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    const productListElement = document.getElementById('all-product-list'); 
    const parcelSizeSelect = document.getElementById('parcel-size-select');
    const currentItemCountSpan = document.getElementById('current-item-count');
    const totalPriceSpan = document.getElementById('total-price');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const parcelErrorMessage = document.getElementById('parcel-error-message');
    const cartItemCountSpan = document.getElementById('cart-item-count');
    const cartItemsDisplay = document.getElementById('cart-items-display');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const checkoutBtn = document.getElementById('checkout-btn');
    const searchProductInput = document.getElementById('search-product-input');

    let currentParcelItems = []; 
    let cart = []; 

    const parcelLimits = {
        small: { min: 5, max: 10 },
        medium: { min: 10, max: 15 },
        large: { min: 15, max: Infinity }
    };

    let selectedParcelSize = parcelSizeSelect.value; 

    const allProductsData = [
        // Buah-buahan (15 item)
        { id: 'F01', name: 'Anggur Merah', price: 50000, imageUrl: 'assets/images/item-buah/anggur.jpg', category: 'buah', description: 'Anggur segar premium.' },
        { id: 'F02', name: 'Apel Fuji', price: 8000, imageUrl: 'assets/images/item-buah/apel.jpg', category: 'buah', description: 'Apel renyah dan manis.' },
        { id: 'F03', name: 'Pisang Cavendish', price: 25000, imageUrl: 'assets/images/item-buah/pisang.jpg', category: 'buah', description: 'Pisang pilihan kualitas terbaik.' },
        { id: 'F04', name: 'Jeruk Sunkist', price: 35000, imageUrl: 'assets/images/item-buah/jeruk.jpg', category: 'buah', description: 'Jeruk manis kaya vitamin C.' },
        { id: 'F05', name: 'Stroberi', price: 45000, imageUrl: 'assets/images/item-buah/stroberi.jpg', category: 'buah', description: 'Stroberi segar dan asam manis.' },
        { id: 'F06', name: 'Pear Century', price: 28000, imageUrl: 'assets/images/item-buah/pear.jpg', category: 'buah', description: 'Pear renyah dan berair.' },
        { id: 'F07', name: 'Melon', price: 40000, imageUrl: 'assets/images/item-buah/melon.jpg', category: 'buah', description: 'Melon manis dan harum.' },
        { id: 'F08', name: 'Semangka', price: 30000, imageUrl: 'assets/images/item-buah/semangka.jpg', category: 'buah', description: 'Semangka merah segar.' },
        { id: 'F09', name: 'Mangga Harum Manis', price: 20000, imageUrl: 'assets/images/item-buah/mangga.jpg', category: 'buah', description: 'Mangga manis khas Indonesia.' },
        { id: 'F10', name: 'Salak Pondoh', price: 18000, imageUrl: 'assets/images/item-buah/salak.jpg', category: 'buah', description: 'Salak renyah dan manis.' },
        { id: 'F11', name: 'Alpukat', price: 22000, imageUrl: 'assets/images/item-buah/alpukat.jpg', category: 'buah', description: 'Alpukat mentega creamy.' },
        { id: 'F12', name: 'Naga Merah', price: 38000, imageUrl: 'assets/images/item-buah/naga.jpg', category: 'buah', description: 'Buah naga merah segar.' },
        { id: 'F13', name: 'Jambu Biji Merah', price: 15000, imageUrl: 'assets/images/item-buah/jambu.jpg', category: 'buah', description: 'Jambu biji kaya vitamin C.' },
        { id: 'F14', name: 'Rambutan Binjai', price: 25000, imageUrl: 'assets/images/item-buah/rambutan.jpg', category: 'buah', description: 'Rambutan manis dan segar.' },
        { id: 'F15', name: 'Durian Monthong', price: 150000, imageUrl: 'assets/images/item-buah/durian.jpg', category: 'buah', description: 'Raja buah dengan aroma khas.' },

        // Makanan Kemasan (20 item)
        { id: 'M01', name: 'Keripik Kentang Lay\'s', price: 15000, imageUrl: 'assets/images/item-makanan/lays.jpg', category: 'makanan-kemasan', description: 'Snack keripik kentang renyah.' },
        { id: 'M02', name: 'Biskuit Regal', price: 20000, imageUrl: 'assets/images/item-makanan/regal.jpg', category: 'makanan-kemasan', description: 'Biskuit susu klasik.' },
        { id: 'M03', name: 'Chocolatos Wafer Roll', price: 10000, imageUrl: 'assets/images/item-makanan/chocolatos.jpg', category: 'makanan-kemasan', description: 'Wafer roll cokelat lezat.' },
        { id: 'M04', name: 'Good Time Cookies', price: 22000, imageUrl: 'assets/images/item-makanan/goodtime.jpg', category: 'makanan-kemasan', description: 'Kue kering dengan choco chips.' },
        { id: 'M05', name: 'Pocky Chocolate', price: 18000, imageUrl: 'assets/images/item-makanan/pocky.jpg', category: 'makanan-kemasan', description: 'Biskuit stik berlapis cokelat.' },
        { id: 'M06', name: 'Oreo Original', price: 14000, imageUrl: 'assets/images/item-makanan/oreo.jpg', category: 'makanan-kemasan', description: 'Biskuit hitam dengan krim putih.' },
        { id: 'M07', name: 'Indomie Goreng', price: 3500, imageUrl: 'assets/images/item-makanan/indomie.jpg', category: 'makanan-kemasan', description: 'Mie instan goreng favorit.' },
        { id: 'M08', name: 'Qtela Keripik Singkong', price: 12000, imageUrl: 'assets/images/item-makanan/qtela.jpg', category: 'makanan-kemasan', description: 'Keripik singkong gurih.' },
        { id: 'M09', name: 'Beng-Beng Share It', price: 25000, imageUrl: 'assets/images/item-makanan/bengbeng.jpg', category: 'makanan-kemasan', description: 'Wafer karamel cokelat crunchy.' },
        { id: 'M10', name: 'SilverQueen Cashew', price: 18000, imageUrl: 'assets/images/item-makanan/silverqueen.jpg', category: 'makanan-kemasan', description: 'Cokelat batangan dengan kacang mete.' },
        { id: 'M11', name: 'Tic Tac Orange', price: 8000, imageUrl: 'assets/images/item-makanan/tictac.jpg', category: 'makanan-kemasan', description: 'Permen mini rasa jeruk.' },
        { id: 'M12', name: 'Pop Mie Kuah Ayam Bawang', price: 4000, imageUrl: 'assets/images/item-makanan/popmie.jpg', category: 'makanan-kemasan', description: 'Mie instan cup praktis.' },
        { id: 'M13', name: 'Nissin Wafers Cokelat', price: 17000, imageUrl: 'assets/images/item-makanan/nissinwafer.jpg', category: 'makanan-kemasan', description: 'Wafer renyah rasa cokelat.' },
        { id: 'M14', name: 'Richeese Nabati Wafer Keju', price: 12000, imageUrl: 'assets/images/item-makanan/nabati.jpg', category: 'makanan-kemasan', description: 'Wafer renyah rasa keju.' },
        { id: 'M15', name: 'Momogi Rasa Jagung Bakar', price: 2000, imageUrl: 'assets/images/item-makanan/momogi.jpg', category: 'makanan-kemasan', description: 'Snack stik rasa jagung.' },
        { id: 'M16', name: 'Taro Net Seaweed', price: 13000, imageUrl: 'assets/images/item-makanan/taro.jpg', category: 'makanan-kemasan', description: 'Snack jaring rasa rumput laut.' },
        { id: 'M17', name: 'Slai Olai Nanas', price: 11000, imageUrl: 'assets/images/item-makanan/slaiolai.jpg', category: 'makanan-kemasan', description: 'Biskuit dengan isian selai nanas.' },
        { id: 'M18', name: 'Roma Kelapa', price: 16000, imageUrl: 'assets/images/item-makanan/romakelapa.jpg', category: 'makanan-kemasan', description: 'Biskuit kelapa renyah.' },
        { id: 'M19', name: 'Khong Guan Assorted Biscuits', price: 55000, imageUrl: 'assets/images/item-makanan/khongguan.jpg', category: 'makanan-kemasan', description: 'Aneka biskuit kaleng.' },
        { id: 'M20', name: 'Sari Gandum Sandwich Cokelat', price: 10000, imageUrl: 'assets/images/item-makanan/sarigandum.jpg', category: 'makanan-kemasan', description: 'Biskuit gandum sandwich cokelat.' },

        // Minuman Kemasan (10 item)
        { id: 'D01', name: 'Ultra Milk Cokelat 1L', price: 18000, imageUrl: 'assets/images/item-minuman/ultramilk.jpg', category: 'minuman-kemasan', description: 'Susu UHT cokelat ukuran besar.' },
        { id: 'D02', name: 'UC1000 Orange', price: 9000, imageUrl: 'assets/images/item-minuman/uc1000.jpg', category: 'minuman-kemasan', description: 'Minuman kesehatan vitamin C.' },
        { id: 'D03', name: 'Teh Pucuk Harum 350ml', price: 5000, imageUrl: 'assets/images/item-minuman/tehpucuk.jpg', category: 'minuman-kemasan', description: 'Minuman teh melati.' },
        { id: 'D04', name: 'Aqua Air Mineral 600ml', price: 3000, imageUrl: 'assets/images/item-minuman/aqua.jpg', category: 'minuman-kemasan', description: 'Air mineral kemasan.' },
        { id: 'D05', name: 'Milo UHT 180ml', price: 7000, imageUrl: 'assets/images/item-minuman/milo.jpg', category: 'minuman-kemasan', description: 'Susu cokelat malt.' },
        { id: 'D06', name: 'Floridina Orange 350ml', price: 6000, imageUrl: 'assets/images/item-minuman/floridina.jpg', category: 'minuman-kemasan', description: 'Minuman jeruk bulir asli.' },
        { id: 'D07', name: 'Coca-Cola 330ml', price: 8000, imageUrl: 'assets/images/item-minuman/coke.jpg', category: 'minuman-kemasan', description: 'Minuman soda bersoda.' },
        { id: 'D08', name: 'Frestea Jasmine 500ml', price: 7000, imageUrl: 'assets/images/item-minuman/frestea.jpg', category: 'minuman-kemasan', description: 'Minuman teh hijau melati.' },
        { id: 'D09', name: 'Good Day Coffee Freeze', price: 9500, imageUrl: 'assets/images/item-minuman/goodday.jpg', category: 'minuman-kemasan', description: 'Minuman kopi siap minum.' },
        { id: 'D10', name: 'Minute Maid Pulpy Orange 300ml', price: 8500, imageUrl: 'assets/images/item-minuman/minutemaid.jpg', category: 'minuman-kemasan', description: 'Minuman jeruk dengan bulir.' },
    ];

    // Fungsi untuk memuat produk awal (semua)
    const loadProducts = async () => {
        displayProducts(allProductsData, productListElement);
    };

    // Fungsi untuk menampilkan produk di DOM
    const displayProducts = (products, targetElement) => {
        targetElement.innerHTML = '';
        products.forEach(product => {
            const productCard = `
                <div class="col product-card draggable" data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="${product.price}" data-product-category="${product.category}">
                    <div class="card h-100 shadow-sm" draggable="true">
                        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text text-muted">${product.description}</p>
                            <p class="card-text fw-bold">Rp${product.price.toLocaleString('id-ID')}</p>
                        </div>
                    </div>
                </div>
            `;
            targetElement.insertAdjacentHTML('beforeend', productCard);
        });
    };

    // Fungsi untuk memperbarui tampilan parsel
    const updateParcelDisplay = () => {
        const parcelItemsContainer = document.getElementById('parcel-items');
        parcelItemsContainer.innerHTML = '';
        let total = 0;

        const placeholderIcon = parcelItemsContainer.parentElement.querySelector('i');
        const placeholderText = parcelItemsContainer.parentElement.querySelector('p');

        if (currentParcelItems.length === 0) {
            if (placeholderIcon) placeholderIcon.style.display = 'block';
            if (placeholderText) placeholderText.style.display = 'block';
        } else {
            if (placeholderIcon) placeholderIcon.style.display = 'none';
            if (placeholderText) placeholderText.style.display = 'none';
        }

        currentParcelItems.forEach(item => {
            const itemElement = `
                <div class="parcel-item" data-product-id="${item.id}">
                    <span>${item.name}</span>
                    <span>Rp${item.price.toLocaleString('id-ID')} <i class="fas fa-times-circle remove-item ms-2"></i></span>
                </div>
            `;
            parcelItemsContainer.insertAdjacentHTML('beforeend', itemElement);
            total += item.price;
        });

        currentItemCountSpan.textContent = currentParcelItems.length;
        totalPriceSpan.textContent = `Rp${total.toLocaleString('id-ID')}`;
        validateParcel();
    };

    // Fungsi untuk memvalidasi jumlah item di parsel
    const validateParcel = () => {
        const currentCount = currentParcelItems.length;
        const limits = parcelLimits[selectedParcelSize];
        let isValid = true;
        let message = '';

        if (currentCount < limits.min) {
            isValid = false;
            message = `Minimal ${limits.min} item untuk parsel ${selectedParcelSize.toUpperCase()}.`;
        } else if (currentCount > limits.max) {
            isValid = false;
            message = `Maksimal ${limits.max} item untuk parsel ${selectedParcelSize.toUpperCase()}.`;
        }

        if (isValid) {
            addToCartBtn.removeAttribute('disabled');
            parcelErrorMessage.textContent = '';
            parcelErrorMessage.classList.remove('text-danger');
        } else {
            addToCartBtn.setAttribute('disabled', 'true');
            parcelErrorMessage.textContent = message;
            parcelErrorMessage.classList.add('text-danger');
        }
    };

    // Event Listener untuk perubahan ukuran parsel
    parcelSizeSelect.addEventListener('change', (event) => {
        selectedParcelSize = event.target.value;
        validateParcel();
    });

    // Event Listener untuk menghapus item dari parsel
    document.getElementById('parcel-items').addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const itemElement = event.target.closest('.parcel-item');
            const productId = itemElement.dataset.productId;
            currentParcelItems = currentParcelItems.filter(item => item.id !== productId);
            updateParcelDisplay();
        }
    });

    // Event Listener untuk tombol "Tambah ke Keranjang"
    addToCartBtn.addEventListener('click', () => {
        if (currentParcelItems.length > 0 && !addToCartBtn.disabled) {
            const total = currentParcelItems.reduce((sum, item) => sum + item.price, 0);
            const newParcel = {
                id: `parcel-${Date.now()}`,
                type: selectedParcelSize,
                items: [...currentParcelItems],
                totalPrice: total
            };
            cart.push(newParcel);
            updateCartDisplay();
            
            currentParcelItems = [];
            updateParcelDisplay();
            parcelSizeSelect.value = 'small';
            selectedParcelSize = 'small';
            alert('Parsel berhasil ditambahkan ke keranjang!');
            
            const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
            cartModal.show();
        } else {
            alert('Silakan sesuaikan parsel Anda terlebih dahulu atau periksa batas item.');
        }
    });

    // Fungsi untuk memperbarui tampilan keranjang belanja
    const updateCartDisplay = () => {
        cartItemCountSpan.textContent = cart.length;
        cartItemsDisplay.innerHTML = '';
        let totalCartPrice = 0;

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
        } else {
            emptyCartMessage.style.display = 'none';
            cart.forEach(parcel => {
                const parcelElement = `
                    <div class="card mb-3 shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title">${parcel.type.charAt(0).toUpperCase() + parcel.type.slice(1)} Parsel (${parcel.items.length} item)</h5>
                            <ul class="list-group list-group-flush mb-2">
                                ${parcel.items.map(item => `<li class="list-group-item d-flex justify-content-between align-items-center">${item.name} <span>Rp${item.price.toLocaleString('id-ID')}</span></li>`).join('')}
                            </ul>
                            <div class="d-flex justify-content-between align-items-center fw-bold mt-2">
                                <span>Total Parsel:</span>
                                <span>Rp${parcel.totalPrice.toLocaleString('id-ID')}</span>
                            </div>
                            <button class="btn btn-sm btn-danger mt-3 remove-parcel-btn" data-parcel-id="${parcel.id}">Hapus Parsel</button>
                        </div>
                    </div>
                `;
                cartItemsDisplay.insertAdjacentHTML('beforeend', parcelElement);
                totalCartPrice += parcel.totalPrice;
            });
        }
        cartTotalPrice.textContent = `Rp${totalCartPrice.toLocaleString('id-ID')}`;
    };

    // Event listener untuk menghapus parsel dari keranjang
    cartItemsDisplay.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-parcel-btn')) {
            const parcelIdToRemove = event.target.dataset.parcelId;
            cart = cart.filter(parcel => parcel.id !== parcelIdToRemove);
            updateCartDisplay();
        }
    });

    // Event listener untuk tombol Checkout
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Melanjutkan ke halaman checkout! (Fungsionalitas ini akan dibangun di fase selanjutnya)');
        } else {
            alert('Keranjang belanja Anda kosong. Silakan tambahkan parsel terlebih dahulu.');
        }
    });
    
    // Event listener untuk tombol "Mulai Kustomisasi Sekarang"
    document.getElementById('start-customizing-btn').addEventListener('click', () => {
        const customizationArea = document.querySelector('.customization-area');
        customizationArea.scrollIntoView({ behavior: 'smooth' });
    });

    // Event Listener untuk filter kategori produk
    document.getElementById('productCategoryTab').addEventListener('shown.bs.tab', async (event) => {
        const targetId = event.target.dataset.bsTarget;
        const categoryTab = event.target.id.replace('-tab', '');

        const targetProductListContainer = document.querySelector(targetId + ' .row');

        let filteredProducts = [];
        if (categoryTab === 'all') {
            filteredProducts = allProductsData;
        } else {
            const mappedCategory = {
                'fruits': 'buah',
                'snacks': 'makanan-kemasan',
                'drinks': 'minuman-kemasan'
            }[categoryTab];

            filteredProducts = allProductsData.filter(p => p.category === mappedCategory);
        }
        
        displayProducts(filteredProducts, targetProductListContainer);
    });

    // Event listener untuk pencarian produk
    searchProductInput.addEventListener('keyup', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const activeTabPane = document.querySelector('.tab-pane.show.active');
        const productCardsInActiveTab = activeTabPane.querySelectorAll('.product-card');

        productCardsInActiveTab.forEach(card => {
            const productName = card.dataset.productName.toLowerCase();
            if (productName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Event Listener untuk Menerima Produk dari Drag & Drop
    document.addEventListener('productAddedToParcel', (event) => {
        const product = event.detail;
        const limits = parcelLimits[selectedParcelSize];

        if (currentParcelItems.length < limits.max) {
            currentParcelItems.push(product);
            updateParcelDisplay();
            parcelErrorMessage.textContent = '';
            parcelErrorMessage.classList.remove('text-danger');
        } else {
            parcelErrorMessage.textContent = `Batas maksimum ${limits.max} item untuk parsel ${selectedParcelSize.toUpperCase()} telah tercapai.`;
            parcelErrorMessage.classList.add('text-danger');
        }
    });


    // Inisialisasi awal
    loadProducts(); 
    updateParcelDisplay(); 
    updateCartDisplay(); 
});
