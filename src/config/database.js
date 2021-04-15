module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'admin',
    database: 'tasklist01',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
