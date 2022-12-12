module.exports = (sequelize, DataTypes) => {
    const alias = "ventas";
    const cols = {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      carrito: { type: DataTypes.JSON, allowNull: false },
      fecha: { type: DataTypes.DATE},
    };
    const config = {
      tableName: "ventas",
      timestamps: false,
    };
  
    const ventas = sequelize.define(alias, cols, config);
  
    return ventas;
  };