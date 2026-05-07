# 📏 Coding Rules — Hit Legends Hub

Este documento define as regras obrigatórias de desenvolvimento do projeto.

Todas as implementações devem seguir essas diretrizes.

---

## 🧠 Princípios Gerais

- Código deve ser modular, legível e escalável
- Evitar duplicação de lógica (DRY)
- Separação clara de responsabilidades
- Código deve ser fácil de manter e testar
- Sempre priorizar clareza sobre "esperteza"

---

## 🏗️ Arquitetura

### Backend

- Seguir padrão REST
- Separação obrigatória:
  - routes → definição de endpoints
  - controllers → tratamento de requisição/resposta
  - services → regras de negócio
  - middleware → validações e autenticação

❌ Nunca colocar lógica de negócio nas routes  
❌ Nunca acessar banco diretamente nos controllers

---

### Frontend

- Separação obrigatória:
  - pages → páginas principais
  - components → componentes reutilizáveis
  - services → chamadas de API
  - hooks → lógica reutilizável
  - context → estado global

❌ Não misturar lógica de API com UI  
❌ Não criar componentes grandes demais

---

## 📁 Organização de Arquivos

- Um arquivo por responsabilidade
- Nome de arquivos deve ser descritivo
- Evitar arquivos com mais de ~200-300 linhas
- Componentes devem ter estrutura clara

---

## ⚙️ Backend — Regras Específicas

### Controllers

- Apenas recebem req/res
- Chamam services
- Retornam resposta padronizada

---

### Services

- Contêm toda lógica de negócio
- Podem acessar banco
- Devem ser reutilizáveis

---

### Routes

- Apenas definem endpoints
- Não contêm lógica

---

### Middleware

- Autenticação
- Validação de dados
- Tratamento de erros

---

## 📡 Padrão de Resposta da API

Sempre retornar:

{
"success": true,
"data": {},
"error": null
}

Erro:

{
"success": false,
"data": null,
"error": "Mensagem do erro"
}

---

## 🔐 Autenticação

- Usar Supabase Auth
- Tokens devem ser validados no backend
- Rotas protegidas devem usar middleware
- Nunca confiar apenas no frontend

---

## 🧪 Tratamento de Erros

- Sempre usar try/catch no backend
- Nunca deixar erro sem tratamento
- Retornar mensagens claras
- Logar erros no servidor

---

## 🔄 Async / Await

- Sempre usar async/await
- Evitar .then()
- Tratar erros com try/catch

---

## 🌐 Frontend — Regras Específicas

### Componentes

- Pequenos e reutilizáveis
- Responsabilidade única
- Evitar lógica complexa dentro do JSX

---

### Hooks

- Usar para lógica reutilizável
- Prefixo obrigatório: use\*

Exemplo:
useAuth
useFetch

---

### Services

- Centralizar chamadas API
- Nunca chamar fetch direto nos componentes

---

### Context

- Usar para autenticação e estado global
- Evitar uso excessivo

---

## 🎯 Nomeação

### Variáveis

- camelCase

### Componentes

- PascalCase

### Arquivos

- kebab-case ou camelCase (manter consistência)

---

## 🧼 Código Limpo

- Evitar comentários desnecessários
- Código deve ser autoexplicativo
- Usar nomes claros
- Remover código morto

---

## 🚨 O que NÃO fazer

❌ Misturar frontend com backend  
❌ Criar lógica gigante em um único arquivo  
❌ Ignorar tratamento de erro  
❌ Fazer requisições direto no componente  
❌ Duplicar código  
❌ Ignorar estrutura do projeto

---

## 🧭 Fluxo de Desenvolvimento

1. Criar estrutura de arquivos
2. Implementar backend (routes → controller → service)
3. Testar API
4. Conectar frontend
5. Criar UI
6. Revisar código

---

## 🧪 Testes (futuro)

- Testes unitários para services
- Testes de integração para API
- Testes de UI (React)

---

## 📌 Regra Final

Se uma implementação quebrar qualquer regra acima, ela deve ser refatorada.

# 🧠 Projeto: Hit Legends Hub

## 📌 Visão Geral

Plataforma web para gerenciamento de comunidade competitiva de Pokémon TCG Live.

O sistema permitirá organizar jogadores, torneios, partidas, rankings e interações sociais dentro da comunidade.

---

## 🎯 Objetivo

Criar um sistema completo para:

- gerenciamento de jogadores
- organização de torneios
- registro de partidas
- cálculo de ranking competitivo
- interação entre usuários (amizades)
- gerenciamento de decks (futuro)

---

## 🧱 Arquitetura Geral

### Frontend

- React + Vite
- Arquitetura baseada em componentes
- Separação por páginas e módulos

### Backend

- Node.js + Express
- API REST
- Estrutura modular (controllers, routes, services)

### Banco de Dados / Auth

- Supabase (PostgreSQL + Auth)

---

## 🔗 Comunicação

Frontend se comunica com backend via:

/api/\*

Exemplo:

- /api/auth
- /api/players
- /api/tournaments

---

## 📁 Estrutura do Projeto

### Frontend

src/

- components/
- pages/
- services/
- hooks/
- context/
- styles/

### Backend

src/

- controllers/
- routes/
- services/
- middleware/
- config/
- utils/

---

## 🧩 Módulos do Sistema

### 1. Autenticação

- registro de usuário
- login
- logout
- proteção de rotas
- integração com Supabase Auth

---

### 2. Jogadores (Players)

- perfil público
- edição de perfil
- estatísticas
- lista de jogadores

---

### 3. Amizades

- adicionar amigo
- remover amigo
- lista de amigos

---

### 4. Partidas

- registro de partidas
- histórico
- resultado (win/loss)
- ligação com torneios

---

### 5. Torneios ( Conexão futura com Limitless)

- Inicialmente será manual (após liberação da API do Limitless, será automático a integração)
- criação de torneio
- entrada de jogadores
- geração de chaveamento (apenas copiar e colar do Limitless)
- registro de resultados
- finalização

---

### 6. Ranking

- cálculo baseado em partidas e torneios
- ranking global
- ranking por temporada
- sistema de pontos

---

### 7. Decks (Futuro)

- cadastro de decks
- associação com jogadores
- estatísticas de uso

---

## 🗄️ Modelos de Dados (visão inicial)

### User

- id
- email
- created_at

### Player

- id
- user_id
- nickname
- phone_number
- avatar
- country
- created_at

### Friendship

- id
- player_id
- friend_id

### Match

- id
- player1_id
- player2_id
- winner_id
- score
- tournament_id
- created_at

### Tournament

- id
- name
- description
- max_players
- status
- created_by
- created_at

### Ranking

- player_id
- points
- wins
- losses
- season

---

## ⚙️ Padrões de Desenvolvimento

### Backend

- padrão REST
- controllers → lógica de entrada
- services → regras de negócio
- routes → definição de endpoints
- middleware → autenticação e validações

---

### Frontend

- componentes reutilizáveis
- páginas separadas por feature
- services para chamadas API
- hooks para lógica reutilizável
- context para estado global (auth)

---

## 🔐 Autenticação

- gerenciada via Supabase
- uso de JWT
- proteção de rotas no backend
- estado de usuário no frontend via Context API

---

## 📡 Padrão de API

Resposta padrão:

{
"success": true,
"data": {},
"error": null
}

---

## 🚨 Tratamento de Erros

- sempre retornar erros padronizados
- usar try/catch no backend
- mensagens claras

---

## 🧭 Fluxo de Desenvolvimento

1. Definir feature
2. Criar estrutura (backend + frontend)
3. Implementar backend
4. Conectar frontend
5. Testar
6. Revisar código
7. Atualizar documentação

---

## 📊 Status Inicial

✔ Estrutura criada  
✔ Frontend iniciado  
✔ Backend iniciado  
✔ Conexão frontend-backend ok

❌ Autenticação  
❌ Players  
❌ Ranking  
❌ Torneios  
❌ Partidas  
❌ Amizades

---

## 🚀 Próxima Etapa

Implementar:

👉 Sistema de autenticação com Supabase

- registro
- login
- persistência de sessão
