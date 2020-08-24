const connection = require("./connection");

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

const getRoleList = () => {
    return new Promise(function (resolve, reject) {
        connection.query("SELECT title FROM role;", (err, data) => {
            if (err) {
                return reject(err);
            }
            let roleList = [];
            data.forEach(row => roleList.push(row.title)); // push each employee into array from query
            resolve(roleList);
        });
    });
};

module.exports = {getEmployeeList, getRoleList};