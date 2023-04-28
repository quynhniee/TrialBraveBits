import {
  AlphaCard,
  FormLayout,
  TextField,
  VerticalStack,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { TextEditor } from "./TextEditor";
import { SearchEngine } from "./SearchEngine";

export const FormEditor = ({ page, setActiveSaveBar }) => {
  const [title, setTitle] = useState(page?.title);
  const [body_html, setBody_html] = useState(page?.body_html);

  useEffect(() => {
    if (title === page?.title && body_html === page?.body_html)
      setActiveSaveBar(false);
    else setActiveSaveBar(true);
  }, [title, body_html]);

  return (
    <>
      <AlphaCard roundedAbove="sm">
        <VerticalStack gap="4">
          <FormLayout>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => {
                setTitle(e);
              }}
              autoComplete="off"
              placeholder="e.g. Contact us, Sizing chart, FAQs"
            />
            <TextEditor
              body_html={body_html}
              setBody_html={setBody_html}
              setActiveSaveBar={setActiveSaveBar}
            />
          </FormLayout>
        </VerticalStack>
      </AlphaCard>
      <SearchEngine title={title} body_html={body_html} />
    </>
  );
};
