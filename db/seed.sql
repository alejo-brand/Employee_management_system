INSERT INTO department (name)
VALUES 
	("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");
    
INSERT INTO role (title,salary,department_id)
VALUES 
	("sales lead",100000,1),
    ("Salesperson",80000,1),
    ("Software Engineer",120000,2),
    ("Lead Engineer",150000,2),
    ("Account Manager",160000,3),
    ("Legal team lead",200000,4),
    ("Lawyer",170000,4);
    
INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES
	("juan","martinez",1,NULL),
    ("Henry","Simpson",2,1),
    ("Michael","Schumacher",3,NULL),
    ("Louis","Hamilton",4,3),
    ("Fernando","Alonso",5,NULL),
    ("Fabian","Tavera",6,5),
    ("Sarah","Roxy",7,NULL),
    ("Jessica","Lombardo",8,7);