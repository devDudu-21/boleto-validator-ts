import { boletoArrecadacao } from './boleto-arrecadacao';
import { boletoBancario } from './boleto-bancario';
import { clearMask } from './utils';

// Define o tipo dos parâmetros e o tipo de retorno como string ou boolean
export function boleto(codigo: string, validarBlocos: boolean = false): boolean | string {
  const cod: string = clearMask(codigo);
  
  // Garantir que o código não está vazio antes de acessar o índice
  if (cod.length === 0) {
    throw new Error("Código inválido");
  }

  // Checa se o primeiro caractere do código é '8'
  if (Number(cod[0]) === 8) {
    return boletoArrecadacao(cod, validarBlocos);  
  }
  
  return boletoBancario(cod, validarBlocos);  
}
