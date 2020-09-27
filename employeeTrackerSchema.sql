DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE DATABASE employeeTracker_DB;
USE employeeTracker_DB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employeeRole (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2) NULL,
    departmentId INT NOT NULL,
    INDEX department_ind(departmentId),
    CONSTRAINT fk_department FOREIGN KEY (departmentId) REFERENCES department(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    roleId INT(11) NOT NULL,
    INDEX role_ind(roleId),
    CONSTRAINT fk_employeeRole FOREIGN KEY (roleId) REFERENCES employeeRole(id) ON DELETE CASCADE,
    managerId INT(11),
    INDEX manager_ind(managerId),
    CONSTRAINT fk_manager FOREIGN KEY (managerId) REFERENCES employee(id) ON DELETE SET NULL,
    PRIMARY KEY (id)
);




