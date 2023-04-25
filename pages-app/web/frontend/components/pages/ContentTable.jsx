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
} from "@shopify/polaris";
import React, { useState } from "react";
import { FavoriteMajor, SortMinor } from "@shopify/polaris-icons";

export const ContentFilters = ({ searchItems, sortItems, removeFilter }) => {
  const [queryValue, setQueryValue] = useState("");
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState("");
  const [visibility, setVisibility] = useState("");

  const visibilityChangeHandle = (value) => {
    setVisibility(value[0]);
    sortItems(value[0]);
  };

  const visibilityRemoveHandle = () => {
    setVisibility();
    removeFilter();
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
          selected={visibility || []}
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
    setSelected(value[0]);
    sortItems(value[0]);
  };

  const handleFiltersClearAll = () => {
    visibilityRemoveHandle();
    removeFilter();
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

const itemsSource = [
  {
    id: 108828309,
    title: "Sample Page",
    shop_id: 548380009,
    handle: "sample",
    body_html: "<p>this is a <strong>sample</strong> page.</p>",
    author: "Dennis",
    created_at: "2008-07-15T20:00:00-04:00",
    updated_at: "2008-07-16T20:00:00-04:00",
    published_at: null,
    template_suffix: null,
    admin_graphql_api_id: "gid://shopify/OnlineStorePage/108828309",
  },
  {
    id: 169524623,
    title: "Store hours",
    shop_id: 548380009,
    handle: "store-hours",
    body_html: "<p>We never close.</p>",
    author: "Jobs",
    created_at: "2013-12-31T19:00:00-05:00",
    updated_at: "2013-12-31T19:00:00-05:00",
    published_at: "2014-02-01T19:00:00-05:00",
    template_suffix: null,
    admin_graphql_api_id: "gid://shopify/OnlineStorePage/169524623",
  },
  {
    id: 322471,
    title: "Support",
    shop_id: 548380009,
    handle: "support",
    body_html: "<p>Come in store for support.</p>",
    author: "Dennis",
    created_at: "2009-07-15T20:00:00-04:00",
    updated_at: "2009-07-16T20:00:00-04:00",
    published_at: null,
    template_suffix: null,
    admin_graphql_api_id: "gid://shopify/OnlineStorePage/322471",
  },
  {
    id: 131092082,
    title: "Terms of Services",
    shop_id: 548380009,
    handle: "tos",
    body_html:
      "<p>We make <strong>perfect</strong> stuff, we don't need a warranty.</p>",
    author: "Dennis",
    created_at: "2008-07-15T20:00:00-04:00",
    updated_at: "2008-07-16T20:00:00-04:00",
    published_at: "2008-07-15T20:00:00-04:00",
    template_suffix: null,
    admin_graphql_api_id: "gid://shopify/OnlineStorePage/131092082",
  },
];

const getDate = (dateString) => {
  return new Date(dateString).toLocaleString("en-us", {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const ContentTable = () => {
  const [items, setItems] = useState(itemsSource);
  const [selectedItems, setSelectedItems] = useState([]);

  const searchItems = (string) => {
    string
      ? setItems(
          itemsSource.filter(
            (i) =>
              i.title.toLowerCase().startsWith(string.toLowerCase()) === true
          )
        )
      : setItems(itemsSource);
  };

  const sortItems = (type) => {
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
      case "visible":
        setItems(itemsSource.filter((a) => a.published_at !== null));
        break;
      case "hidden":
        setItems(itemsSource.filter((a) => a.published_at === null));
        break;
    }
  };

  const removeFilter = () => setItems(itemsSource);

  return (
    <LegacyCard>
      <Tabs tabs={[{ content: "All", id: 1 }]} selected={0} />
      <ResourceList
        resourceName={{ singular: "Pages", plural: "Pages" }}
        filterControl={
          <ContentFilters
            searchItems={searchItems}
            sortItems={sortItems}
            removeFilter={removeFilter}
          />
        }
        items={items}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
        renderItem={(item) => {
          const { id, title, body_html, created_at, published_at } = item;
          const shortcutActions = [
            {
              url: `/${id}`,
              content: published_at ? "View page" : "Preview page",
            },
          ];
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

              <p>{getDate(created_at)}</p>
            </ResourceItem>
          );
        }}
      />
    </LegacyCard>
  );
};
