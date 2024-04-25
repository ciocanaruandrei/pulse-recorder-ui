<script lang="ts">
  import { Modal, Button } from "flowbite-svelte";
  import { RangeCalendar } from "$lib/components/ui/range-calendar/index.js";
  import type { DateRange } from "bits-ui";
  import { CalendarDate, type DateValue } from "@internationalized/date";
  import { parse } from "date-fns";
  import { createEventDispatcher } from "svelte";
  import AudioSegmentModal from "./AudioSegmentModal.svelte";

  let dateModal = false;
  let calendarKey = 0;
  let startHour = "00";
  let endHour = "23";
  let startMinutes = "00";
  let endMinutes = "59";
  let startDate = -1;
  let endDate = -1;
  const dispatch = createEventDispatcher();

  let audioModal = false;

  let value: DateRange | undefined;
  let startValue: DateValue | undefined;

  let openDateModal = () => {
    dateModal = true;
    audioModal = false;
  };

  let filterByDate = () => {
    dateModal = false;
    if (startValue) {
      startDate = parse(
        startValue.day + "/" + startValue.month + "/" + startValue.year + "-" + startHour + ":" + startMinutes,
        "dd/MM/yyyy-HH:mm",
        new Date()
      ).getTime();

      setEndDate(startValue);
    }

    const data = {
      startDate,
      endDate,
    };
    dispatch("dateChange", data);
  };

  let setEndDate = (startValue: DateValue) => {
    if (value && value.end) {
      endDate = parse(
        value.end.day + "/" + value.end.month + "/" + value.end.year + "-" + endHour + ":" + endMinutes,
        "dd/MM/yyyy-HH:mm",
        new Date()
      ).getTime();

      return;
    }

    let date = new CalendarDate(startValue.year, startValue.month, startValue.day);
    value = {
      start: date,
      end: undefined,
    };

    endDate = parse(
      startValue.day + "/" + startValue.month + "/" + startValue.year + "-" + endHour + ":" + endMinutes,
      "dd/MM/yyyy-HH:mm",
      new Date()
    ).getTime();
  };

  let changeHours = (type: string, event: Event) => {
    let value = (event.target as HTMLInputElement).value;
    let hours = formatTime(value, 23);
    if (type === "start") {
      startHour = hours;
      return;
    }
    endHour = hours;
  };

  let changeMinutes = (type: string, event: Event) => {
    let value = (event.target as HTMLInputElement).value;
    let minutes = formatTime(value, 59);
    if (type === "start") {
      startMinutes = minutes;
      return;
    }
    endMinutes = minutes;
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

  let resetDates = () => {
    startValue = undefined;
    startDate = -1;
    startHour = "00";
    startMinutes = "00";
    resetEndDate();
    calendarKey++;
  };

  let resetEndDate = () => {
    value = undefined;
    endDate = -1;
    endHour = "23";
    endMinutes = "59";
    if (startValue) {
      let date = new CalendarDate(startValue.year, startValue.month, startValue.day);
      value = {
        start: date,
        end: undefined,
      };
    }

    const data = {
      startDate,
      endDate,
    };
    dispatch("dateChange", data);
  };

  let getAudioSegment = () => {
    dateModal = false;
    audioModal = true;
  };

  //$: value, console.log(value, startValue);
</script>

<div class="flex flex-col">
  <div class="dark:text-white-text mb-5 flex items-center gap-1 text-xl">
    <span class="material-symbols-outlined text-table-icon text-3xl">manage_search</span>
    <span class="mt-1 text-xl">Search by date</span>
  </div>
  <div class="flex items-center gap-5 max-sm:flex-col max-sm:items-start">
    <Button
      on:click={openDateModal}
      class="hover:dark:!bg-dark-300 me-2 flex items-center justify-between gap-5 rounded-md border-2 px-2 border-dark-100 dark:border-white-crust">
      <span class="material-symbols-outlined text-logo-500">calendar_month</span>
      <span class="dark:text-white text-dark-800">Choose a date</span>
    </Button>
    {#if startValue}
      <div
        class="flex border-2 p-2 flex items-center justify-between gap-4 rounded-md dark:text-white-base dark:bg-dark-300 bg-white-base border-dark-100 dark:border-white-text">
        <span class="material-symbols-outlined text-table-icon">event</span>
        <span>
          Start date: {startValue.day +
            "." +
            startValue.month +
            "." +
            startValue.year +
            " - " +
            startHour +
            ":" +
            startMinutes}
        </span>
        <a href="#" on:click={resetDates} title="Reset" class="flex">
          <span class="material-symbols-outlined text-red-500">close</span>
        </a>
      </div>
    {/if}
    {#if value && value.end}
      <div
        class="flex border-2 p-2 flex items-center justify-between gap-4 rounded-md dark:text-white-base dark:bg-dark-300 bg-white-base border-dark-100 dark:border-white-text">
        <span class="material-symbols-outlined text-table-icon">today</span>
        <span>
          End date: {value.end.day + "." + value.end.month + "." + value.end.year + " - " + endHour + ":" + endMinutes}
        </span>
        <a href="#" on:click={resetEndDate} title="Reset" class="flex">
          <span class="material-symbols-outlined text-red-500">close</span>
        </a>
      </div>
    {/if}
  </div>
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
    <div class="grid grid-cols-2 gap-1 pb-5 max-sm:grid-cols-1">
      <div class="">
        <div class="flex items-end gap-1 pb-2">
          <span class="material-symbols-outlined text-logo-500 text-3xl">schedule</span>
          <h3 class="text-dark-600 dark:text-white-text text-2xl font-bold">Choose start hour</h3>
        </div>
        <div
          class="dark:border-dark-800 dark:text-white-text bg-white-crust border-dark-100 dark:bg-dark-300 inline-block rounded-lg border p-3 inline-flex items-center gap-4">
          <input
            type="number"
            class="w-16 border-none bg-transparent text-center p-1 custom-input"
            bind:value={startHour}
            on:input={(e) => changeHours("start", e)} />
          <span class="">:</span>
          <input
            type="number"
            class="w-16 border-none bg-transparent text-center p-1 custom-input"
            bind:value={startMinutes}
            on:input={(e) => changeMinutes("start", e)} />
        </div>
      </div>
      <div class="">
        <div class="flex items-end gap-1 pb-2">
          <span class="material-symbols-outlined text-logo-500 text-3xl">timer</span>
          <h3 class="text-dark-600 dark:text-white-text text-2xl font-bold">Choose end hour</h3>
        </div>
        <div
          class="dark:border-dark-800 dark:text-white-text bg-white-crust border-dark-100 dark:bg-dark-300 inline-block rounded-lg border p-3 inline-flex items-center gap-4">
          <input
            type="number"
            class="w-16 border-none bg-transparent text-center p-1 custom-input"
            bind:value={endHour}
            on:input={(e) => changeHours("end", e)} />
          <span class="">:</span>
          <input
            type="number"
            class="w-16 border-none bg-transparent text-center p-1 custom-input"
            bind:value={endMinutes}
            on:input={(e) => changeMinutes("end", e)} />
        </div>
      </div>
    </div>
  {/if}
  <div class="flex items-center justify-between max-sm:items-start">
    <Button on:click={resetDates} color="red" class="flex items-center justify-between gap-1">
      <span class="material-symbols-outlined">restart_alt</span>
      <span class="text-lg">Reset</span>
    </Button>
    <div class="flex items-center gap-2 shrink-0 max-sm:flex-col-reverse max-sm:items-end">
      {#if startValue && !value?.end}
        <Button on:click={getAudioSegment} color="blue" class="flex items-center justify-between gap-1">
          <span class="material-symbols-outlined">play_arrow</span>
          <span class="text-lg">Listen this segment</span>
        </Button>
      {/if}
      <Button on:click={filterByDate} color="green" class="flex items-center justify-between gap-1">
        <span class="material-symbols-outlined">check</span>
        <span class="text-lg">Save</span>
      </Button>
    </div>
  </div>
</Modal>

{#if audioModal}
  <AudioSegmentModal {audioModal}></AudioSegmentModal>
{/if}
