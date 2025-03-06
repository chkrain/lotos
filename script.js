document.addEventListener("DOMContentLoaded", function () {
    const rangeMin = document.querySelector("#range-min");
    const rangeMax = document.querySelector("#range-max");
    const rangeSlider = document.querySelector("#range-slider");
    const optionsSelect = document.querySelector("#options-select");
    const fullName = document.querySelector("#fullname");
    const ageInput = document.querySelector("#age");
    const mandatoryCheckbox = document.querySelector("#mandatory");
    const form = document.querySelector("#user-form");
    const copyright = document.querySelector("#copyright");

    const overlay = document.createElement("div");
    overlay.classList.add("popup-overlay");

    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
        <div class="popup-content">
            <span class="popup-close">&times;</span>
            <h3>Результаты формы</h3>
            <p id="popup-data"></p>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    const popupClose = popup.querySelector(".popup-close");
    const popupData = popup.querySelector("#popup-data");

    if (copyright) {
        const currentYear = new Date().getFullYear();
        copyright.textContent = `© ФИО, год рождения - ${currentYear}`;
    } else {
        console.error("Элемент #copyright не найден!");
    }

    if (rangeMin && rangeMax && rangeSlider) {
        rangeMin.min = 0;
        rangeMin.max = 100;
        rangeMax.min = 0;
        rangeMax.max = 100;
        rangeSlider.min = 0;
        rangeSlider.max = 100;

        function syncRange() {
            let minValue = parseInt(rangeMin.value) || 0;
            let maxValue = parseInt(rangeMax.value) || 100;

            if (minValue > maxValue) {
                minValue = maxValue;
                rangeMin.value = minValue;
            }
            rangeSlider.value = maxValue;
        }

        rangeMin.addEventListener("input", syncRange);
        rangeMax.addEventListener("input", syncRange);
        rangeSlider.addEventListener("input", function () {
            rangeMax.value = this.value;
        });
    } else {
        console.error("Элементы range не найдены!");
    }

    fullName.addEventListener("input", function () {
        const regex = /^[А-Яа-яЁёA-Za-z]+ [А-Яа-яЁёA-Za-z]+ [А-Яа-яЁёA-Za-z]+$/;
        if (!regex.test(this.value.trim())) {
            this.setCustomValidity("Введите ФИО (3 слова, минимум по 2 буквы)");
        } else {
            this.setCustomValidity("");
        }
    });

    if (ageInput) {
        ageInput.addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, "");
        });
    } else {
        console.error("Поле #age не найдено!");
    }

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            if (!optionsSelect || !optionsSelect.value) {
                alert("Выберите вариант из списка");
                return;
            }
            if (!mandatoryCheckbox || !mandatoryCheckbox.checked) {
                alert("Отметьте обязательный чекбокс");
                return;
            }

            popupData.innerHTML = `
                <strong>ФИО:</strong> ${fullName.value} <br>
                <strong>Возраст:</strong> ${ageInput.value} <br>
                <strong>Диапазон:</strong> ${rangeMin.value} - ${rangeMax.value} <br>
                <strong>Выбранный вариант:</strong> ${optionsSelect.value}
            `;
            overlay.classList.add("popup-show");
            popup.classList.add("popup-show");
        });
    } else {
        console.error("Форма #user-form не найдена!");
    }
    function closePopup() {
        overlay.classList.remove("popup-show");
        popup.classList.remove("popup-show");
    }
    popupClose.addEventListener("click", closePopup);

    overlay.addEventListener("click", closePopup);
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closePopup();
        }
    });
});
