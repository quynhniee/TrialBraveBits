import {
  Badge,
  ContextualSaveBar,
  HorizontalGrid,
  Page,
  PageActions,
  Toast,
  VerticalStack,
} from "@shopify/polaris";
import { DuplicateMinor, ViewMinor } from "@shopify/polaris-icons";
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
import DiscardModal from "../components/pages/DiscardModal";
import DuplicateModal from "../components/pages/DuplicateModal";

function AddPage() {
  const { id } = useParams();
  const fetch = useAuthenticatedFetch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState();
  const [visibility, setVisibility] = useState("hidden");
  const [activeConfirmModal, setActiveConfirmModal] = useState(false);
  const [activeDiscardModal, setActiveDiscardModal] = useState(false);
  const [activeDuplicateModal, setActiveDuplicateModal] = useState(false);
  const [activeToast, setActiveToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");
  const [activeSaveBar, setActiveSaveBar] = useState(false);
  const [currentVisibility, setCurrentVisibility] = useState();
  const [title, setTitle] = useState();
  const [body_html, setBody_html] = useState();
  const [isError, setIsError] = useState();
  const [newPageTitle, setNewPageTitle] = useState();

  const { refetch } = useAppQuery({
    url: `/api/pages?id=${id}`,
    reactQueryOptions: {
      onSuccess: (data) => {
        console.log(data);
        setPage(data);
        setVisibility(data.published_at ? "visible" : "hidden");
        setCurrentVisibility(data.published_at ? "visible" : "hidden");
        setTitle(data.title);
        setBody_html(data.body_html);
        setIsError();
        setLoading(false);
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
      setActiveConfirmModal(false);
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

  const handleUpdatePage = () => {
    if (title.trim() === "") {
      setIsError(true);
      return;
    }
    setIsError();
    const updatedData = {
      title: title,
      body_html: body_html,
      published: visibility !== "visible" ? null : true,
    };
    setLoading(true);
    console.log(updatedData);
    fetch(`/api/pages?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("OK");
        setPage({
          ...page,
          ...data,
          title,
          body_html,
          published: visibility === "visible" ? true : false,
        });
        refetch();
        setMessageToast(`Page was updated.`);
        toggleActiveToast();
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreatePage = (pageTitle) => {
    if (!pageTitle || pageTitle.trim() === "") {
      setIsError(true);
    } else {
      setIsError();
      const updatedData = {
        title: pageTitle,
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
    handleUpdatePage();
    setActiveSaveBar(false);
  };

  const discardAction = () => {
    setLoading(true);
    setActiveSaveBar(false);
    setActiveDiscardModal(false);
    refetch().then(() => setLoading(false));
  };

  const saveBar = activeSaveBar ? (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: saveAction,
      }}
      discardAction={{
        onAction: () => setActiveDiscardModal(true),
      }}
    />
  ) : null;

  useEffect(() => {
    if (
      title == page?.title &&
      body_html == page?.body_html &&
      visibility === currentVisibility
    )
      setActiveSaveBar(false);
    else setActiveSaveBar(true);
  }, [visibility, title, body_html]);

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
          onAction: () => {
            setNewPageTitle("Copy of " + title);
            setActiveDuplicateModal(true);
          },
        },
        {
          content: "View page",
          icon: ViewMinor,
          accessibilityLabel: "Secondary action label",
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
            page={page}
            dateString={page?.published_at}
            visibility={visibility}
            setVisibility={setVisibility}
            setActiveSaveBar={setActiveSaveBar}
            currentVisibility={currentVisibility}
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
            content: "Delete page",
            destructive: true,
            outline: true,
            onAction: () => setActiveConfirmModal(true),
          },
        ]}
      />
      {toastMarkup}
      <ConfirmModal
        active={activeConfirmModal}
        setActive={setActiveConfirmModal}
        pagesNumber={1}
        primaryAction={() => {
          bulkDelete();
        }}
      />
      <DiscardModal
        active={activeDiscardModal}
        setActive={setActiveDiscardModal}
        primaryAction={() => discardAction()}
      />
      <DuplicateModal
        active={activeDuplicateModal}
        setActive={setActiveDuplicateModal}
        title={newPageTitle}
        setTitle={setNewPageTitle}
        primaryAction={() => {
          setActiveDuplicateModal(false);
          handleCreatePage(newPageTitle);
        }}
      />
      {saveBar}
    </Page>
  );
}
export default AddPage;
