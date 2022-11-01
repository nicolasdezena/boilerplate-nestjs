[![Build to ECR and Rancher Deploy](https://github.com/ampliebr/spiderman/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/ampliebr/spiderman/actions/workflows/main.yml)

# O que precisa para rodar?

- Docker e docker-compose - https://docs.docker.com/engine/install/ubuntu/
- NVM - https://github.com/nvm-sh/nvm
- NVM setado na versão 14 `nvm alias default 14`

# Depois de instalado rodar os comandos abaixo:

- yarn install

- copiar o .env.example para .env -> cp .env.example .env

- make up && make logs

- acessar: http://localhost:3333/health

- mongodb: sobe na porta 27017

Dicas:

- Para debugar o projeto já esta configurado no vscode basta clicar no debug, ele sobe a porta 9229 como debug, caso precise alterar essa porta é necessário alterar no arquivo .vscode/launch.json e no docker-compose.yml

- Para instalar algum pacote node basta digitar make install-package package={nome_do_pacote}

- Para subir o projeto rodar make up

- Para ver os logs da API rodar make logs

- Para subir e ver os logs make up && make logs

- Para criar um nome domain digite: yarn generate {nome_do_domain}
