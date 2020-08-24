const inquirer = require("inquirer");
const processInitialUserAction = require("./controller"); 


const init = async () => {
    let { action } = await inquirer.prompt({
        name: "action",
        message: "What do you want to do?",
        type: "list",
        choices: ["add", "update", "view", "delete", "exit"]
    });
    
    processInitialUserAction(action, init);
};


init();

