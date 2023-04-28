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

export const TextEditor = ({ body_html, setBody_html }) => {
  const iframeRef = useRef();
  const [showCode, setShowCode] = useState(false);

  const toggleShowCode = () => setShowCode((prev) => setShowCode(!prev));

  const handleHtmlChange = (e) => {
    setBody_html(e.target.innerText);
    console.log(e.target.innerText);
  };

  function handleKeyDown() {
    const iframe = iframeRef.current;
    const iframeDocument =
      iframe.contentDocument || iframe.contentWindow.document;
    const htmlContent = iframeDocument.body.innerHTML;
    console.log(htmlContent);
  }

  const iframeOnLoad = () => {
    const doc =
      iframeRef.current.contentDocument ||
      iframeRef.current.contentWindow.document;
    doc.designMode = "on";
    doc.body.innerHTML = body_html;
    doc.addEventListener("input", () => {
      setBody_html(doc.body.innerHTML);
    });
  };

  useEffect(() => {
    const doc =
      iframeRef.current.contentDocument ||
      iframeRef.current.contentWindow.document;
    doc.designMode = "on";
    doc.body.innerHTML = body_html;
    doc.addEventListener("input", () => {
      setBody_html(doc.body.innerHTML);
    });
    doc.write(
      `<html><head></head><body><p>${body_html ?? ""}</p></body></html>`
    );
  }, []);

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
        {showCode ? (
          <div
            contentEditable
            onInput={handleHtmlChange}
            style={{
              outline: "none",
              padding: 8,
              minHeight: 200,
              whiteSpace: "pre-wrap",
            }}
          >
            {body_html}
          </div>
        ) : (
          // <div
          //   contentEditable
          //   onInput={handleHtmlChange}
          //   style={{
          //     outline: "none",
          //     padding: 8,
          //     minHeight: 200,
          //     whiteSpace: "pre-wrap",
          //   }}
          //   dangerouslySetInnerHTML={{ __html: body_html }}
          // />
          <iframe
            frameBorder="0"
            ref={iframeRef}
            // srcDoc={body_html}
            // onLoad={iframeOnLoad}
            style={{ minHeight: 200 }}
          ></iframe>
        )}

        {/* <div contentEditable style={{ minHeight: 150, padding: 8 }}>
          content
        </div>  */}
      </Box>
    </div>
  );
};
