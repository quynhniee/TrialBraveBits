import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  HorizontalStack,
  Icon,
  LegacyCard,
  Text,
  TextField,
  VerticalStack,
} from "@shopify/polaris";
import { EmbedMinor } from "@shopify/polaris-icons";
import React, { useState } from "react";

const handleBoldClick = () => {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const boldElement = document.createElement("strong");
  boldElement.textContent = selection.toString();
  range.deleteContents();
  range.insertNode(boldElement);
};

const handleItalicClick = () => {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const italicElement = document.createElement("em");
  italicElement.textContent = selection.toString();
  range.deleteContents();
  range.insertNode(italicElement);
};

const handleUnderlineClick = () => {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const underlineElement = document.createElement("u");
  underlineElement.textContent = selection.toString();
  range.deleteContents();
  range.insertNode(underlineElement);
};

export const TextEditor = () => {
  const [content, setContent] = useState();

  return (
    <div>
      <Text>Content</Text>
      <Box borderWidth="1" borderRadius="1" borderColor="border">
        <Box padding="2">
          <HorizontalStack align="space-between">
            <ButtonGroup segmented>
              <Button onClick={handleBoldClick}>
                <strong>B</strong>
              </Button>
              <Button onClick={handleItalicClick}>
                <em>I</em>
              </Button>
              <Button onClick={handleUnderlineClick}>
                <u>U</u>
              </Button>
            </ButtonGroup>
            <Button>
              <Icon source={EmbedMinor} color="base" />
            </Button>
          </HorizontalStack>
        </Box>
        <Divider />
        <div contentEditable style={{ minHeight: 150, padding: 8 }}>
          content
        </div>
        {/* <TextField
          type="text"
          onChange={(e) => {
            setContent(e);
            console.log(e);
          }}
          value={content}
          multiline={4}
          borderless
          id="content"
          inputMode="text"
          monospaced
        /> */}
      </Box>
    </div>
  );
};
