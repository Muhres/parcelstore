// public/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Elemen DOM ---
    const productListElement = document.getElementById('all-product-list');
    const fruitProductListElement = document.getElementById('fruit-product-list');
    const snackProductListElement = document.getElementById('snack-product-list');
    const drinkProductListElement = document.getElementById('drink-product-list');

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
    const productCategoryTab = document.getElementById('productCategoryTab');
    const parcelItemsContainer = document.getElementById('parcel-items');
    const parcelDropArea = document.getElementById('parcel-drop-area'); // Ambil referensi drop area

    // --- State Aplikasi ---
    // currentParcelItems sekarang akan menyimpan objek dengan kuantitas:
    // [{ id: 'F01', name: 'Anggur Merah', price: 50000, quantity: 2 }, ...]
    let currentParcelItems = [];
    let cart = [];
    let selectedParcelSize = parcelSizeSelect.value;

    const parcelLimits = {
        small: { min: 5, max: 10 },
        medium: { min: 10, max: 15 },
        large: { min: 15, max: Infinity }
    };

    const allProductsData = [
        // Buah-buahan (15 item)
        { id: 'F01', name: 'Anggur Merah', price: 50000, imageUrl: 'assets/images/fruits/anggur.jpg', category: 'buah', description: 'Anggur segar premium.' },
        { id: 'F02', name: 'Apel Fuji', price: 8000, imageUrl: 'assets/images/fruits/apel.jpg', category: 'buah', description: 'Apel renyah dan manis.' },
        { id: 'F03', name: 'Pisang Cavendish', price: 25000, imageUrl: 'assets/images/fruits/pisang.jpg', category: 'buah', description: 'Pisang pilihan kualitas terbaik.' },
        { id: 'F04', name: 'Jeruk Sunkist', price: 35000, imageUrl: 'assets/images/fruits/jeruk.jpg', category: 'buah', description: 'Jeruk manis kaya vitamin C.' },
        { id: 'F05', name: 'Stroberi', price: 45000, imageUrl: 'assets/images/fruits/stroberi.jpg', category: 'buah', description: 'Stroberi segar dan asam manis.' },
        { id: 'F06', name: 'Pear Century', price: 28000, imageUrl: 'assets/images/fruits/pear.jpg', category: 'buah', description: 'Pear renyah dan berair.' },
        { id: 'F07', name: 'Melon', price: 40000, imageUrl: 'assets/images/fruits/melon.jpg', category: 'buah', description: 'Melon manis dan harum.' },
        { id: 'F08', name: 'Semangka', price: 30000, imageUrl: 'assets/images/fruits/semangka.jpg', category: 'buah', description: 'Semangka merah segar.' },
        { id: 'F09', name: 'Mangga Harum Manis', price: 20000, imageUrl: 'assets/images/fruits/mangga.jpg', category: 'buah', description: 'Mangga manis khas Indonesia.' },
        { id: 'F10', name: 'Salak Pondoh', price: 18000, imageUrl: 'assets/images/fruits/salak.jpg', category: 'buah', description: 'Salak renyah dan manis.' },
        { id: 'F11', name: 'Alpukat', price: 22000, imageUrl: 'assets/images/fruits/alpukat.jpg', category: 'buah', description: 'Alpukat mentega creamy.' },
        { id: 'F12', name: 'Naga Merah', price: 38000, imageUrl: 'assets/images/fruits/naga.jpg', category: 'buah', description: 'Buah naga merah segar.' },
        { id: 'F13', name: 'Jambu Biji Merah', price: 15000, imageUrl: 'assets/images/fruits/jambu.jpg', category: 'buah', description: 'Jambu biji kaya vitamin C.' },
        { id: 'F14', name: 'Rambutan Binjai', price: 25000, imageUrl: 'assets/images/fruits/rambutan.jpg', category: 'buah', description: 'Rambutan manis dan segar.' },
        { id: 'F15', name: 'Durian Monthong', price: 150000, imageUrl: 'assets/images/fruits/durian.jpg', category: 'buah', description: 'Raja buah dengan aroma khas.' },

        // Makanan Kemasan (20 item)
        { id: 'M01', name: 'Keripik Kentang Lay\'s', price: 15000, imageUrl: 'assets/images/snacks/lays.jpg', category: 'makanan-kemasan', description: 'Snack keripik kentang renyah.' },
        { id: 'M02', name: 'Biskuit Regal', price: 20000, imageUrl: 'assets/images/snacks/regal.jpg', category: 'makanan-kemasan', description: 'Biskuit susu klasik.' },
        { id: 'M03', name: 'Chocolatos Wafer Roll', price: 10000, imageUrl: 'assets/images/snacks/chocolatos.jpg', category: 'makanan-kemasan', description: 'Wafer roll cokelat lezat.' },
        { id: 'M04', name: 'Good Time Cookies', price: 22000, imageUrl: 'assets/images/snacks/goodtime.jpg', category: 'makanan-kemasan', description: 'Kue kering dengan choco chips.' },
        { id: 'M05', name: 'Pocky Chocolate', price: 18000, imageUrl: 'assets/images/snacks/pocky.jpg', category: 'makanan-kemasan', description: 'Biskuit stik berlapis cokelat.' },
        { id: 'M06', name: 'Oreo Original', price: 14000, imageUrl: 'assets/images/snacks/oreo.jpg', category: 'makanan-kemasan', description: 'Biskuit hitam dengan krim putih.' },
        { id: 'M07', name: 'Indomie Goreng', price: 3500, imageUrl: 'assets/images/snacks/indomie.jpg', category: 'makanan-kemasan', description: 'Mie instan goreng favorit.' },
        { id: 'M08', name: 'Qtela Keripik Singkong', price: 12000, imageUrl: 'assets/images/snacks/qtela.jpg', category: 'makanan-kemasan', description: 'Keripik singkong gurih.' },
        { id: 'M09', name: 'Beng-Beng Share It', price: 25000, imageUrl: 'assets/images/snacks/bengbeng.jpg', category: 'makanan-kemasan', description: 'Wafer karamel cokelat crunchy.' },
        { id: 'M10', name: 'SilverQueen Cashew', price: 18000, imageUrl: 'assets/images/snacks/silverqueen.jpg', category: 'makanan-kemasan', description: 'Cokelat batangan dengan kacang mete.' },
        { id: 'M11', name: 'Tic Tac Orange', price: 8000, imageUrl: 'assets/images/snacks/tictac.jpg', category: 'makanan-kemasan', description: 'Permen mini rasa jeruk.' },
        { id: 'M12', name: 'Pop Mie Kuah Ayam Bawang', price: 4000, imageUrl: 'assets/images/snacks/popmie.jpg', category: 'makanan-kemasan', description: 'Mie instan cup praktis.' },
        { id: 'M13', name: 'Nissin Wafers Cokelat', price: 17000, imageUrl: 'assets/images/snacks/nissinwafer.jpg', category: 'makanan-kemasan', description: 'Wafer renyah rasa cokelat.' },
        { id: 'M14', name: 'Richeese Nabati Wafer Keju', price: 12000, imageUrl: 'assets/images/snacks/nabati.jpg', category: 'makanan-kemasan', description: 'Wafer renyah rasa keju.' },
        { id: 'M15', name: 'Momogi Rasa Jagung Bakar', price: 2000, imageUrl: 'assets/images/snacks/momogi.jpg', category: 'makanan-kemasan', description: 'Snack stik rasa jagung.' },
        { id: 'M16', name: 'Taro Net Seaweed', price: 13000, imageUrl: 'assets/images/snacks/taro.jpg', category: 'makanan-kemasan', description: 'Snack jaring rasa rumput laut.' },
        { id: 'M17', name: 'Slai Olai Nanas', price: 11000, imageUrl: 'assets/images/snacks/slaiolai.jpg', category: 'makanan-kemasan', description: 'Biskuit dengan isian selai nanas.' },
        { id: 'M18', name: 'Roma Kelapa', price: 16000, imageUrl: 'assets/images/snacks/romakelapa.jpg', category: 'makanan-kemasan', description: 'Biskuit kelapa renyah.' },
        { id: 'M19', name: 'Khong Guan Assorted Biscuits', price: 55000, imageUrl: 'assets/images/snacks/khongguan.jpg', category: 'makanan-kemasan', description: 'Aneka biskuit kaleng.' },
        { id: 'M20', name: 'Sari Gandum Sandwich Cokelat', price: 10000, imageUrl: 'assets/images/snacks/sarigandum.jpg', category: 'makanan-kemasan', description: 'Biskuit gandum sandwich cokelat.' },

        // Minuman Kemasan (10 item)
        { id: 'D01', name: 'Ultra Milk Cokelat 1L', price: 18000, imageUrl: 'assets/images/drinks/ultramilk.jpg', category: 'minuman-kemasan', description: 'Susu UHT cokelat ukuran besar.' },
        { id: 'D02', name: 'UC1000 Orange', price: 9000, imageUrl: 'assets/images/drinks/uc1000.jpg', category: 'minuman-kemasan', description: 'Minuman kesehatan vitamin C.' },
        { id: 'D03', name: 'Teh Pucuk Harum 350ml', price: 5000, imageUrl: 'assets/images/drinks/tehpucuk.jpg', category: 'minuman-kemasan', description: 'Minuman teh melati.' },
        { id: 'D04', name: 'Aqua Air Mineral 600ml', price: 3000, imageUrl: 'assets/images/drinks/aqua.jpg', category: 'minuman-kemasan', description: 'Air mineral kemasan.' },
        { id: 'D05', name: 'Milo UHT 180ml', price: 7000, imageUrl: 'assets/images/drinks/milo.jpg', category: 'minuman-kemasan', description: 'Susu cokelat malt.' },
        { id: 'D06', name: 'Floridina Orange 350ml', price: 6000, imageUrl: 'assets/images/drinks/floridina.jpg', category: 'minuman-kemasan', description: 'Minuman jeruk bulir asli.' },
        { id: 'D07', name: 'Coca-Cola 330ml', price: 8000, imageUrl: 'assets/images/drinks/coke.jpg', category: 'minuman-kemasan', description: 'Minuman soda bersoda.' },
        { id: 'D08', name: 'Frestea Jasmine 500ml', price: 7000, imageUrl: 'assets/images/drinks/frestea.jpg', category: 'minuman-kemasan', description: 'Minuman teh hijau melati.' },
        { id: 'D09', name: 'Good Day Coffee Freeze', price: 9500, imageUrl: 'assets/images/drinks/goodday.jpg', category: 'minuman-kemasan', description: 'Minuman kopi siap minum.' },
        { id: 'D10', name: 'Minute Maid Pulpy Orange 300ml', price: 8500, imageUrl: 'assets/images/drinks/minutemaid.jpg', category: 'minuman-kemasan', description: 'Minuman jeruk dengan bulir.' },
    ];

    // --- Fungsi Bantuan ---

    /**
     * Mendeteksi apakah perangkat adalah perangkat sentuh (mobile/tablet).
     * @returns {boolean} True jika perangkat sentuh, false jika bukan.
     */
    const isTouchDevice = () => {
        return ('ontouchstart' in window) ||
               (navigator.maxTouchPoints > 0) ||
               (navigator.msMaxTouchPoints > 0);
    };

    /**
     * Menggambar produk ke DOM berdasarkan data yang diberikan dan elemen target.
     * @param {Array} products - Array objek produk.
     * @param {HTMLElement} targetElement - Elemen DOM tempat produk akan ditampilkan.
     */
    const displayProducts = (products, targetElement) => {
        targetElement.innerHTML = '';
        if (products.length === 0) {
            targetElement.innerHTML = '<p class="col-12 text-center text-muted">Produk tidak ditemukan.</p>';
            return;
        }
        products.forEach(product => {
            const productCard = `
                <div class="col product-card draggable"
                     data-product-id="${product.id}"
                     data-product-name="${product.name}"
                     data-product-price="${product.price}"
                     data-product-category="${product.category}">
                    <div class="card h-100 shadow-sm" draggable="${!isTouchDevice()}">
                        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text text-muted product-description">${product.description}</p>
                            <p class="card-text fw-bold">Rp${product.price.toLocaleString('id-ID')}</p>

                            <div class="quantity-controls mt-2 d-flex justify-content-center align-items-center">
                                <button class="btn btn-sm btn-outline-primary quantity-minus" data-product-id="${product.id}">-</button>
                                <span class="quantity-display mx-2" data-product-id="${product.id}">0</span>
                                <button class="btn btn-sm btn-primary quantity-plus" data-product-id="${product.id}">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            targetElement.insertAdjacentHTML('beforeend', productCard);
        });
        // Inisialisasi ulang drag listeners untuk kartu yang baru ditambahkan (hanya jika bukan touch device)
        if (!isTouchDevice()) {
            initializeDraggables();
        }
        // Perbarui tampilan kuantitas untuk kartu yang baru dimuat (jika sudah ada di parsel)
        updateProductCardQuantities();
    };

    /**
     * Memperbarui tampilan item di area parsel.
     */
    const updateParcelDisplay = () => {
        parcelItemsContainer.innerHTML = '';
        let total = 0;
        let totalItemCount = 0; // Total kuantitas semua item

        const placeholderIcon = parcelDropArea.querySelector('i');
        const placeholderText = parcelDropArea.querySelector('p');

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
                    <div class="d-flex align-items-center">
                        <button class="btn btn-sm btn-outline-primary quantity-minus-parcel" data-product-id="${item.id}">-</button>
                        <span class="quantity-display-parcel mx-2">${item.quantity}</span>
                        <button class="btn btn-sm btn-primary quantity-plus-parcel" data-product-id="${item.id}">+</button>
                        <span class="ms-3 fw-bold">Rp${(item.price * item.quantity).toLocaleString('id-ID')}</span>
                    </div>
                </div>
            `;
            parcelItemsContainer.insertAdjacentHTML('beforeend', itemElement);
            total += (item.price * item.quantity);
            totalItemCount += item.quantity; // Tambahkan kuantitas ke total
        });

        currentItemCountSpan.textContent = totalItemCount; // Tampilkan total kuantitas
        totalPriceSpan.textContent = `Rp${total.toLocaleString('id-ID')}`;
        validateParcel(totalItemCount); // Kirim totalItemCount ke validasi
        updateProductCardQuantities(); // Pastikan kuantitas di kartu produk sinkron
    };

    /**
     * Memvalidasi jumlah item di parsel berdasarkan ukuran yang dipilih.
     * @param {number} currentCount - Total kuantitas item di parsel.
     */
    const validateParcel = (currentCount) => {
        const limits = parcelLimits[selectedParcelSize];
        let isValid = true;
        let message = '';

        if (currentCount < limits.min) {
            isValid = false;
            message = `Minimal ${limits.min} item untuk parsel ${selectedParcelSize.toUpperCase()}.`;
        } else if (limits.max !== Infinity && currentCount > limits.max) {
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

    /**
     * Memperbarui tampilan keranjang belanja.
     */
    const updateCartDisplay = () => {
        cartItemCountSpan.textContent = cart.length;
        cartItemsDisplay.innerHTML = '';
        let totalCartPrice = 0;

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            checkoutBtn.setAttribute('disabled', 'true');
        } else {
            emptyCartMessage.style.display = 'none';
            checkoutBtn.removeAttribute('disabled');
            cart.forEach(parcel => {
                const parcelElement = `
                    <div class="card mb-3 shadow-sm">
                        <div class="card-body card-primary">
                            <h5 class="card-title">${parcel.type.charAt(0).toUpperCase() + parcel.type.slice(1)} Parsel (${parcel.totalItemCount} item)</h5>
                            <ul class="list-group list-group-flush mb-2">
                                ${parcel.items.map(item => `<li class="list-group-item d-flex justify-content-between align-items-center">${item.name} x ${item.quantity} <span>Rp${(item.price * item.quantity).toLocaleString('id-ID')}</span></li>`).join('')}
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

    /**
     * Memuat dan menampilkan produk berdasarkan tab aktif dan kueri pencarian.
     * @param {string} searchTerm - String pencarian opsional.
     */
    const loadAndFilterProducts = (searchTerm = '') => {
        const activeTabPane = document.querySelector('.tab-pane.show.active');
        const activeTabId = activeTabPane.id;

        let filteredProducts = allProductsData;
        const normalizedSearchTerm = searchTerm.toLowerCase();

        if (activeTabId === 'fruits') {
            filteredProducts = filteredProducts.filter(p => p.category === 'buah');
        } else if (activeTabId === 'snacks') {
            filteredProducts = filteredProducts.filter(p => p.category === 'makanan-kemasan');
        } else if (activeTabId === 'drinks') {
            filteredProducts = filteredProducts.filter(p => p.category === 'minuman-kemasan');
        }

        let targetElement;
        if (activeTabId === 'all-products') {
            targetElement = productListElement;
        } else if (activeTabId === 'fruits') {
            targetElement = fruitProductListElement;
        } else if (activeTabId === 'snacks') {
            targetElement = snackProductListElement;
        } else if (activeTabId === 'drinks') {
            targetElement = drinkProductListElement;
        }

        displayProducts(filteredProducts, targetElement);
    };

    /**
     * Memanggil fungsi dragstart untuk kartu produk yang baru ditambahkan secara dinamis.
     * Dipanggil setelah displayProducts()
     */
    const initializeDraggables = () => {
        document.querySelectorAll('.product-card.draggable .card').forEach(card => {
            if (!card.hasAttribute('data-drag-initialized')) {
                card.addEventListener('dragstart', (e) => {
                    const productCard = e.target.closest('.product-card');
                    e.dataTransfer.setData('text/plain', JSON.stringify({
                        id: productCard.dataset.productId,
                        name: productCard.dataset.productName,
                        price: parseFloat(productCard.dataset.productPrice),
                        category: productCard.dataset.productCategory
                    }));
                    e.dataTransfer.effectAllowed = 'copy';
                });
                card.setAttribute('data-drag-initialized', 'true');
            }
        });
    };

    /**
     * Memperbarui tampilan kuantitas pada setiap kartu produk berdasarkan currentParcelItems.
     */
    const updateProductCardQuantities = () => {
        document.querySelectorAll('.product-card').forEach(card => {
            const productId = card.dataset.productId;
            const quantityDisplay = card.querySelector('.quantity-display');
            const existingItem = currentParcelItems.find(item => item.id === productId);
            if (quantityDisplay) {
                quantityDisplay.textContent = existingItem ? existingItem.quantity : 0;
            }
        });
    };

    /**
     * Menambahkan atau mengurangi kuantitas item di currentParcelItems.
     * @param {string} productId - ID produk.
     * @param {number} change - Perubahan kuantitas (+1 atau -1).
     */
    const updateParcelItemQuantity = (productId, change) => {
        const productData = allProductsData.find(p => p.id === productId);
        if (!productData) return;

        const existingItemIndex = currentParcelItems.findIndex(item => item.id === productId);
        let currentTotalItems = currentParcelItems.reduce((sum, item) => sum + item.quantity, 0);
        const limits = parcelLimits[selectedParcelSize];

        if (existingItemIndex > -1) {
            // Item sudah ada di parsel
            let newQuantity = currentParcelItems[existingItemIndex].quantity + change;

            if (newQuantity <= 0) {
                // Hapus item jika kuantitasnya 0 atau kurang
                currentParcelItems.splice(existingItemIndex, 1);
            } else if (limits.max !== Infinity && currentTotalItems + change > limits.max) {
                // Batasi penambahan jika melebihi max limit (hanya untuk non-Infinity)
                parcelErrorMessage.textContent = `Maksimal ${limits.max} item untuk parsel ${selectedParcelSize.toUpperCase()} telah tercapai.`;
                parcelErrorMessage.classList.add('text-danger');
                return; // Jangan lakukan perubahan kuantitas
            } else {
                currentParcelItems[existingItemIndex].quantity = newQuantity;
            }
        } else if (change > 0) {
            // Item belum ada, tambahkan jika perubahan adalah penambahan
            if (limits.max !== Infinity && currentTotalItems + change > limits.max) {
                parcelErrorMessage.textContent = `Maksimal ${limits.max} item untuk parsel ${selectedParcelSize.toUpperCase()} telah tercapai.`;
                parcelErrorMessage.classList.add('text-danger');
                return; // Jangan tambahkan item
            }
            currentParcelItems.push({ ...productData, quantity: 1 });
        } else {
            // Mencoba mengurangi item yang tidak ada atau kuantitas 0
            return;
        }

        updateParcelDisplay();
        parcelErrorMessage.textContent = ''; // Hapus pesan error jika berhasil
        parcelErrorMessage.classList.remove('text-danger');
    };


    // --- Event Listeners ---

    // Event Listener untuk perubahan ukuran parsel
    parcelSizeSelect.addEventListener('change', (event) => {
        selectedParcelSize = event.target.value;
        const currentTotalItems = currentParcelItems.reduce((sum, item) => sum + item.quantity, 0);
        validateParcel(currentTotalItems); // Re-validate parcel with new limits
    });

    // Event Listener untuk menghapus item dari parsel (menggunakan delegasi event)
    // Event listener ini tidak lagi digunakan jika menggunakan tombol +/-
    // parcelItemsContainer.addEventListener('click', (event) => {
    //     if (event.target.classList.contains('remove-item')) {
    //         const itemElement = event.target.closest('.parcel-item');
    //         const productId = itemElement.dataset.productId;
            
    //         // Hapus item sepenuhnya dari currentParcelItems
    //         currentParcelItems = currentParcelItems.filter(item => item.id !== productId);
    //         updateParcelDisplay();
    //     }
    // });

    // Event Listener untuk tombol "Tambah ke Keranjang"
    addToCartBtn.addEventListener('click', () => {
        const currentTotalItems = currentParcelItems.reduce((sum, item) => sum + item.quantity, 0);
        if (currentParcelItems.length > 0 && !addToCartBtn.disabled) {
            const total = currentParcelItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const newParcel = {
                id: `parcel-${Date.now()}`,
                type: selectedParcelSize,
                items: [...currentParcelItems], // Salin array item
                totalPrice: total,
                totalItemCount: currentTotalItems // Tambahkan total kuantitas item di parsel
            };
            cart.push(newParcel);
            updateCartDisplay();

            // Reset parsel setelah ditambahkan ke keranjang
            currentParcelItems = [];
            updateParcelDisplay();
            parcelSizeSelect.value = 'small';
            selectedParcelSize = 'small';

            // Tampilkan modal keranjang
            const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
            cartModal.show();
        }
    });

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
    productCategoryTab.addEventListener('shown.bs.tab', async (event) => {
        searchProductInput.value = '';
        loadAndFilterProducts();
    });

    // Event listener untuk pencarian produk
    searchProductInput.addEventListener('keyup', (event) => {
        loadAndFilterProducts(event.target.value);
    });

    // Event Listener untuk Menerima Produk dari Drag & Drop (custom event)
    // Ini akan tetap berfungsi untuk desktop
    document.addEventListener('productAddedToParcel', (event) => {
        const product = event.detail;
        updateParcelItemQuantity(product.id, 1); // Tambahkan 1 item via drag & drop
    });

    // Event Listener untuk tombol + dan - (menggunakan delegasi event pada body)
    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('quantity-plus')) {
            const productId = event.target.dataset.productId;
            updateParcelItemQuantity(productId, 1);
        } else if (event.target.classList.contains('quantity-minus')) {
            const productId = event.target.dataset.productId;
            updateParcelItemQuantity(productId, -1);
        } else if (event.target.classList.contains('quantity-plus-parcel')) { // NEW
            const productId = event.target.dataset.productId;
            updateParcelItemQuantity(productId, 1);
        } else if (event.target.classList.contains('quantity-minus-parcel')) { // NEW
            const productId = event.target.dataset.productId;
            updateParcelItemQuantity(productId, -1);
        }
    });


    // --- Inisialisasi Awal ---
    loadAndFilterProducts();
    updateParcelDisplay();
    updateCartDisplay();
});