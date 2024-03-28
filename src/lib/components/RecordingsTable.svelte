<script lang="ts">
  import { Modal, Button, Popover, Input } from "flowbite-svelte";
  import { format, formatDistance } from "date-fns";
  import apiRequest from "../api";
  import type { Recording, ShareLink } from "../Types";

  let recordingsHeader = [
    { title: "ID", icon: '<span class="material-symbols-outlined">tag</span>', class: "rounded-tl-lg" },
    { title: "Duration", icon: '<span class="material-symbols-outlined">timer</span>', class: "col-span-2" },
    { title: "Expires in", icon: '<span class="material-symbols-outlined">work_history</span>' },
    { title: "Actions", icon: '<span class="material-symbols-outlined">right_click</span>', class: "rounded-tr-lg" },
  ];

  export let recordings: Recording[];
  let openShareModal = false;
  let openPlayerModal = false;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  let shareLink = "";
  let shareExpire: Date | undefined;
  let dateFormat = "dd.MM.yyyy";
  let audioSrc = "";
  let popover: any = "";
  let clipboardPermission = navigator.clipboard ?? false;

  let handleShareModal = async (id: number) => {
    openShareModal = true;
    const url = "/api/recordings/" + id + "/share-link";
    const res = await apiRequest<ShareLink>({ method: "GET", url });
    shareLink = baseUrl + res.url;
    shareExpire = res.expires;
  };

  let copyToClipboard = (event: Event) => {
    (event.target as HTMLInputElement).select();
    if (clipboardPermission) {
      navigator.clipboard.writeText(shareLink);
    }
  };

  let handlePlayerModal = async (filename: string) => {
    openPlayerModal = true;
    audioSrc = baseUrl + "/api/recordings/file/" + filename;
  };
</script>

<div
  class="bg-dark-500 dark:bg-white-base border-dark-500 dark:border-white-base mb-14 mt-5 grid grid-cols-5 gap-0.5 rounded-lg border-2"
>
  {#each recordingsHeader as recording}
    <div
      class="bg-logo-700 dark:bg-table-hdark text-white-mantle mx-auto flex w-full justify-center gap-1 p-3 text-xl font-semibold
      {recording.class ?? ''}"
    >
      <span class="text-table-icon">{@html recording.icon}</span>
      <span>{recording.title}</span>
    </div>
  {/each}
  {#if !recordings.length}
    <div
      class="text-dark-600 dark:text-white-base bg-white-mantle dark:bg-dark-500 border-b-lg col-span-5 mx-auto flex w-full items-center justify-center p-3 text-3xl"
    >
      There are currently no recordings.
    </div>
  {/if}
  {#each recordings as recording, i}
    <div
      class="{i % 2 === 0
        ? 'bg-white-mantle dark:bg-dark-500'
        : 'bg-white-text dark:bg-dark-800'} text-dark-600 dark:text-white-base mx-auto flex w-full items-center justify-center p-3
        {i + 1 === recordings.length ? 'rounded-bl-lg' : ''}"
    >
      {recording.id}
    </div>
    <div
      class="{i % 2 === 0
        ? 'bg-white-mantle dark:bg-dark-500'
        : 'bg-white-text dark:bg-dark-800'} text-dark-600 dark:text-white-base col-span-2 mx-auto flex w-full items-center justify-evenly p-3"
    >
      <div class="">{format(recording.start, dateFormat)}</div>
      <div class="text-lg font-bold">{format(recording.start, "HH:mm")} - {format(recording.end, "HH:mm")}</div>
      <div>{formatDistance(recording.start, recording.end)}</div>
    </div>
    <div
      class="{i % 2 === 0
        ? 'bg-white-mantle dark:bg-dark-500'
        : 'bg-white-text dark:bg-dark-800'} text-dark-600 dark:text-white-base mx-auto flex w-full items-center justify-center p-3"
    >
      {formatDistance(recording.expires, new Date())}
    </div>
    <div
      class="{i % 2 === 0
        ? 'bg-white-mantle dark:bg-dark-500'
        : 'bg-white-text dark:bg-dark-800'} text-white-base dark:text-dark-600 mx-auto flex w-full items-center justify-center p-3
        {i + 1 === recordings.length ? 'rounded-br-lg' : ''}"
    >
      <div class="flex flex-row items-center justify-center gap-3">
        <a href="#" on:click={() => handlePlayerModal(recording.file)} title="Play">
          <span class="text-table-play material-symbols-outlined text-3xl">play_circle</span>
        </a>
        <a href={baseUrl + "/recordings/file/download/" + recording.file} title="Download">
          <span class="text-table-dwl material-symbols-outlined text-3xl">download</span>
        </a>
        <a href="#" on:click={() => handleShareModal(recording.id)} title="Share">
          <span class="text-table-share material-symbols-outlined text-2xl">share</span>
        </a>
      </div>
    </div>
  {/each}
</div>

<Modal bind:open={openShareModal} size="sm" autoclose outsideclose color="red" class="dark:bg-dark-800 bg-white-mantle">
  <div class="">
    <h3 class="text-dark-700 mb-5 text-2xl font-semibold dark:text-white">Share this recording</h3>
    {#if clipboardPermission}
      <Popover
        class="bg-dark-900 dark:bg-white-crust dark:text-dark-800 !left-auto right-4 flex w-44 font-semibold text-white"
        triggeredBy="#share-link"
        trigger="focus"
        bind:this={popover}
      >
        <div class="flex w-full items-center justify-between gap-2">
          <span class="material-symbols-outlined text-base">content_copy</span>
          <span class="text-sm">Copied to clipboard!</span>
        </div>
      </Popover>
    {/if}
    <Input
      id="share-link"
      type="text"
      placeholder="Link"
      class="focus:ring-logo-500 focus:border-logo-500 !rounded-lg focus:outline-none focus:ring-2"
      bind:value={shareLink}
      on:focus={copyToClipboard}
    />
    <div class="mt-10 flex items-center justify-between">
      <div class="dark:text-white-text text-md text-dark-500 font-normal">
        Expires in:
        {shareExpire ? formatDistance(shareExpire, new Date()) : ""}
      </div>
      <Button class="!bg-logo-500 hover:!bg-logo-700 me-2">Close</Button>
    </div>
  </div>
</Modal>

<Modal bind:open={openPlayerModal} size="lg" autoclose outsideclose color="red" class="dark:bg-dark-800 bg-white-text">
  <div class="">
    <audio controls autoplay class="mb-5 mt-14 w-full">
      <source src={audioSrc} />
    </audio>
    <div class="mt-10 text-right">
      <Button class="!bg-logo-500 hover:!bg-logo-700 me-2">Close</Button>
    </div>
  </div>
</Modal>
