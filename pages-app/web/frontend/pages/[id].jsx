import { Box, HorizontalGrid, Page, VerticalStack } from "@shopify/polaris";
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
  return (
    <Page
      backAction={{ content: "Add page", url: "/" }}
      title="Add page"
      secondaryActions={[
        {
          content: "Duplicate",
          icon: DuplicateMinor,
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Duplicate action"),
        },
        {
          content: "View page",
          icon: ViewMinor,
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Archive action"),
        },
        {
          content: "Delete",
          icon: DeleteMinor,
          destructive: true,
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Delete action"),
        },
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
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
