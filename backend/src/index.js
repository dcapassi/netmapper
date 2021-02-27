import app from "./app";
import https from "https";
import path from "path";
import fs from "fs";

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "CERT", "netmapper.key")),
    cert: fs.readFileSync(path.join(__dirname, "CERT", "dev.netmapper.crt")),
    ca: fs.readFileSync(path.join(__dirname, "CERT", "myCA.pem")),
  },
  app
);

sslServer.listen(3399, () => console.log("Secure server on port 3443"));

//app.listen(3399);
