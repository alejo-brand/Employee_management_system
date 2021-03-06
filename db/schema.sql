DROP DATABASE IF EXISTS companyDB;

CREATE DATABASE companyDB;

USE companyDB;

CREATE TABLE department(
	department_id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(department_id)
);

CREATE TABLE role ( 
	role_id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL (10,4) NOT NULL,
    department_id INT,
    PRIMARY KEY(role_id	),
    CONSTRAINT fk_department_id
    FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE SET NULL
);

CREATE TABLE employee (
	employee_id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY(employee_id),
    FOREIGN KEY (manager_id) REFERENCES employee (employee_id),
    CONSTRAINT fk_role_id
    FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE SET NULL
);

