const inquirer = require("inquirer");
const processInitialUserAction = require("./controller"); 


const init = async () => {
    let { action } = await inquirer.prompt({
        name: "action",
        message: "What do you want to do?",
        type: "list",
        choices: ["Add", "Update", "View", "Delete", "Exit"]
    });
    
    processInitialUserAction(action, init);
};


init();

