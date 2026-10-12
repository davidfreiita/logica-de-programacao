const fs = require('fs');
const path = require('path');

describe('--- TESTE DO CÁLCULO DE PREÇO DO PRODUTO ---', () => {
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

    test('Deve ler os custos e taxas, calcular as porcentagens e exibir o preço final corretamente', () => {
        // 1. Dados fictícios para o teste:
        // Produto: "Notebook"
        // Custo de Fábrica: R$ 1000
        // Taxa de Imposto: 15% (Esperado em reais: 1000 * 15 / 100 = 150)
        // Taxa do Distribuidor: 10% (Esperado em reais: 1000 * 10 / 100 = 100)
        // Preço Total Esperado: 1000 + 150 + 100 = 1250
        const entradasDoUsuario = [
            "Notebook", // nome_produto
            "1000",     // custo_fabrica
            "15",       // taxa_imposto
            "10"        // taxa_distribuidor
        ];

        const precoTotalEsperado = 1250;

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
            require('../src/exercicio8.js');
        } catch (erro) {
            fail("Ocorreu um erro ao executar o código do aluno: " + erro.message);
        }

        // 4. VALIDAÇÕES:

        // Garante que o prompt foi chamado exatamente 4 vezes
        expect(mockPrompt).toHaveBeenCalledTimes(4);

        // Coleta todas as mensagens enviadas ao console
        const chamadasDoConsole = consoleSpy.mock.calls.map(call => call[0].toString());

        // Verifica se o nome do produto e o preço total correto (1250) apareceram no console
        const encontrouProduto = chamadasDoConsole.some(msg => msg.includes("Notebook"));
        const encontrouPrecoTotal = chamadasDoConsole.some(msg => 
            msg.includes(precoTotalEsperado.toString()) && 
            (msg.toLowerCase().includes("preço") || msg.toLowerCase().includes("total") || msg.toLowerCase().includes("igual"))
        );

        expect(encontrouProduto).toBe(true);
        expect(encontrouPrecoTotal).toBe(true);
    });
});