// A backend indítása: .env betöltése, majd az app (app.ts) figyel a PORT-on (alapból 3400).
import "dotenv/config";

import { app } from "./app.js";

const port = Number(process.env.PORT) || 3400;

app.listen(port, () => {
  console.log(`Backend fut: http://localhost:${port}`);
});
