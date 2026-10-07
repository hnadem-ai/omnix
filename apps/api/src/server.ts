import "dotenv/config";
import app from "./app.js";

console.log("PORT is: ", process.env.PORT)

const PORT: Number = process.env.PORT ? Number(process.env.PORT) : 5000;

app.listen(PORT, () => {
    console.log(`Omnix API running on http://localhost:${PORT}`);
});