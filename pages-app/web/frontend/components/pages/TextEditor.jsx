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
  };

  const onClick = (tag) => {
    const selection = iframeRef.current.contentWindow.getSelection();
    const doc =
      iframeRef.current.contentDocument || iframeRef.current.content.document;

    const range = selection.getRangeAt(0)?.cloneRange();
    const firstSelectionTag = document.createElement("selected-element");

    firstSelectionTag.appendChild(range.extractContents());
    range.insertNode(firstSelectionTag);
    let content = doc.body.innerHTML;
    const selected = doc.querySelector("selected-element");

    // const regex = new RegExp(`<(/?|\\!?)[(strong)(em)(u)].*?>`, "g");
    const regex = new RegExp(`<(/?|\\!?)${tag}.*?>`, "g");
    // const regex2 = new RegExp(`<${tag}>.*?<\/${tag}>`, "g");
    const regex2 = new RegExp(
      `^<${tag}>.*<\/${tag}>(<${tag}>.*<\/${tag}>)*$`,
      "g"
    );

    // Trường hợp ở bên trong 1 thẻ giống nó
    if (selected.parentElement.tagName === tag.toUpperCase()) {
      let outerHTML = selected.outerHTML;
      content = content.replace(
        outerHTML,
        `</${tag}>${outerHTML.replaceAll(regex, "")}<${tag}>`
      );
    } else if (regex2.test(selected.innerHTML)) {
      // Bên trong chứa toàn thẻ con giống nó
      let outerHTML = selected.outerHTML;
      content = content.replace(
        outerHTML,
        `${outerHTML.replaceAll(regex, "")}`
      );
    } else {
      let outerHTML = selected.outerHTML;
      content = content.replace(
        outerHTML,
        `<${tag}>${outerHTML.replaceAll(regex, "")}</${tag}>`
      );
    }

    content = content.replaceAll(/<(\/?|\!?)selected-element.*?>/g, "");
    doc.body.innerHTML = content;
    updateInnerHTML();
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
  }, [showCode]);

  const TextFormatButtonGroup = () => (
    <HorizontalStack gap="2">
      <ButtonGroup segmented>
        <Tooltip content="Bold" dismissOnMouseOut>
          <Button size="slim" onClick={() => onClick("strong")}>
            <FaBold />
          </Button>
        </Tooltip>
        <Tooltip content="Italic" dismissOnMouseOut>
          <Button size="slim" onClick={() => onClick("em")}>
            <FaItalic />
          </Button>
        </Tooltip>
        <Tooltip content="Underline" dismissOnMouseOut>
          <Button size="slim" onClick={() => onClick("u")}>
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
