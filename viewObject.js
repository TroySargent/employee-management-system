const inquirer = require("inquirer");
const connection = require("./connection");
const choices = require("./choiceList");

const getObjectToAdd = async () => {
    let { object } = await inquirer.prompt({
        name: "object",
        message: `What do you want to view employees by?`,
        type: "list",
        choices: ["All", "Role", "Department", "Manager"]
    });
    return object;
};

const viewObject = async () => {
    switch(await getObjectToAdd()) {
        case "All":
            await getAllEmployees();
            break;
        case "Role":
            await searchByWhichRole(await choices.getRoleList());
            break;
        case "Department":
            await searchByWhichDepartment(await choices.getDepartmentList());
            break;
        case "Manager":
            await searchByWhichManager(await choices.getEmployeeList());
            break;
    };
};

// Search all employees

const getAllEmployees = async () => {
    await connection.query(`SELECT * FROM employees
    LEFT JOIN role ON employees.roleID = role.id
    LEFT JOIN department ON role.departmentID = department.id`, (err, data) => {
        if (err) {throw err};
        console.table(data)
    });
};

// Search by role

const searchByWhichRole = async (roleList) => {
    let { role } = await inquirer.prompt({
        name: "role",
        message: "Which role do you want to search by?",
        type: "list",
        choices: roleList
    });
    roleID = role.split(' ').pop(); // grabs ID value from end of string
    await searchByObject({roleID: roleID});
};
// Search by role

const searchByWhichDepartment = async (departmentList) => {
    let { department } = await inquirer.prompt({
        name: "department",
        message: "Which department do you want to search by?",
        type: "list",
        choices: departmentList
    });
    departmentID = department.split(' ').pop(); // grabs ID value from end of string
    await searchByObject({departmentID : departmentID});
};
// Search by role

const searchByWhichManager = async (managerList) => {
    let { manager } = await inquirer.prompt({
        name: "manager",
        message: "Which manager do you want to search by?",
        type: "list",
        choices: managerList
    });
    managerID = manager.split(' ').pop(); // grabs ID value from end of string
    await searchByObject({managerID: managerID});
};

const searchByObject = async (queryObject) => {
    await connection.query(`SELECT * FROM employees
    LEFT JOIN role ON employees.roleID = role.id
    LEFT JOIN department ON role.departmentID = department.id
    WHERE ?`, queryObject, (err, data) => {
        if (err) {throw err};
        console.table(data);
    });
}

module.exports = viewObject;