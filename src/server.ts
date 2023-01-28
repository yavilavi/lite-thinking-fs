// import bodyParser from "body-parser";
// import compression from "compression";
// import cors from "cors";
// import helmet from "helmet";
import express from "express";

const app = express();
const port = process.env.PORT || 3001;

app
  .use(express.json());
export default app
