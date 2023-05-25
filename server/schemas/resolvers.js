const { AuthenticationError } = require("apollo-server-express");
const { User, Plant, Blog } = require("../models");
const { signToken } = require("../utils/auth");
const path = require("path");
const fs = require("fs");
const AWS = require("aws-sdk");
const { uuid } = require("uuidv4");
require("dotenv").config();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();

const uploadImageToS3 = (params) => {
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        console.log("Error uploading image:", err);
        reject(err);
      } else {
        console.log("Image uploaded successfully:", data.Location);
        resolve(data);
      }
    });
  });
};

const uploadImage = async (filePath, fileExtension) => {
  const fileContent = fs.readFileSync(filePath);
  const fileName = uuid();
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${process.env.AWS_BUCKET_FOLDER}/${fileName}${fileExtension}`,
    Body: fileContent,
  };
  console.log(params)
  try {
    const uploadResponse = await uploadImageToS3(params);
    console.log("Upload response:", uploadResponse);
    return uploadResponse.Location;
    // Handle the upload response or perform any additional actions
  } catch (error) {
    console.log("Upload error:", error);
    // Handle the error appropriately
  }
};

const resolvers = {
  Query: {
    allUsers: async () => {
      return User.find().populate("myPlants").populate("myPosts");
    },
    user: async (parent, { username }) => {
      const user = User.findOne({ username })
        .populate("myPlants")
        .populate("myPosts");
        populatedUser.myPlants.forEach((plant) => {
          plant.percentage = plant.get('percentage');
        });
        return populatedUser;
    },
    plant: async (parent, { plantId }) => {
      return Plant.findOne({ _id: plantId });
    },
    allPlants: async () => {
      return Plant.find();
    },
    me: async (parent, args, context) => {
      if (context.user) {
        try {
          const user =await  User.findOne({ _id: context.user._id })
          .populate("myPlants")
          .populate("myPosts").exec();
          user.myPlants.sort((a, b) => a.percentage - b.percentage);
          return user;
            } catch (error) {
          return error;
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    allPosts: async () => {
      return Blog.find().sort({ createdAt: -1 });
    },
    post: async (parent, { postId }) => {
      return Blog.findOne({ _id: postId });
    },
  },

  Mutation: {
    addUser: async (
      parent,
      { firstName, lastName, username, email, password, location }
    ) => {
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        password,
        location,
      });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addPlant: async (
      _,
      { name, nickname, plantType, plantSize, waterNeeded, hasImage },
      context
    ) => {
      var plant;
      console.log("adding a plant!!!!");
      if (context.user) {
        try {
          if (hasImage) {
            const uploadsFolder = path.join(__dirname, "../uploads");
            // Read the files in the uploads folder
            const files = fs.readdirSync(uploadsFolder);
            console.log(files);
            if (files.length > 0) {
              // Get the first file
              const firstFile = files[0];
              const imagePath = `${uploadsFolder}/${firstFile}`;
              const fileExtension = path.extname(firstFile).toLowerCase();
              const imageLink = await uploadImage(imagePath, fileExtension);
              plant = await Plant.create({
                name: name,
                nickname: nickname,
                plantType: plantType,
                plantSize: plantSize,
                waterNeeded: waterNeeded,
                image: imageLink,
              });
            }
          } else {
            plant = await Plant.create({
              name: name,
              nickname: nickname,
              plantType: plantType,
              plantSize: plantSize,
              waterNeeded: waterNeeded,
            });
          }
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { myPlants: plant._id } }
          );
          return plant;
        } catch (error) {
          console.log(error);
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addWater: async (parent, { plantId }, context) => {
      if (context.user) {
        const plant = await Plant.findOne({ _id: plantId });

        return Plant.findOneAndUpdate(
          { _id: plantId },
          {
            $set: {
              waterAdded: plant.waterAdded + 1,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removePlant: async (parent, { plantId }, context) => {
      if (context.user) {
        console.log("DLEETING THIS PLANT!")
        const plant = await Plant.findOneAndDelete({
          _id: plantId,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { myPlants: plantId } }
        );

        return plant;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeWater: async (parent, { plantId }, context) => {
      if (context.user) {
        const plant = await Plant.findOne({ _id: plantId });

        return Plant.findOneAndUpdate(
          { _id: plantId },
          {
            $set: {
              waterAdded: plant.waterAdded - 1,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addPost: async (parent, { postText }, context) => {
      if (context.user) {
        const post = await Blog.create({
          postText: postText,
          postCreator: context.user.username,
        });

        await User.findOneAndUpdate(
          { username: context.user.username },
          { $addToSet: { myPosts: post._id } }
        );

        return post;
      }
      throw new AuthenticationError("Please login to create a post.");
    },
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        return Blog.findOneAndUpdate(
          { _id: postId },
          {
            $addToSet: {
              comments: { commentText, commentCreator: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("Please login to create a comment.");
    },
    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Blog.findOneAndDelete({
          _id: postId,
          postCreator: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { myPosts: post._id } }
        );

        return post;
      }
      throw new AuthenticationError("Please login to delete a post");
    },
    removeComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        return Blog.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("Please login to delete a comment.");
    },
  },
};

// const listObjects = async () => {
//   try {
//     console.log("trying to list s3 objects")
//     const response = await s3.listObjects({ Bucket: process.env.AWS_BUCKET_NAME }).promise();
//     console.log('Objects in the bucket:', response.Contents);
//   } catch (error) {
//     console.error('Error listing objects:', error);
//   }
// };

// // Call the function to list objects in the bucket
// listObjects();

module.exports = resolvers;
