<script lang="ts">
  import { onMount } from "svelte";
  import apiRequest from "../lib/api";
  import RecordingsTable from "../lib/components/RecordingsTable.svelte";
  import type { Recording, RecordingsResponse } from "../lib/Types";

  let recordings: Recording[] = [];

  onMount(() => {
    const url = "/recordings";
    const query = {
      page: 0,
      perPage: 10,
    };
    apiRequest<RecordingsResponse>({ method: "GET", url, query }).then((result) => (recordings = result.recordings));
  });
</script>

<div>
  <div class="flex items-center gap-1">
    <span class="material-symbols-outlined text-logo-500 text-4xl">graphic_eq</span>
    <h3 class="text-dark-600 dark:text-white-text text-4xl font-bold">Last recordings</h3>
  </div>
  <RecordingsTable {recordings} />
</div>
