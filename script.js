const form = document.querySelector("form");
const qtdNumber = document.querySelector("#quantity");
const minValue = document.querySelector("#min");
const maxValue = document.querySelector("#max");
const repeat = document.querySelector("#toggle");
const inputFields = document.getElementById("interaction");

qtdNumber.oninput = () => {
    qtdNumber.value = qtdNumber.value.replace(/\D/g, "");
};
minValue.oninput = () => {
    minValue.value = minValue.value.replace(/\D/g, "");
};
maxValue.oninput = () => {
    maxValue.value = maxValue.value.replace(/\D/g, "");
};

form.onsubmit = (event) => {
    event.preventDefault();

    const random = {
        qtd: parseInt(qtdNumber.value) || 0,
        min: parseInt(minValue.value) || 0,
        max: parseInt(maxValue.value) || 0,
        isRepeat: repeat.checked,
    };

    if (isNaN(random.qtd) || isNaN(random.min) || isNaN(random.max)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const numbers = randomCalc(
        random.min,
        random.max,
        random.qtd,
        random.isRepeat
    );

    console.log("Números sorteados:", numbers);
    hideInputs();

    showResults(numbers);
    clearForm();
};

// function formatNumber(number) {
//     const formattedNumber = number.toString().padStart(2, "0");
// }

function randomCalc(min, max, qtd, isRepeat) {
    const minValue = parseInt(min);
    const maxValue = parseInt(max);
    const qtdValue = parseInt(qtd);
    const numbers = [];

    if (isRepeat) {
        for (let i = 0; i < qtd; i++) {
            const randomNumber =
                Math.floor(Math.random() * (maxValue - minValue + 1)) +
                minValue;
            numbers.push(randomNumber);
        }
    } else {
        while (numbers.length < qtdValue) {
            const randomNumber =
                Math.floor(Math.random() * (maxValue - minValue + 1)) +
                minValue;
            if (!numbers.includes(randomNumber)) {
                numbers.push(randomNumber);
            }
        }
    }
    return numbers;
}

function hideInputs() {
    inputFields.classList.add("hide");
}

function showResults(numbers) {
    try {
        const resultContainer = document.querySelector("#result");
        resultContainer.classList.remove("hide");
        resultContainer.innerHTML = "";
        console.log("Exibindo resultados...");

        for (let i = 0; i < numbers.length; i++) {
            const number = numbers[i];
            console.log(`Exibindo número: ${number}`);

            const inputContainer = document.createElement("div");
            inputContainer.className = "result-container";

            const inputElement = document.createElement("div");
            inputElement.className = "result-wrapper";

            const bgElement = document.createElement("div");
            bgElement.className = "result-bg animation-appear";
            bgElement.id = `result-bg-${i + 1}`;

            const spanElement = document.createElement("span");
            spanElement.id = `result-${i + 1}`;
            spanElement.className = "color-invert result-number change-color";
            spanElement.textContent = number;

            // const resultNumber = document.querySelector(`#result-${i + 1}`);
            // resultNumber.className = "color-invert result-number";
            inputElement.appendChild(spanElement);
            inputElement.appendChild(bgElement);
            inputContainer.appendChild(inputElement);
            resultContainer.appendChild(inputContainer);
        }
    } catch (error) {
        console.error("Erro ao exibir resultados:", error);
        alert(
            "Ocorreu um erro ao exibir os resultados. Por favor, tente novamente."
        );
        return;
    }
}

function clearForm() {
    qtdNumber.value = "";
    minValue.value = "";
    maxValue.value = "";
    repeat.checked = false;
}
