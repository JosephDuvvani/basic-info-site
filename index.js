import { readFile } from "fs/promises";
import { createServer } from "http";

createServer((req, res) => {
  const reqURL = new URL("http://localhost:8080" + req.url);
  const name = reqURL.pathname;
  const filename = "." + (name === "/" ? "/index.html" : name + ".html");
  const data = readFile(filename, "utf8");
  data
    .then((result) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(result);
      return res.end();
    })
    .catch((err) => {
      const data = readFile("404.html", "utf8");
      data.then((result) => {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(result);
        return res.end();
      });
    });
}).listen(8080);
