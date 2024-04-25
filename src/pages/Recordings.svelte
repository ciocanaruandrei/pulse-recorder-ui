<script lang="ts">
  import { onMount } from "svelte";
  import apiRequest from "../lib/api";
  import RecordingsTable from "../lib/components/RecordingsTable.svelte";
  import type { Recording, RecordingsResponse, RecoringQuery } from "../lib/Types";
  import DateSort from "../lib/components/DateSort.svelte";
  import TablePagination from "$lib/components/TablePagination.svelte";

  let recordings: Recording[] = [];
  let recording = {
    id: 123,
    file: "",
    start: new Date(),
    end: new Date(),
    expires: new Date(),
  };
  recordings.push(recording);
  let totalPages = 0;
  let currentPage = 1;
  let perPage = 10;
  let startDate = -1;
  let endDate = -1;

  onMount(() => {
    recordingRequest();
  });

  let dateChange = (event: CustomEvent) => {
    startDate = event.detail.startDate;
    endDate = event.detail.endDate;
    currentPage = 1;
    recordingRequest();
  };

  let pageChange = (event: CustomEvent) => {
    currentPage = event.detail.currentPage;
    perPage = event.detail.perPage;
    recordingRequest();
  };

  let recordingRequest = () => {
    let query: RecoringQuery = {
      page: currentPage - 1,
      perPage: perPage,
    };
    if (startDate > 1) {
      query.start = startDate;
    }

    if (endDate > 1) {
      query.end = endDate;
    }
    const url = "/api/recordings";
    apiRequest<RecordingsResponse>({ method: "GET", url, query }).then((result) => {
      recordings = result.recordings;
      totalPages = result.pages;
    });
  };
</script>

<div>
  <div class="flex items-center gap-1">
    <span class="material-symbols-outlined text-logo-500 text-4xl">graphic_eq</span>
    <h3 class="text-dark-600 dark:text-white-text text-4xl font-bold">All recordings</h3>
  </div>

  {#if recordings.length}
    <div class="my-7 flex items-end justify-between max-sm:block">
      <DateSort on:dateChange={dateChange}></DateSort>
      <TablePagination {totalPages} on:pageChange={pageChange}></TablePagination>
    </div>
  {/if}
  <RecordingsTable {recordings} />
</div>
