Projeto feito por Guilherme Augusto Gomes

<h2><a id="user-content-tabela-de-conteúdo" class="anchor" aria-hidden="true" href="#tabela-de-conteúdo"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Tabela de Conteúdo</h2>

<h3>Requisitos</h3>

<ul>
  <li><a href="https://nodejs.org/en/">Node</a></li>
  <li><a href="https://ionicframework.com/docs/intro/environment">Ionic</a></li>
</ul>

<h2><a id="user-content-tabela-de-conteúdo" class="anchor" aria-hidden="true" href="#tabela-de-conteúdo"></a>Configuracao</h2>

<p>Além do Node e o NPM estarem atualizados, será necessário instalar a CLI do Ionic para executar comandos de compilacao, criacao de arquivos e configuracao do projeto para iOS e Android, para isso, execute o seguinte comando: </p>
<li>npm install -g @ionic/cli</li>

<p>Para instalar os plugins do projeto será necessário acessar a pasta pelo terminal e executar o seguinte comando: </p>

<li>npm install</li>

<h2><a id="user-content-tabela-de-conteúdo" class="anchor" aria-hidden="true" href="#tabela-de-conteúdo"></a>Execucao</h2>

<h3>Web</h3>

<li>ionic serve</li>


<h3>Android (Windows e macOS)</h3>

<li>npx cap add android (caso nao tenha configurado para android)</li>
<li>npx cap sync</li>
<li>npx cap open android</li>

<h3>iOS (macOS)</h3>

<li>npx cap add ios (caso nao tenha configurado para ios)</li>
<li>npx cap sync</li>
<li>npx cap open ios</li>
