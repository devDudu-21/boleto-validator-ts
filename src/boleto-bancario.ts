import { modulo10, modulo11Bancario } from './modulo';
import { convertToBoletoBancarioCodigoBarras } from './conversor';
import { clearMask } from './utils';

// Define o tipo de retorno como boolean ou um valor condicional
export function boletoBancarioCodigoBarras(codigo: string): boolean {
  const cod: string = clearMask(codigo);

  // Validação do formato do código de barras
  if (!/^[0-9]{44}$/.test(cod)) return false;

  const DV: string = cod[4];
  const bloco: string = cod.substring(0, 4) + cod.substring(5);

  return modulo11Bancario(bloco) === Number(DV);
}

interface Bloco {
  num: string;
  DV: string;
}

export function boletoBancarioLinhaDigitavel(codigo: string, validarBlocos: boolean = false): boolean {
  const cod: string = clearMask(codigo);

  // Validação do formato da linha digitável
  if (!/^[0-9]{47}$/.test(cod)) return false;

  const blocos: Bloco[] = [
    {
      num: cod.substring(0, 9),
      DV: cod.substring(9, 10),
    },
    {
      num: cod.substring(10, 20),
      DV: cod.substring(20, 21),
    },
    {
      num: cod.substring(21, 31),
      DV: cod.substring(31, 32),
    },
  ];

  // Se validarBlocos for true, verifica cada bloco
  const validBlocos: boolean = validarBlocos
    ? blocos.every(e => modulo10(e.num) === Number(e.DV))
    : true;

  // Valida o código de barras gerado a partir da linha digitável
  const validDV: boolean = boletoBancarioCodigoBarras(convertToBoletoBancarioCodigoBarras(cod));

  return validBlocos && validDV;
}

// Função principal para verificar o código de boleto bancário
export function boletoBancario(codigo: string, validarBlocos: boolean = false): boolean {
  const cod: string = clearMask(codigo);

  // Se for um código de barras (44 dígitos)
  if (cod.length === 44) return boletoBancarioCodigoBarras(cod);

  // Se for uma linha digitável (47 dígitos)
  if (cod.length === 47) return boletoBancarioLinhaDigitavel(codigo, validarBlocos);

  // Se o código não for válido, retorna false
  return false;
}
