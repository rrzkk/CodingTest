import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Pool, QueryResult } from "pg";
import dotenv from 'dotenv';
import { ICryptoHistoricalData } from "../../shared/interfaces/ICryptoHistoricalData";

const app = express();
app.use(bodyParser.json());
//Create a connection pool, to provide quicker connection
dotenv.config();
console.log(process.env.databaseHost);
console.log(process.env.databaseName);
console.log(process.env.password);
console.log(process.env.port);
const pool = new Pool({
  user: "postgres",
  host: process.env.databaseHost,
  database: process.env.databaseName,
  password: process.env.password,
  port: +process.env.port
});

app.use(cors());
app.get("/", (req, res) => {
  res.send("coding test backend");
});

//get all the Data from database
app.get("/api/getall", (req, res) => {
  pool.query("SELECT * FROM crypto_historical_data", (error: Error, results: QueryResult<ICryptoHistoricalData[]>) => {
    if (error) {
      res.status(503).send("error message is " + error);
    } else {
      res.send(results);
    }
  });
});

//get 7 day, 30 days and 24 hours data only
app.get("/api/getSelectedEntry", (req, res) => {
  pool.query(
    `SELECT ya."Currency" as name,
         ya."Close" as price,
        (ya."Close"-yb."Close")/yb."Close" as day,
        (ya."Close"-yc."Close")/yc."Close" as week,
        (ya."Close"-yd."Close")/yd."Close" as month,
         ya."Volume" as volume,
         ya."Market_Cap" as market_cap
      FROM 
        (SELECT * FROM (
            SELECT 
                ROW_NUMBER() OVER (PARTITION BY "Currency") AS r,crypto_historical_data.* 
            FROM crypto_historical_data
        ) x1 WHERE x1.r=1 ) as ya ,
        (SELECT * FROM (
            SELECT 
                ROW_NUMBER() OVER (PARTITION BY "Currency") AS r,crypto_historical_data.* 
            FROM crypto_historical_data
        ) x2 WHERE x2.r=2 ) as yb ,
        (SELECT * FROM (
            SELECT 
                ROW_NUMBER() OVER (PARTITION BY "Currency") AS r,crypto_historical_data.* 
            FROM crypto_historical_data
        ) x8 WHERE x8.r=8 ) as yc ,
        (SELECT * FROM (
            SELECT 
                ROW_NUMBER() OVER (PARTITION BY "Currency") AS r,crypto_historical_data.* 
            FROM crypto_historical_data
        ) x31 WHERE x31.r=31 ) as yd
      WHERE ya."Currency"=yb."Currency"
      and ya."Currency"=yc."Currency"
      and ya."Currency"=yd."Currency"`,
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.send(results.rows);
      }
    }
  );
});

// start the Express server
const server = app.listen(8080, () => {});

export default { app, server };
