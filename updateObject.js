const { up } = require("inquirer/lib/utils/readline");

const inquirer = require("inquirer");
const connection = require("./connection");

const updateObject = (object) => {
    connection.query("SELECT * FROM employees", (err, data) => {
        if (err) {throw err};
        console.table(data);
    });
};

module.exports = updateObject;