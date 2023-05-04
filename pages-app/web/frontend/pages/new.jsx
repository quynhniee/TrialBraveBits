import {
  Badge,
  ContextualSaveBar,
  HorizontalGrid,
  Page,
  PageActions,
  Toast,
  VerticalStack,
} from "@shopify/polaris";
import React, { useState } from "react";
import {
  FormEditor,
  OnlineStore,
  SkeletonExample,
  Visibility,
} from "../components";
import { useNavigate } from "react-router-dom";
import { useAuthenticatedFetch } from "@shopify/app-bridge-react";
import { getUrl } from "../utils/preview";

function AddPage() {
  const fetch = useAuthenticatedFetch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState();
  const [visibility, setVisibility] = useState("visible");
  const [activeToast, setActiveToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");
  const [activeSaveBar, setActiveSaveBar] = useState(false);
  const [title, setTitle] = useState();
  const [body_html, setBody_html] = useState();
  const [isError, setIsError] = useState();

  const toggleActiveToast = () => setActiveToast((activeToast) => !activeToast);

  const toastMarkup = activeToast ? (
    <Toast content={messageToast} onDismiss={toggleActiveToast} />
  ) : null;

  const handleCreatePage = () => {
    if (!title || title.trim() === "") {
      setIsError(true);
    } else {
      setIsError();
      const updatedData = {
        title: title,
        body_html: body_html,
        published: visibility !== "visible" ? null : true,
      };
      setLoading(true);
      console.log(updatedData);
      fetch("/api/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          console.log("OKE");

          setTimeout(() => {
            navigate(`/${data.id}`);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const saveAction = () => {
    handleCreatePage();
    setActiveSaveBar(false);
  };

  const discardAction = () => {
    navigate("/");
  };

  const saveBar = (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: saveAction,
        disabled: !activeSaveBar,
      }}
      discardAction={{
        onAction: discardAction,
      }}
    />
  );

  if (loading === true) return <SkeletonExample />;
  return (
    <Page backAction={{ content: "Add page", url: "/" }} title={"Add page"}>
      <HorizontalGrid columns={{ xs: 1, md: "2fr 1fr" }} gap="4">
        <VerticalStack gap="4">
          {/* Editor Block */}
          <FormEditor
            page={page}
            setActiveSaveBar={setActiveSaveBar}
            title={title}
            setTitle={setTitle}
            body_html={body_html}
            setBody_html={setBody_html}
            isError={isError}
          />
        </VerticalStack>

        <VerticalStack gap={{ xs: "4", md: "4" }}>
          {/* Visibility */}
          <Visibility
            dateString={page?.published_at}
            visibility={visibility}
            setVisibility={setVisibility}
            setActiveSaveBar={setActiveSaveBar}
          />

          {/* Online store */}
          <OnlineStore />
        </VerticalStack>
      </HorizontalGrid>
      <br />
      <PageActions
        primaryAction={{
          content: "Save",
          disabled: !activeSaveBar,
          onAction: saveAction,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            outline: true,
            onAction: () => navigate("/"),
          },
        ]}
      />
      {toastMarkup}

      {saveBar}
    </Page>
  );
}
export default AddPage;
