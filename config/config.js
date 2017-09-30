process.env.NODE_ENV = process.env.NODE_ENV || "development";
try{
    module.exports = require("./env/"+process.env.NODE_ENV+".js");
}
catch(e){
    console.log("Enviroment file does not exist please check spelling."+e);
    return false;
}