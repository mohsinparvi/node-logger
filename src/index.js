import express from "express";
const app = express();
import logger from "./utils/logger.js";
import morgan from "morgan";

// Middleware to parse JSON request bodies
const PORT = process.env.PORT || 3000;
app.use(express.json());
const morganFormat = ":method :url :status :response-time ms";

// Middleware to validate input data
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);
app.get("/", (req, res) => {
  logger.warn("This is a debug message");
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
