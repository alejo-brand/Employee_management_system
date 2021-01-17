const db = require("./db");
const inquirer = require ("inquirer");
const connection = require("./db/connection"    );
const {
    addRole,
    addEmployee,
    addDepartment,
    updateRole,
    removeDepartment,
    removeEmployee
} = require("./db");

function askForAction(){
    inquirer.prompt({
        type:"list",
        message:'choose something to do',
        name:"action",
        choices:[
            "VIEW_DEPARTMENTS",
            "VIEW_ROLES",
            "VIEW_EMPLOYEES",
            "CREATE_ROLE",
            "CREATE_EMPLOYEE",
            "CREATE_DEPARTMENT",
            "UPDATE_ROLE",
            "DELETE_DEPARTMENT",
            "DELETE_EMPLOYEE",
            "QUIT"
        ]
    })
    .then((res)=>{
        switch (res.action){
            case "VIEW_DEPARTMENTS":
            viewDepartments();
                break;
            case "VIEW_ROLES":
            viewRoles();

                break;
            case "VIEW_EMPLOYEES":
            viewEmployees();

                break;
            
            case "CREATE_ROLE":
            createRole();

                break;
            case "CREATE_EMPLOYEE":
                addNewEmployee();

                break;
            case "CREATE_DEPARTMENT":
                addNewDepartment();
                break;
            case "UPDATE_ROLE":
                updateArole();
                break;
            case "DELETE_DEPARTMENT":
                deleteDepartment();
                break;
            case "DELETE_EMPLOYEE":
                deleteEmployee();
                break;
            default:
                connection.end();
        }

    })
};

function viewDepartments(){
    db.getDepartments()
    .then((results)=>{
        console.table(results);

        askForAction();
    });

};

function viewRoles(){
    db.getRoles()
    .then((results)=>{
        console.table(results);
        askForAction()
    });
}

function viewEmployees(){
    db.getEmployees()
    .then((results)=>{
        console.table(results);
        askForAction()
    });
}



function createRole(){
    db.getDepartments()
    .then((departments)=>{

        inquirer
            .prompt([
                {
                    message:"what department is this role for?",
                    type:"list",
                    name:"department_id",
                    choices:departments.map((department)=>({
                        value:department.department_id,
                        name:department.name
                    }))
                },
                {
                    message:"what is the title of the new role",
                    type:"input",
                    name:"title",
                },
                {
                    message:"what is the salary of the new role",
                    type:"input",
                    name:"salary",
                }
            ])
            .then((res)=>{
                console.table(res);
                addRole(res);
                askForAction();

            });

        });
    };

function addNewEmployee(){
    db.getEmployees().then((employee)=>{
      const newEmployee = employee.map((employee)=>({
          value: employee.id,
          name: employee.first_name + " "+ employee.last_name,
      }));  
      
      db.getRoles()
      .then((role)=>{
          inquirer
          .prompt([
              {
                  message:"what is the employee first name?",
                  name:"first_name",
                  type:"input"
                },
                {
                    message:"what is the employee last name?",
                    name:"last_name",
                    type:"input"
                },
                {
                    message:"what is the role of the employee?",
                    name:"role_id",
                    type:"list",
                    choices:role.map((role)=>({
                        value:role.role_id,
                        name:role.title,
                    }))
                },
                {
                    message:"who is the manager of the employee?",
                    name:"manager_id",
                    type:"list",
                    choices:newEmployee,
                }
            ])
            .then((res)=>{
                addEmployee(res);
                console.table(res);
                askForAction();
            });
        });
    });
};

function addNewDepartment(){
    inquirer
    .prompt([
        {
            message:"what department do you wish to add",
            type:"input",
            name:"name"
        }
    ])
    .then((res)=>{
        addDepartment(res);
        console.table(res)
        askForAction();

    });
};

function updateArole(){
    db.getEmployees().then((employee)=>{
        const listOfEmployees = employee.map((employee)=>({
            value:employee.employee_id,
            name:employee.first_name + " " + employee.last_name,
        }));
    db.getRoles().then((role)=>{
        const listOfRoles = role.map((role)=>({
            value:role.role_id,
            name:role.title,
        }))

        inquirer
        .prompt([
            {
                message:"which employee do you want to update?",
                type:"list",
                name:"employee_id",
                choices:listOfEmployees,
            },
            {
                message:"what is the new role title",
                type:"list",
                name:"role_id",
                choices:listOfRoles
            }
        ])
        .then((res)=>{
            updateRole(res);
            console.table(res);
            askForAction();
        })  
    });
    })
};

function deleteDepartment(){
    db.getDepartments().then((departments)=>{
        inquirer
        .prompt([
            {
                message:"what department do you want to delete",
                type:"list",
                name:"department_id",
                choices:departments.map((department)=>({
                    value:department.department_id,
                    name:department.name,
                }))

            }
        ])
        .then((res)=>{
            removeDepartment(res);
            console.table(res);
            askForAction();
        });
    });
};

function deleteEmployee(){
    db.getEmployees().then((employee)=>{
        const listOfEmployees = employee.map((employee)=>({
            value:employee.employee_id,
            name:employee.first_name + " " + employee.last_name
        }));
        inquirer
        .prompt([
            {
                message:"which employee would you like to delete?",
                type:"list",
                name:"employee_id",
                choices:listOfEmployees
            }
        ])
        .then((res)=>{
            removeEmployee(res);
            console.table(res);
            askForAction();
        })
    })
}

askForAction();


