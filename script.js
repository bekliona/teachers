import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBOB1SxuGVnHbcj310RfIYgINd3t4VQbUA",
  authDomain: "teachers-form.firebaseapp.com",
  databaseURL: "https://teachers-form-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "teachers-form",
  storageBucket: "teachers-form.appspot.com",
  messagingSenderId: "978938759652",
  appId: "1:978938759652:web:c10776681dd3a0e10c1ff1"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация и работа с формой
    // ...
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault(); // Предотвращаем стандартную отправку формы

        // Собираем данные формы
        const formData = {
            // Ваши данные формы
        };

        // Отправка данных в Firebase
        push(ref(database, 'submissions'), formData)
            .then(() => {
                alert('Данные успешно отправлены в Firebase!');
            })
            .catch(error => {
                console.error('Ошибка отправки данных в Firebase:', error);
                alert('Ошибка при отправке данных: ' + error.message);
            });
    });

function initializeFormFields(data) {
    // Функция для инициализации полей формы
    // Ваш код для инициализации полей
}

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
