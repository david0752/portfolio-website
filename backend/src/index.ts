// A backend indítása: .env betöltése, majd az app (app.ts) mindig a 3300-as porton figyel (a Vite proxy is ide küld).
import "dotenv/config";

import { app } from "./app.js";

const port = 3300;

app.listen(port, () => {
  console.log(`Backend fut: http://localhost:${port}`);
});
