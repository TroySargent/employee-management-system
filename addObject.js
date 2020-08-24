const inquirer = require("inquirer");
const connection = require("./connection");
const choices = require("./choiceList");

const getObjectToAdd = async () => {
    let { object } = await inquirer.prompt({
        name: "object",
        message: `What do you want to add?`,
        type: "list",
        choices: ["Employee", "Role", "Department"]
    });
    return object;
};

const addObject = async () => {
    switch(await getObjectToAdd()) {
        case "Employee":
            await getEmployeeToAdd(await choices.getRoleList(), await choices.getEmployeeList());
            break;
        case "Role":
            await getRoleToAdd(await choices.getDepartmentList());
            break;
        case "Department":
            await getDepartmentToAdd();
            break;

    };
};

// Get role info and insert
const getRoleToAdd = async (departmentList) => {
    let { title, salary, department } = await inquirer.prompt([{
        name: "title",
        message: "What is the role's name?",
        type: "input"
    },
    {
        name: "salary",
        message: "What is the role's salary?",
        type: "input"
    },
    {
        name: "department",
        message: "Which department is this role under?",
        type: "list",
        choices: departmentList
    }]);
    await addRoleToTable(title, salary, department);
    console.log(`Add ${title} to ${department}`);
};

const addRoleToTable = (title, salary, department) => {
    departmentID = department.split(' ').pop(); // grabs ID value from end of string
    connection.query("INSERT INTO role SET ?", {title: title, salary: salary, departmentID: departmentID}, (err) => {
        if (err) {throw err};
    });
};

// Get department info and insert
const getDepartmentToAdd = async () => {
    let { name } = await inquirer.prompt({
        name: "name",
        message: "What is the department's name?",
        type: "input"
    });
    await addDepartmentToTable(name);
    console.log(`Add ${name} as a department`);
};

const addDepartmentToTable = (name) => {
    connection.query("INSERT INTO department SET ?", {name: name}, (err) => {
        if (err) {throw err};
    });
};


// Get employee info and insert
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
    console.log(`${firstName} ${lastName} as a ${role} under ${manager}`)
};

const addEmployeeToTable = (firstName, lastName, role, manager) => {
    roleID = role.split(' ').pop(); // grabs ID value from end of string
    managerID = manager.split(' ').pop();
    connection.query("INSERT INTO employees SET ?", {firstName: firstName, lastName: lastName, roleID: roleID, managerID: managerID}, (err) => {
        if (err) {throw err};
    });
};

module.exports = addObject;