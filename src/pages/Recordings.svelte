<script lang="ts">
  import { onMount } from "svelte";
  import apiRequest from "../lib/api";
  import RecordingsTable from "../lib/components/RecordingsTable.svelte";
  import type { Recording, RecordingsResponse } from "../lib/Types";
  import { Button, Dropdown, DropdownItem, Input } from "flowbite-svelte";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import { type DateValue } from "@internationalized/date";
  import { formatDate } from "date-fns/format";

  let recordings: Recording[] = [];
  let totalPages = 0;
  let currentPage = 1;
  let perPage = 10;

  let date: DateValue | undefined = undefined;
  let selectedDate = formatDate(new Date(), "dd.MM.yyyy");

  onMount(() => {
    recordingRequest();
  });

  let prevPage = () => {
    if (currentPage > 1) {
      currentPage--;
      recordingRequest();
    }
  };

  let nextPage = () => {
    if (currentPage < totalPages) {
      currentPage++;
      recordingRequest();
    }
  };

  let changePage = (event: Event) => {
    let value = parseInt((event.target as HTMLInputElement).value);
    if (value < 1) {
      currentPage = 1;
    }
    if (value > totalPages) {
      currentPage = totalPages;
    }
    recordingRequest();
  };

  let changePerPage = (nr: number) => {
    perPage = nr;
    window.document.getElementById("dropdown-btn")?.click();
    recordingRequest();
  };

  let changeDate = (date: DateValue | undefined) => {
    if (date) {
      selectedDate = date.day + "." + date.month + "." + date.year;
    }
  };

  let recordingRequest = () => {
    const url = "/recordings";
    const query = {
      page: currentPage - 1,
      perPage: perPage,
    };
    apiRequest<RecordingsResponse>({ method: "GET", url, query }).then((result) => {
      recordings = result.recordings;
      totalPages = result.pages;
    });
  };

  $: date, changeDate(date);
</script>

<div>
  <div class="flex items-center gap-1">
    <span class="material-symbols-outlined text-logo-500 text-4xl">graphic_eq</span>
    <h3 class="text-dark-600 dark:text-white-text text-4xl font-bold">All recordings</h3>
  </div>

  {#if recordings.length}
    <div class="my-7 flex justify-between">
      <div>
        <Button
          class="dark:!bg-logo-500 hover:dark:!bg-dark-300 me-2 flex w-36 items-center justify-between gap-3 rounded-md border-2 px-2"
        >
          <span class="material-symbols-outlined">calendar_month</span>
          {selectedDate}
        </Button>
        <Dropdown>
          <Calendar bind:value={date} />
        </Dropdown>
      </div>
      <div class="flex gap-2">
        <Button id="dropdown-btn" class="dark:!bg-dark-100 hover:dark:!bg-dark-300 me-2 rounded-md border-2 pl-5 pr-2">
          {perPage} per page
          <span class="material-symbols-outlined">expand_more</span>
        </Button>
        <Dropdown class="dark:bg-dark-300 w-32 rounded-md border-2">
          <DropdownItem on:click={() => changePerPage(10)}>10</DropdownItem>
          <DropdownItem on:click={() => changePerPage(25)}>25</DropdownItem>
          <DropdownItem on:click={() => changePerPage(50)}>50</DropdownItem>
          <DropdownItem on:click={() => changePerPage(100)}>100</DropdownItem>
        </Dropdown>
        <div
          class="dark:border-white-crust dark:text-white-text dark:bg-dark-800 flex items-center justify-between gap-8 rounded-md border-2 p-2"
        >
          <a href="#" on:click={prevPage} class="flex" title="Previous page">
            <span class="material-symbols-outlined text-[32px]">chevron_left</span>
          </a>
          <div class="flex items-center justify-center gap-2">
            <Input
              type="number"
              class="{totalPages > 1000
                ? 'w-[60px]'
                : 'w-[50px]'} focus:ring-logo-500 focus:border-logo-500 dark:bg-dark-500 dark:border-dark-100 h-[25px] !rounded-lg text-center focus:outline-none focus:ring-2"
              bind:value={currentPage}
              on:change={changePage}
            />
            <div>/</div>
            <div class="w-[30px]">{totalPages}</div>
          </div>
          <a href="#" on:click={nextPage} class="flex" title="Next page">
            <span class="material-symbols-outlined text-[32px]">chevron_right</span>
          </a>
        </div>
      </div>
    </div>
  {/if}
  <RecordingsTable {recordings} />
</div>
