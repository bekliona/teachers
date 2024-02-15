document.addEventListener('DOMContentLoaded', function() {
    // Загрузка данных из JSON файла
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            initializeFormFields(data);
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));
});

function initializeFormFields(data) {
    const regionSelect = document.getElementById('regionSelect');
    const districtSelect = document.getElementById('districtSelect');
    const settlementSelect = document.getElementById('settlementSelect');
    const schoolSelect = document.getElementById('schoolSelect');

    // Функция для заполнения областей
    const fillRegions = () => {
        let regions = [...new Set(data.map(item => item["Область"]))]; // Изменено с item.region на item["Область"]
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
        let districts = data.filter(item => item["Область"] === selectedRegion).map(item => item["Район"]); // Изменения с item.region и item.district
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
        let settlements = data.filter(item => item["Район"] === selectedDistrict).map(item => item["Населенный пункт"]); // Изменения с item.district и item.settlement
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
        let schools = data.filter(item => item["Населенный пункт"] === selectedSettlement).map(item => item["Школа"]); // Изменения с item.settlement и item.school
        [...new Set(schools)].forEach(school => {
            const option = document.createElement('option');
            option.value = school;
            option.textContent = school;
            schoolSelect.appendChild(option);
        });
    };

    fillRegions();

    // События изменения выбора
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
