import {
  convertToBoletoArrecadacaoCodigoBarras,
  convertToBoletoBancarioCodigoBarras,
} from "../src/conversor";

describe("Converter Boletos", () => {
  it("converte linha digitável para código de barras do boleto bancário", () => {
    const result = convertToBoletoBancarioCodigoBarras(
      "23793381286000782713695000063305975520000370000"
    );
    expect(result).toBe("23799755200003700003381260007827139500006330");
  });

  it("converte linha digitável para código de barras do boleto de arrecadação", () => {
    const result = convertToBoletoArrecadacaoCodigoBarras(
      "836200000005 667800481000 180975657313 001589636081"
    );
    expect(result).toBe("83620000000667800481001809756573100158963608");
  });
});
