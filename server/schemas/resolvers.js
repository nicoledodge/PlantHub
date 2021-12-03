const { AuthenticationError } = require('apollo-server-express');
const { User, Plant, Blog } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    allUsers: async () => {
      return User.find().populate('myPlants');
// Test query to make sure this works
      // query user{
      //   allUsers{
      //     _id
      //     lastName
      //     firstName
      //     myPlants{
      //       _id
      //       name
      //       waterNeeded
      //       waterAdded
      //     }
      //     }
      //   }
    },
    user: async (parent, { email }) => {
      return User.findOne({ email }).populate('myPlants');
      // Test query to make sure it works
      // query User($email: String!) {
      //   user(email: $email) {
      //     _id
      //     firstName
      //     lastName
      //     email
      //     myPlants {
      //       _id
      //       name
      //       waterAdded
      //       waterNeeded
      //     }
      //   }
      // }
    },
    plant: async (parent, { plantId }) => {
      return Plant.findOne({ _id: plantId });
    },
    allPlants: async () => {
      return Plant.find();
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('myPlants');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // blog posts
    allPosts: async () => {
      return Blog.find().sort({ createdAt: -1 });
    },

    post: async (parent, { postId }) => {
      return Blog.findOne({ _id: postId });
    },
  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password }) => {
      const user = await User.create({ firstName, lastName, email, password });
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
    // test the route by specifying an ID, and not using context.user for verification
    addPlantTest: async (parent, { name, waterNeeded },  ) => {
    {
      // hardcoded query
      // mutation {
      //   addPlantTest(name: "example2", waterNeeded: 2000){
      //     _id
      //     name
      //     waterNeeded
      // }
      // }
        const plant = await Plant.create({name,waterNeeded});
        console.log(plant)

        await User.findOneAndUpdate(
          { _id: "INSERT THE RIGHT ID HERE"},
          { $addToSet: { myPlants: plant._id}}
        );

        return plant;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addPlant: async (parent, { name, waterNeeded }, context ) => {
      if (context.user) {
        const plant = await Plant.create({
          name: name,
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
    // hardcoded addWater Test without Auth
    addWaterTest: async (parent, { plantId, waterAdded }, ) => {
      {
        // find a plant and hardcode the id with query:
        // mutation {
        //   addWaterTest(plantId:"INSERT THE RIGHT ID HERE", waterAdded: 1){
        //     _id
        //     name
        //     waterAdded
        //     waterNeeded
        // }
        // }
        const plant = await Plant.findOne({_id: plantId})
        
        return Plant.findOneAndUpdate(
          { _id: plantId },
          {
            $set: {
              waterAdded: plant.waterAdded + waterAdded,
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
    addWater: async (parent, { plantId, waterAdded }, context) => {
      if (context.user) {
        const plant = await Plant.findOne({_id: plantId})

        return Plant.findOneAndUpdate(
          { _id: plantId },
          {
            $set: {
              waterAdded: plant.waterAdded + waterAdded,
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
          { $pull: { myPlants: plant._id } }
        );

        return plant;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // Remove Plant Test route without context.user
    removePlantTest: async (parent, { plantId }) => {
    {
      // mutation {
      //   removePlantTest(plantId:"INSERT YOUR OWN ID HERE"){
      //     _id
      //     name
      //     waterAdded
      //     waterNeeded
      // }
      // }

        const plant = await Plant.findOneAndDelete({
          _id: plantId,
        });

        await User.findOneAndUpdate(
          { _id: "INSERT YOUR OWN ID HERE"},
          { $pull: { myPlants: plant._id } }
        );

        return plant;
      }
      throw new AuthenticationError('You need to be logged in!');
    },    
    removeWater: async (parent, { plantId, lessWater }, context) => {
      if (context.user) {
        const plant = await Plant.findOne({_id: plantId})

        return Plant.findOneAndUpdate(
          { _id: thoughtId },
          {
            $set: {
              waterAdded: plant.waterAdded - lessWater,
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // removeWaterTest: async (parent, { plantId, waterAdded }) => {
    //  {
    //   // mutation {
    //   //   removeWaterTest(plantId:"ENTER YOUR OWN PLANT ID", waterAdded:-1){
    //   //     _id
    //   //     name
    //   //     waterAdded
    //   //     waterNeeded
    //   // }
    //   // }

    //     const plant = await Plant.findOne({_id: plantId})

    //     return Plant.findOneAndUpdate(
    //       { _id: plantId },
    //       {
    //         $set: {
    //           waterAdded: plant.waterAdded + waterAdded,
    //         },
    //       },
    //       { new: true }
    //     );
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    //blog posts
      addPost: async (parent, { postText, postCreator }, context) => {
        if (context.user) {
          const post = await Blog.create({
            postText: postText,
            postCreator: postCreator
          });
  
          await User.findOneAndUpdate(
            { _id: context.user._id},
            { $addToSet: { myPosts: post._id } }
          );

          return post;
        }
        throw new AuthenticationError('Please login to create a post.');
      },
      
      addComment: async (parent, { postId, commentText }, context) => {
        if (context.user) {
          const comment = await Blog.findOne({_id: postId})
      
          return Blog.findOneAndUpdate(
            { _id: postId },
            { $addToSet: { comment: comment.commentText } },
            {
              new: true,
              runValidators: true,
            }
          );
        }
        throw new AuthenticationError('Please login to create a comment.');
      },
    },
};

module.exports = resolvers;
