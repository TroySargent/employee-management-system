const inquirer = require("inquirer");
const connection = require("./connection");
const choices = require("./choiceList");

const updateObject = async () => {
    let { employeeToUpdate } = await inquirer.prompt({
        name: "employeeToUpdate",
        message: `Which employee do you want to update?`,
        type: "list",
        choices: await choices.getEmployeeList()
    });
    await updateWhatInfo(employeeToUpdate);
};

const updateWhatInfo = async (employeeToUpdate) => {
    employeeID = employeeToUpdate.split(' ').pop(); // grabs ID value from end of string

    let { attribute } = await inquirer.prompt({
        name: "attribute",
        message: `What do you want to update about ${employeeToUpdate}?`,
        type: "list",
        choices: ["Role", "Manager"]
    });

    switch (attribute) {
        case "Role":
            let { role } = await inquirer.prompt({
                name: "role",
                message: `Which role do you move the employee to?`,
                type: "list",
                choices: await choices.getRoleList()
            });
            roleID = role.split(' ').pop(); // grabs ID value from end of string
            await updateEmployee([{roleID: roleID}, {id: employeeID}]);
            console.log(`${employeeToUpdate} moved roles successfully`)
            break;
        case "Manager":
            let { manager } = await inquirer.prompt({
                name: "manager",
                message: `Which manager do you want to move the employee under?`,
                type: "list",
                choices: await choices.getEmployeeList()
            });
            managerID = manager.split(' ').pop(); // grabs ID value from end of string
            await updateEmployee([{managerID: managerID}, {id: employeeID}])
            console.log(`${employeeToUpdate} moved managers successfully`)
            break;
        };
    };

const updateEmployee = (object) => {
    connection.query("UPDATE employees SET ? WHERE ?", object, (err) => {
        if (err) {throw err};
    });
};


module.exports = updateObject;