const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// เชื่อมต่อ MongoDB
mongoose
  .connect(
    "mongodb+srv://baworntattt:SqMBrjVhJN3Kq6Hl@cluster0.ajxhf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// นำ routes มาใช้
const ideaRoutes = require("./routes/ideaRoutes");
app.use("/api/ideas", ideaRoutes);

// รันเซิร์ฟเวอร์
const PORT = 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on http://0.0.0.0:${PORT}`)
);
