module.exports = (sequelize, DataTypes) => {
  const alias = "morningShift";
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    horaTurno: { type: DataTypes.STRING, allowNull: false },
  };
  const config = {
    tableName: "morningshift_productos",
    timestamps: false,
  };

  const morningShift = sequelize.define(alias, cols, config);

  morningShift.associate = (models) => {
    morningShift.hasMany(models.productos, {
      as: "morningShift",
      foreignKey: "id_morningShift",
      timestamps: false,
    });
    
    morningShift.hasMany(models.productoEliminado, {
      as: "morningShift_eliminado",
      foreignKey: "id_morningShift",
      timestamps: false,
    });
  };

  return morningShift;
};
