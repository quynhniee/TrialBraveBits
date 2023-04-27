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
  Tooltip,
  VerticalStack,
} from "@shopify/polaris";
import { EmbedMinor } from "@shopify/polaris-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaAlignLeft,
  FaOutdent,
  FaIndent,
} from "react-icons/fa";

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

export const TextEditor = ({ body_html }) => {
  const iframeRef = useRef();

  useEffect(() => {
    const doc =
      iframeRef.current.contentDocument ||
      iframeRef.current.contentWindow.document;
    doc.designMode = "on";
    doc.write(
      `<html><head></head><body><p>${body_html ?? ""}</p></body></html>`
    );
  }, []);

  return (
    <div>
      <Text>Content</Text>
      <Box borderWidth="1" borderRadius="1" borderColor="border">
        <Box padding="2">
          <HorizontalStack align="space-between">
            <HorizontalStack gap="2">
              <ButtonGroup segmented>
                <Tooltip content="Bold" dismissOnMouseOut>
                  <Button size="slim" onClick={handleBoldClick}>
                    <FaBold />
                  </Button>
                </Tooltip>
                <Tooltip content="Italic" dismissOnMouseOut>
                  <Button size="slim" onClick={handleItalicClick}>
                    <FaItalic />
                  </Button>
                </Tooltip>
                <Tooltip content="Underline" dismissOnMouseOut>
                  <Button size="slim" onClick={handleUnderlineClick}>
                    <FaUnderline />
                  </Button>
                </Tooltip>
              </ButtonGroup>

              <ButtonGroup segmented>
                <Tooltip content="Outdent" dismissOnMouseOut>
                  <Button size="slim">
                    <FaOutdent />
                  </Button>
                </Tooltip>
                <Tooltip content="Indent" dismissOnMouseOut>
                  <Button size="slim">
                    <FaIndent />
                  </Button>
                </Tooltip>
              </ButtonGroup>
            </HorizontalStack>
            <Button size="slim">
              <Icon source={EmbedMinor} color="base" />
            </Button>
          </HorizontalStack>
        </Box>
        <Divider />
        <iframe frameBorder="0" ref={iframeRef}></iframe>
        {/* <div contentEditable style={{ minHeight: 150, padding: 8 }}>
          content
        </div>  */}
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
