/* @refresh reload */
import { Route, Router } from "@solidjs/router";
import { render } from "solid-js/web";
import App from "./App";
import "./index.css";
import Home from "./pages/Home";
import Item from "./pages/Item";
import Items from "./pages/Items";

// lazy load components
// const Home = lazy(() => import("./components/Home"));

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(
  () => (
    <Router root={App}>
      <Route path="/users" component={() => <div>Users</div>} />
      <Route path="/" component={Home} />
      <Route path="/items" component={Items} />
      <Route path="/item/:id" component={Item} />
      <Route path="*404" component={() => <div>Not found</div>} />
    </Router>
  ),
  document.getElementById("root")
);
