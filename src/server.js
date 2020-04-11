const { GraphQLServer } = require('graphql-yoga');
const path = require('path');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-2qe63.mongodb.net/graphql?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Mongo Atlas connected')).catch(err => console.log(err));

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, 'schema.graphql'),
  resolvers,
});

server.start();