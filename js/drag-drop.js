// public/js/drag-drop.js

document.addEventListener('DOMContentLoaded', () => {
    const parcelDropArea = document.getElementById('parcel-drop-area');

    // Event listener for the drop area
    if (parcelDropArea) { // Ensure the element exists
        parcelDropArea.addEventListener('dragover', (e) => {
            e.preventDefault(); // Necessary to allow dropping
            parcelDropArea.classList.add('drag-over'); // Add visual class for drag feedback
        });

        parcelDropArea.addEventListener('dragleave', () => {
            parcelDropArea.classList.remove('drag-over'); // Remove visual class
        });

        parcelDropArea.addEventListener('drop', (e) => {
            e.preventDefault();
            parcelDropArea.classList.remove('drag-over');

            const data = e.dataTransfer.getData('text/plain');
            if (data) {
                try {
                    const product = JSON.parse(data);
                    // Dispatch a custom event to notify script.js
                    document.dispatchEvent(new CustomEvent('productAddedToParcel', {
                        detail: product
                    }));
                } catch (error) {
                    console.error('Error parsing dropped data:', error);
                }
            }
        });
    }
    // Catatan: Event listener dragstart untuk kartu produk sekarang diinisialisasi di script.js
    // melalui fungsi initializeDraggables() yang dipanggil setelah displayProducts().
    // Ini memastikan kartu yang dimuat ulang secara dinamis juga draggable di desktop.
});