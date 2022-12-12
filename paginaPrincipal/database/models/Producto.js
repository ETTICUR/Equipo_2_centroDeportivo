module.exports = (sequelize, DataTypes) => {
  const alias = "productos";
  const cols = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    id_category: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    id_morningShift: { type: DataTypes.INTEGER, allowNull: false },
    id_afternoonShift: { type: DataTypes.INTEGER, allowNull: false },
    id_nigthShift: { type: DataTypes.INTEGER, allowNull: false },
  };
  const config = {
    tableName: "productos",
    timestamps: false,
  };

  const producto = sequelize.define(alias, cols, config);

  producto.associate = (models) => {
    producto.belongsTo(models.productoCategoria, {
      as: "productoCategoria",
      foreignKey: "id_category",
      timestamps: false,
    });

    producto.belongsTo(models.morningShift, {
      as: "morningShift",
      foreignKey: "id_morningShift",
      timestamps: false,
    });
    producto.belongsTo(models.afternoonShift, {
      as: "afternoonShift",
      foreignKey: "id_afternoonShift",
      timestamps: false,
    });
    producto.belongsTo(models.nigthShift, {
      as: "nigthShift",
      foreignKey: "id_nigthShift",
      timestamps: false,
    });
  };

  return producto;
};
