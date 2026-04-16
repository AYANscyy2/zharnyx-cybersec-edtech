console.log("Checking DB connection"); const { db } = require("./src/lib/db"); db.execute("SELECT 1;").then(() => console.log("Success")).catch(console.error);
