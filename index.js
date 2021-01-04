const db = require("./db")


function askForAction(){
    inquirer.prompt({
        type:"list",
        message:'choose something to do',
        name:"action",
        choices:[
            "VIEW_DEPARTMENTS",
            "VIEW_ROLES",
            "VIEW_EMPLOYEES",
            "QUIT"
        ]
    })
    .then((res)=>{
        switch (res.action){
            case "VIEW_DEPARTMENTS":
            viewDepartments();
                return;
            case "VIEW_ROLES":

                return;
            case "VIEW_EMPLOYEES":

                return;
            
            case "CREATE_ROLE":

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

}

askForAction();



db.getDepartments().then((res)=>{
    console.log(res);
});

