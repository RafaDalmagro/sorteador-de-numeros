const form = document.querySelector("form");
const qtdNumber = document.querySelector("#quantity");
const minValue = document.querySelector("#min");
const maxValue = document.querySelector("#max");
const repeat = document.querySelector("#toggle");
const inputFields = document.getElementById("interaction");
const buttonResult = document.querySelector("#button-result");
const qtdResult = document.querySelector("#qtdResult");
const buttonReturn = document.querySelector("#button-return");
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

    try {
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

        const numbers = randomCalc(
            random.min,
            random.max,
            random.qtd,
            random.isRepeat
        );

        if (numbers.length === 0) {
            clearForm();
            return;
        }

        lastRandomData = random;

        hideInputs();
        showResults(numbers);
        clearForm();
    } catch (error) {
        console.error("Erro no envio do formulário:", error);
        clearForm();
    }
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

buttonReturn.addEventListener("click", () => {
    location.reload();
});

function randomCalc(min, max, qtd, isRepeat) {
    try {
        const minValue = parseInt(min);
        const maxValue = parseInt(max);
        const qtdValue = parseInt(qtd);
        const numbers = [];

        const intervaloTotal = maxValue - minValue + 1;

        if (!isRepeat && qtdValue > intervaloTotal) {
            alert(
                `Não é possível sortear ${qtdValue} números únicos dentro do intervalo de ${minValue} a ${maxValue}. Por favor, ajuste os valores e tente novamente.`
            );
            return [];
        }

        if (isRepeat) {
            for (let i = 0; i < qtdValue; i++) {
                const randomNumber =
                    Math.floor(Math.random() * intervaloTotal) + minValue;
                numbers.push(randomNumber);
            }
        } else {
            while (numbers.length < qtdValue) {
                const randomNumber =
                    Math.floor(Math.random() * intervaloTotal) + minValue;
                if (!numbers.includes(randomNumber)) {
                    numbers.push(randomNumber);
                }
            }
        }

        return numbers;
    } catch (error) {
        console.error("Erro ao calcular números aleatórios:", error);
        return [];
    }
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
        buttonReturn.classList.remove("hide");

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
