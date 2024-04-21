# Sistema Eletrônico para Restaurantes

O sistema de comandas online oferece um serviço conveniente onde os clientes podem acompanhar os seus pedidos em tempo real através do smartphone. Com a integração do CPF do cliente, os pedidos são registados automaticamente, permitindo que o cliente acompanhe todas as adições e remoções na sua comanda. Esta solução é especialmente útil para estabelecimentos que não possuem um sistema de comandas físicas visíveis para os clientes, garantindo transparência e praticidade em todo o processo de pedido.

## Requisitos do Sistema

Para operar o sistema, são necessários os seguintes requisitos mínimos na sua máquina: PHP, Composer, Node.js e Docker. O PHP e o Composer são essenciais para executar o Laravel, que contém a API principal do sistema. O Node.js é necessário para executar o front-end, enquanto o Docker é utilizado para virtualizar o ambiente no qual a API é executada. Estes componentes garantem a funcionalidade e o desempenho ideais do nosso sistema de forma integrada e eficiente.

## Arquitetura do Sistema

O sistema utiliza as seguintes linguagens:

- PHP
- TypeScript

Banco de dados:

- MySQL

Frameworks:

- Laravel
- Next.js

Arquitetura da API:

- MVC
- RESTful

Além disso, faz uso de:

- React
- Docker

## Como Iniciar o Sistema

### Passo 1: Configuração do Front-end

Entre na pasta front-end:


Baixe as dependências do Node.js:

```bash
npm i
```

Inicie o servidor do Next.js:

```bash
npm run dev
```

### Passo 2: Acesso ao Sistema

Abra o navegador e acesse `http://localhost:3000` para utilizar o serviço.
