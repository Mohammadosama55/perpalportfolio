// MongoDB connection and configuration
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGODB_DB_NAME || 'portfolio_db';

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  // Return cached connection if available
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    
    cachedClient = client;
    cachedDb = db;
    
    console.log('✅ Connected to MongoDB');
    return { client, db };
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

export async function getDatabase() {
  const { db } = await connectToDatabase();
  return db;
}

// Collection helpers
export async function getCollection(collectionName: string) {
  const db = await getDatabase();
  return db.collection(collectionName);
}

// Database operations
export const dbOperations = {
  // Feedback operations
  feedbacks: {
    async getAll(filter = {}) {
      const collection = await getCollection('feedbacks');
      return await collection.find(filter).toArray();
    },
    async getById(id: string) {
      const collection = await getCollection('feedbacks');
      return await collection.findOne({ _id: id });
    },
    async create(data: any) {
      const collection = await getCollection('feedbacks');
      const result = await collection.insertOne(data);
      return { ...data, _id: result.insertedId };
    },
    async update(id: string, data: any) {
      const collection = await getCollection('feedbacks');
      await collection.updateOne(
        { _id: id },
        { $set: { ...data, updatedAt: new Date() } }
      );
      return { ...data, _id: id };
    },
    async delete(id: string) {
      const collection = await getCollection('feedbacks');
      await collection.deleteOne({ _id: id });
    },
  },

  // Video Payment operations
  videoPayments: {
    async getAll(filter = {}) {
      const collection = await getCollection('videoPayments');
      return await collection.find(filter).toArray();
    },
    async getById(id: string) {
      const collection = await getCollection('videoPayments');
      return await collection.findOne({ _id: id });
    },
    async create(data: any) {
      const collection = await getCollection('videoPayments');
      const result = await collection.insertOne(data);
      return { ...data, _id: result.insertedId };
    },
    async update(id: string, data: any) {
      const collection = await getCollection('videoPayments');
      await collection.updateOne(
        { _id: id },
        { $set: { ...data, updatedAt: new Date() } }
      );
      return { ...data, _id: id };
    },
    async delete(id: string) {
      const collection = await getCollection('videoPayments');
      await collection.deleteOne({ _id: id });
    },
  },

  // Media Assets operations
  mediaAssets: {
    async getAll(filter = {}) {
      const collection = await getCollection('mediaAssets');
      return await collection.find(filter).toArray();
    },
    async getByCategory(category: string) {
      const collection = await getCollection('mediaAssets');
      return await collection.find({ category }).toArray();
    },
    async getDisplayed() {
      const collection = await getCollection('mediaAssets');
      return await collection.find({ isDisplayed: true }).toArray();
    },
    async getById(id: string) {
      const collection = await getCollection('mediaAssets');
      return await collection.findOne({ _id: id });
    },
    async create(data: any) {
      const collection = await getCollection('mediaAssets');
      const result = await collection.insertOne(data);
      return { ...data, _id: result.insertedId };
    },
    async update(id: string, data: any) {
      const collection = await getCollection('mediaAssets');
      await collection.updateOne(
        { _id: id },
        { $set: { ...data, updatedAt: new Date() } }
      );
      return { ...data, _id: id };
    },
    async delete(id: string) {
      const collection = await getCollection('mediaAssets');
      await collection.deleteOne({ _id: id });
    },
  },

  // Admin Profile operations
  adminProfiles: {
    async findOne(filter: any) {
      const collection = await getCollection('adminProfiles');
      return await collection.findOne(filter);
    },
    async update(id: string, data: any) {
      const collection = await getCollection('adminProfiles');
      await collection.updateOne(
        { id: id },
        { $set: { ...data, updatedAt: new Date() } },
        { upsert: true }
      );
      return { ...data, id: id };
    },
  },
};
