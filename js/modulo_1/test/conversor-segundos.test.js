const fs = require('fs');
const path = require('path');

describe('--- TESTE DO CONVERSOR DE TEMPO ---', () => {
    let consoleSpy;

    beforeEach(() => {
        // Limpa o cache do Node para que o script rode do zero em cada teste
        jest.resetModules();
        // Espiona as mensagens que o programa vai mostrar no console.log
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    test('Deve ler o tempo inserido e converter para segundos corretamente', () => {
        // 1. Dados fictícios de teste: 2 horas, 30 minutos e 15 segundos
        // O cálculo esperado é: (2 * 3600) + (30 * 60) + 15 -> 7200 + 1800 + 15 = 9015 segundos
        const entradasDoUsuario = ["2", "30", "15"];
        const totalSegundosEsperado = 9015;

        // 2. Simulando as entradas do prompt-sync
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
            require('../src/exercicio3.js');
        } catch (erro) {
            fail("Ocorreu um erro ao executar o código: " + erro.message);
        }

        // 4. VALIDAÇÕES:

        // Verifica se o prompt foi chamado exatamente 3 vezes (horas, minutos e segundos)
        expect(mockPrompt).toHaveBeenCalledTimes(3);

        // Coleta todas as mensagens enviadas ao console
        const chamadasDoConsole = consoleSpy.mock.calls.map(call => call[0].toString());

        // Verifica se o total de segundos calculado corretamente apareceu no console junto com alguma indicação de segundos/total
        const encontrouResultado = chamadasDoConsole.some(msg => 
            msg.includes(totalSegundosEsperado.toString()) && (msg.toLowerCase().includes("segundos") || msg.toLowerCase().includes("total"))
        );

        expect(encontrouResultado).toBe(true);
    });
});