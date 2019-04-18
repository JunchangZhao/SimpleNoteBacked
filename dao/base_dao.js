const db = require('../config/mysql_config')
const Sequelize = require('sequelize')
const OP = Sequelize.Op


class BaseDao {
    constructor(tableName, schema) {
        this.model = db.define(tableName, schema)
    }


    getModel() {
        return this.model;
    }

    findAll(attributes){
        return attributes ? this.model.findAll({attributes: attributes}) : this.model.findAll()
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

module.exports = BaseDao