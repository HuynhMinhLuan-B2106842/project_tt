const mongoose = require("mongoose");
const connectDB = require("../config/db");
const { User } = require("../models");
const sample = require("./sampleData");

const seed = async () => {
  await connectDB();
  await User.deleteMany();
  await User.insertMany(sample.users);
  console.log("Seed completed.");
  process.exit();
};

seed();
