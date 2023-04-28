import {
  LegacyCard,
  ResourceList,
  Text,
  Tabs,
  Filters,
  ChoiceList,
  Button,
  Icon,
  Popover,
  AlphaCard,
  Badge,
  HorizontalStack,
  ResourceItem,
  SkeletonTabs,
  SkeletonBodyText,
  Toast,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { FavoriteMajor, SortMinor } from "@shopify/polaris-icons";
import { useAppQuery } from "../../hooks";
import { useAuthenticatedFetch } from "@shopify/app-bridge-react";
import { getUrl } from "../../utils/preview";
import ConfirmModal from "./ConfirmModal";

export const ContentFilters = ({
  visibility,
  setVisibility,
  sortItems,
  searchItems,
  changeTabHandle,
  refetch,
  selected,
  setSelected,
}) => {
  const [queryValue, setQueryValue] = useState("");
  const [active, setActive] = useState(false);

  const visibilityChangeHandle = (value) => {
    changeTabHandle(1);
    setVisibility(value[0]);
  };

  const visibilityRemoveHandle = () => {
    changeTabHandle(0);
    setVisibility("");
  };

  const filters = [
    {
      key: "visibility",
      label: "Visibility",
      filter: (
        <ChoiceList
          choices={[
            { label: "Visible", value: "visible" },
            { label: "Hidden", value: "hidden" },
          ]}
          selected={visibility}
          onChange={visibilityChangeHandle}
        />
      ),
      shortcut: true,
    },
  ];

  const queryChangeHandle = (e) => {
    setQueryValue(e);
    searchItems(e);
  };

  const queryClearHandle = () => {
    setQueryValue();
    searchItems();
  };

  const toggleActive = () => setActive(!active);

  const sortChangeHandle = (value) => {
    sortItems(value[0]);
    setSelected(value[0]);
  };

  const handleFiltersClearAll = () => {
    visibilityRemoveHandle();
  };

  const appliedFilters = [];
  if (visibility) {
    appliedFilters.push({
      key: "visibility",
      label: visibility,
      onRemove: visibilityRemoveHandle,
    });
  }

  useEffect(() => {
    sortItems(selected);
  }, [refetch]);

  return (
    <Filters
      queryValue={queryValue}
      onQueryChange={queryChangeHandle}
      onQueryClear={queryClearHandle}
      filters={filters}
      appliedFilters={appliedFilters}
      queryPlaceholder="Filter Pages"
      onClearAll={handleFiltersClearAll}
    >
      <div style={{ display: "flex", gap: 8, marginLeft: 8 }}>
        <Button
          onClick={() => console.log("New filter saved")}
          disabled
          icon={<Icon source={FavoriteMajor} color="base" />}
        >
          Save
        </Button>

        <Popover
          active={active}
          activator={
            <Button
              onClick={toggleActive}
              icon={<Icon source={SortMinor} color="base" />}
            >
              Sort
            </Button>
          }
          autofocusTarget="first-node"
          onClose={toggleActive}
        >
          <AlphaCard padding="4">
            <ChoiceList
              title="Sort by"
              choices={[
                { label: "Newest update", value: "newest" },
                { label: "Oldest update", value: "oldest" },
                { label: "Title A-Z", value: "AtoZ" },
                { label: "Title Z-A", value: "ZtoA" },
              ]}
              selected={selected}
              onChange={sortChangeHandle}
            />
          </AlphaCard>
        </Popover>
      </div>
    </Filters>
  );
};

const ItemList = ({
  itemsSource,
  setItemsSource,
  visibility,
  setVisibility,
  refetch,
}) => {
  const fetch = useAuthenticatedFetch();
  // const [items, setItems] = useState(itemsSource);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [tabs, setTabs] = useState([{ content: "All", id: "all" }]);
  const [sortSelected, setSortSelected] = useState("AtoZ");
  const [activeToast, setActiveToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");
  const [activeModal, setActiveModal] = useState(false);

  const changeTabHandle = (tabIndex) => {
    if (tabIndex === 0) {
      refetch();
      setTabs([{ content: "All", id: "all" }]);
      setSelectedTab(0);
      setSortSelected("AtoZ");
    } else {
      setTabs([
        { content: "All", id: "all" },
        { content: "Custom search", id: "search" },
      ]);
      setSelectedTab(1);
    }
  };

  const searchItems = (string) => {
    setLoading(true);
    string
      ? setItemsSource(
          itemsSource.filter((i) =>
            i.title.toLowerCase().startsWith(string.toLowerCase())
          )
        )
      : refetch();
  };

  const sortItems = (type) => {
    setLoading(true);
    let tmp = [...itemsSource];
    switch (type) {
      case "AtoZ":
        tmp.sort((a, b) => (a.title > b.title ? 1 : -1));
        setItemsSource(tmp);
        break;
      case "ZtoA":
        tmp.sort((a, b) => (a.title < b.title ? 1 : -1));
        setItemsSource(tmp);
        break;
      case "newest":
        tmp.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setItemsSource(tmp);
        break;
      default:
        tmp.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
        setItemsSource(tmp);
        break;
    }
  };

  const bulkPublished = async (published) => {
    setLoading(true);
    const res = await fetch(`/api/pages?id=${selectedItems.toString()}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        published: published,
      }),
    });

    if (res.ok) {
      refetch()
        .then(() => {
          setSelectedItems([]);
          setMessageToast(
            published === true
              ? `${selectedItems.length} page visible.`
              : `Hide ${selectedItems.length}.`
          );
          toggleActiveToast();
          setLoading(false);
        })
        .catch((error) => console.log(error));
    } else {
      console.log("NOT OK");
    }
  };

  const bulkDelete = async () => {
    setLoading(true);
    const res = await fetch(`/api/pages?id=${selectedItems.toString()}`, {
      method: "DELETE",
    });

    if (res.ok) {
      refetch()
        .then(() => {
          setSelectedItems([]);
          setActiveModal(false);
          setMessageToast(`Delete ${selectedItems.length} items.`);
          toggleActiveToast();
          setLoading(false);
        })
        .catch((error) => console.log(error));
    } else {
      console.log("NOT OK");
    }
  };

  const bulkActions = [
    {
      content: "Make selected pages visible",
      onAction: () => {
        console.log(selectedItems);
        bulkPublished(true);
      },
    },
    {
      content: "Hide selected pages",
      onAction: () => {
        console.log(selectedItems);
        bulkPublished(false);
      },
    },
    {
      destructive: true,
      content: "Delete pages",
      onAction: () => {
        console.log(selectedItems);
        setActiveModal(true);
      },
    },
  ];

  const toggleActiveToast = () => setActiveToast((activeToast) => !activeToast);

  const toastMarkup = activeToast ? (
    <Toast content={messageToast} onDismiss={toggleActiveToast} />
  ) : null;

  useEffect(() => {
    setSelectedItems([]);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [itemsSource]);

  useEffect(() => {
    setLoading(true);
    refetch();
  }, [visibility]);

  return (
    <>
      <Tabs
        tabs={tabs}
        selected={selectedTab}
        onSelect={(number) => {
          changeTabHandle(number);
          setVisibility("");
        }}
      />
      {toastMarkup}
      <ResourceList
        resourceName={{ singular: "Pages", plural: "Pages" }}
        bulkActions={bulkActions}
        filterControl={
          <ContentFilters
            changeTabHandle={changeTabHandle}
            visibility={visibility}
            setVisibility={setVisibility}
            sortItems={sortItems}
            searchItems={searchItems}
            refetch={refetch}
            selected={sortSelected}
            setSelected={setSortSelected}
          />
        }
        items={itemsSource}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
        renderItem={(item) => {
          const { id, title, body_html, published_at, updated_at } = item;
          const shortcutActions = [
            {
              url: getUrl(title),
              content: published_at ? "View page" : "Preview page",
            },
          ];
          if (loading === true)
            return (
              <div style={{ padding: 16 }}>
                <SkeletonBodyText />
              </div>
            );

          return (
            <ResourceItem
              id={id}
              url={`/${id}`}
              accessibilityLabel={`View details for ${title}`}
              name={title}
              shortcutActions={shortcutActions}
            >
              <HorizontalStack gap="1" blockAlign="center">
                <Text variant="bodyMd" fontWeight="bold" as="h3">
                  {title}
                </Text>
                {published_at ? null : <Badge>Hidden</Badge>}
              </HorizontalStack>
              <p>{body_html.replace(/<[^>]+>/g, "")}</p>
              <p>{getDate(updated_at)}</p>
            </ResourceItem>
          );
        }}
      />
      <ConfirmModal
        active={activeModal}
        setActive={setActiveModal}
        pagesNumber={selectedItems.length}
        primaryAction={() => {
          bulkDelete();
        }}
      />
    </>
  );
};

const getDate = (dateString) => {
  const date = new Date(dateString);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[date.getDay()];

  const hour = date.getHours() % 12 || 12;
  const minute = date.getMinutes();
  const ampm = date.getHours() < 12 ? "am" : "pm";

  const formattedDate = `${dayOfWeek} at ${hour}:${minute
    .toString()
    .padStart(2, "0")} ${ampm}`;

  return formattedDate;
};

const getPublishedStatus = (visibility) => {
  switch (visibility) {
    case "visible":
      return "published";
    case "hidden":
      return "unpublished";
    default:
      return "any";
  }
};

export const ContentTable = () => {
  const [itemsSource, setItemsSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibility, setVisibility] = useState("");

  const { refetch } = useAppQuery({
    url: `/api/pages?published_status=${getPublishedStatus(visibility)}`,
    reactQueryOptions: {
      onSuccess: (data) => {
        setItemsSource(data);
        setLoading(false);
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  });

  const Skeleton = () => (
    <LegacyCard>
      <SkeletonTabs />
      <div style={{ padding: 16 }}>
        <SkeletonBodyText />
        <SkeletonBodyText />
        <SkeletonBodyText />
      </div>
    </LegacyCard>
  );

  return (
    <LegacyCard>
      {loading === true ? (
        <Skeleton />
      ) : (
        <ItemList
          itemsSource={itemsSource}
          setItemsSource={setItemsSource}
          visibility={visibility}
          setVisibility={setVisibility}
          refetch={refetch}
        />
      )}
    </LegacyCard>
  );
};
