import {
  Badge,
  Box,
  ContextualSaveBar,
  Frame,
  HorizontalGrid,
  Page,
  PageActions,
  Toast,
  VerticalStack,
} from "@shopify/polaris";
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
import ConfirmModal from "../components/pages/ConfirmModal";
import { getUrl } from "../utils/preview";

// This example is for guidance purposes. Copying it will come with caveats.
function AddPage() {
  const { id } = useParams();
  const fetch = useAuthenticatedFetch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState();
  const [visibility, setVisibility] = useState("");
  const [activeModal, setActiveModal] = useState(false);
  const [activeToast, setActiveToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");
  const [activeSaveBar, setActiveSaveBar] = useState(false);

  const { data, refetch } = useAppQuery({
    url: `/api/pages?id=${id}`,
    reactQueryOptions: {
      onSuccess: (data) => {
        console.log(data);
        setLoading(false);
        setPage(data);
        setVisibility(data.published_at);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  });

  const bulkDelete = async () => {
    setLoading(true);
    console.log(id.split(","));
    const res = await fetch(`/api/pages?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setActiveModal(false);
      setLoading(false);
      setMessageToast(`Page was deleted.`);
      toggleActiveToast();
      navigate("/");
    } else {
      console.log("NOT OK");
    }
  };

  const toggleActiveToast = () => setActiveToast((activeToast) => !activeToast);

  const toastMarkup = activeToast ? (
    <Toast content={messageToast} onDismiss={toggleActiveToast} />
  ) : null;

  const saveBar = activeSaveBar ? (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: () => {
          alert("Saved");
          refetch();
          setActiveSaveBar(false);
        },
      }}
      discardAction={{
        onAction: () => {
          setLoading(true);
          setActiveSaveBar(false);
          refetch().then(() => setLoading(false));
        },
      }}
    />
  ) : null;

  if (loading === true) return <SkeletonExample />;
  return (
    <Page
      backAction={{ content: "Add page", url: "/" }}
      title={page?.title}
      titleMetadata={page?.published_at ? null : <Badge>Hidden</Badge>}
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
          url: getUrl(page?.title),
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
          <FormEditor page={page} setActiveSaveBar={setActiveSaveBar} />
        </VerticalStack>

        <VerticalStack gap={{ xs: "4", md: "4" }}>
          {/* Visibility */}
          <Visibility />

          {/* Online store */}
          <OnlineStore />
        </VerticalStack>
      </HorizontalGrid>
      <br />
      <PageActions
        primaryAction={{
          content: "Save",
          disabled: true,
        }}
        secondaryActions={[
          {
            content: "Delete page",
            destructive: true,
            outline: true,
            onAction: () => setActiveModal(true),
          },
        ]}
      />
      {toastMarkup}
      <ConfirmModal
        active={activeModal}
        setActive={setActiveModal}
        pagesNumber={1}
        primaryAction={() => {
          bulkDelete();
        }}
      />
      {saveBar}
    </Page>
  );
}
export default AddPage;
