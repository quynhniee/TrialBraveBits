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

export const TextEditor = ({ body_html, setBody_html }) => {
  const iframeRef = useRef();
  const [showCode, setShowCode] = useState(false);

  const toggleShowCode = () => {
    setShowCode((prev) => setShowCode(!prev));
  };

  const updateInnerHTML = () => {
    const doc =
      iframeRef.current.contentDocument || iframeRef.current.content.document;
    setBody_html(doc.body.innerHTML);
    return doc.body.innerHTML;
  };

  const handleBoldClick = () => {
    const selection = iframeRef.current.contentWindow.getSelection();
    const range = selection.getRangeAt(0);

    const boldElement = document.createElement("strong");
    boldElement.textContent = selection.toString();
    range.deleteContents();
    range.insertNode(boldElement);

    // const anchorNode = selection.anchorNode.parentElement;
    // const tagNameAnchorNode = anchorNode.tagName.toString();

    // console.log(tagNameAnchorNode);

    // let node;

    // switch (tagNameAnchorNode) {
    //   case "EM":
    //     node = document.createElement("em");
    //     break;
    //   case "U":
    //     node = document.createElement("u");
    //     break;
    //   default:
    // }

    // const boldElement = document.createElement("strong");
    // boldElement.textContent = selection.toString();

    // if (node) {
    //   node.appendChild(boldElement);
    // } else {
    //   node = boldElement;
    // }

    // range.deleteContents();
    // range.insertNode(node);

    console.log(updateInnerHTML());
  };

  const handleItalicClick = () => {
    const selection = iframeRef.current.contentWindow.getSelection();
    const range = selection.getRangeAt(0);
    const italicElement = document.createElement("em");
    italicElement.textContent = selection.toString();
    range.deleteContents();
    range.insertNode(italicElement);
  };

  const handleUnderlineClick = () => {
    const selection = iframeRef.current.contentWindow.getSelection();
    const range = selection.getRangeAt(0);
    const underlineElement = document.createElement("u");
    underlineElement.textContent = selection.toString();
    range.deleteContents();
    range.insertNode(underlineElement);
  };

  useEffect(() => {
    if (showCode === true) return;
    const doc =
      iframeRef.current.contentDocument || iframeRef.current.content.document;
    doc.designMode = "on";
    doc.body.innerHTML = body_html ?? "";
    doc.addEventListener("input", () => {
      setBody_html(doc.body.innerHTML);
    });
    // doc.write(
    //   `<html><head></head><body><p>${body_html ?? ""}</p></body></html>`
    // );
  }, [showCode]);

  const TextFormatButtonGroup = () => (
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
  );

  return (
    <div>
      <Text>Content</Text>
      <Box borderWidth="1" borderRadius="1" borderColor="border">
        <Box padding="2">
          <HorizontalStack align="space-between">
            {showCode ? <div></div> : <TextFormatButtonGroup />}
            <Tooltip content="Show HTML" dismissOnMouseOut>
              <Button size="slim" onClick={toggleShowCode}>
                <Icon source={EmbedMinor} color="base" />
              </Button>
            </Tooltip>
          </HorizontalStack>
        </Box>
        <Divider />
        <textarea
          style={{
            minHeight: 200,
            outline: "none",
            width: "100%",
            border: "none",
            display: showCode === true ? "" : "none",
          }}
          value={body_html}
          onChange={(e) => setBody_html(e.target.value)}
        ></textarea>
        <iframe
          frameBorder="0"
          ref={iframeRef}
          // srcDoc={body_html}
          // onLoad={iframeOnLoad}
          style={{ minHeight: 200, display: showCode !== true ? "" : "none" }}
          onChange={(e) => console.log("change")}
        ></iframe>
      </Box>
    </div>
  );
};
