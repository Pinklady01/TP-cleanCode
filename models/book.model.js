module.exports = function(sequelize, DataTypes) {
    const Book =  sequelize.define('Book', {
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
    Book.associate = (models) => {
        Book.belongsTo(models.Borrow);
    };
    return Book;
};
