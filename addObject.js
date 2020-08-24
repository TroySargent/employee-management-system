const inquirer = require("inquirer");
const connection = require("./connection");
const choices = require("./choiceList");

const addObject = async () => {
    await getEmployeeToAdd(await choices.getRoleList(), await choices.getEmployeeList());
};

const getEmployeeToAdd = async (roleList, employeeNames) => {
    let { firstName, lastName, role, manager } = await inquirer.prompt([{
        name: "firstName",
        message: "What is the employee's first name?",
        type: "input"
    },
    {
        name: "lastName",
        message: "What is the employee's last name?",
        type: "input"
    },
    {
        name: "role",
        message: "What is the employee's role?",
        type: "list",
        choices: roleList
    },
    {
        name: "manager",
        message: "What is the employee's manager?",
        type: "list",
        choices: employeeNames
    }]);
    await addEmployeeToTable(firstName, lastName, role, manager);
};

const addEmployeeToTable = (firstName, lastName, role, manager) => {
    roleID = role.split(' ').pop(); // grabs ID value from end of string
    managerID = manager.split(' ').pop();
    connection.query("INSERT INTO employees SET ?", {firstName: firstName, lastName: lastName, roleID: roleID, managerID: managerID}, (err) => {
        if (err) {throw err};
    })
}
module.exports = addObject;