/* @refresh reload */
import { render } from "solid-js/web";
import Test from "./components/Test";
import "./index.css";
import Home from "./pages/Home";
import Items from "./pages/Items";
import Item from "./pages/Item";
import { SelectedProvider } from "./context/SelectedContext";
import { Route, Router } from "@solidjs/router";
import App from "./App";

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
                    <Route path="/users" component={() => <div>Users</div>} />
                    <Route path="/" component={Home} />
                    <Route path="/items" component={Items} />
                    <Route path="/item/:id" component={Item} />
                    <Route path="*404" component={() => <div>Not found</div>} />
                </Router>
            </SelectedProvider>
            {/* <Test /> */}
        </>
    ),
    document.getElementById("root")
);
