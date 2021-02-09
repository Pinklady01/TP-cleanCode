module.exports = function(sequelize, DataTypes) {
    const Borrow = sequelize.define('Borrow', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        dateEmprunt:{
            type: DataTypes.DATE,
            defaultValue: new Date()
        }
    }, {
        freezeTableName: true,
        underscored: true,
        timestamps: false
    });

    Borrow.associate = (models) => {
        Borrow.belongsTo(models.User);
    };
    return Borrow;
};
