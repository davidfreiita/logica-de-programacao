const fs = require('fs');
const path = require('path');

describe('--- TESTE DO FATURAMENTO DA LOJA ---', () => {
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

    test('Deve ler os 12 meses, calcular o total do ano e de cada semestre corretamente', () => {
        // 1. Dados fictícios para o teste: 
        // Loja: "Loja Tech"
        // Meses de Jan a Jun: 1000 a cada mês (Total 1º Semestre = 6000)
        // Meses de Jul a Dez: 2000 a cada mês (Total 2º Semestre = 12000)
        // Total do Ano = 18000
        const entradasDoUsuario = [
            "Loja Tech", // Nome da loja
            "1000", "1000", "1000", "1000", "1000", "1000", // Jan a Jun
            "2000", "2000", "2000", "2000", "2000", "2000"  // Jul a Dez
        ];

        const totalSemestre1Esperado = 6000;
        const totalSemestre2Esperado = 12000;
        const totalAnoEsperado = 18000;

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
            require('../src/exercicio4.js');
        } catch (erro) {
            fail("Ocorreu um erro ao executar o código do aluno: " + erro.message);
        }

        // 4. VALIDAÇÕES:

        // Garante que o prompt foi chamado exatamente 13 vezes (1 para loja + 12 meses)
        expect(mockPrompt).toHaveBeenCalledTimes(13);

        // Coleta todas as mensagens enviadas ao console
        const chamadasDoConsole = consoleSpy.mock.calls.map(call => call[0].toString());

        // Verifica se o nome da loja e os valores esperados de faturamento (ano, 1º semestre e 2º semestre) apareceram no console
        const encontrouLoja = chamadasDoConsole.some(msg => msg.includes("Loja Tech"));
        const encontrouTotalAno = chamadasDoConsole.some(msg => msg.includes(totalAnoEsperado.toString()) && (msg.toLowerCase().includes("ano") || msg.toLowerCase().includes("faturar")));
        const encontrouSemestre1 = chamadasDoConsole.some(msg => msg.includes(totalSemestre1Esperado.toString()) && msg.toLowerCase().includes("primeiro"));
        const encontrouSemestre2 = chamadasDoConsole.some(msg => msg.includes(totalSemestre2Esperado.toString()) && msg.toLowerCase().includes("segundo"));

        expect(encontrouLoja).toBe(true);
        expect(encontrouTotalAno).toBe(true);
        expect(encontrouSemestre1).toBe(true);
        expect(encontrouSemestre2).toBe(true);
    });
});