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
    const checkboxButtons = document.querySelectorAll('input[type="checkbox"]');

    const overlay = document.createElement("div");
    overlay.classList.add("popup-overlay");

    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
        <div class="popup-content">
            <span class="popup-close"></span>
            <h3>Результат отправки:</h3><br>
            <p id="popup-data"></p>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    const popupClose = popup.querySelector(".popup-close");
    const popupData = popup.querySelector("#popup-data");

    if (copyright) {
        const currentYear = new Date().getFullYear();
        copyright.textContent = `© Черепанов Айнур Альбертович, 2003 - ${currentYear}`;
    } else {
        console.error("copyright не найден");
    }

    if (rangeMin && rangeMax && rangeSlider) {
        rangeMin.min = rangeSlider.min = rangeMax.min = 0;
        rangeMin.max = rangeMax.max = rangeSlider.max = 100;

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
            this.setCustomValidity("Введите ФИО");
        } else {
            this.setCustomValidity("");
        }
    });

    if (ageInput) {
        ageInput.addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, "");
        });
    } else {
        console.error("Поле с айди #age не найдено");
    }

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            if (!optionsSelect || !optionsSelect.value) {
                alert("Выберите вариант из списка");
                return;
            }
            if (!mandatoryCheckbox || !mandatoryCheckbox.checked) {
                alert("Не отмечен обязательнчыфй чекбокс");
                return;
            }

            const selectedRadio = document.querySelector('input[name="tech"]:checked');
            const radioValue = selectedRadio ? selectedRadio.value : "Не выбрано";
            const selectedCheckboxes = Array.from(checkboxButtons).filter(checkbox => checkbox.checked);
            const checkboxValues = selectedCheckboxes.length > 0
                ? selectedCheckboxes.map(checkbox => checkbox.id).join(", ")
                : "-";

            popupData.innerHTML = `
                <strong>Диапазон:</strong> от ${rangeMin.value} до ${rangeMax.value} <br>
                <strong>Select:</strong> ${optionsSelect.value} <br>
                <strong>Radio:</strong> ${radioValue} <br>
                <strong>ФИО:</strong> ${fullName.value} <br>
                <strong>Возраст:</strong> ${ageInput.value} <br>
                <strong>Выбранные чекбоксы:</strong> ${checkboxValues} <br>
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
