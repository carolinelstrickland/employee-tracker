USE employeeTracker_DB;

INSERT INTO department (name)
VALUES 
("Legal"), 
("Sales"), 
("Software Development"), 
("HR")

INSERT INTO employeeRole (title, salary, departmentId)
VALUES 
("Salesperson", 50, 2), 
("Contract Writer", 100, 1), 
("Software Engineer", 110, 3), 
("Engineer Lead", 150, 3), 
("HR Admin", 75, 4)

INSERT INTO employee (firstName, lastName, roleId, managerId)
VALUES 
("Maria", "Cruz", 3, 1),
("Mari", "Martin", 4, null),
("Sarah", "McGuinn", 2, null),
("Nick", "Kroll", 1, null),
("John", "Mulaney", 5, null)
