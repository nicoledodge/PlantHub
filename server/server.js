const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");
const multer = require("multer");
const PORT = process.env.PORT || 3001;
const sharp = require("sharp");
const app = express();
const axios = require("axios");
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const getModels = async() => {
  const openai = new OpenAIApi(configuration);
  const response = await openai.listModels();
  console.log(response.data.data)
}

// Set up the file upload destination
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Change the 'uploads' directory as needed
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const fileName = `currentupload${extension}`;
    cb(null, fileName);
    cb(null, fileName);
  },
});

// Filter function to validate file type
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedFileTypes.test(file.mimetype);

  if (extension && mimeType) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed.'));
  }
};

const upload = multer({ storage, fileFilter });
async function getImageString(path) {
  try {
    // Define the input file path

    // Read the image file and convert it to a buffer
    const data = await sharp(path)
      .resize({ width: 500, height: 500 })
      .toBuffer();

    // Get the string representation of the image buffer
    const imageString = data.toString("base64");
    // console.log('Image string:', imageString);
    return imageString;
  } catch (err) {
    console.error(err);
  }
}
async function getPlantData() {
  const prompt = `Dame respuestas para empezar una convercacion con una persona que tiene el tinder bio - me gusta mucho comer y salir a jugar el fut y reir`
  
//  ` How many days of the month should I water plant species philodendron`;


  try {
    // const response = await axios.post('https://api.openai.com/v1/completions', {
    //   model: "text-davinci-003",      
    //   prompt: prompt,
    //   max_tokens: 300,
    //   temperature: 0.1,
    //   n: 1,
    //   stop: ['\n', '.', '!', '?']     
    // }, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Replace with your OpenAI API key
    //   }
    // });
    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: prompt,
      max_tokens: 300,
      temperature: 0.1,
      n: 1,
      // stop: ['\n', '.', '!', '?']
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Replace with your OpenAI API key
      }
    });

    console.log(response)

    const data = response.data?.choices
    console.log(data)
    // const plantData = JSON.parse(data);
    // console.log(plantData);
  } 
    catch (error) {
      res.json(error)
      console.error('Error:', error.response.data.error);
    } 
}

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
  // The uploaded file can be accessed via req.file
  console.log("UPLOADING");
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // You can perform further processing or save the file to a database
  // or return a response with the saved file path or other information

  // Example response with the saved file path
  const filePath = path.join(__dirname, "uploads", req.file.filename);
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
          // Authorization: `Bearer ${apiKey}`
        },
      }
    );
    console.log(response.data.suggestions);
    console.log(response.data.suggestions[0].plant_details)
    console.log(response.data)
    res.json(response.data)
  } catch (error) {
    console.log("ERROR WITH PLANT ID API")
    res.json(error)
    console.log(error)
  }

  // res.json({ filePath });
});
// noinspection JSUnresolvedFunction
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

console.log("Test");
// getPlantData()
// getModels()