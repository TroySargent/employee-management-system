const inquirer = require("inquirer");
const connection = require("./connection");
const addObject = require("./addObject");
const viewObject = require("./viewObject");
const updateObject = require("./updateObject");

const init = async () => {
    let { action } = await inquirer.prompt({
        name: "action",
        message: "What do you want to do?",
        type: "list",
        choices: ["add", "update", "view", "exit"]
    });

    connection.connect((err) => {
        if (err) {throw err};
    });

    processInitialUserAction(action);
};

const getObjectForAction = async (action) => {
    let { object } = await inquirer.prompt({
        name: "object",
        message: `What do you want to ${action}?`,
        type: "list",
        choices: ["employee", "role", "department"]
    });
    return object;
}

const processInitialUserAction = async (action) => {    
    switch(action){
        case "add":
            addObject(await getObjectForAction(action));
            break;
        case "update":
            updateObject(await getObjectForAction(action));
            break;
        case "view":
            viewObject(await getObjectForAction(action));
            break;
        case "exit":
            connection.end();
            return;
    }
}

init();