const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");
const PORT = process.env.PORT || 3001;
const app = express();
const axios = require("axios");
const multer = require("multer");
const cron = require('node-cron')
const { storage,fileFilter, getImageString } = require("./utils/multer");
require('dotenv').config();
const upload = multer({ storage, fileFilter });

// Serve up static assets
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  uploads: {
    maxFileSize: 10000000, // Set the maximum file size (in bytes) here as needed
  },
  introspection: true,
  introspectionCache: false,
  schemaHash: "111",
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.post("/api/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const filePath = path.join(__dirname, "uploads", req.file.filename);
  console.log(filePath)
  var image = await getImageString(filePath);
  try {
    var apiKey= process.env.PLANT_ID_API_KEY
    console.log(apiKey)
    const response = await axios.post(
      "https://api.plant.id/v2/identify",
      {
        "api_key": apiKey,
        images: [image],
        "plant_details": ["common_names", "name_authority", "watering", "wiki_image", "wiki_description", "url",]
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
});



db.once("open", () => {
  try{
    //Reset the waterAdded field to 0 for all plants at midnight of each month
    cron.schedule('0 0 1 * *', async () => {
      try {
        // Update the waterAdded field to 0 for all plants
        await Plant.updateMany({}, { $set: { waterAdded: 0 } });
    
        console.log('Water needed reset completed.');
      } catch (error) {
        console.error('Error resetting water needed:', error);
      }
    });
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
});