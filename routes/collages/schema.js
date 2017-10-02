var db = require("../../lib/resources/db");

const Collages = db.sequelize.define('collages', {
        collage_name: {
            type: db.Sequelize.STRING(100)
        },
        collage_code: {
            type: db.Sequelize.STRING(100)
        },
        collage_logo: {
            type: db.Sequelize.STRING(100)
        },
        verified: {
            type: db.Sequelize.STRING(100)
        }
});

// Collages.sync({force:true}).then(() => {
// });

 
module.exports = {
    tableName:"collages",
    tableTitle:"Collages",
    table:Collages
} 