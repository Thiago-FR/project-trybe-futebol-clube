
---

# Boas vindas ao repositório do TFC - Trybe Futebol Clube! ⚽️

---

# Sumário

- [Boas vindas ao repositório do TFC - Trybe Futebol Clube! ⚽️](#boas-vindas-ao-repositório-do-tfc---trybe-futebol-clube-️)
- [Habilidades Desenvolvidas](#habilidades)
- [O que foi desenvolvido](#o-que-foi-desenvolvido)
- [Para testar o projeto](#testar-o-projeto)
- [Endpoint's](#endpoint)
  - [Para login POST](#login)
  - [Para teams GET](#team)
  - [Para teams por Id GET](#teamId)
  - [Para matches GET](#matches)
  - [Para criar matches POST](#matchesPost)
- [Protótipo](#prototipo)

---

## Habilidades desenvolvidas: <a name="habilidades"></a>

 - Realizar a dockerização dos apps, network, volume e compose;
 - Modelar dados com **MySQL** através do **Sequelize**;
 - Criar e associar tabelas usando `models` do `sequelize`;
 - Construir uma **API REST** com endpoints para consumir os models criados;
 - Fazer um `CRUD` utilizando `ORM`;
 - Realizar TDD

---

## O que foi desenvolvido: <a name="o-que-foi-desenvolvido"></a>

Nesse projeto, foi construido **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. **A API foi capaz de ser consumida por um front-end provido pela Trybe**.

Foi arquitetado e desenvolvido uma aplicação responsável pela serie A do campeonato __TFC - Trybe Futebol Clube__. 

Foi desenvolvido alguns endpoints (seguindo os princípios **REST**) que estarão conectados ao banco de dados.

Para adicionar uma partida é necessário usuário e senha, portanto a pessoa deverá estar logada para fazer as alterações. Temos um relacionamento entre as tabelas `teams` e `matches` para fazermos as atualizações das partidas.

Foi implementado regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.


Obs: Algumas melhorias **SOLID** ainda são necessárias.

---

### Conexão com o Banco: <a name="conexao-db"></a>

**⚠️ IMPORTANTE! ⚠️**

Essa API utiliza as seguintes variáveis de ambiente:

```sh
PORT=
DB_USER=
DB_PASS=
DB_NAME=TRYBE_FUTEBOL_CLUBE
DB_HOST=
DB_PORT=
```

---

## Para testar o projeto: <a name="testar-o-projeto"></a>

1. Clone o repositório
  * `https://github.com/Thiago-FR/project-trybe-futebol-clube.git`.
  * Entre na pasta do repositório que você acabou de clonar

2. Rode a API via Docker [**É Necessário ter o Docker instalado!**]
  * `npm run compose:up`

  2.1. Ao final da containerização você pode checar os container **db** e **app_backend** :
    * `docker ps`

  2.2. Para descer os container basta rodar:
    * `npm run compose:down`

2. Rode a API local [**É Necessário ter o MySql instalado!**]
  * Entre na pasta *app/backend*

  2.1 Instale as dependências
    * `npm install`

  2.2 Inicie a API.
    * `npm start`

---

## Endpoint's <a name="endpoint"></a>

### Para login POST <a name="login"></a>

* Endpoint: `/login`

Body
```json
 {
  "email": "admin@admin.com",
  "password": ""
}
 ```

```json
 {
  "user": {
    "id": 1,
    "username": "Admin",
    "role": "admin",
    "email": "admin@admin.com"
  },
  "token": // Aqui deve ser o token gerado pelo backend.
 }
```

### Para teams GET <a name="team"></a>

* Endpoint: `/teams`

```json
  [
    {
      "id": 1,
      "teamName": "Avaí/Kindermann"
    },
    ...
  ]
```

### Para teams por ID GET <a name="teamId"></a>

* Endpoint: `/teams/:id`

```json
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  }
```

### Para matches GET <a name="matches"></a>

* Endpoint: `/matches`

```json
  [
    {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Grêmio"
      }
    },
    ...
  ]
```

### Para criar matches POST <a name="matchesPost"></a>

* Endpoint: `/matches`

Body
```json
  {
    "homeTeam": 16, // O valor deve ser o id do time
    "awayTeam": 8, // O valor deve ser o id do time
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
    "inProgress": true // a partida deve ser criada como em progresso
  }
```

## Protótipo <a name="prototipo"></a>