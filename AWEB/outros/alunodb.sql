-- Criar o banco de dados
CREATE DATABASE sistema_alunos
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- Selecionar o banco
USE sistema_alunos;

-- Criar a tabela de alunos
CREATE TABLE alunos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    materia TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);