const form = document.querySelector("form");
const qtdNumber = document.querySelector("#quantity");
const minValue = document.querySelector("#min");
const maxValue = document.querySelector("#max");
const repeat = document.querySelector("#toggle");
const inputFields = document.getElementById("interaction");
const buttonResult = document.querySelector("#button-result");
const qtdResult = document.querySelector("#qtdResult");
let qtdResultClick = 1;
let lastRandomData = null;

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
        qtd: parseInt(qtdNumber.value) || 1,
        min: parseInt(minValue.value) || 1,
        max: parseInt(maxValue.value) || 10,
        isRepeat: repeat.checked,
    };

    if (isNaN(random.qtd) || isNaN(random.min) || isNaN(random.max)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    lastRandomData = random;

    const numbers = randomCalc(
        random.min,
        random.max,
        random.qtd,
        random.isRepeat
    );

    // console.log("Números sorteados:", numbers);
    hideInputs();
    showResults(numbers);
    clearForm();
};

buttonResult.addEventListener("click", () => {
    if (!lastRandomData) {
        alert("Nenhum sorteio anterior encontrado.");
        return;
    }

    const { min, max, qtd, isRepeat } = lastRandomData;
    qtdResultClick++;
    const numbers = randomCalc(min, max, qtd, isRepeat);
    showResults(numbers);
    qtdResult.textContent = `${qtdResultClick}º resultado`;
});

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
        const resultNumbers = document.getElementById("div-numbers"); // Alterado para "div-numbers"
        const buttonResult = document.querySelector("#button-result");

        // Limpa os resultados anteriores
        resultNumbers.innerHTML = ""; 

        // Exibe os elementos necessários
        resultContainer.classList.remove("hide");
        resultNumbers.classList.remove("hide");
        buttonResult.classList.remove("hide");

        for (let i = 0; i < numbers.length; i++) {
            const number = numbers[i];

            const inputElement = document.createElement("div");
            inputElement.className = "result-wrapper";

            const bgElement = document.createElement("div");
            bgElement.className = "result-bg animation-appear";
            bgElement.id = `result-bg-${i + 1}`;

            const spanElement = document.createElement("span");
            spanElement.id = `result-${i + 1}`;
            spanElement.className = "color-invert result-number change-color";
            spanElement.textContent = number;

            inputElement.appendChild(spanElement);
            inputElement.appendChild(bgElement);
            resultNumbers.appendChild(inputElement);
        }
    } catch (error) {
        console.error("Erro ao exibir resultados:", error);
        alert(
            "Ocorreu um erro ao exibir os resultados. Por favor, tente novamente."
        );
    }
}

function clearForm() {
    qtdNumber.value = "";
    minValue.value = "";
    maxValue.value = "";
    repeat.checked = false;
}
