const addObject = require("./addObject");
const viewObject = require("./viewObject");
const updateObject = require("./updateObject");
const deleteObject = require("./deleteObject");

const processInitialUserAction = async (action, init) => {    
    switch(action){
        case "add":
            await addObject();
            init();
            break;
        case "update":
            await updateObject();
            init();
            break;
        case "view":
            await viewObject();
            init();
            break;
        case "delete":
            await deleteObject();
            init();
        case "exit":
            return;
    }
}

module.exports = processInitialUserAction;