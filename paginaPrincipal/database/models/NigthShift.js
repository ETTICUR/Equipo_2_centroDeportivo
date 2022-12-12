module.exports = (sequelize, DataTypes) => {
  const alias = "nigthShift";
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    horaTurno: { type: DataTypes.STRING, allowNull: false },
  };
  const config = {
    tableName: "nigthshift_productos",
    timestamps: false,
  };

  const nigthShift = sequelize.define(alias, cols, config);

  nigthShift.associate = (models) => {

    nigthShift.hasMany(models.productos, {
      as: "nigthShift",
      foreignKey: "id_nigthShift",
      timestamps: false,
    });

    nigthShift.hasMany(models.productoEliminado, {
      as: "nigthShift_eliminado",
      foreignKey: "id_nigthShift",
      timestamps: false,
    });
  };

  return nigthShift;
};
