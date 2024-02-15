document.addEventListener('DOMContentLoaded', function() {
    // Инициализация формы из данных
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            initializeFormFields(data);
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));

    // Обработчик отправки формы
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault(); // Предотвращаем стандартную отправку формы

        // Собираем данные формы
        const formData = {
            region: document.getElementById('regionSelect').value,
            district: document.getElementById('districtSelect').value,
            settlement: document.getElementById('settlementSelect').value,
            school: document.getElementById('schoolSelect').value,
            // Добавьте сюда другие поля формы, если они есть
        };

        // Отправляем данные в Firebase
        firebase.database().ref('submissions').push(formData)
            .then(() => {
                alert('Данные успешно отправлены в Firebase!');
                // Здесь можете сбросить форму или выполнить другие действия после отправки
            })
            .catch(error => {
                console.error('Ошибка отправки данных в Firebase:', error);
                alert('Ошибка при отправке данных: ' + error.message);
            });
    });
});

function initializeFormFields(data) {
    const regionSelect = document.getElementById('regionSelect');
    const districtSelect = document.getElementById('districtSelect');
    const settlementSelect = document.getElementById('settlementSelect');
    const schoolSelect = document.getElementById('schoolSelect');

    // Функция для заполнения областей
    const fillRegions = () => {
        let regions = [...new Set(data.map(item => item["Область"]))];
        regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            regionSelect.appendChild(option);
        });
    };

    // Обновление районов
    const updateDistricts = (selectedRegion) => {
        districtSelect.innerHTML = '<option value="">Выберите район</option>';
        let districts = data.filter(item => item["Область"] === selectedRegion).map(item => item["Район"]);
        [...new Set(districts)].forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    };

    // Обновление населенных пунктов
    const updateSettlements = (selectedDistrict) => {
        settlementSelect.innerHTML = '<option value="">Выберите населенный пункт</option>';
        let settlements = data.filter(item => item["Район"] === selectedDistrict).map(item => item["Населенный пункт"]);
        [...new Set(settlements)].forEach(settlement => {
            const option = document.createElement('option');
            option.value = settlement;
            option.textContent = settlement;
            settlementSelect.appendChild(option);
        });
    };

    // Обновление школ
    const updateSchools = (selectedSettlement) => {
        schoolSelect.innerHTML = '<option value="">Выберите школу</option>';
        let schools = data.filter(item => item["Населенный пункт"] === selectedSettlement).map(item => item["Школа"]);
        [...new Set(schools)].forEach(school => {
            const option = document.createElement('option');
            option.value = school;
            option.textContent = school;
            schoolSelect.appendChild(option);
        });
    };

    fillRegions();

    regionSelect.addEventListener('change', () => {
        updateDistricts(regionSelect.value);
        settlementSelect.innerHTML = '<option value="">Выберите населенный пункт</option>'; // Сброс
        schoolSelect.innerHTML = '<option value="">Выберите школу</option>'; // Сброс
    });

    districtSelect.addEventListener('change', () => {
        updateSettlements(districtSelect.value);
        schoolSelect.innerHTML = '<option value="">Выберите школу</option>'; // Сброс
    });

    settlementSelect.addEventListener('change', () => {
        updateSchools(settlementSelect.value);
    });
}
