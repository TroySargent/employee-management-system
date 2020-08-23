DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
id INT PRIMARY KEY,
name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
id INT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salaray DECIMAL,
departmentID INT NOT NULL
);

CREATE TABLE employees (
id INT PRIMARY KEY,
firstName VARCHAR(30) NOT NULL,
lastName VARCHAR(30) NOT NULL,
roleID INT NOT NULL,
managerID INT DEFAULT NULL
);

INSERT INTO department 
VALUES (1, "Financial Services") , (2, "Sales"), (3, "Customer Solutions"), (4, "Engineering");

INSERT INTO role
VALUES (1, "CEO", 150000, 1), (2, "Sales", 90000, 2), (3, "Customer Representative", 60000, 3), (4, "Software Engineer", 100000, 4);

INSERT INTO employees 
VALUES (1, "Frederick", "Douglass", 1, NULL), (2, "Elizabeth", "Stanton", 2, 1), (3, "George", "Washington", 3, 1), (4, "Bob", "Ross", 4, 1);
