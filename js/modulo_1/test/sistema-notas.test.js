const fs = require('fs');
const path = require('path');

describe('--- TESTE DO SISTEMA DE NOTAS E DISCIPLINAS ---', () => {
    let consoleSpy;

    beforeEach(() => {
        // Limpa o cache do Node para que o arquivo execute do zero em cada teste
        jest.resetModules();
        // Espiona e captura todos os console.log executados no script
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    test('Deve exibir dados fixos, ler entradas e calcular a média corretamente', () => {
        // 1. Dados fictícios que simularemos que o usuário digitou no terminal
        const entradasDoUsuario = [
            "Mariana Souza", // nome
            "7.5",            // n1
            "8.5",            // n2
            "8.0",            // n3
            "História",       // disciplinaLida
            "101"             // turma
        ];

        // Média esperada para as notas 7.5, 8.5 e 8.0 -> (7.5 + 8.5 + 8.0) / 3 = 8
        const mediaEsperada = 8; 

        // 2. Simulando o prompt-sync
        let contadorPrompt = 0;
        const mockPrompt = jest.fn().mockImplementation(() => {
            const resposta = entradasDoUsuario[contadorPrompt];
            contadorPrompt++;
            return resposta;
        });
        const mockPromptSync = jest.fn().mockReturnValue(mockPrompt);
        jest.mock('prompt-sync', () => mockPromptSync, { virtual: true });

        // 3. Executa o arquivo
        try {
            require('../src/exercicio2.js');
        } catch (erro) {
            fail("Ocorreu um erro de sintaxe ou execução no código: " + erro.message);
        }

        // 4. VALIDAÇÕES:

        // Garante que o prompt foi chamado exatamente 6 vezes
        expect(mockPrompt).toHaveBeenCalledTimes(6);

        // Coleta todas as mensagens enviadas ao console
        const chamadasDoConsole = consoleSpy.mock.calls.map(call => call[0].toString());

        // Verificações flexíveis garantindo que as informações principais apareçam no console
        const encontrouCabecalhoDisciplina = chamadasDoConsole.some(msg => msg.includes("DADOS DA DISCIPLINA"));
        const encontrouCabecalhoAluno = chamadasDoConsole.some(msg => msg.includes("DADOS DO ALUNO CADASTRADO"));
        const encontrouRelatorio = chamadasDoConsole.some(msg => msg.includes("RELATÓRIO DO ALUNO"));
        const encontrouNome = chamadasDoConsole.some(msg => msg.includes("Mariana Souza"));
        const encontrouDisciplina = chamadasDoConsole.some(msg => msg.includes("História"));
        const encontrouTurma = chamadasDoConsole.some(msg => msg.includes("101"));
        const encontrouMedia = chamadasDoConsole.some(msg => msg.includes(mediaEsperada.toString()) && msg.toLowerCase().includes("média"));

        expect(encontrouCabecalhoDisciplina).toBe(true);
        expect(encontrouCabecalhoAluno).toBe(true);
        expect(encontrouRelatorio).toBe(true);
        expect(encontrouNome).toBe(true);
        expect(encontrouDisciplina).toBe(true);
        expect(encontrouTurma).toBe(true);
        expect(encontrouMedia).toBe(true);
    });
});