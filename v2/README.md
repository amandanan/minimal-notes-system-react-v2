# 📝 Minimal Notes System – V2 (React)

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-4.3.9-green?logo=vite)

Esta é a **segunda versão (V2)** do meu aplicativo de notas, agora construída com **React** e **Vite**, com foco em **organização de código, escalabilidade e responsividade**.

A **V1** foi desenvolvida em **JavaScript puro**.  
Nesta versão, o projeto evoluiu para utilizar **componentes reutilizáveis**, **hooks** e **gerenciamento de estado**, aplicando boas práticas do ecossistema React.

---

## 🌟 Funcionalidades

- Criar, renomear e deletar **pastas**
- Criar, renomear e deletar **páginas** dentro das pastas
- **Campo de busca** para localizar páginas rapidamente
- Destaque visual da **página ativa**
- Salvamento automático no **localStorage**
- Layout totalmente **responsivo** (desktop e mobile)
- Uso de **hook personalizado** (`useLocalStorage`)
- Estrutura modular com **componentes reutilizáveis**

---

## 🧰 Tecnologias utilizadas

- **React 18**
- **Vite**
- **JavaScript (ES6+)**
- **CSS3 (Dark Mode customizado)**
- **localStorage** para persistência de dados

---

## 📁 Estrutura do projeto

```txt
v2-react/
├─ src/
│  ├─ components/     # Sidebar, Editor, Layout, Botao
│  ├─ hooks/          # Hooks personalizados
│  ├─ styles/         # CSS global
│  ├─ App.jsx         # Componente principal
│  └─ main.jsx        # Entrada da aplicação
├─ public/            # Assets públicos
├─ index.html
├─ vite.config.js
├─ package.json
└─ .gitignore
```

---

## ⚡ Como rodar o projeto localmente

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/nome-do-repo.git
cd nome-do-repo
```

Instale as dependências:

```bash
npm install
# ou
yarn install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Abra o navegador no endereço exibido pelo Vite.

---

## 🧠 Aprendizados desta versão

- Organização de estado global e local em React
- Criação de hooks personalizados
- Manipulação correta de estruturas imutáveis
- Comunicação entre componentes via props
- Responsividade sem bibliotecas externas
- Persistência de dados no navegador

