import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GET_NOTES } from '../../queries';



const Header = styled.header`
  position: relative;
  padding: 20px;
`;

const Title = styled.h1`
  position: relative;
  font-size: 34px;
`;

const Subtitle = styled.h2`
  font-size: 20px;
`;

const Middle = styled.div`
  position: relative;
`;

const Note = styled.div`
  padding: 10px;
  padding-left: 5px;
  transition: background-color 0.1s linear;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 10px;
  &:hover {
    background-color: #eee;
  }
`;

const NoteTitle = styled.span`
  padding-bottom: 5px;
  font-weight: 600;
  font-size: 20px;
`;


const Notes = () => (
  <>
    <Header>
      <Title>
        Ju-rie Notes
        <Link to={'/add'}>+</Link>
      </Title>
      <Subtitle>Talking notes while we learn.</Subtitle>
    </Header>
    <Middle>
        <Query query={GET_NOTES}>
          {({ data }) => 
            data.notes
              && data.notes.map(note => (
                  <Link to={`/note/${note.id}`} key={note.id}>
                    <Note>{note.title}</Note>
                  </Link>
                ))
          }
        </Query>
    </Middle>
  </>
)

export default Notes;