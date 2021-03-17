const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Note @key(fields: "id") {
    id: ID!
    title: String
    content: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    notes: [Note]
    noteById(id: String!): Note
  }

  type Mutation {
    addNote(title: String!, content: String!): Note
    updateNoteContent(id: String!, content: String!): Note
    deleteNote(id: String!): [Note]
  }
`;

let notes = [
  {
    id: "1",
    title: 'PPL',
    content: 'jangan lupa beberapa hari lagi induvidual review'
  },
  {
    id: "2",
    title: 'DAA',
    content: 'bentar lagi ujian 1'
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    notes: () => notes,
    noteById : (parent, args, context, info) => {
      return notes.find(note => note.id === args.id);
    }
  },
  Mutation: {
    addNote: (parent, args, context, info) => {
      newNotes = {
        id: notes.length + 1 + '',
        title: args.title,
        content: args.content
      }
      notes = [...notes, newNotes]

      return newNotes
    },
    updateNoteContent: (parent, args, context, info) => {
      note = notes.find(note => note.id === args.id);
      notes = notes.filter(note => note.id !== args.id);

      note.content = args.content

      notes = [
        ...notes,
        note
      ]

      return note
    },
    deleteNote: (parent, args, context, info) => {
      notes = notes.filter(note => note.id !== args.id);
      return notes
    }, 
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

// The `listen` method launches a web server.
server.listen(4001).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

