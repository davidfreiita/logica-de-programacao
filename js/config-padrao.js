// primeiro rode no terminal -> npm install prompt-sync
const prompt = require('prompt-sync')(); // sempre no começo de todo programa por enquanto

// --- Exemplo de Uso ---

// Pegar nome da pessoa
const nome = prompt("Qual é o seu nome: ");
console.log("Olá, " + nome);

// Pegar idade da pessoa
const idade = Number(prompt("Qual sua idade: "));
console.log("Você tem " + idade + " anos");
