const db = require("./db");
const inquirer = require ("inquirer");
const {
    addRole,
    addEmployee,
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
            "QUIT"
        ]
    })
    .then((res)=>{
        switch (res.action){
            case "VIEW_DEPARTMENTS":
            viewDepartments();
                return;
            case "VIEW_ROLES":
            viewRoles();

                return;
            case "VIEW_EMPLOYEES":
            viewEmployees();

                return;
            
            case "CREATE_ROLE":
            createRole();

                return;
            case "CREATE_EMPLOYEE":
                addNewEmployee();

                return;

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
                // await db.addRole(role)
            });

        })
    };

function addNewEmployee(){
    db.getEmployees()
    .then((employee)=>{
      const newEmployee = employee.map((employee)=>({
          value: employee.id,
          name: employee.first_name + " "+ employee.last_name,
      }));  
    })

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
            })
    })
}

askForAction();


