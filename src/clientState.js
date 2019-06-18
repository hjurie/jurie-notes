import { NOTE_FRAGMENT } from "./fragments";
import { GET_NOTES } from "./queries";
import { saveNotes, restoreNotes } from "./offline";

export const defaults = {
  notes: restoreNotes()
};
export const typeDefs = [
  `
  schema {
    query: Query
    mutation: Mutation
  }
  type Query {
    notes: [Note]!
    note(id: Int!): Note
  }
  type Mutation {
    createNote(title: String!, content: String!): Note
    editNote(id: Int!, title: String, content: String): Note
    deleteNote(id: Int!): Note
  }
  type Note {
    id: Int!
    title String!
    content: String!
  }
  `
];
export const resolvers = {
  Query: {
    note: (_, variables, { cache }) => {
      const id = cache.config.dataIdFromObject({
        __typename: "Note",
        id: variables.id
      });

      const note = cache.readFragment({
        fragment: NOTE_FRAGMENT, id
      });

      return note;
    }
  },
  Mutation: {
    createNote: (_, variables, { cache }) => {
      const { notes } = cache.readQuery({ query: GET_NOTES })
      const { title, content } = variables;
      const newNote = {
        __typename: "Note",
        title,
        content,
        id: notes.length === 0 ? 1 : Number(notes[0].id) + 1
      };

      cache.writeData({
        data: {
          notes: [newNote, ...notes]
        }
      });
      saveNotes(cache);
      return newNote;
    },
    editNote: (_, { id, title, content }, { cache }) => {
      const noteId = cache.config.dataIdFromObject({
        __typename: "Note",
        id
      });

      const note = cache.readFragment({
        fragment: NOTE_FRAGMENT,
        id: noteId,
      });
      const updateNote = {
        ...note,
        title,
        content
      }
      cache.writeFragment({
        id: noteId,
        fragment: NOTE_FRAGMENT,
        data: updateNote
      });
      saveNotes(cache);
      return updateNote;
    },
    deleteNote: (_, { id }, { cache }) => {

      const { notes } = cache.readQuery({ query: GET_NOTES });

      const updateNote = notes.filter(note => note.id !== Number(id));
      const deleteNote = notes.filter(note => note.id === id);

      cache.writeData({
        data: {
          notes: updateNote
        }
      });

      saveNotes(cache);
      return deleteNote;
    }
  }
};
