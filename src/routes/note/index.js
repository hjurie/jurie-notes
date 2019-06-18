import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { useMutation } from 'react-apollo-hooks';
import gql from "graphql-tag";
import styled from 'styled-components';
import MarkdownRenderer from 'react-markdown-renderer';
import { GET_NOTE } from '../../queries';


const DELETE_NOTE = gql`
  mutation deleteNote($id: Int!) @client {
    deleteNote(id: $id) {
      id
    }
  }
`;


const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 50px;
`;

const Button = styled.button``;


const Notes = ({ match: { params: { id } }, history: { push } }) => {

  const deleteNote = useMutation(DELETE_NOTE);
  const delNote = () => {

    if (id) {
      deleteNote({ variables: { id }});
      push("/");
    }
  };

  return (
    <Query query={GET_NOTE} variables={{id}}>
      {
        ({data}) => 
          data.note ? (
            <>
              <Wrap>
                <Title>{data.note.title}</Title>
                <Link to={`/edit/${data.note.id}`}>
                  <Button>Edit</Button>
                </Link>
                <Button onClick={() => delNote()}>Delete</Button>
              </Wrap>
              <MarkdownRenderer
                markdown={data.note.content}
              />
            </>
          ) : null
      }
    </Query>
  )
}

export default Notes;