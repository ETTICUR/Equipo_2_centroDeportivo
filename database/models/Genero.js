module.exports = (sequelize, DataTypes) => {
    const alias = "genero";
    const cols = {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
     name: { type: DataTypes.STRING, allowNull: false },
    };
    const config = {
      tableName: "generos",
      timestamps: false,
    };
  
    const genero = sequelize.define(alias, cols, config);

    genero.associate = models =>{
        genero.hasMany(models.usuarios, {
            as: "genero",
            foreignKey: "id_genero",
            timestamps: false
        })
      }
  
    return genero;
  };
  