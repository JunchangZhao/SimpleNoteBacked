const Sequelize = require('sequelize')

const User = {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [6, 100]
        }
    }
    ,
    moment: {
        type: Sequelize.BIGINT,
        allowNull: false,
    }
}

module.exports = User