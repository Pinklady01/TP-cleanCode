module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        login: {
            type: DataTypes.STRING
        },
        type:{
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true,
        underscored: true,
        timestamps: false
    });
    User.associate = (models) => {
        User.hasMany(models.Book , { onDelete: 'cascade' , timestamps: false});
        User.hasOne(models.Session , { onDelete: 'cascade' , timestamps: false});
    };
    return User;
};
