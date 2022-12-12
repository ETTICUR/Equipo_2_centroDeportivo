module.exports = (sequelize, DataTypes) => {
  const alias = "productoCategoria";
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },
  };
  const config = {
    tableName: "categoria_producto",
    timestamps: false,
  };

  const productoCategoria = sequelize.define(alias, cols, config);

  productoCategoria.associate = (models) => {
    productoCategoria.hasMany(models.usuarios, {
      as: "productoCategoria_usuario",
      foreignKey: "id_actividad",
      timestamps: false,
    });

    productoCategoria.hasMany(models.productos, {
      as: "productoCategoria",
      foreignKey: "id_category",
      timestamps: false,
    });

    productoCategoria.hasMany(models.productoEliminado, {
      as: "productoCategoria_eliminado",
      foreignKey: "id_category",
      timestamps: false,
    });
  };

  return productoCategoria;
};
