/*
console.log("Antes da requisição");

let dadosRequisicao;

fetch('https://viacep.com.br/ws/01001000/json/')
    .then(response => response.json())
    .then(data => {
        dadosRequisicao = data;
        console.log("Dados da requisição");
    });

console.log("Depois da requisição");
console.log(dadosRequisicao.cep);
*/

//async/await

async function request() {
    console.log("Antes da requisição");

    let requisicao = await fetch('https://viacep.com.br/ws/01001000/json/');
    let data = await requisicao.json();
    //console.log(data);
    console.log("Dados da requisição");

    console.log("Depois da requisição");
}

async function somar(a, b) {
    return a+b;
}

let soma = somar(1,2);

soma.then(res => {
    console.log(res);
})
console.log(soma);
