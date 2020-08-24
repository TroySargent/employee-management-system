const inquirer = require("inquirer");
const connection = require("./connection");

const deleteObject = async () => {
    await getEmployeeToRemove(await getEmployeeList());
};

const getEmployeeList = () => {
    return new Promise(function (resolve, reject) {
        connection.query("SELECT CONCAT(firstName, ' ', lastName) AS name FROM employees;", (err, data) => {
            if (err) {
                return reject(err);
            }
            let employeeNames = [];
            data.forEach(row => employeeNames.push(row.name)); // push each employee into array from query
            resolve(employeeNames);
        });
    })
};

const getEmployeeToRemove = async (employeeNames) => {
    let { employeeToRemove } = await inquirer.prompt({
        name: "employeeToRemove",
        message: `Which employee do you want to remove?`,
        type: "list",
        choices: employeeNames
    });
    await removeEmployee(employeeToRemove);
    console.log(`Successfully removed ${employeeToRemove} from records`);
};

const removeEmployee = async (employeeToRemove) => {
    let name = employeeToRemove.split(" "); //split into two parameters for sql query 
    await connection.query("DELETE FROM employees WHERE firstName = ? AND lastName = ?", name, (err, data) => {
        if (err) {
            console.log(err)
        };
    });
};

module.exports = deleteObject;