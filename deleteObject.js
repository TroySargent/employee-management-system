const inquirer = require("inquirer");
const connection = require("./connection");

const deleteObject = async () => {
    getEmployeeList();
};

const getEmployeeList = () => {
    let employeeNames = [];
    connection.query("SELECT CONCAT(firstName, ' ', lastName) AS name FROM employees;", (err, data) => {
        if (err) {throw err};
        data.forEach(row => employeeNames.push(row.name)); // push each employee into array from query
        getEmployeeToRemove(employeeNames);
    });
}

const getEmployeeToRemove = async (employeeNames) => {
    let { employeeToRemove } = await inquirer.prompt({
        name: "employeeToRemove",
        message: `Which employee do you want to remove?`,
        type: "list",
        choices: employeeNames
    });
    removeEmployee(employeeToRemove);
};

const removeEmployee = async (employeeToRemove) => {
    let name = employeeToRemove.split(" "); //split into two parameters for sql query 
    console.log(name)
    await connection.query("DELETE FROM employees WHERE firstName = ? AND lastName = ?", name, (err, data) => {
        if (err) {console.log(err)};
        console.log(`Successfully removed ${employeeToRemove} from records`)
    });
};

module.exports = deleteObject;