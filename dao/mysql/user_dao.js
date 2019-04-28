const BaseDao = require("./base_dao");
const User = require("../../model/db/mysql/user");

class UserDao extends BaseDao {
    constructor() {
        super('user', User)
        this.model = super.getModel()
        this.model.sync()
    }

}

module.exports = new UserDao()