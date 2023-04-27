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
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { FavoriteMajor, SortMinor } from "@shopify/polaris-icons";
import { useAppQuery } from "../../hooks";
import { getTextContent } from "../../utils/htmlContent";

export const ContentFilters = ({
  visibility,
  setVisibility,
  sortItems,
  searchItems,
  changeTabHandle,
}) => {
  const [queryValue, setQueryValue] = useState("");
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState("newest");

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
    console.log(value[0]);
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

const ItemList = ({ itemsSource, visibility, setVisibility, refetch }) => {
  const [items, setItems] = useState(itemsSource);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [tabs, setTabs] = useState([{ content: "All", id: "all" }]);

  const changeTabHandle = (tabIndex) => {
    if (tabIndex === 0) {
      refetch();
      setTabs([{ content: "All", id: "all" }]);
      setSelectedTab(0);
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
      ? setItems(
          itemsSource.filter((i) =>
            i.title.toLowerCase().startsWith(string.toLowerCase())
          )
        )
      : setItems(itemsSource);
  };

  const sortItems = (type) => {
    setLoading(true);
    let tmp = [...items];
    switch (type) {
      case "AtoZ":
        tmp.sort((a, b) => (a.title > b.title ? 1 : -1));
        setItems(tmp);
        break;
      case "ZtoA":
        tmp.sort((a, b) => (a.title < b.title ? 1 : -1));
        setItems(tmp);
        break;
      case "oldest":
        tmp.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setItems(tmp);
      default:
        tmp.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
        setItems(tmp);
    }
  };

  const bulkPublish = (published) => {
    const { data, refetch } = useAppQuery({
      url: `/api/pages/id=${selectedItems.toString()}`,
      fetchInit: {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          published: published,
        }),
      },
      reactQueryOptions: {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.log(error);
        },
      },
    });
  };

  const bulkActions = [
    {
      content: "Make selected pages visible",
      onAction: () => {
        console.log(selectedItems);
        bulkPublish(true);
      },
    },
    {
      content: "Hide selected pages",
      onAction: () => console.log("Hide selected pages"),
    },
    {
      destructive: true,
      content: "Delete pages",
      onAction: () => console.log("Delete pages"),
    },
  ];

  useEffect(() => {
    setItems(itemsSource);
    setLoading(false);
  }, [itemsSource]);

  useEffect(() => {
    setSelectedItems([]);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [items]);

  useEffect(() => {
    setLoading(true);
    refetch();
  }, [visibility]);

  return (
    <>
      <Tabs
        tabs={tabs}
        selected={selectedTab}
        onSelect={(number) => setSelectedTab(number)}
      />
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
          />
        }
        items={items}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
        renderItem={(item) => {
          const { id, title, body_html, published_at, updated_at } = item;
          const shortcutActions = [
            {
              url: `/${id}`,
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
          visibility={visibility}
          setVisibility={setVisibility}
          refetch={refetch}
        />
      )}
    </LegacyCard>
  );
};
