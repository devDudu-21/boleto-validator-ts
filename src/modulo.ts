/**
 * Calcula o Dígito Verificador (DV) usando o módulo 10.
 * @param bloco - String com o bloco de números a ser validado.
 * @returns O Dígito Verificador calculado.
 */
export function modulo10(bloco: string): number {
  const codigo = bloco.split('').reverse();
  const somatorio = codigo.reduce((acc, current, index) => {
    let soma = Number(current) * (((index + 1) % 2) + 1);
    // Se o produto for maior que 9, somar os dígitos.
    soma = soma > 9 ? Math.trunc(soma / 10) + (soma % 10) : soma;
    return acc + soma;
  }, 0);
  return Math.ceil(somatorio / 10) * 10 - somatorio;
}

/**
 * Calcula o Dígito Verificador (DV) para um boleto bancário usando o módulo 11.
 * @param bloco - String com o bloco de números a ser validado.
 * @returns O Dígito Verificador calculado, com tratamento especial para DV igual a 0, 10 ou 11.
 */
export function modulo11Bancario(bloco: string): number {
  const codigo = bloco.split('').reverse();
  let multiplicador = 2;
  const somatorio = codigo.reduce((acc, current) => {
    const soma = Number(current) * multiplicador;
    multiplicador = multiplicador === 9 ? 2 : multiplicador + 1;
    return acc + soma;
  }, 0);

  const restoDivisao = somatorio % 11;
  const DV = 11 - restoDivisao;

  // Tratamento especial para casos de resto igual a 0, 10 ou 11.
  if (DV === 0 || DV === 10 || DV === 11) return 1;
  return DV;
}

/**
 * Calcula o Dígito Verificador (DV) para um boleto de arrecadação usando o módulo 11.
 * @param bloco - String com o bloco de números a ser validado.
 * @returns O Dígito Verificador calculado, com regras especiais para restos de divisão.
 */
export function modulo11Arrecadacao(bloco: string): number {
  const codigo = bloco.split('').reverse();
  let multiplicador = 2;
  const somatorio = codigo.reduce((acc, current) => {
    const soma = Number(current) * multiplicador;
    multiplicador = multiplicador === 9 ? 2 : multiplicador + 1;
    return acc + soma;
  }, 0);

  const restoDivisao = somatorio % 11;

  // Regras especiais para resto igual a 0, 1 ou 10.
  if (restoDivisao === 0 || restoDivisao === 1) {
    return 0;
  }
  if (restoDivisao === 10) {
    return 1;
  }

  return 11 - restoDivisao;
}
