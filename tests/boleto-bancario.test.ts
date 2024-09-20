import {
  boletoBancario,
  boletoBancarioCodigoBarras,
  boletoBancarioLinhaDigitavel,
} from "../src/boleto-bancario";

describe("Validar Boletos Bancários", () => {
  it("validação da linha digitável do boleto válido com máscara", () => {
    const result = boletoBancarioLinhaDigitavel(
      "23793.38128 60007.827136 95000.063305 9 75520000370000"
    );
    expect(result).toBe(true); // Verifica se a linha digitável é válida com máscara
  });

  it("validação da linha digitável do boleto válido sem máscara", () => {
    const result = boletoBancarioLinhaDigitavel(
      "23793381286000782713695000063305975520000370000"
    );
    expect(result).toBe(true); // Verifica se a linha digitável é válida sem máscara
  });

  it("validação da linha digitável do boleto com blocos válidos", () => {
    const result = boletoBancarioLinhaDigitavel(
      "23793381286000782713695000063305975520000370000",
      true
    );
    expect(result).toBe(true); // Verifica se os blocos da linha digitável são válidos
  });

  it("validação da linha digitável do boleto inválido", () => {
    const result = boletoBancarioLinhaDigitavel(
      "23793.38128 60007.827136 95000.063305 4 75520000370000"
    );
    expect(result).toBe(false); // Verifica se a linha digitável é inválida
  });

  it("validação da linha digitável do boleto com tamanho inválido", () => {
    const result = boletoBancarioLinhaDigitavel(
      "23793.38128 6007.827136 95000.063305 4 75520000370000"
    );
    expect(result).toBe(false); // Verifica se o tamanho incorreto retorna inválido
  });

  it("validação do código de barras do boleto válido", () => {
    const result = boletoBancarioCodigoBarras(
      "00193373700000001000500940144816060680935031"
    );
    expect(result).toBe(true); // Verifica se o código de barras do boleto é válido
  });

  it("validação do código de barras do boleto inválido", () => {
    const result = boletoBancarioCodigoBarras(
      "00153373700000001000500940144816060680935031"
    );
    expect(result).toBe(false); // Verifica se o código de barras inválido retorna false
  });

  it("validação do código de barras do boleto com tamanho inválido", () => {
    const result = boletoBancarioCodigoBarras(
      "0015337300000001000500940144816060680935031"
    );
    expect(result).toBe(false); // Verifica se o tamanho incorreto do código de barras é inválido
  });

  it("validação do boleto com linha digitável válida", () => {
    const result = boletoBancario(
      "23793381286000782713695000063305975520000370000"
    );
    expect(result).toBe(true); // Verifica se o boleto com linha digitável válida é validado corretamente
  });

  it("validação do boleto com blocos válidos", () => {
    const result = boletoBancario(
      "23793381286000782713695000063305975520000370000",
      true
    );
    expect(result).toBe(true); // Verifica se o boleto com blocos válidos é validado corretamente
  });

  it("validação do boleto inválido", () => {
    const result = boletoBancario(
      "2379338128600078271369500006975520000370000"
    );
    expect(result).toBe(false); // Verifica se o boleto inválido é rejeitado
  });
});
