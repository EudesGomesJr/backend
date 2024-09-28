
function exibirNome(nome) {
    if(typeof nome !== 'string') {
        let error = new Error("Coluna product_name da tabela products no banco de dados loja, aceita apenas string");
        error.code = 'STRING REQUIRED'; 
        throw error;
    }
    return nome;
}

try {
    let nome = exibirNome(10);
    console.log(nome);
} catch (e) {
    let erroKeys = Object.getOwnPropertyNames(e)
    console.log(erroKeys);
    console.log(e.message);
    console.log(e.code);
    
    // console.log(e.stack);