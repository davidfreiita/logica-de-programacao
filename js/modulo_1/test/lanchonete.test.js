const fs = require('fs');
const path = require('path');

describe('--- TESTE DA LANCHONETE (NOTA FISCAL) ---', () => {
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

    test('Deve exibir a tabela, ler as quantidades e calcular o total da nota fiscal corretamente', () => {
        // 1. Dados fictícios de quantidades de itens que simularemos no prompt
        const entradasDoUsuario = [
            "Bruno Lima", // nome do cliente
            "2",          // 2 Hot Dogs x R$1,00 = R$2,00
            "1",          // 1 Hambúrguer x R$1,30 = R$1,30
            "2",          // 2 Cheeseburguers x R$1,50 = R$3,00
            "3",          // 3 Refrigerantes x R$1,00 = R$3,00
            "5"           // 5 Batatas Fritas x R$0,80 = R$4,00
        ];

        // Cálculo esperado: 2.00 + 1.30 + 3.00 + 3.00 + 4.00 = 13.3
        const totalCompraEsperado = 13.3;

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
            require('../src/exercicio6.js');
        } catch (erro) {
            fail("Ocorreu um erro ao executar o código do aluno: " + erro.message);
        }

        // 4. VALIDAÇÕES:

        // Garante que o prompt foi chamado exatamente 6 vezes (1 para o nome + 5 para os itens)
        expect(mockPrompt).toHaveBeenCalledTimes(6);

        // Coleta todas as mensagens enviadas ao console
        const chamadasDoConsole = consoleSpy.mock.calls.map(call => call[0].toString());

        // Verifica se a tabela de preços, o nome do cliente e o total esperado da compra apareceram no console
        const encontrouTabela = chamadasDoConsole.some(msg => msg.toLowerCase().includes("tabela") || msg.toLowerCase().includes("hot dog") || msg.toLowerCase().includes("hambúrguer"));
        const encontrouCliente = chamadasDoConsole.some(msg => msg.includes("Bruno Lima"));
        const encontrouTotal = chamadasDoConsole.some(msg => 
            (msg.includes(totalCompraEsperado.toString()) || msg.includes("13.30")) && 
            (msg.toLowerCase().includes("total") || msg.toLowerCase().includes("compra"))
        );

        expect(encontrouTabela).toBe(true);
        expect(encontrouCliente).toBe(true);
        expect(encontrouTotal).toBe(true);
    });
});