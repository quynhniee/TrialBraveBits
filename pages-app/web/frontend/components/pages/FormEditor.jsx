import {
  AlphaCard,
  FormLayout,
  TextField,
  VerticalStack,
} from "@shopify/polaris";
import React, { useState } from "react";
import { TextEditor } from "./TextEditor";

export const FormEditor = () => {
  const [title, setTitle] = useState();
  return (
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
          {/* <TextField
            type="text"
            label="Content"
            onChange={(e) => {
              setContent(e);
              console.log(e);
            }}
            verticalContent={<p>124</p>}
            value={content}
            multiline={4}
          /> */}
          <TextEditor />
        </FormLayout>
      </VerticalStack>
    </AlphaCard>
  );
};
