const db = require('../config/connection');
const { User, Plant, Blog } = require('../models');
const userSeeds = require('./userSeeds.json');
const plantSeeds = require('./plantSeeds.json');
const blogSeeds = require('./blogSeeds.json');

db.once('open', async () => {
  try{
  // await Blog.deleteMany({});
  await Plant.deleteMany({});
  await User.deleteMany({});
  await User.create(userSeeds);
  // await Blog.create(blogSeeds);

  for (let i = 0; i < plantSeeds.length; i++) {
      const { _id } = await Plant.create(plantSeeds[i]);
      const user = await User.findOneAndUpdate(
        { email: "bkernighan@techfriends.dev" },
        {
          $addToSet: {
            myPlants: _id,
          },
        }
      );
    }
  for (let i = 0; i < blogSeeds.length; i++) {
      const { _id } = await Blog.create(blogSeeds[i]);
      const user = await User.findOneAndUpdate(
        { email: "bkernighan@techfriends.dev" },
        {
          $addToSet: {
            myPosts: _id,
          },
        }
      );
    }
  } catch(err){
    console.log(err)
    process.exit(1)
  }

  console.log('all done!');
  process.exit(0);
});
