const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomName, getRandomThoughts, getRandomEmail } = require('./data'); // Assuming you have a function to generate random email addresses

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  try {
    // Drop existing Thoughts
    await Thought.deleteMany({});

    // Drop existing Users
    await User.deleteMany({});

    // Create empty array to hold the Users
    const users = [];
    
    const thoughts = getRandomThoughts(10);

    // Loop 10 times -- add Users to the Users array
    for (let i = 0; i < 10; i++) {
      let username, email, age;

      // Generate a unique username
      do {
        username = getRandomName();
        // Check if the username already exists in the database
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
          break;
        }
      } while (true);

      // Generate a random email address
      email = getRandomEmail();

      // Generate random age
      age = Math.floor(Math.random() * (60 - 18 + 1) + 18);

      // Create user object
      const user = {
        username,
        email, // Include email in the user object
        age,
        thoughts: thoughts.map(thought => thought._id) // Attach thought IDs to the user
      };

      users.push(user);
    }

    // Insert users into the User collection
    await User.insertMany(users);

    // Insert thoughts into the Thought collection
    await Thought.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    process.exit(0);
  }
});
