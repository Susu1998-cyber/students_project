// // const express = require("express");
// // const app = express();
// // const PORT = process.env.PORT ||  5000;

// // app.get("/", (req, res) => {
// //   res.send("Welcome to user Management");
// // });

// // app.listen(PORT, () => {
// //   console.log(`Server connected at ${PORT}`);
// // });

// const express = require("express");
// const mongoose = require("mongoose");
// const userRouter = require("./router/UserRouter")
 
// const MONGOURL = "mongodb://localhost:27017/userdata";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(MONGOURL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error Connected to MongoDB Database");
//   }
// };



// connectDB();

 
// const app = express();

// app.use(express.json())

// app.use("/user",userRouter)
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running at ${PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./router/UserRouter");
const cors = require('cors')

const MONGOURL = "mongodb://localhost:27017/userdata";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB Database", error);
    process.exit(1);  
  }
};

connectDB();

const app = express();
app.use(cors())
app.use(express.json()); 

app.use("/user", userRouter);

const PORT =  5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
