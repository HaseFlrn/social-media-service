<script>
  import Router from "svelte-routing/Router.svelte";
  import Route from "svelte-routing/Route.svelte";
  import Link from "svelte-routing/Link.svelte";
  import Home from "components/Home.svelte";
  import Youtube from "components/Youtube.svelte";

  export let url = "";
</script>

<Router {url}>
  <nav>
    <Link to="/">Home</Link>
    <Link to="youtube">Youtube</Link>
  </nav>
  <div>
    <Route path="youtube" component={Youtube} />
    <Route path="/"><Home /></Route>
  </div>
</Router>
