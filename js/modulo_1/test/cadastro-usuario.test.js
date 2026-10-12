const fs = require('fs');
const path = require('path');

describe('--- TESTE DO SEU PROGRAMA ---', () => {
    let consoleSpy;

    beforeEach(() => {
        // Limpa o cache do Node para permitir rodar o arquivo do aluno do zero
        jest.resetModules();
        // Espiona as mensagens que o aluno vai mostrar no console.log
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    test('Verificando se as perguntas e respostas estão corretas...', () => {
        // 1. Criamos dados de teste fictícios
        const dadosFicticios = [
            "Carlos Eduardo",      // Nome
            "Rua das Palmeiras",   // Endereço
            "Belo Horizonte",      // Cidade
            "UFMG",                // Faculdade
            "30123456",            // CEP
            "31988887777"          // Telefone
        ];

        // 2. Simulamos o comportamento do prompt-sync para o aluno
        let chamadaPrompt = 0;
        const mockPrompt = jest.fn().mockImplementation(() => {
            const resposta = dadosFicticios[chamadaPrompt];
            chamadaPrompt++;
            return resposta;
        });

        const mockPromptSync = jest.fn().mockReturnValue(mockPrompt);

        // 3. Injetamos o nosso "prompt de mentira" dentro do ambiente do Node
        jest.mock('prompt-sync', () => mockPromptSync, { virtual: true });

        // 4. Executa o arquivo do aluno
        try {
            require('../src/exercicio1.js');
        } catch (erro) {
            fail("Ocorreu um erro ao rodar seu código. Verifique a sintaxe! Erro: " + erro.message);
        }

        // 5. Validações flexíveis aceitando variações de texto do aluno
        expect(mockPrompt).toHaveBeenCalledTimes(6);

        // Coleta todas as mensagens enviadas ao console
        const chamadasDoConsole = consoleSpy.mock.calls.map(call => call[0].toString());

        // Verifica se cada dado individual fornecido pelo aluno apareceu corretamente nas mensagens do console
        const encontrouNome = chamadasDoConsole.some(msg => msg.includes("Carlos Eduardo"));
        const encontrouEndereco = chamadasDoConsole.some(msg => msg.includes("Rua das Palmeiras"));
        const encontrouCidade = chamadasDoConsole.some(msg => msg.includes("Belo Horizonte"));
        const encontrouFaculdade = chamadasDoConsole.some(msg => msg.includes("UFMG"));
        const encontrouCep = chamadasDoConsole.some(msg => msg.includes("30123456"));
        const encontrouTelefone = chamadasDoConsole.some(msg => msg.includes("31988887777"));

        expect(encontrouNome).toBe(true);
        expect(encontrouEndereco).toBe(true);
        expect(encontrouCidade).toBe(true);
        expect(encontrouFaculdade).toBe(true);
        expect(encontrouCep).toBe(true);
        expect(encontrouTelefone).toBe(true);
    });
});