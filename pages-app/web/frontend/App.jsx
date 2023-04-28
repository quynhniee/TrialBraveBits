import { BrowserRouter } from "react-router-dom";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";
import { Frame } from "@shopify/polaris";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  return (
    <PolarisProvider>
      <Frame
        logo={{
          width: 100,
          contextualSaveBarSource:
            "https://cdn.shopify.com/shopifycloud/web/assets/v1/f5416ec27e17f00a.svg",
        }}
      >
        <BrowserRouter>
          <AppBridgeProvider>
            <QueryProvider>
              <NavigationMenu
                navigationLinks={
                  [
                    // {
                    //   label: "Page name",
                    //   destination: "/pagename",
                    // },
                  ]
                }
              />
              <Routes pages={pages} />
            </QueryProvider>
          </AppBridgeProvider>
        </BrowserRouter>
      </Frame>
    </PolarisProvider>
  );
}
