const express = require ("express");
const mongoose = require ("mongoose");
const cors = require ("cors");

const app = express();
app.use(express.json());
app.use(cors());


mongoose
.connect(`mongodb+srv://samankumara:job@cluster0.gs1ei.mongodb.net/CareerCrew_db?retryWrites=true&w=majority`, 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => {
  console.log("Successfully connected to MongoDB");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

const port= process.env.PORT || 5000

app.listen(port, ()=>{
  console.log("Server running on port", port)
})