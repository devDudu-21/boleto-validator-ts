import { modulo10, modulo11Arrecadacao } from './modulo';
import { convertToBoletoArrecadacaoCodigoBarras } from './conversor';
import { clearMask } from './utils';

// Define o tipo dos parâmetros e retorno da função
export function boletoArrecadacaoCodigoBarras(codigo: string): boolean {
  const cod: string = clearMask(codigo);

  // Verifica se o código segue o formato e começa com 8
  if (!/^[0-9]{44}$/.test(cod) || Number(cod[0]) !== 8) return false;

  const codigoMoeda: number = Number(cod[2]);
  const DV: number = Number(cod[3]);
  const bloco: string = cod.substring(0, 3) + cod.substring(4);

  // Determina qual módulo usar (modulo10 ou modulo11Arrecadacao)
  let modulo: (bloco: string) => number;
  if (codigoMoeda === 6 || codigoMoeda === 7) {
    modulo = modulo10;
  } else if (codigoMoeda === 8 || codigoMoeda === 9) {
    modulo = modulo11Arrecadacao;
  } else {
    return false;
  }

  return modulo(bloco) === DV;
}

// Interface para definir o tipo dos blocos
interface Bloco {
  num: string;
  DV: string;
}

export function boletoArrecadacaoLinhaDigitavel(codigo: string, validarBlocos: boolean = false): boolean {
  const cod: string = clearMask(codigo);

  // Verifica se o código segue o formato e começa com 8
  if (!/^[0-9]{48}$/.test(cod) || Number(cod[0]) !== 8) return false;

  const validDV: boolean = boletoArrecadacaoCodigoBarras(convertToBoletoArrecadacaoCodigoBarras(cod));

  if (!validarBlocos) return validDV;

  const codigoMoeda: number = Number(cod[2]);

  // Determina qual módulo usar (modulo10 ou modulo11Arrecadacao)
  let modulo: (bloco: string) => number;
  if (codigoMoeda === 6 || codigoMoeda === 7) {
    modulo = modulo10;
  } else if (codigoMoeda === 8 || codigoMoeda === 9) {
    modulo = modulo11Arrecadacao;
  } else {
    return false;
  }

  // Criação dos blocos
  const blocos: Bloco[] = Array.from({ length: 4 }, (_, index) => {
    const start = (11 * index) + index;
    const end = (11 * (index + 1)) + index;
    return {
      num: cod.substring(start, end),
      DV: cod.substring(end, end + 1),
    };
  });

  // Verifica se todos os blocos têm os DVs corretos
  const validBlocos: boolean = blocos.every(e => modulo(e.num) === Number(e.DV));

  return validBlocos && validDV;
}

// Função principal para verificar o tipo de boleto de arrecadação (código de barras ou linha digitável)
export function boletoArrecadacao(codigo: string, validarBlocos: boolean = false): boolean {
  const cod: string = clearMask(codigo);

  // Verifica se o código tem 44 dígitos (código de barras)
  if (cod.length === 44) {
    return boletoArrecadacaoCodigoBarras(cod);
  }

  // Verifica se o código tem 48 dígitos (linha digitável)
  if (cod.length === 48) {
    return boletoArrecadacaoLinhaDigitavel(codigo, validarBlocos);
  }

  // Código inválido
  return false;
}
