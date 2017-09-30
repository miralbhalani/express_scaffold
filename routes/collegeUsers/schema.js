var db = require("../../lib/resources/db");

const User = db.sequelize.define('collage_users', {
        collage_id: {
            type: db.Sequelize.BIGINT(11)
        },
        full_name: {
            type: db.Sequelize.STRING(100)
        },
        email: {
            type: db.Sequelize.STRING(100)
        },
        password: {
            type: db.Sequelize.STRING(100)
        },
        contact_number: {
            type: db.Sequelize.STRING(100)
        },
        status: {
            type: db.Sequelize.STRING(100)
        },
        last_login: {
            type: db.Sequelize.DATE
        },
        salt: {
            type: db.Sequelize.STRING(100)
        },
});

// User.sync().then(() => {
// });


module.exports = {
    tableName:"users",
    tableTitle:"Users",
    table:User
} 