const inquirer = require("inquirer");
const sql = require("mysql");
const addObject = require("./addObject")

const init = async () => {
    let { action } = await inquirer.prompt({
        name: "action",
        message: "What do you want to do?",
        type: "list",
        choices: ["add", "update", "view", "exit"]
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
            return;
    }
}

init();