var db = require("../../lib/resources/db");
var collages = require("../collages/schema");

const Students = db.sequelize.define('students', {
        collage_id: {
            type: db.Sequelize.BIGINT(11)
        },
        engrip_user_id: {
            type: db.Sequelize.STRING(100)
        },
        full_name: {
            type: db.Sequelize.STRING(100)
        },
        roll_number: {
            type: db.Sequelize.STRING(100)
        },
        phone_number: {
            type: db.Sequelize.STRING(100)
        },
        course_id: {
            type: db.Sequelize.STRING(100)
        },
        branch_id: {
            type: db.Sequelize.BIGINT(11)
        },
        year_of_graduation: {
            type: db.Sequelize.STRING(100)
        },
});


Students.belongsTo(collages.table, {as: 'collage'});

// Students.sync({force:true}).then(() => {
// });


module.exports = {
    tableName:"students",
    tableTitle:"Students",
    table:Students
} 