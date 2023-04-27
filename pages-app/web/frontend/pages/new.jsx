import { Box, HorizontalGrid, Page, VerticalStack } from "@shopify/polaris";
import { DuplicateMinor, ViewMinor, DeleteMinor } from "@shopify/polaris-icons";
import React, { useEffect, useState } from "react";
import {
  FormEditor,
  OnlineStore,
  SkeletonExample,
  Visibility,
} from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthenticatedFetch } from "@shopify/app-bridge-react";
import { useAppQuery } from "../hooks";

// This example is for guidance purposes. Copying it will come with caveats.
function AddPage() {
  const fetch = useAuthenticatedFetch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState();

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading === true) return <SkeletonExample />;

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
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <HorizontalGrid columns={{ xs: 1, md: "2fr 1fr" }} gap="4">
        <VerticalStack gap="4">
          {/* Editor Block */}
          <FormEditor page={page} />
        </VerticalStack>

        <VerticalStack gap={{ xs: "4", md: "4" }}>
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
