/*
 * 🗺️ DIÁRIO DE BORDO: GUIA DO MÓDULO 1
 * Aqui estão os blocos de construção fundamentais para criar seus primeiros programas
 */

// -------------------------------------------------------------------------
// 🛠️ COMPONENTE 0: Importar a ferramenta de leitura do Terminal
// Sempre precisamos dessa linha no topo do arquivo se formos pedir dados ao usuário.
// -------------------------------------------------------------------------
const prompt = require('prompt-sync')();


// -------------------------------------------------------------------------
// 📦 COMPONENTE 1: Variáveis e Constantes
// Guardam dados na memória do computador. Sempre use nomes claros.
// -------------------------------------------------------------------------

// "const" guarda um valor que NUNCA muda depois de criado
const nomeDaFaculdade = "UFLA"; 

// "let" guarda um valor que PODE mudar ao longo do tempo (caso precise)
let tentativas = 3;


// -------------------------------------------------------------------------
// 📑 COMPONENTE 2: Tipos de Dados Fundamentais
// O JavaScript precisa entender que tipo de informação está manipulando.
// -------------------------------------------------------------------------
const texto = "David";           // String (Sempre entre aspas)
const numeroInteiro = 42;        // Number (Números inteiros)
const numeroDecimal = 19.90;     // Number (Usamos PONTO para decimais, nunca vírgula!)


// -------------------------------------------------------------------------
// 📥 COMPONENTE 3: Entradas de Dados (Leitura do Terminal)
// Usamos o "prompt" para fazer perguntas ao usuário.
// -------------------------------------------------------------------------

// 🔴 Regra de Ouro: O prompt SEMPRE devolve um texto (String).
const comidaFavorita = prompt("Qual sua comida favorita: ");

// 🟢 Se você precisa de NÚMEROS para fazer contas matemáticas,
// você DEVE envelopar o prompt com a função "Number()":
const idade = Number(prompt("Digite sua idade: "));
const preco = Number(prompt("Preço do item: R$"));


// -------------------------------------------------------------------------
// 🧮 COMPONENTE 4: Operações Matemáticas e Ordem de Precedência
// Assim como na matemática da escola, algumas contas acontecem antes de outras.
// -------------------------------------------------------------------------

// Operadores básicos:  + (Soma), - (Subtração), * (Multiplicação), / (Divisão)
// Parênteses () servem para forçar o computador a calcular aquilo PRIMEIRO.

// ❌ ERRADO: Vai dividir nota3 por 3 primeiro e quebrar a média!
// const mediaErrada = nota1 + nota2 + nota3 / 3;

//  Forma correta:
const nota1 = 8.0;
const nota2 = 6.5;
const nota3 = 9.0;
const mediaCorreta = (nota1 + nota2 + nota3) / 3;

// Cálculo de porcentagem técnica: (Valor * Porcentagem) / 100
const custoFabrica = 100;
const taxaImposto = 15; // 15%
const valorDoImposto = (custoFabrica * taxaImposto) / 100;


// -------------------------------------------------------------------------
// 📤 COMPONENTE 5: Saída de Dados (Exibir na tela)
// Usamos o "console.log" para imprimir mensagens no terminal.
// -------------------------------------------------------------------------

// Você pode juntar texto e variáveis usando o operador "+" (Concatenação)
console.log("Olá, " + texto + "! Sua média final foi: " + mediaCorreta);

// Dica de formatação: "\n" serve para pular uma linha na exibição!
console.log("\n--- FIM DO GUIA ---");


// PARA TESTAR SE CADA EXERCÍCIO ESTÁ CERTO, RODE NO TERMINAL O COMANDO DE ACORDO COM SEU EXERCÍCIO
// Lembrando que os testes automáticos não são 100% confiáveis
/*

    exercicio1.js -> npm test -- cadastro-usuario
    exercicio2.js -> npm test -- sistema-notas
    exercicio3.js -> npm test -- conversor-segundos
    exercicio4.js -> npm test -- faturamento-loja
    exercicio5.js -> npm test -- extrato-bancario
    exercicio6.js -> npm test -- lanchonete
    exercicio7.js -> npm test -- conversor-cambio
    exercicio8.js -> npm test -- preco-produto

*/