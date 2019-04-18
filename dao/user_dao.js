const BaseDao = require("./base_dao");
const Sequelize = require('sequelize')

class UserDao extends BaseDao {
    constructor() {
        super('user', {
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
            }
            ,
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
        })
        this.model = super.getModel()
    }

}

module.exports = new UserDao()