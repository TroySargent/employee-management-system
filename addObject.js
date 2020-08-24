const inquirer = require("inquirer");
const connection = require("./connection");

const addObject = (object) => {
    connection.query("SELECT * FROM employees", (err, data) => {
        if (err) {throw err};
        console.table(data);
    });
};

module.exports = addObject;