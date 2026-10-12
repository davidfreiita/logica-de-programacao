const fs = require('fs');
const path = require('path');

describe('--- TESTE DO EXTRATO BANCÁRIO ---', () => {
    let consoleSpy;

    beforeEach(() => {
        // Limpa o cache do Node para que o script rode do zero em cada teste
        jest.resetModules();
        // Espiona as mensagens enviadas para o console.log
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    test('Deve ler os dados da conta, calcular as movimentações e exibir o extrato correto', () => {
        // 1. Dados fictícios para o teste
        const entradasDoUsuario = [
            "Ana Souza",     // nome_correntista
            "Banco do Brasil", // nome_banco
            "12345",         // numero_conta
            "1000",          // limite_credito
            "1500",          // saldo_atual
            "400",           // cheque_debitar (Saída)
            "300",           // dinheiro_creditar (Entrada)
            "200"            // cheque_creditar (Entrada)
        ];

        // Cálculo esperado: (1000 + 1500 + 200 + 300) - 400
        // 3000 - 400 = 2600
        const saldoDisponivelEsperado = 2600;

        // 2. Simulando as entradas sequenciais do prompt-sync
        let contadorPrompt = 0;
        const mockPrompt = jest.fn().mockImplementation(() => {
            const resposta = entradasDoUsuario[contadorPrompt];
            contadorPrompt++;
            return resposta;
        });
        const mockPromptSync = jest.fn().mockReturnValue(mockPrompt);
        jest.mock('prompt-sync', () => mockPromptSync, { virtual: true });

        // 3. Executa o arquivo da resposta
        try {
            require('../src/exercicio5.js');
        } catch (erro) {
            fail("Ocorreu um erro ao executar o código do aluno: " + erro.message);
        }

        // 4. VALIDAÇÕES:

        // Garante que o prompt foi chamado exatamente 8 vezes
        expect(mockPrompt).toHaveBeenCalledTimes(8);

        // Coleta todas as mensagens enviadas ao console
        const chamadasDoConsole = consoleSpy.mock.calls.map(call => call[0].toString());

        // Verifica se as informações essenciais (nome, banco, conta e o saldo final calculado) apareceram nas mensagens
        const encontrouNome = chamadasDoConsole.some(msg => msg.includes("Ana Souza"));
        const encontrouBanco = chamadasDoConsole.some(msg => msg.includes("Banco do Brasil"));
        const encontrouConta = chamadasDoConsole.some(msg => msg.includes("12345"));
        const encontrouSaldo = chamadasDoConsole.some(msg => 
            msg.includes(saldoDisponivelEsperado.toString()) && (msg.toLowerCase().includes("saldo") || msg.toLowerCase().includes("disponível"))
        );

        expect(encontrouNome).toBe(true);
        expect(encontrouBanco).toBe(true);
        expect(encontrouConta).toBe(true);
        expect(encontrouSaldo).toBe(true);
    });
});