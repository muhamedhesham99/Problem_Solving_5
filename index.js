import app from "./server.js";
import sequelize from "./src/config/db.js";
import "dotenv/config";
import "./src/modules/associations.js";

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false, alter: false });
    app.listen(process.env.DB_PORT, () => {
      console.log(`Server running on port ${process.env.DB_PORT}`);
    });
  } catch (err) {
    console.error("Server startup failed:", err);
  }
};

startServer();
