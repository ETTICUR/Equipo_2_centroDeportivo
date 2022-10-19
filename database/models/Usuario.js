module.exports = (sequelize, DataTypes) => {
  const alias = "usuarios";
  const cols = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false },
    id_genero: { type: DataTypes.INTEGER, allowNull: false },
    edad: { type: DataTypes.INTEGER, allowNull: false },
    id_actividad: { type: DataTypes.INTEGER, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    fotoPerfil: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    passwordConfirm: { type: DataTypes.STRING, allowNull: false },
    condiciones: { type: DataTypes.STRING, allowNull: false },
  };
  const config = {
    tableName: "usuarios",
    timestamps: false,
  };

  const usuarios = sequelize.define(alias, cols, config);

  usuarios.associate = models =>{
    usuarios.belongsTo(models.genero, {
        as: "genero",
        foreignKey: "id_genero",
        timestamps: false
    })

    usuarios.belongsTo(models.productoCategoria, {
        as: "productoCategoria_usuario",
        foreignKey: "id_actividad",
        timestamps: false
    })
  }

  return usuarios;
};
