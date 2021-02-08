module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Book', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        author: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true,
        underscored: true,
        timestamps: false
    });
};
