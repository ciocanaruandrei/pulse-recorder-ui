<script lang="ts">
  import { Modal, Button, Input } from "flowbite-svelte";

  let lastRecordingHeader = [
    { title: "Id", icon: '<span class="material-symbols-outlined">tag</span>', class: "rounded-tl-lg" },
    { title: "Start time", icon: '<span class="material-symbols-outlined">today</span>' },
    { title: "End time", icon: '<span class="material-symbols-outlined">event_busy</span>' },
    { title: "Expires in", icon: '<span class="material-symbols-outlined">work_history</span>' },
    { title: "Actions", icon: '<span class="material-symbols-outlined">right_click</span>', class: "rounded-tr-lg" },
  ];
  let items = new Array(10);
  let openShareModal = false;
</script>

<div>
  <div class="flex items-center gap-1">
    <span class="material-symbols-outlined text-logo-500 text-4xl">graphic_eq</span>
    <h3 class="text-dark-600 dark:text-white-text text-4xl font-bold">Last recordings</h3>
  </div>
  <div
    class="bg-dark-500 dark:bg-white-base border-dark-500 dark:border-white-base mt-5 grid grid-cols-5 gap-0.5 rounded-lg border-2"
  >
    {#each lastRecordingHeader as recording}
      <div
        class="bg-logo-700 dark:bg-table-hdark text-white-mantle mx-auto flex w-full justify-center gap-1 p-3 text-xl font-semibold
        {recording.class ?? ''}"
      >
        <span class="text-table-icon">{@html recording.icon}</span>
        <span>{recording.title}</span>
      </div>
    {/each}
    {#each items as item, i}
      <div
        class="{i % 2 === 0
          ? 'bg-white-mantle dark:bg-dark-500'
          : 'bg-white-text dark:bg-dark-800'} text-dark-600 dark:text-white-base mx-auto flex w-full items-center justify-center p-3
          {i + 1 === items.length ? 'rounded-bl-lg' : ''}"
      >
        {i + 1}
      </div>
      <div
        class="{i % 2 === 0
          ? 'bg-white-mantle dark:bg-dark-500'
          : 'bg-white-text dark:bg-dark-800'} text-dark-600 dark:text-white-base mx-auto flex w-full items-center justify-center p-3"
      >
        {new Date().toLocaleString()}
      </div>
      <div
        class="{i % 2 === 0
          ? 'bg-white-mantle dark:bg-dark-500'
          : 'bg-white-text dark:bg-dark-800'} text-dark-600 dark:text-white-base mx-auto flex w-full items-center justify-center p-3"
      >
        {new Date().toLocaleString()}
      </div>
      <div
        class="{i % 2 === 0
          ? 'bg-white-mantle dark:bg-dark-500'
          : 'bg-white-text dark:bg-dark-800'} text-dark-600 dark:text-white-base mx-auto flex w-full items-center justify-center p-3"
      >
        3 days
      </div>
      <div
        class="{i % 2 === 0
          ? 'bg-white-mantle dark:bg-dark-500'
          : 'bg-white-text dark:bg-dark-800'} text-white-base dark:text-dark-600 mx-auto flex w-full items-center justify-center p-3
          {i + 1 === items.length ? 'rounded-br-lg' : ''}"
      >
        <div class="flex flex-row items-center justify-center gap-1">
          <span class="text-table-play material-symbols-outlined text-3xl">play_circle</span>
          <span class="text-table-dwl material-symbols-outlined text-3xl">download</span>
          <a href="#" on:click={() => (openShareModal = true)} title="Share">
            <span class="text-table-share material-symbols-outlined text-2xl">share</span>
          </a>
        </div>
      </div>
    {/each}
  </div>
</div>

<Modal bind:open={openShareModal} size="xs" autoclose outsideclose>
  <div class="">
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Share this recording</h3>
    <Input type="text" id="link" placeholder="link" class="rounded-lg! my-4" />
    <Button color="red" class="me-2">Close</Button>
  </div>
</Modal>
