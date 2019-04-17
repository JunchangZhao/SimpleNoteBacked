const {BaseDao} = require("./base_dao");
const Sequelize = require('sequelize')

class UserDao extends BaseDao {
    constructor() {
        super('companys', {
            email: {type: Sequelize.STRING},
            password: {type: Sequelize.STRING},
            moment: {type: Sequelize.LONG}
        })
        this.model = super.getModel()
    }

}

module.exports = new UserDao()