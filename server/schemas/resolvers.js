const { AuthenticationError } = require('apollo-server-express');
const { User, Plant, Blog } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    allUsers: async () => {
      return User.find().populate('myPlants').populate('myPosts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('myPlants').populate('myPosts');
    },
    plant: async (parent, { plantId }) => {
      return Plant.findOne({ _id: plantId });
    },
    allPlants: async () => {
      return Plant.find();
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('myPlants').populate('myPosts');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    allPosts: async () => {
      return Blog.find().sort({ createdAt: -1 });
    },
    post: async (parent, { postId }) => {
      return Blog.findOne({ _id: postId });
    },
  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, username, email, password, location }) => {
      const user = await User.create({ firstName, lastName, username, email, password, location });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addPlant: async (parent, { name, nickname, plantType, plantSize, waterNeeded }, context ) => {
      if (context.user) {
        const plant = await Plant.create({
          name: name,
          nickname: nickname,
          plantType: plantType,
          plantSize: plantSize,
          waterNeeded: waterNeeded
        });

        await User.findOneAndUpdate(
          { _id: context.user._id},
          { $addToSet: { myPlants: plant._id } }
        );

        return plant;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addWater: async (parent, { plantId}, context ) => {
      if (context.user){
        const plant = await Plant.findOne({_id: plantId})

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
      throw new AuthenticationError('You need to be logged in!');
    },
    removePlant: async (parent, { plantId }, context) => {
      if (context.user) {
        const plant = await Plant.findOneAndDelete({
          _id: plantId,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { myPlants: plantId } }
        );

        return plant;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeWater: async (parent, { plantId}, context ) => {
      if (context.user){
        const plant = await Plant.findOne({_id: plantId})

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
      throw new AuthenticationError('You need to be logged in!');
    },
      addPost: async (parent, { postText }, context) => {
        if (context.user) {
          const post = await Blog.create({
            postText: postText,
            postCreator: context.user.username
          });
  
          await User.findOneAndUpdate(
            { username: context.user.username},
            { $addToSet: { myPosts: post._id } }
          );

          return post;
        }
        throw new AuthenticationError('Please login to create a post.');
      },
      addComment: async (parent, { postId, commentText }, context) => {
      if (context.user){
          return Blog.findOneAndUpdate(
            { _id: postId },
            { $addToSet: {
              comments: { commentText, commentCreator: context.user.username},
            }, 
           },
            {
              new: true,
              runValidators: true,
            }
          );
        }
        throw new AuthenticationError('Please login to create a comment.');
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
         throw new AuthenticationError('Please login to delete a post');
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
        throw new AuthenticationError('Please login to delete a comment.');
      },
    },
  };

module.exports = resolvers;
