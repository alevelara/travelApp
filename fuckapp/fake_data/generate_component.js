const fs = require('fs');
const componentFolderName = 'trips';
const componentFileName = 'trip';
const fileModelName = 'trip.js';
var folderPath = './components/' + componentFolderName;


var createFolder = function(){
    if(!fs.existsSync(folderPath)){        
        fs.mkdirSync(folderPath);
        console.log("Folder created succesfully");
    }else{
        console.log("Folder already exists");
    }

}   

var createFiles = function(){
    generateRepositoryFile();
    generateControllerFile();
    generateRoutesFile();
    generateModelFile();
    generateTestFile();
};

var generateRepositoryFile = function(){
    const repositoryFile = componentFileName + '.repository.js';
    const pathRepository = folderPath + '/'+ repositoryFile;
    try {
        if(!fs.existsSync(pathRepository)){
            fs.writeFileSync(pathRepository);
            console.log("Repository file created succesfully");
        }
    } catch (error) {
        console.log("REPOSITORY ERROR: "+ e.message);
    }
};

var generateControllerFile = function(){
    const controllerFile = componentFileName +'.controller.js';
    const pathController = folderPath + '/'+ controllerFile;

    try {
        if(!fs.existsSync(pathController)){
            fs.writeFileSync(pathController);
            console.log("Controller file created succesfully");
        }
    } catch (error) {
        console.log("CONTROLLER ERROR: "+ e.message);
    }
};

var generateRoutesFile = function(){
    const routesFile = componentFileName +'.routes.js';
    const pathRoutes = folderPath + '/'+ routesFile;

    try {
        if(!fs.existsSync(pathRoutes)){
            fs.writeFileSync(pathRoutes);
            console.log("Routes file created succesfully");
        }
    } catch (error) {
        console.log("ROUTES ERROR: "+ e.message);
    }
};

var generateModelFile = function(){
    const pathModel = './models/'+ fileModelName;
    try {
        if(!fs.existsSync(pathModel)){
            fs.writeFileSync(pathModel);
            console.log("Model file created succesfully");
        }
    } catch (error) {
        console.log("MODEL ERROR: "+ e.message);
    }
};

var generateTestFile = function(){
    const testFile = componentFileName + '.test.js';
    const pathTest = './test/'+ testFile;

    try {     
        if(!fs.existsSync(pathTest)){
            fs.writeFileSync(pathTest);
            console.log("Test file created succesfully");
        }
    } catch (error) {
        console.log("TESTS ERROR: "+ e.message);
    }
};


createFolder();
createFiles();
