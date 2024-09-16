"use strict";

// Busca campos do formulário de sorteio.
const qtdNumber = document.getElementById("number");
const fromNumber = document.getElementById("from");
const toNumber = document.getElementById("to");
let isRepeatable = document.getElementById("no-repeat");

// Busca Formulário de informação de sorteio.
const formInfo = document.getElementById("form");
// Busca Formulário de resultado.
const formResult = document.getElementById("form-result");

// Evento de submit do botão.
formInfo.onsubmit = (event) => {
  // Previne comportamento padrão do formulário.
  event.preventDefault();

  // Chama Função que sorteia os números
  getRandomNumbers(
    qtdNumber.value,
    fromNumber.value,
    toNumber.value
    // isRepeatable.value
  );
};

// Função responsável por randomizar os valores.
function randomNumbers(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Função responsável por verificar o valores digitados pelo usuário.
function verifyEntry(qtd, min, max) {
  if (qtd <= 0) {
    alert(
      "Quantidade números a sortear inválido. Favor insira um número válido."
    );
    return;
  } else if (min > max) {
    alert('"Número "DE", não pode ser maior que "Até."');
    return;
  }
}

// Função responsável por esconder o formulário.
function hideFormEntry() {
  const hideHeader = document.getElementById("header");
  hideHeader.classList.add("header-none");

  formInfo.classList.add("form-info-none");
}

// Função responsável por mostrar o formulário de resultado.
function showFormResult() {
  formResult.classList.remove("form-result-none");
  formResult.classList.add("form-result");
}

// Função recebe e sorteia os valores.
function getRandomNumbers(qtdRepeat, min, max, isRepeatable) {
  try {
    // const isRepeatable = isRepeatable; // Recupera se pode repetir os valores sorteados.
    const nRepeat = qtdRepeat; // Recupera a qtd de vezes para sortear.
    const fromNumber = Math.ceil(min); // Recupera o valor mínimo.
    const toNumber = Math.floor(max); // Recupera o valor máximo.

    // Verifica se os campos digitados são validos para sorteio.
    verifyEntry(nRepeat, fromNumber, toNumber);

    const resultRandom = [];
    // Percorre a quantidade de números inserido pelo usuário.
    for (let i = 1; i <= nRepeat; i++) {
      // retorna o valor aleatório de acordo com o input.
      const drawNumber = randomNumbers(fromNumber, toNumber);
      // Coloca os números sorteados em um array.
      resultRandom.push(drawNumber);
    }

    // Verifica se número sorteado é igual quando solicitado pelo usuário.
    const arrayUnico = new Set(resultRandom);

    // Verifica se tamanho é igual ao array original. Se não sorteia novamente.
    if (arrayUnico.size === resultRandom.length) {
      // Retorna o array sem números repetidos.
      console.log(arrayUnico);
      // Chama função para esconder formulário.
      hideFormEntry();
      showFormResult();
      return arrayUnico;
    } else {
      getRandomNumbers();
    }
  } catch (error) {
    console.log(error);
    alert("Não foi possível sortear!. Tente novamente.");
  }
}
