import React from "react";
import { useState } from "react";
import styled from "styled-components";
import MarkdownRenderer from "react-markdown-renderer";
import TextareaAutosize from "react-textarea-autosize";


const Editor = (props) => {

  const editDefault = {
    title: props.title || "",
    content: props.content || "",
    id: props.id || "",
  }

  const [edit, setEdit] = useState(editDefault);

  const onInputChange = event => {
    const { target: { value, name } } = event;

    setEdit({
      ...edit,
      [name]: value
    })
  };

  const editSave = () => {
    const { onSave } = props;
    const { title, content, id } = edit;
    onSave(title, content, id);
  };

  const { title, content } = edit;

  return (
    <>
      <TitleContainer>
        <TitleInput
          value={title}
          onChange={onInputChange}
          placeholder={"Untitled..."}
          name={"title"}
        />
        <Button onClick={editSave}>Save</Button>
      </TitleContainer>
      <ContentPreview>
        <ContentInput
          value={content}
          onChange={onInputChange}
          placeholder={"# This supports markdown!"}
          name={"content"}
        />
        <MarkdownRenderer markdown={content} className={"markdown"} />
      </ContentPreview>
    </>
  )
}


const TitleInput = styled(TextareaAutosize)`
  font-size: 50px;
  font-weight: 600;
  width: 100%;
  &::placeholder {
    font-weight: 600;
  }
`;

const ContentPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;
`;

const ContentInput = styled(TextareaAutosize)`
  font-size: 18px;
  margin-top: 15px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const Button = styled.button``;


export default Editor;