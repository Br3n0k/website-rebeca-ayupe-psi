[![ASTRO](https://img.shields.io/badge/ASTRO-v2.0.0-blue)](https://astro.build/)
[![BUN](https://img.shields.io/badge/BUN-v1.0.0-blue)](https://bun.sh/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.0.0-blue)](https://tailwindcss.com/)

# Proposta de Projeto: Website para Psicóloga Rebeca Ayupe

## Visão Geral
Como parte de um projeto pessoal, estou desenvolvendo ferramentas para ajudar pessoas que vem dedicando tempo e esforço para ajudar outras pessoas de forma popular ou até mesmo gratuitamente, nosso objetivo é criar uma landing page para Rebeca Ayupe Ferreira, psicóloga com registro CRP 09/20699, especializada em psicoterapia online para adultos e adolescentes que atua em Goiânia - GO, com o intuito de ajudar a divulgar seu trabalho e atingir mais pessoas que buscam ajuda e não possuem condições de pagar por um serviço de psicólogo, a Dra. Rebeca Ayupe Ferreira oferece uma psicoterapia online de forma popular e acessível para todos.

## Objetivo
Nesse projeto em especifico recebi algumas informações para o desenvolvimento de uma landing page profissional para a Dra. Rebeca Ayupe Ferreira, com intuito de divulgar seu trabalho utilizando o ASTRO como framework e o BUN como runtime, alem de tecnicas de otimização de performance para otimizar o carregamento da página e otimizar o SEO para melhor ranqueamento na busca do google e outros motores.

## Informações de Contato
- **Instagram:** [@psirebeca_ayupe](https://www.instagram.com/psirebeca_ayupe/)
- **WhatsApp:** +55 62 98651-0128
- **Email:** [psirebecaayupe@gmail.com](mailto:psirebecaayupe@gmail.com)
- **Site:** [https://psirebecaayupe.com.br](https://psirebecaayupe.com.br)

## Especificações Técnicas
- **Framework:** Astro
- **Runtime:** Bun
- **Hospedagem:** Hostinger (servidor Apache)
- **Distribuição:** Build estático (HTML + assets)
- **CDN:** Cloudflare

## Requisitos Funcionais
- Site de página única (one-page) com seções distintas
- Formulários de contato direcionando para WhatsApp e redes sociais
- Otimização para carregamento rápido
- Responsividade para todos os dispositivos

## Requisitos de Design
- Estética visual limpa e profissional
- Animações suaves e sutis
- Design que transmita conforto e acolhimento
- Paleta de cores e elementos visuais alinhados com a área de psicologia
- Espaço para imagens (placeholders iniciais, com substituição futura)

## Boas Práticas
- Código limpo e bem estruturado
- Otimização de imagens e assets
- Técnicas avançadas de performance para CDN
- SEO otimizado para profissionais de psicologia

## 🧞 Comandos

Todos os comandos são executados a partir da raiz do projeto, a partir de um terminal:

| Command                   | Ação                                              |
| :------------------------ | :-----------------------------------------------  |
| `bun install`             | Instala dependências                              |
| `bun dev`                 | Inicia o servidor de dev localmente na porta 4321 |
| `bun build`               | Gera o build do projeto para a pasta dist/        |
| `bun preview`             | Visualiza o build localmente, antes de publicar   |
| `bun astro ...`           | Executa comandos como `astro add`, `astro check`  |
| `bun astro -- --help`     | Obtém ajuda usando o Astro CLI                    |

## Assets
- Qualquer asset estático, como imagens, pode ser colocado na pasta `public/`.
- Qualquer componente Astro/React/Vue/Svelte/Preact deve ser colocado na pasta `src/components/`.

## Estrutura de Pastas

```text
|── public_html/ (projeto compilado para servidor hospedado)
├── public/ (assets estáticos)
│   └── images/ (imagens do projeto)
├── src/ (código fonte do projeto)
│   └── components/ (componentes Astro/React/Vue/Svelte/Preact)
│       └── index.astro
│   └── pages/ (páginas do projeto)
│       └── index.astro
└── package.json
```

## Colocando o site no ar

1. Adicione a foto da Dra. Rebeca Ayupe na pasta `public/images/` com o nome `rebeca_ayupe.jpg`
2. Execute `bun run build` para gerar os arquivos estáticos
3. Faça o upload da pasta `public_html/` para o servidor Apache da Hostinger
4. Configure o domínio e SSL conforme necessário
5. Configure a CDN da Cloudflare para melhor desempenho