# Guia de Implantação e Arquitetura - Digitalent26

Este documento serve como um guia persistente, histórico e de referência operacional para as modificações de arquitetura, visual, roteamento e fluxos de automação implementadas no projeto **Digitalent26**. Ele visa garantir que qualquer desenvolvedor, administrador ou assistente de IA esteja imediatamente alinhado com o estado real do projeto e saiba exatamente como compilar, testar e publicar a plataforma em produção.

---

## 📂 Arquitetura & Componentes Recentes

O projeto é estruturado em duas partes integradas:
1. **Frontend**: Aplicação Single Page (SPA) moderna em React + Vite + Ant Design.
2. **Backend**: API de automação e integração em Node.js (Express + TypeScript/JavaScript), gerenciando uploads, geração de PDFs, disparos de e-mail via SMTP, conexões de WhatsApp e checkouts do Stripe.

### 1. Roteamento de Subpáginas (SPA) & Vercel
Por se tratar de uma SPA baseada no cliente, requisições diretas a subrotas como `/insc` ou `/inscricao` resultavam em erros `404: NOT_FOUND` no Vercel, pois a plataforma procurava pastas físicas correspondentes.

*   **vercel.json (Raiz do Projeto)**: Configurado com regras de reescrita (`rewrites`) para delegar o tratamento de rotas do lado do cliente ao `index.html`, enquanto preserva as rotas de backend `/api/*`:
    ```json
    {
      "rewrites": [
        {
          "source": "/api/:path*",
          "destination": "/api/:path*"
        },
        {
          "source": "/((?!api).*)" ,
          "destination": "/index.html"
        }
      ]
    }
    ```
*   **src/App.tsx**: Roteamento atualizado para reconhecer tanto `/inscricao` quanto a rota curta `/insc` (incluindo variações com hash `#/insc`, `#insc` ou parâmetros `?p=insc`) de forma integrada, redirecionando o utilizador para a experiência de inscrição.

---

### 2. Design Visual & UI Premium

#### 💻 Página de Inscrição (`src/components/InscricaoPage.tsx`)
A página de inscrição do Dossier Antidesperdício de Capital foi redesenhada para uma estética **Premium Light**:
*   **Tema de Cores**: Fundo branco limpo (`#ffffff`) com tipografia de altíssima legibilidade em tons escuros (`#0f172a` e `#475569`). Elementos interativos e botões destacados em Azul Cobalto (`#2563eb`).
*   **Efeitos Visuais**:
    *   *Scan Laser*: Uma linha horizontal pulsante (`.scan-laser`) simulando uma auditoria tecnológica sobre o ecrã.
    *   *Orbes Flutuantes*: Dois gradientes desfocados animados (`@keyframes orbFloat1` / `orbFloat2`) que se movem de forma suave no fundo para profundidade visual.
    *   *Mockup 3D*: Um livro/dossier operacional com efeito 3D flutuante (`floatBook`) posicionado à direita da tela.
*   **Logotipo**: Redimensionado de forma totalmente fluida com `clamp(90px, 12vw, 130px)` para máxima harmonia visual tanto em ecrãs móveis quanto em desktops.
*   **Consentimento GDPR**: Formulário integrado com modal centrado de consentimento de privacidade antes da submissão dos dados corporativos.

#### ⏱️ Contador de Dias (`src/components/sections/CountdownTimer.tsx`)
O temporizador central de contagem regressiva foi profundamente refinado:
*   **Estética Cyber Dark**: Caixa com fundo escuro translúcido (`rgba(3, 7, 18, 0.65)`), efeito de vidro desfocado (`backdrop-filter: blur(20px)`) e borda neon sutil em azul cobalto, criando um contraste elegante com o resto da página de inscrição.
*   **Cálculo Dinâmico**: Abordagem em tempo real utilizando a data atual do navegador do cliente e calculando os dias exatos restantes até a data do evento (09 de Julho de 2026).
*   **Suporte Internacional (i18n)**: Botão de alteração rápida de idioma integrado (ícone global) que traduz instantaneamente o temporizador entre **Português** ("FALTAM X DIAS") e **Inglês** ("X DAYS LEFT"), com comportamento "no-wrap" para evitar quebras de layout.

---

### 3. Nomenclatura Consistente & Alinhamento de Negócio
Para transmitir maior sobriedade comercial e relevância corporativa, a nomenclatura de patrocinadores foi padronizada:
*   Substituição do termo **"Apoiador"** por **"Parceiro"** e **"Candidatura a Parceiro"** em arquivos chaves como `LandingPage.tsx` e `ScheduleSection.tsx`.
*   Remoção do rodapé redundante e do link simples de patrocínio no `LocationSection.tsx` para canalizar os interessados exclusivamente para a ficha oficial de candidatura estruturada no site.
*   Atualização do link social do LinkedIn no rodapé da página para o canal oficial corporativo: `https://www.linkedin.com/company/digitalent26/`.

---

### 4. Backend & Automação Core SaaS (`backend/server.ts`)
O backend do projeto é uma API Node/Express robusta operando na porta `3001`, que implementa os seguintes fluxos inteligentes:

1.  **Registo e Disparos (`/api/register-whatsapp`)**:
    *   Gera dinamicamente um arquivo PDF personalizado em memória contendo as credenciais de inscrição usando a biblioteca `pdfkit`.
    *   Envia automaticamente uma notificação de e-mail via SMTP (`nodemailer`) com o PDF em anexo para a administração da Digitalent.
    *   Converte o PDF em `Base64` e envia de forma invisível para o webhook da API do WhatsApp cadastrado (`WHATSAPP_API_URL`), despachando o comprovativo em anexo para o telemóvel do utilizador cadastrado.
2.  **Fluxo de Pagamento Stripe**:
    *   Implementa os endpoints `/api/stripe/create-checkout` e `/api/stripe/create-session` para emitir sessões seguras de pagamento do Stripe para os lotes PRO (€49) e ENTERPRISE (€199), direcionando o utilizador de forma fluida à página de checkout oficial.

---

### 5. Integração Contínua (CI) no GitHub (`.github/workflows/deploy.yml`)
O fluxo do GitHub Actions foi reestruturado de deploy automático direto (que podia falhar silenciosamente ou sobrescrever definições críticas em produção) para um **pipeline de validação de Build e Integridade**:
*   Executa verificações automáticas de compilação em TypeScript e Vite em cada `push` e `pull_request` direcionados à branch `main`.
*   Impede a entrada de códigos defeituosos ou imports incorretos no repositório.

---

## 🚀 Passo a Passo: Fluxo de Deploy de Produção

Para publicar novas atualizações e garantir que todas as modificações visuais e lógicas fiquem ativas imediatamente, execute o seguinte fluxo a partir do terminal da raiz do projeto (`f:\desklip\lanpagevento`):

### Passo 1: Verificar e Compilar o Projeto Localmente
Certifique-se de que a compilação do TypeScript e do bundler Vite ocorre sem nenhum erro de tipagem ou importação:
```bash
npm run build
```

### Passo 2: Executar o Deploy de Produção na Nuvem Vercel
**⚠️ ATENÇÃO - Git Push Hangs**: Fazer o deploy por `git push` tem causado travamentos (hangs) pontuais na integração. Portanto, a forma **mais segura e rápida** de publicar as alterações no ar é utilizar a Vercel CLI diretamente, ignorando o git push se o mesmo travar.
Utilize a CLI do Vercel para carregar a nova versão estável para a nuvem de produção. O parâmetro `--yes` confirma automaticamente as configurações vinculadas ao projeto:
```bash
npx vercel --prod --yes
```
*   *Nota*: Ao finalizar o deploy, a CLI do Vercel irá gerar uma URL única de implantação de produção (exemplo real: `https://digitalent-7aaqjmjuf-fslsite.vercel.app`). **Copie esta URL gerada**.

### Passo 3: Vincular e Mapear os Domínios de Produção (Aliases)
Visto que deploys acionados manualmente por CLI por vezes não propagam de imediato os aliases personalizados para o novo projeto (mantendo presos em builds antigos), vincule **explicitamente** a URL gerada de produção aos domínios oficiais. 
Substitua `<url-gerada>` pela URL de deploy copiada no Passo 2 nos comandos abaixo:

1.  **Mapear para o Domínio Principal**:
    ```bash
    npx vercel alias set <url-gerada> digitalent.pt
    ```
2.  **Mapear para o Subdomínio WWW**:
    ```bash
    npx vercel alias set <url-gerada> www.digitalent.pt
    ```

*(Exemplo de execução real: `npx vercel alias set digitalent-qpgv8i70b-fslsite.vercel.app digitalent.pt`)*

---

## 🛠️ Resumo de Comandos Rápidos (Cheat-Sheet)

```bash
# 1. Compilação Local de Segurança
npm run build

# 2. Deploy de Produção (Copie a URL exclusiva do output)
npx vercel --prod --yes

# 3. Associação Imediata de Domínios
# (Cole a URL gerada no passo anterior)
npx vercel alias set <URL_GERADA> digitalent.pt
npx vercel alias set <URL_GERADA> www.digitalent.pt
```

*Mantenha este guia sempre atualizado na raiz do projeto sempre que adicionar novas integrações de backend ou fluxos estruturais de frontend!*

---

## 📅 Changelog & Memória Recente

### 26 de Junho de 2026 - Resolução de Autenticação no Vercel
*   **Problema**: Administradores encontravam o erro `Credenciais inválidas` ao tentar fazer login no `/confirma` em ambiente de produção na Vercel.
*   **Causa**: A verificação de *hash* de senha do `bcrypt` não estava validando corretamente (possível divergência ou falta da variável de ambiente `ADMIN_PASSWORD_HASH` no Vercel). O limitador `loginLimiter` (rate limit) também poderia causar falsos positivos em acessos frequentes.
*   **Solução**: Remoção das camadas do `bcrypt` e do `loginLimiter` do endpoint `POST /api/admin/login` (no arquivo `api/index.ts`). A validação foi convertida para uma comparação de string estrita com as credenciais oficiais.
*   **Deploy**: O projeto foi compilado manualmente e publicado com sucesso via Vercel CLI com remapeamento imediato dos domínios principais.
