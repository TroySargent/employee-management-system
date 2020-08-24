const inquirer = require("inquirer");
const connection = require("./connection");
const choices = require("./choiceList");

const addObject = async () => {
    await getEmployeeToAdd(await choices.getRoleList(), await choices.getEmployeeList());
};

const getEmployeeToAdd = async (roleList, employeeNames) => {
    let info = await inquirer.prompt([{
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
        name: "mananger",
        message: "What is the employee's manager?",
        type: "list",
        choices: employeeNames
    }]);
    await addEmployeeToTable(info);
};

const addEmployeeToTable = (info) => {
    console.log(info)
}
module.exports = addObject;