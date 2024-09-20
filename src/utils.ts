/**
 * Remove caracteres de máscara (espaços, pontos e hífens) de um código de boleto.
 *
 * @param codigo - O código do boleto que pode conter caracteres de formatação.
 * @returns O código sem caracteres de máscara.
 */
export function clearMask(codigo: string): string {
  return codigo.replace(/[.\-\s]/g, '');
}
