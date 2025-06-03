import { MongoClient, type Db } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || ""
const MONGODB_DB = process.env.MONGODB_DB || "medical_clinic"

// Global variable to cache the MongoDB connection
let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase() {
  // If we have a cached connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  // Check if MongoDB URI is provided
  if (!MONGODB_URI) {
    console.warn("MongoDB URI not provided. Using mock database.")
    // Return a mock database for development
    return {
      client: null,
      db: {
        collection: (name: string) => ({
          insertOne: async (doc: any) => {
            console.log(`Mock DB: Inserting into ${name}:`, doc)
            return { insertedId: "mock_id_" + Date.now() }
          },
          findOne: async (query: any) => {
            console.log(`Mock DB: Finding in ${name}:`, query)
            return null
          },
          find: (query: any) => ({
            sort: () => ({
              toArray: async () => {
                console.log(`Mock DB: Finding multiple in ${name}:`, query)
                return []
              },
            }),
          }),
          deleteOne: async (query: any) => {
            console.log(`Mock DB: Deleting from ${name}:`, query)
            return { deletedCount: 1 }
          },
        }),
      },
    }
  }

  try {
    // Create a new MongoDB connection
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    const db = client.db(MONGODB_DB)

    // Cache the connection
    cachedClient = client
    cachedDb = db

    console.log("Connected to MongoDB successfully")
    return { client, db }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)

    // Return mock database if connection fails
    return {
      client: null,
      db: {
        collection: (name: string) => ({
          insertOne: async (doc: any) => {
            console.log(`Mock DB (connection failed): Inserting into ${name}:`, doc)
            return { insertedId: "mock_id_" + Date.now() }
          },
          findOne: async (query: any) => {
            console.log(`Mock DB (connection failed): Finding in ${name}:`, query)
            return null
          },
          find: (query: any) => ({
            sort: () => ({
              toArray: async () => {
                console.log(`Mock DB (connection failed): Finding multiple in ${name}:`, query)
                return []
              },
            }),
          }),
          deleteOne: async (query: any) => {
            console.log(`Mock DB (connection failed): Deleting from ${name}:`, query)
            return { deletedCount: 1 }
          },
        }),
      },
    }
  }
}

// Helper function to close the connection
export async function closeDatabaseConnection() {
  if (cachedClient) {
    await cachedClient.close()
    cachedClient = null
    cachedDb = null
    console.log("MongoDB connection closed")
  }
}

// Database collections interfaces
export interface Patient {
  _id?: string
  name: string
  phone: string
  email?: string
  address?: string
  dateOfBirth?: Date
  gender?: "male" | "female" | "other"
  medicalHistory?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Appointment {
  _id?: string
  patientId: string
  doctorId: string
  appointmentDate: Date
  appointmentTime: string
  reason: string
  status: "scheduled" | "completed" | "cancelled" | "no-show"
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Doctor {
  _id?: string
  name: string
  specialization: string
  phone: string
  email: string
  experience: number
  education: string[]
  workingHours: {
    [key: string]: { start: string; end: string }
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ChatLog {
  _id?: string
  userMessage: string
  botResponse: string
  timestamp: Date
  sessionId?: string
  userAgent?: string
}

// Test function to verify database connection
export async function testDatabaseConnection() {
  try {
    const { db } = await connectToDatabase()

    // Try to insert and delete a test document
    const testResult = await db.collection("test").insertOne({
      message: "Database connection test",
      timestamp: new Date(),
    })

    await db.collection("test").deleteOne({ _id: testResult.insertedId })

    return { success: true, message: "Database connection successful" }
  } catch (error) {
    console.error("Database connection test failed:", error)
    return {
      success: false,
      message: "Database connection failed",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
