const Sequelize = require('sequelize')

const dbConfig = {
    HOST: '127.0.0.1',
    PORT: '3306',
    USER: 'root',
    PASSWORD: 'root',
    DATABASE: 'simple_note',
}

const sequelize = new Sequelize(dbConfig['DATABASE'], dbConfig['USER'], dbConfig['PASSWORD'],
    {
        host: dbConfig['HOST'],
        port: dbConfig['PORT'],
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    }
);

sequelize.authenticate().then(() => {
    console.log('数据库连接成功...')
}).catch(err => {
    console.error('数据库连接失败...', err)
})

module.exports = sequelize