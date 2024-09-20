# Boleto Validator TS

## Descrição

boleto-validator-ts é um pacote completo, desenvolvido em TypeScript, para validação de boletos bancários e de arrecadação no Brasil. O pacote suporta validação de códigos de barras e de linhas digitáveis, com ou sem formatação. Utilizando tipos estritos de TypeScript, ele garante maior segurança no desenvolvimento e desempenho aprimorado.

## Instalação

Você pode instalar o pacote via npm:

```bash
npm install boleto-validator-ts
```

## Funcionalidades

### Validação de boletos bancários e de arrecadação

### Suporte para códigos de barras e linhas digitáveis

### Módulos de validação com algoritmos de Módulo 10 e Módulo 11

### Utilitário para remoção de formatação de boletos (máscaras)

## Como Usar

### Importação

Primeiro, importe as funções que deseja usar no seu projeto:

```typescript
import {
  boleto,
  boletoBancario,
  boletoArrecadacao,
  clearMask,
} from "boleto-validator-ts";
```

### Remover Máscara de Boleto

Use a função clearMask para remover formatação de um código de boleto. Essa função remove espaços, pontos e hífens.

```typescript
const codigoComMascara = "34191.79001 01043.510047 91020.150008 7 89710026000";
const codigoSemMascara = clearMask(codigoComMascara);
console.log(codigoSemMascara);
// Saída: "34191790010104351004791020150008789710026000"
```

### Validar um Boleto (Banco ou Arrecadação)

A função boleto detecta automaticamente se o boleto é bancário ou de arrecadação e faz a validação correspondente. Você também pode optar por validar os blocos do boleto, definindo o parâmetro validarBlocos.

```typescript
const codigo = "34191.79001 01043.510047 91020.150008 7 89710026000";
const isValid = boleto(codigo, true);
console.log(isValid);
// Saída: true (se for válido)
```

### Validar um Boleto Bancário

Se você souber que o boleto é bancário, pode usar a função boletoBancario para validar a linha digitável ou o código de barras.

```typescript
const codigoBancario = "34191790010104351004791020150008789710026000";
const isValidBancario = boletoBancario(codigoBancario, true);
console.log(isValidBancario);
// Saída: true (se for válido)
```

### Validar um Boleto de Arrecadação

Para boletos de arrecadação, você pode usar boletoArrecadacao. Essa função valida tanto a linha digitável quanto o código de barras.

```typescript
const codigoArrecadacao = "83640000001084351004791020150008789710026000";
const isValidArrecadacao = boletoArrecadacao(codigoArrecadacao, true);
console.log(isValidArrecadacao);
// Saída: true (se for válido)
```

### Conversão de Linha Digitável para Código de Barras

Se você precisar converter a linha digitável de um boleto para o código de barras, há funções específicas para boletos bancários e de arrecadação.

Converter Boleto Bancário

```typescript
import { convertToBoletoBancarioCodigoBarras } from "boleto-validator-ts";

const linhaDigitavel = "34191.79001 01043.510047 91020.150008 7 89710026000";
const codigoBarras = convertToBoletoBancarioCodigoBarras(linhaDigitavel);
console.log(codigoBarras);
// Saída: Código de barras correspondente
```

Converter Boleto de Arrecadação

```typescript
import { convertToBoletoArrecadacaoCodigoBarras } from "boleto-validator-ts";

const linhaDigitavelArrecadacao =
  "83640000001084351004791020150008789710026000";
const codigoBarrasArrecadacao = convertToBoletoArrecadacaoCodigoBarras(
  linhaDigitavelArrecadacao
);
console.log(codigoBarrasArrecadacao);
// Saída: Código de barras correspondente
```

### Funções Internas de Validação

#### Módulo 10

O Módulo 10 é usado para validar boletos que seguem essa regra de verificação. Você pode utilizar modulo10 diretamente se precisar fazer a validação de um bloco específico.

```typescript
import { modulo10 } from "boleto-validator-ts";

const bloco = "3419179001";
const dv = modulo10(bloco);
console.log(dv);
// Saída: Dígito verificador calculado
```

#### Módulo 11

O Módulo 11 é utilizado tanto para boletos bancários quanto de arrecadação. O pacote oferece implementações específicas para ambos os tipos.

#### modulo11Bancario: Valida boletos bancários

#### modulo11Arrecadacao: Valida boletos de arrecadação

```typescript
import { modulo11Bancario, modulo11Arrecadacao } from "boleto-validator-ts";

const blocoBancario = "3419179001";
const dvBancario = modulo11Bancario(blocoBancario);

const blocoArrecadacao = "83640000001";
const dvArrecadacao = modulo11Arrecadacao(blocoArrecadacao);

console.log(dvBancario, dvArrecadacao);
// Saída: Dígitos verificadores calculados para cada tipo de boleto
```

### Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests no repositório oficial.

### Licença

Este projeto está licenciado sob a licença ISC. Veja o arquivo LICENSE para mais detalhes.
