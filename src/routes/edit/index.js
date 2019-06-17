import React from "react";
import { Query } from 'react-apollo';
import { useMutation } from 'react-apollo-hooks';
import gql from "graphql-tag";
import { GET_NOTE } from '../../queries';
import Editor from "../../components/editor";

const EDIT_NOTE = gql`
  mutation editNote($id: Int!, $title: String!, $content: String!) @client {
    editNote(id: $id, title: $title, content: $content) {
      id
    }
  }
`;

const Edit = ({ match: { params: { id } }, history: { push } }) => {
  const editNote = useMutation(EDIT_NOTE);
  const onSave = (title, content, id) => {
    if (title !== "" && content !== "") {
      editNote({ variables: { title, content, id }});
      push("/");
    }
  };

  return (
    <Query query={GET_NOTE} variables={{id}}>
      {
        ({data}) => 
          data.note ? (
            <Editor
              id={data.note.id}
              title={data.note.title}
              content={data.note.content}
              onSave={onSave}
            />
          ) : null
      }
    </Query>
  )
}

export default Edit;