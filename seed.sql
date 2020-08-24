DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL,
departmentID INT NOT NULL
);

CREATE TABLE employees (
id INT AUTO_INCREMENT PRIMARY KEY,
firstName VARCHAR(30) NOT NULL,
lastName VARCHAR(30) NOT NULL,
roleID INT NOT NULL,
managerID INT DEFAULT NULL
);

INSERT INTO department (name)
VALUES ("Financial Services") , ("Sales"), ("Customer Solutions"), ("Engineering");

INSERT INTO role (title, salary, departmentID)
VALUES ("CEO", 150000, 1), ("Sales", 90000, 2), ("Customer Representative", 60000, 3), ("Software Engineer", 100000, 4);

INSERT INTO employees (firstName, lastName, roleID, managerID)
VALUES ("Frederick", "Douglass", 1, NULL), ("Elizabeth", "Stanton", 2, 1), ("George", "Washington", 3, 1), ("Bob", "Ross", 4, 1);