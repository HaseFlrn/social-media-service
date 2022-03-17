<script>
  import Router from "svelte-routing/Router.svelte";
  import Route from "svelte-routing/Route.svelte";
  import Link from "svelte-routing/Link.svelte";

  //Components
  import Home from "components/Home.svelte";
  import Youtube from "components/Youtube.svelte";
  import MyStats from "components/Stats.svelte";
  import MySubscriptions from "components/Subscription.svelte";
  import Trends from "components/Trends.svelte";
  import NotFound from "components/NotFound.svelte";
  import Dashboard from "components/Dashboard.svelte";

  export let url = "";
</script>

<Router {url}>
  <nav>
    <Link to="{url}/">Home</Link>
    <Link to="{url}/youtube">Youtube</Link>
    <Link to="{url}/mystats">YoutubeStats</Link>
    <Link to="{url}/mysubs">YoutubeSubs</Link>
    <Link to="{url}/trends">YoutubeTrends</Link>
    <Link to="{url}/dashboard">YoutubeDashboard</Link> 
  </nav>
  <div>
    <Route path="{url}/youtube" component={Youtube} />
    <Route path="{url}/mystats" component={MyStats} />
    <Route path="{url}/mysubs" component={MySubscriptions} />
    <Route path="{url}/trends" component={Trends} />
    <Route path="{url}/dashboard" component={Dashboard}/>
    <Route path="{url}/*"><NotFound /></Route>
    <Route path="{url}/"><Home /></Route>
  </div>
</Router>
