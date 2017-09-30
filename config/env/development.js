module.exports = {
    db: {
        "mongo":"mongodb://localhost:27017/ingrit",
        "mysql":{
            dbName: "ingrit",
            dbUserName:"root",
            dbPassword:"root",
            dbHost:{
                host:"localhost",
                port:3306,
                dialect:"mysql"
            }
        }
    },
    secret:"969636"
}