const apiUrl = '/';

// Kayıt işlemi
const form = document.getElementById('carForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const year = document.getElementById('year').value;
        const brand = document.getElementById('brand').value;
        const imageFile = document.getElementById('image').files[0];

        const reader = new FileReader();
        reader.onload = () => {
            const newCar = { name, year, brand, image: reader.result };
            fetch(`${apiUrl}/add-car`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCar),
            }).then(() => {
                alert('Araba başarıyla kaydedildi!');
                form.reset();
            });
        };
        reader.readAsDataURL(imageFile);
    });
}

// Arama işlemi
const searchInput = document.getElementById('search');
const resultsList = document.getElementById('results');

if (searchInput) {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();

        // Eğer arama kutusu boşsa sonuçları temizle
        if (query.trim() === '') {
            resultsList.innerHTML = '';
            return;
        }

        // Arama yap ve sonuçları listele
        fetch(`${apiUrl}/cars`)
            .then((res) => res.json())
            .then((cars) => {
                resultsList.innerHTML = ''; // Sonuçları sıfırla

                cars.filter(car =>
                    car.name.toLowerCase().includes(query) ||
                    car.brand.toLowerCase().includes(query)
                ).forEach(car => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <h3>${car.name} (${car.year})</h3>
                        <p>${car.brand}</p>
                        <img src="${car.image}" alt="${car.name}" style="max-width: 200px;">
                    `;
                    resultsList.appendChild(li);
                });
            });
    });
}

