import {
  AlphaCard,
  Bleed,
  Box,
  Divider,
  HorizontalGrid,
  Page,
  SkeletonBodyText,
  SkeletonDisplayText,
  VerticalStack,
} from "@shopify/polaris";
import { DuplicateMinor, ViewMinor, DeleteMinor } from "@shopify/polaris-icons";
import React from "react";
import {
  FormEditor,
  OnlineStore,
  SearchEngine,
  Visibility,
} from "../components";

// This example is for guidance purposes. Copying it will come with caveats.
function AddPage() {
  const SkeletonLabel = (props) => {
    return (
      <Box
        background="surface-neutral"
        minHeight="1rem"
        maxWidth="5rem"
        borderRadius="base"
        {...props}
      />
    );
  };
  return (
    <Page backAction={{ content: "Add page", url: "/" }} title="Add page">
      <HorizontalGrid columns={{ xs: 1, md: "2fr 1fr" }} gap="4">
        <VerticalStack gap="4">
          {/* Editor Block */}
          <FormEditor />

          {/* Search engine listing preview */}
          <SearchEngine />
        </VerticalStack>

        <VerticalStack gap={{ xs: "4", md: "2" }}>
          {/* Visibility */}
          <Visibility />

          {/* Online store */}
          <OnlineStore />
        </VerticalStack>
      </HorizontalGrid>
    </Page>
  );
}
export default AddPage;
