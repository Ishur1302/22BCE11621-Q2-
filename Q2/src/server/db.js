import mongoose from 'mongoose';
import { bigStorage } from './schema.js';
import { useClerk } from '@clerk/clerk-react';

const uri = "mongodb+srv://ishansh4420:13022002@cluster0.z2s7n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const storage = bigStorage;
async function startDB() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }catch(e) {
    console.error("Error connecting db: "+e);
  }
}

async function getOrders(req,res) {
  const email = req.body.email;
  const db = await storage.findOne({email: email});
  res.status(201).json({data: db});
}


async function setTokens(req, res) {
  try {
    const data = req.body;
    const email = data.email;
    if (!email) {
      return res.status(400).json({ msg: "Email is required" });
    }

    const db = await storage.findOneAndUpdate(
      { email: email },
      { $set: data },
      { new: true, upsert: true } // Creates new document if not found
    );

    res.status(201).json({ msg: "Data Saved!", data: db });
  } catch (e) {
    console.error("Error in setTokens:", e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}



async function getProducts(req, res) {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({ msg: "Email is required" });
    }

    const db = await storage.findOne({ email: email });
    console.log("Database Response:", db); // Debugging

    if (!db || !db.products) {
      return res.status(404).json({ msg: "No products found!" });
    }

    res.status(200).json({ products: db.products });
  } catch (e) {
    console.error("Error in getProducts:", e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

async function createOrder(data) {
  try {
    const db = await storage.findOne({domain:data.sd});
    await storage.updateOne({domain: data.sd},{ 
        $push: { 
          orders: data.data
        } 
      });
  }catch(e) {
    console.error(e);
  }
}
  

async function addProducts(req, res) {
  try {
    const { email, product } = req.body;

    if (!email || !product) {
      return res.status(400).json({ msg: "Email and product are required" });
    }

    await storage.updateOne(
      { email: email },
      { $push: { products: product } }, // Push to array instead of replacing
      { upsert: true }
    );

    res.status(201).json({ msg: "Product added successfully!" });
  } catch (e) {
    console.error("Error in addProducts:", e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

export {startDB, setTokens, getOrders, getProducts, addProducts, createOrder};
