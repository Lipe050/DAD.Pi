import { Database } from 'sqlite3';

import { open } from 'sqlite';

export async function database() {
    const db = await open({
        filename: './dad.db',
        driver: Database,
    });
    await db.exec(`
        CREATE TABLE IF NOT EXISTS cidade (
            idCIDADE integer PRIMARY KEY AUTOINCREMENT,
            nome varchar(10) NOT NULL,
            uf varchar(2) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS orgao (
            idORGAO integer PRIMARY KEY AUTOINCREMENT,
            nome varchar(50) NOT NULL,
            cidade varchar(30) NOT NULL, 
            uf varchar(2) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS animal (
            idANIMAL integer PRIMARY KEY AUTOINCREMENT,
            nome_cientifico varchar(30) NOT NULL,
            nome_popular varchar(25) NOT NULL,
            habitat varchar(25) NOT NULL,
            pot_veneno varchar(25) NOT NULL,
            procedencia varchar(50) NOT NULL
        );
    
        CREATE TABLE IF NOT EXISTS usuario (
            idUSUARIO integer PRIMARY KEY AUTOINCREMENT,
            nome varchar(25) NOT NULL,
            email varchar(25) NOT NULL,
            senha varchar(20) NOT NULL,
            telefone varchar(15) NOT NULL,
            data_nascimento date NOT NULL,
            endereco varchar(50) NOT NULL,
            numero integer NOT NULL,
            bairro varchar(20) NOT NULL,
            -- cidade varchar(15) NOT NULL,
            -- estado varchar(2) NOT NULL,
            tipo integer NOT NULL,
            FK_idcidade integer NOT NULL,
            FOREIGN KEY (FK_idCIDADE) REFERENCES CIDADE (idCIDADE) ON DELETE SET NULL
        );
    
        CREATE TABLE IF NOT EXISTS sos (
            idSOS integer PRIMARY KEY AUTOINCREMENT,
            data date NOT NULL,
            hora time NOT NULL,
            localizacao varchar(50) NOT NULL,
            info_adicionais varchar(50),
            sit_paciente varchar(20),
            animal varchar(25),
            foto_animal varchar(25),
            FK_idUSUARIO integer NOT NULL,
            FOREIGN KEY (FK_idUsuario) REFERENCES USUARIO (idUSUARIO) ON DELETE SET NULL
        );
    
        CREATE TABLE IF NOT EXISTS tipo_denuncia (
            idTIPODENUNCIA integer PRIMARY KEY AUTOINCREMENT,
            descricao varchar(500) NOT NULL,
            FK_idORGAO integer NOT NULL,
            FOREIGN KEY (FK_idORGAO) REFERENCES ORGAO (idORGAO) ON DELETE SET NULL 
        );

        CREATE TABLE IF NOT EXISTS denuncia (
            idDENUNCIA integer PRIMARY KEY AUTOINCREMENT,
            data date NOT NULL,
            hora time NOT NULL,
            localizacao varchar(50) NOT NULL,
            texto varchar(500) NOT NULL,
            FK_idTIPODENUNCIA integer NOT NULL,
            FK_idUSUARIO integer NOT NULL,
            FOREIGN KEY (FK_idTIPODENUNCIA) REFERENCES TIPODENUNCIA (idTIPODENUNCIA) ON DELETE SET NULL
            FOREIGN KEY (FK_idUsuario) REFERENCES USUARIO (idUSUARIO) ON DELETE SET NULL
        );

        PRAGMA foreign_keys = ON;

    `);

    return db;
}