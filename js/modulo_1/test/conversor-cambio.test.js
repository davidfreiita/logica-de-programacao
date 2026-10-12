const fs = require('fs');
const path = require('path');

describe('--- TESTE DO CONVERSOR DE CÂMBIO ---', () => {
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

    test('Deve ler a cotação e os valores, calculando as duas conversões corretamente', () => {
        // 1. Dados fictícios para o teste:
        // Cotação: 5.00
        // Dólares para converter: 100 (Esperado em Reais: 100 * 5 = 500)
        // Reais para converter: 250 (Esperado em Dólares: 250 / 5 = 50)
        const entradasDoUsuario = [
            "5.00", // cotacao
            "100",  // dolar
            "250"   // reais
        ];

        const valorDolarEsperado = 50;  // 250 / 5
        const valorReaisEsperado = 500; // 100 * 5

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
            require('../src/exercicio7.js');
        } catch (erro) {
            fail("Ocorreu um erro ao executar o código do aluno: " + erro.message);
        }

        // 4. VALIDAÇÕES:

        // Garante que o prompt foi chamado exatamente 3 vezes
        expect(mockPrompt).toHaveBeenCalledTimes(3);

        // Coleta todas as mensagens enviadas ao console
        const chamadasDoConsole = consoleSpy.mock.calls.map(call => call[0].toString());

        // Verifica se os valores convertidos esperados apareceram no console
        const encontrouConversaoDolar = chamadasDoConsole.some(msg => msg.includes(valorDolarEsperado.toString()) && (msg.toLowerCase().includes("dólar") || msg.toLowerCase().includes("dolar")));
        const encontrouConversaoReais = chamadasDoConsole.some(msg => msg.includes(valorReaisEsperado.toString()) && msg.toLowerCase().includes("reais"));

        expect(encontrouConversaoDolar).toBe(true);
        expect(encontrouConversaoReais).toBe(true);
    });
});