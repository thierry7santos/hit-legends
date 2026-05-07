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
