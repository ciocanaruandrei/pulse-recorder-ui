<script lang="ts">
  import { onMount } from "svelte";
  import apiRequest from "../lib/api";
  import RecordingsTable from "../lib/components/RecordingsTable.svelte";
  import type { Recording, RecordingsResponse, RecoringQuery } from "../lib/Types";
  import { Button, Dropdown, DropdownItem, Input, Modal } from "flowbite-svelte";
  import { CalendarDate, type DateValue } from "@internationalized/date";
  import { parse } from "date-fns";
  import { RangeCalendar } from "$lib/components/ui/range-calendar/index.js";
  import type { DateRange } from "bits-ui";

  let recordings: Recording[] = [];
  let totalPages = 0;
  let currentPage = 1;
  let perPage = 10;
  let dateModal = false;
  let calendarKey = 0;
  let hours = "00";
  let minutes = "00";
  let startDate = -1;

  let value: DateRange | undefined;
  let startValue: DateValue | undefined;

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

  let resetDate = () => {
    value = undefined;
    startValue = undefined;
    startDate = -1;
    calendarKey++;
    hours = "00";
    minutes = "00";
  };

  let changeHours = (event: Event) => {
    let value = (event.target as HTMLInputElement).value;
    hours = formatTime(value, 23);
  };

  let changeMinutes = (event: Event) => {
    let value = (event.target as HTMLInputElement).value;
    minutes = formatTime(value, 59);
  };

  let formatTime = (value: string, max: number) => {
    let number = parseInt(value.slice(-2));
    if (isNaN(number)) {
      return "00";
    }

    if (number < 0) {
      return formatTime(Math.abs(number).toString(), max);
    }

    if (number > max) {
      number = number % 10;
    }

    if (number < 10) {
      return "0" + number;
    }

    return number.toString();
  };

  let filterByDate = () => {
    dateModal = false;
    if (startValue) {
      let date = new CalendarDate(startValue.year, startValue.month, startValue.day);
      if (value === undefined) {
        value = {
          start: date,
          end: undefined,
        };
      }
      startDate = parse(
        startValue.day + "/" + startValue.month + "/" + startValue.year + "-" + hours + ":" + minutes,
        "dd/MM/yyyy-HH:mm",
        new Date(),
      ).getTime();
      currentPage = 1;
    }

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
    const url = "/api/recordings";
    apiRequest<RecordingsResponse>({ method: "GET", url, query }).then((result) => {
      recordings = result.recordings;
      totalPages = result.pages;
    });
  };

  $: value, console.log(value, startValue);
</script>

<div>
  <div class="flex items-center gap-1">
    <span class="material-symbols-outlined text-logo-500 text-4xl">graphic_eq</span>
    <h3 class="text-dark-600 dark:text-white-text text-4xl font-bold">All recordings</h3>
  </div>

  {#if recordings.length}
    <div class="my-7 flex items-end justify-between">
      <div class="flex flex-col">
        <div class="dark:text-white-text mb-5 flex items-center gap-1 text-xl">
          <span class="material-symbols-outlined text-table-icon text-3xl">manage_search</span>
          <span class="mt-1 text-xl">Search by date</span>
        </div>
        <div class="flex items-center gap-5">
          <Button
            on:click={() => (dateModal = true)}
            class="hover:dark:!bg-dark-300 me-2 flex w-52 items-center justify-between gap-3 rounded-md border-2 px-2"
          >
            <span class="material-symbols-outlined">calendar_month</span>
            <span>Start date:</span>
          </Button>
          <div class="">-</div>
        </div>
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

<Modal bind:open={dateModal} autoclose class="dark:bg-dark-800 bg-white-text">
  <div class="flex items-end gap-1">
    <span class="material-symbols-outlined text-logo-500 text-3xl">date_range</span>
    <h3 class="text-dark-600 dark:text-white-text text-2xl font-bold">Choose a start / end date</h3>
  </div>
  <div class="py-5">
    {#key calendarKey}
      <RangeCalendar bind:value bind:startValue placeholder={value?.start} initialFocus numberOfMonths={2} />
    {/key}
  </div>
  {#if startValue}
    <div class="grid grid-cols-2 gap-1 pb-5">
      <div class="">
        <div class="flex items-end gap-1 pb-2">
          <span class="material-symbols-outlined text-logo-500 text-3xl">schedule</span>
          <h3 class="text-dark-600 dark:text-white-text text-2xl font-bold">Choose start hour</h3>
        </div>
        <div class="dark:border-dark-300 dark:text-white-text inline-block rounded-lg border p-1">
          <input type="number" class="w-24 border-none bg-transparent text-center" bind:value={hours} on:input={changeHours} />
          <span>:</span>
          <input
            type="number"
            class="w-24 border-none bg-transparent text-center"
            bind:value={minutes}
            on:input={changeMinutes}
          />
        </div>
      </div>
    </div>
  {/if}
  <div class="flex items-center justify-between">
    <Button on:click={resetDate} color="red" class="flex items-center justify-between gap-1">
      <span class="material-symbols-outlined">restart_alt</span>
      <span class="text-lg">Reset</span>
    </Button>
    <Button on:click={filterByDate} color="green" class="flex items-center justify-between gap-1">
      <span class="material-symbols-outlined">check</span>
      <span class="text-lg">Save</span>
    </Button>
  </div>
</Modal>
