const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Todo @key(fields: "id") {
    id: ID!
    title: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    todos: [Todo]
    todoById(id: String!): Todo
  }

  type Mutation {
    addTodo(title: String!): Todo
    updateTodo(id: String!, title: String!): Todo
    deleteTodo(id: String!): [Todo]
  }
`;

const todos = [
  {
    id: 1,
    title: 'Kerjain PPL',
  },
  {
    id: 2,
    title: 'Kerjain DAA',
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    todos: () => todos,
    todoById : (parent, args, context, info) => {
      return todos.find(todo => todo.id === args.id);
    }
  },
  Mutation: {
    addTodo: (parent, args, context, info) => {
      newTodo = {
        id: notes.length + 1 + '',
        title: args.title,
      }
      todos = [...todos, newTodo]

      return newTodo
    },
    updateTodo: (parent, args, context, info) => {
      todo = todos.find(todo => todo.id === args.id);
      todos = todos.filter(todo => todo.id !== args.id);

      todo.content = args.content

      todos = [
        ...todos,
        todo
      ]

      return todo
    },
    deleteNote: (parent, args, context, info) => {
      todos = todos.filter(todo => todo.id !== args.id);
      return todos
    }, 
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

