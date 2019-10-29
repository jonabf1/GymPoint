# bootcamp-gostack-desafio-02
<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src="https://raw.githubusercontent.com/Rocketseat/bootcamp-gostack-desafio-02/master/.github/logo.png" width="200px" />
</h1>

<h3 align="center">
  Desafio 2: Gympoint, o início
</h3>


## :rocket: Sobre o desafio

A aplicação que iremos dar início ao desenvolvimento a partir de agora é um app gerenciador de academia, o **Gympoint**.

### Um pouco sobre as ferramentas

Dependencias a configurar:

- Express
- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (Utilize PostgreSQL ou MySQL);
- Bcrypt
- JsonWebToken

### Funcionalidades

Abaixo estão descritas as funcionalidades da aplicação

#### 1. Autenticação

Permitir que um usuário se autentique em sua aplicação utilizando e-mail e uma senha e adicionar um usuário com privilegios de admin

- A autenticação deve ser feita utilizando JWT.
- Realizar a validação dos dados de entrada;

#### 2. Cadastro de alunos

Permitir que alunos sejam mantidos (cadastrados/atualizados) na aplicação utilizando nome, email, idade, peso e altura.

O cadastro de alunos só pode ser feito por administradores autenticados na aplicação.

O aluno não pode se autenticar no sistema, ou seja, não possui senha.
