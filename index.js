
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Connect } from "./db/Connection.js";
const port = process.env.PORT || 6001;

/*****************  Configurations or middleware **************************/
dotenv.config();
Connect();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

/***********************  Import Router *************************************/
import adminRoute from "./router/adminRoute.js"

/*****************  route with file **************************/
app.use("/api/admin", adminRoute);
// app.use("/address", AddressRoute);

/********************* Listening to the port ******************************* */
app.listen(port, () => console.log(`server listening at the port no ${port}`));
