var config = require('../config/mysql_config')
var mysql = require('mysql');

pool = mysql.createPool({
    host: config.dbConfig.HOST,
    user: config.dbConfig.USER,
    password: config.dbConfig.PASSWORD,
    database: config.dbConfig.DATABASE,
    port: config.dbConfig.PORT,
});


class BaseDao {
    constructor(tableName, schema) {
        this.model = pool.getConnection(function (err, connection) {
            if (!err) {
                connection.define(tableName, schema);
                connection.release();
            }
        })
    }


    getModel() {
        return this.model
    }


    findByFilter(attributes, where) {
        return attributes ? this.model.findAll({
            attributes: attributes,
            where: where
        }) : this.model.findAll({where: where})
    }

    findByFilterOrder(attributes, where, order) {
        let orderOps = [[order, 'DESC']]
        return attributes ? this.model.findAll({
            attributes: attributes,
            where: where,
            order: orderOps
        }) : this.model.findAll({where: where, order: orderOps})
    }

    findLikeByFilter(attributes, where) {
        let whereOps = {}
        for (let k in where) {
            whereOps[k] = {[Op.like]: '%' + where[k] + '%'}
        }
        return attributes ? this.model.findAll({
            attributes: attributes,
            where: whereOps
        }) : this.model.findAll({where: whereOps})
    }

    findLikeByFilterOrder(attributes, where, order) {
        let orderOps = [[order, 'DESC']]
        let whereOps = {}
        for (let k in where) {
            whereOps[k] = {[Op.like]: '%' + where[k] + '%'}
        }
        return attributes ? this.model.findAll({
            attributes: attributes,
            where: whereOps,
            order: orderOps
        }) : this.model.findAll({where: whereOps, order: orderOps})
    }

    update(attributes, where) {
        return where ? this.model.update(attributes, {where: where}) : this.model.update(attributes, {where: {}})
    }

    delete(where) {
        return this.model.destroy({where: where})
    }

    create(entity) {
        return this.model.create(entity)
    }

    createBatch(entitys) {
        return this.model.bulkCreate(entitys)
    }


}

module.exports = {BaseDao}