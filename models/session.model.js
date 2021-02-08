module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Session', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true,
        underscored: true,
        timestamps: false
    });
};
