<script lang="ts">
  import Header from "./Header.svelte";
  import { Router, Route } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import Recordings from "./pages/Recordings.svelte";
  import Login from "./pages/Login.svelte";
</script>

<div class="container-lg mx-3">
  <Router>
    <Header />

    <div class="container mx-auto mt-10 p-3">
      <Route path="/" component={Home} />
      <Route path="/recordings" component={Recordings} />
      <Route path="/login" component={Login} />
    </div>
  </Router>
</div>

<style>
</style>
