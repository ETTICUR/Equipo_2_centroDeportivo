module.exports = (sequelize, DataTypes) => {
  const alias = "afternoonShift";
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    horaTurno: { type: DataTypes.STRING, allowNull: false },
  };
  const config = {
    tableName: "afternoonshift_productos",
    timestamps: false,
  };

  const afternoonShift = sequelize.define(alias, cols, config);

  afternoonShift.associate = (models) => {

    afternoonShift.hasMany(models.productos, {
      as: "afternoonShift",
      foreignKey: "id_afternoonShift",
      timestamps: false,
    });

    afternoonShift.hasMany(models.productoEliminado, {
      as: "afternoonShift_eliminado",
      foreignKey: "id_afternoonShift",
      timestamps: false,
    });
  };

  return afternoonShift;
};
