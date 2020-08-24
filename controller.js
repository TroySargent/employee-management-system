const addObject = require("./addObject");
const viewObject = require("./viewObject");
const updateObject = require("./updateObject");
const deleteObject = require("./deleteObject");

const processInitialUserAction = async (action, init) => {    
    switch(action){
        case "Add":
            await addObject();
            init();
            break;
        case "Update":
            await updateObject();
            init();
            break;
        case "View":
            await viewObject();
            init();
            break;
        case "Delete":
            await deleteObject();
            init();
        case "Exit":
            return;
    }
}

module.exports = processInitialUserAction;