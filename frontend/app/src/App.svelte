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
  <div class="navbar">
  <nav>
    <Link to="/">Home</Link>
    <!-- <Link to="/youtube">Youtube</Link> -->
    <Link to="/mystats">My Statistics</Link>
    <Link to="/mysubs">My Youtube Subscribers</Link>
    <!-- <Link to="/trends">YoutubeTrends</Link> -->
    <Link to="/youtube">Dashboard</Link>
  </nav>
  </div>
  <div>
    <Route path="/youtube" component={Youtube} />
    <Route path="/mystats" component={MyStats} />
    <Route path="/mysubs" component={MySubscriptions} />
    <!-- <Route path="/trends" component={Trends} /> -->
    <Route path="/youtube" component={Dashboard} />
    <Route path="/*"><NotFound /></Route>
    <Route path="/"><Home /></Route>
  </div>
</Router>

<style>
  .navbar {
    font-size: 200%;
    font-weight: 300;
    border: 1px solid black;
    border-radius: 10px;
    text-align: center;
    margin:auto;
    margin-left: 100px;
    padding: 20px;
  }
</style>