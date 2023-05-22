const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const multer = require('multer');
const PORT = process.env.PORT || 3001;

const app = express();

// Set up the file upload destination
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Change the 'uploads' directory as needed
  },
  filename: (req, file, cb) => {
    // Generate a unique file name by adding a timestamp
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Serve up static assets
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
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
  schemaHash: '111',
});



server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.post('/api/upload', upload.single('image'), (req, res) => {
  // The uploaded file can be accessed via req.file
  console.log("UPLOADING")
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // You can perform further processing or save the file to a database
  // or return a response with the saved file path or other information

  // Example response with the saved file path
  const filePath = path.join(__dirname, 'uploads', req.file.filename);
  res.json({ filePath });
});
// noinspection JSUnresolvedFunction
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

console.log("Test")