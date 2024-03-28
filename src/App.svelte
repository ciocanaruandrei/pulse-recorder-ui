<script lang="ts">
  import Header from "./lib/components/Header.svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import Recordings from "./pages/Recordings.svelte";
  import Login from "./pages/Login.svelte";
  import { onMount } from "svelte";
  import apiRequest from "$lib/api";
  import type { AuthStateResponse } from "$lib/Types";

  let isAuthenticated = false;
  let username = "";

  onMount(() => {
    let url = "/auth/state";

    apiRequest<AuthStateResponse>({ method: "GET", url }).then((result) => {
      isAuthenticated = result.isAuthenticated;
      //isAuthenticated = true;
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }
      if (result.user.firstName || result.user.lastName) {
        username = (result.user.firstName ?? "") + " " + (result.user.lastName ?? "");
        return;
      }

      return result.user.email;
    });
  });
</script>

<div class="container-lg mx-3">
  <Router>
    <Header {isAuthenticated} {username} />

    <div class="container mx-auto mt-10 p-3">
      {#if isAuthenticated}
        <Route path="/" component={Home} />
        <Route path="/recordings" component={Recordings} />
      {/if}
      <Route path="/login" component={Login} />
    </div>
  </Router>
</div>

<style>
</style>
