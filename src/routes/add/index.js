import React from "react";
import { useMutation } from 'react-apollo-hooks';
import gql from "graphql-tag";
import Editor from "../../components/editor";

const ADD_NOTE = gql`
  mutation createNote($title: String!, $content: String!) @client {
    createNote(title: $title, content: $content) {
      id
    }
  }
`;

const Add = ({ history: { push } }) => {

  const addNote = useMutation(ADD_NOTE);

  const onSave = (title, content) => {
    if (title !== "" && content !== "") {
      addNote({ variables: { title, content }});
      push("/");
    }
  };

  return (
    <Editor onSave = {onSave} />
  )
}

export default Add;