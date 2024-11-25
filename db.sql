drop database ibge_cidades;

CREATE DATABASE ibge_cidades;

USE ibge_cidades;

CREATE TABLE estados (
    CodEstado INT PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Sigla Char(2) UNIQUE KEY
);

CREATE TABLE cidades (
    CodCidade INT AUTO_INCREMENT PRIMARY KEY,
    CodEstado INT NOT NULL,
    Nome VARCHAR(255) NOT NULL
);