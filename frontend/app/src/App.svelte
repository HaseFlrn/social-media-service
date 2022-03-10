<script>
  import Router from "svelte-routing/Router.svelte";
  import Route from "svelte-routing/Route.svelte";
  import Link from "svelte-routing/Link.svelte";
  import Home from "components/Home.svelte";
  import Youtube from "components/Youtube.svelte";

  export let url = "/social-media-service";
</script>

<Router {url}>
  <nav>
    <Link to="{url}/">Home</Link>
    <Link to="{url}/youtube">Youtube</Link>
  </nav>
  <div>
    <Route path="{url}/youtube" component={Youtube} />
    <Route path="{url}/"><Home /></Route>
  </div>
</Router>
