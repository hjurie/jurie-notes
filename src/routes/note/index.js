import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import MarkdownRenderer from 'react-markdown-renderer';
import { GET_NOTE } from '../../queries';


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


const Notes = ({ match: { params: { id } }}) =>
<>
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
            </Wrap>
            <MarkdownRenderer
              markdown={data.note.content}
            />
          </>
        ) : null
    }
  </Query>
</>

export default Notes;