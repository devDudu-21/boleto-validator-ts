import { clearMask } from './utils';

/**
 * Converte a linha digitável de um boleto de arrecadação para o código de barras.
 *
 * @param codigo - O código do boleto de arrecadação com ou sem máscara.
 * @returns O código de barras correspondente.
 */
export function convertToBoletoArrecadacaoCodigoBarras(codigo: string): string {
  const cod = clearMask(codigo);
  let codigoBarras = '';

  // Itera por cada uma das 4 partes, concatenando no código de barras
  for (let index = 0; index < 4; index++) {
    const start = 11 * index + index;
    const end = 11 * (index + 1) + index;
    codigoBarras += cod.substring(start, end);
  }

  return codigoBarras;
}

/**
 * Converte a linha digitável de um boleto bancário para o código de barras.
 *
 * @param codigo - O código do boleto bancário com ou sem máscara.
 * @returns O código de barras correspondente.
 */
export function convertToBoletoBancarioCodigoBarras(codigo: string): string {
  const cod = clearMask(codigo);
  let codigoBarras = '';

  // Montagem do código de barras seguindo as regras do boleto bancário.
  codigoBarras += cod.substring(0, 3); // Identificação do banco
  codigoBarras += cod.substring(3, 4); // Código da moeda
  codigoBarras += cod.substring(32, 33); // Dígito Verificador
  codigoBarras += cod.substring(33, 37); // Fator de vencimento
  codigoBarras += cod.substring(37, 47); // Valor nominal
  codigoBarras += cod.substring(4, 9); // Campo Livre - Bloco 1
  codigoBarras += cod.substring(10, 20); // Campo Livre - Bloco 2
  codigoBarras += cod.substring(21, 31); // Campo Livre - Bloco 3

  return codigoBarras;
}
