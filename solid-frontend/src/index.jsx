/* @refresh reload */
import { Route, Router } from "@solidjs/router";
import { render } from "solid-js/web";
import App from "./App";
import { SelectedProvider } from "./context/SelectedContext";
import "./index.css";
import CollectionsPage from "./pages/CollectionsPage";
import DashboardPage from "./pages/DashboardPage";
import ItemPage from "./pages/ItemPage";
import ItemsPage from "./pages/ItemsPage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage";
import SearchTermsPage from "./pages/SearchTermsPage";

// lazy load components
// const Home = lazy(() => import("./components/Home"));

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
    );
}

render(
    () => (
        <>
            <SelectedProvider>
                <Router root={App}>
                    <Route path="/" component={DashboardPage} />
                    <Route path="/search-terms" component={SearchTermsPage} />
                    <Route path="/collections" component={CollectionsPage} />
                    <Route path="/search" component={SearchPage} />
                    <Route path="/jobs" component={JobsPage} />
                    <Route path="/items" component={ItemsPage} />
                    <Route path="/items/:id" component={ItemPage} />
                    <Route path="*404" component={NotFoundPage} />
                </Router>
            </SelectedProvider>
            {/* <Test /> */}
        </>
    ),
    document.getElementById("root")
);
