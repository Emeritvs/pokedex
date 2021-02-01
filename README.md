Projeto feito por Guilherme Augusto Gomes

<h2><a id="user-content-tabela-de-conteúdo" class="anchor" aria-hidden="true" href="#tabela-de-conteúdo"></a>Requisitos</h2>

<ul>
  <li><a href="https://nodejs.org/en/">Node</a></li>
  <li><a href="https://ionicframework.com/docs/intro/environment">Ionic</a></li>
</ul>

<h2><a id="user-content-tabela-de-conteúdo" class="anchor" aria-hidden="true" href="#tabela-de-conteúdo"></a>Configuração</h2>

<p>Além do Node e o NPM estarem atualizados, será necessário instalar a CLI do Ionic para executar comandos de compilacao, criacao de arquivos e configuracao do projeto para iOS e Android, para isso, execute o seguinte comando: </p>
<li>npm install -g @ionic/cli</li>

<br>
<p>Para instalar os plugins do projeto será necessário acessar a pasta pelo terminal e executar o seguinte comando: </p>

<li>npm install</li>

<h2><a id="user-content-tabela-de-conteúdo" class="anchor" aria-hidden="true" href="#tabela-de-conteúdo"></a>Execução</h2>

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
