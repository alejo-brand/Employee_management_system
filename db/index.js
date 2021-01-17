const connection = require("./connection");

module.exports = {
    getDepartments(){

        return connection.query('SELECT * FROM department');
    },
    getRoles(){

        return connection.query(
            `SELECT
            role.role_id,
            role.title,
            role.salary,
            department.name,
            department.department_id
            FROM role
            LEFT JOIN department on role.department_id = department.department_id`
        );
    },
    getEmployees(){

        return connection.query(
            `SELECT
            employee.employee_id,
            employee.first_name,
            employee.last_name,

            role.title,
            role.salary,
            department.name,

            CONCAT(e2.first_name + " "+ e2.last_name) AS "manager name"
            FROM employee
            LEFT JOIN role ON employee.role_id = role.role_id
            LEFT JOIN department ON role.department_id = department.department_id
            LEFT JOIN employee As e2 ON employee.manager_id = e2.employee_id`
        
        );
    },

    

    addRole (data){
        return connection.query ('INSERT INTO role SET ?',{
            role_id:data.role_id,
            title:data.title,
            salary:data.salary,
            department_id:data.department_id,
        })
    },

    addEmployee(data){
        return connection.query ('INSERT INTO employee SET ?',{
            employee_id:data.employee_id,
            first_name:data.first_name,
            last_name:data.last_name,
            role_id:data.role_id,
            manager_id:data.manager_id
        })
    },

    addDepartment(data){
        return connection.query('INSERT INTO department SET ?',{
            department_id:data.department_id,
            name:data.name
        })
    },

    removeDepartment(data){
        return connection.query('DELETE FROM department WHERE ?', data)
    },
    
    updateRole(data){
        return connection.query(
            `UPDATE employee SET ? WHERE ?`,
            [
                {
                    role_id:data.role_id,
                },
                {
                    employee_id:data.employee_id,
                }
            ]
        )
    },

    removeEmployee(data){
        return connection.query(
            `DELETE FROM employee WHERE?`,data
        );
    },
    removeRole(data){
        return connection.query("DELETE FROM role WHERE ?",data);
    }
};
