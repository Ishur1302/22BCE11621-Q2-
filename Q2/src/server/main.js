import cookieParser from "cookie-parser";
import express from "express";
import ViteExpress from "vite-express";
import { addProducts, getOrders, getProducts, setTokens, startDB } from "./db.js";
import { orderCreated } from "./shopifyAPI.js";

const app = express();
/** Middlewares **/
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

startDB();
app.get("*", (req, res,next) => {
  next();
});

// POST REQUESTS
app.post("/api/setShopifyToken",setTokens);
app.post("/api/getProducts", getProducts);
app.post("/api/addProducts", addProducts);
/** SHOPIFY **/
app.post("/api/shopify/orderCreated",orderCreated);
app.post("/api/getOrders", getOrders)
app.post("/api/setEmail", (req,res)=> {
  redisC.set("email",req.body.email);
  res.status(201).json({msg:"DONE"});
})

ViteExpress.listen(app, 4444, () =>
  console.log("Server is listening on port 4444..."),
);

/*
"companyName": "Afford",
    "clientID": "14794989-338f-426a-b395-e589d462a445",
    "clientSecret": "kqyXHppGfFNBgXIu",
    "ownerName": "Ishan",
    "ownerEmail": "ishansh4420@gmail.com",
    "rollNo": "22BCE11621"
*/

/*
"token_type": "Bearer",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzMTM5ODgyLCJpYXQiOjE3NDMxMzk1ODIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjE0Nzk0OTg5LTMzOGYtNDI2YS1iMzk1LWU1ODlkNDYyYTQ0NSIsInN1YiI6ImlzaGFuc2g0NDIwQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6IkFmZm9yZCIsImNsaWVudElEIjoiMTQ3OTQ5ODktMzM4Zi00MjZhLWIzOTUtZTU4OWQ0NjJhNDQ1IiwiY2xpZW50U2VjcmV0Ijoia3F5WEhwcEdmRk5CZ1hJdSIsIm93bmVyTmFtZSI6IklzaGFuIiwib3duZXJFbWFpbCI6ImlzaGFuc2g0NDIwQGdtYWlsLmNvbSIsInJvbGxObyI6IjIyQkNFMTE2MjEifQ.T186nYfbscI3indiTMl8i15i7Jn_TUt8gN6b890gCBc",
    "expires_in": 1743139882
*/

// http://20.244.56.144/test/auth