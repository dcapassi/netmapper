import express from "express";
import https from "https";
import path from "path";
import fs from "fs";
import routes from "../src/routes";
import cors from "cors";
import path from "path";

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "CERT", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "CERT", "cert.pem")),
  },
  app
);

sslServer.listen(3443, () => console.log("Secure server on port 3443"));
