module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define('task', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        requester: {
            type: Sequelize.STRING,
            allowNull: false
        },
        owners: {
            type: Sequelize.STRING,
            allowNull: false
        },
        due_date: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });

    Task.hasMany(Task);
    Task.belongsTo(Task);
    return Task;
}