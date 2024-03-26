<script lang="ts">
  import apiRequest from "$lib/api";
  import { Label, Input, Button } from "flowbite-svelte";
  import { onMount } from "svelte";

  let username = "";
  let password = "";

  let ssoActive = false;

  onMount(() => {
    const url = "";
    apiRequest({ method: "GET", url }).then((result) => {});
  });
</script>

<div class="mx-auto w-3/5">
  <div class="mb-8 flex items-center gap-1">
    <span class="material-symbols-outlined text-logo-500 text-4xl">login</span>
    <h3 class="text-dark-600 dark:text-white-text text-4xl font-bold">Login</h3>
  </div>
  <div class="dark:bg-dark-750 dark:border-white-text border-dark-300 bg-white-base rounded-lg border-2 p-5">
    <Label class="space-y-2">
      <div class="mb-3 flex items-center gap-2">
        <span class="material-symbols-outlined text-logo-500 text-3xl">person</span>
        <span class="text-dark-600 dark:text-white-text text-2xl">Username</span>
      </div>
      <Input
        type="text"
        placeholder="Username"
        bind:value={username}
        size="lg"
        class="focus:ring-logo-500 focus:border-logo-500 dark:bg-dark-500 dark:border-dark-100 !rounded-lg border-gray-400 focus:outline-none focus:ring-2"
      ></Input>
    </Label>
    <Label class="mt-5 space-y-2">
      <div class="mb-3 flex items-center gap-2">
        <span class="material-symbols-outlined text-logo-500 text-3xl">password</span>
        <span class="text-dark-600 dark:text-white-text text-2xl">Password</span>
      </div>
      <Input
        type="password"
        placeholder="Password"
        bind:value={password}
        size="lg"
        class="focus:ring-logo-500 focus:border-logo-500 dark:bg-dark-500 dark:border-dark-100 !rounded-lg border-gray-400 focus:outline-none focus:ring-2"
      ></Input>
    </Label>
    <div class="mt-9 text-white">
      <div class="flex items-center justify-between">
        <Button color="green" class="flex w-32 items-center justify-between gap-1">
          <span class="material-symbols-outlined">check</span>
          <span class="text-lg">Submit</span>
        </Button>
        <Button class="bg-table-blue flex w-52 items-center justify-between gap-1">
          <span class="material-symbols-outlined">contact_mail</span>
          <span class="text-lg">Login with SSO</span>
        </Button>
      </div>
    </div>
  </div>
</div>
