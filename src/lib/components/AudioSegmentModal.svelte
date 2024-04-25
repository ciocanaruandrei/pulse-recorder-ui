<script lang="ts">
  import { Modal } from "flowbite-svelte";
  import sample from "../../assets/sample.mp3";
  import { onMount } from "svelte";

  let timer = 50;
  export let audioModal: boolean;
  let tooltip: HTMLElement;
  let range: HTMLInputElement;
  let controlBtn: HTMLElement;
  let btnIcon = "play_circle";
  let btnColor = "bg-green-700";
  let btnHoverColor = "bg-green-800";
  let btnTitle = "Play";
  let currTimeEl: HTMLElement;
  let durationEl: HTMLElement;
  let audio = new Audio(sample);
  let volume = 1;

  let timeToDateSeconds = () => {
    let timeDate = new Date();
    return timeDate.getHours() * 3600 + timeDate.getMinutes() * 60 + timeDate.getSeconds();
  };

  let audioStart = timeToDateSeconds();

  let fmtTime = (s: number) => {
    s += audioStart;
    const d = new Date(0);

    if (s > 0) {
      d.setSeconds(s % 60);
      d.setMinutes(s / 60);
      d.setHours(s / 3600);
    }

    return d.toISOString().slice(11, 19);
  };

  onMount(() => {
    timer = 0;
    currTimeEl.textContent = fmtTime(audio.currentTime);
    durationEl.textContent = fmtTime(audio.duration);
  });
  audio.addEventListener("loadeddata", () => {});

  audio.addEventListener("timeupdate", () => {
    timer = (audio.currentTime / audio.duration) * 100;
    currTimeEl.textContent = fmtTime(audio.currentTime);
    durationEl.textContent = fmtTime(audio.duration);
  });

  audio.addEventListener("ended", () => {
    btnIcon = "play_circle";
    btnColor = "bg-green-700";
    btnHoverColor = "bg-green-800";
    btnTitle = "Play";
  });

  let controlAudio = () => {
    audio.paused ? audio.play() : audio.pause();
    if (!audio.paused) {
      btnIcon = "pause";
      btnColor = "bg-red-700";
      btnHoverColor = "bg-red-800";
      btnTitle = "Pause";
      return;
    }

    btnIcon = "play_circle";
    btnColor = "bg-green-700";
    btnHoverColor = "bg-green-800";
  };

  let audioRewind = () => {
    audio.currentTime -= 15;
  };

  let audioForward = () => {
    audio.currentTime += 15;
  };

  let stopAudio = () => {
    audio.pause();
  };

  let updateVolume = () => {
    audio.volume = volume;
  };

  let updateAudio = () => {
    audio.currentTime = (audio.duration || 0) * (timer / 100);
  };

  let placeTooltip = (event: MouseEvent) => {
    const pos = event.clientX - range.getBoundingClientRect().left;
    tooltip.style.left = pos - 20 + "px";
    let w = range.clientWidth;
    let x = event.offsetX;
    let percents = x / w;
    let max = parseInt(range.max);
    let value = Math.floor(percents * max + 0.5);
    tooltip.textContent = fmtTime((audio.duration || 0) * (value / 100));
  };
</script>

<Modal bind:open={audioModal} on:close={stopAudio} class="dark:bg-dark-800 bg-white">
  <div class="flex items-end gap-1 !mb-10">
    <span class="material-symbols-outlined text-table-icon text-3xl">music_note</span>
    <h3 class="text-dark-600 dark:text-white-text text-2xl font-bold">Audio file</h3>
  </div>
  <div class="group relative w-[95%]">
    <div
      bind:this={tooltip}
      class="tooltip bg-gray-400 text-white dark:bg-dark-100 dark:text-white-text text-sm hidden group-hover:block absolute -top-9 rounded-md w-auto p-2">
      tooltip
    </div>
    <input
      id="timer"
      bind:value={timer}
      bind:this={range}
      type="range"
      max="100"
      step="1"
      on:change={updateAudio}
      on:mousemove={placeTooltip}
      class="w-full bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 h-2" />
  </div>
  <div class="flex items-end justify-between pt-3 max-sm:flex-col max-sm:items-start max-sm:gap-3">
    <div
      class="flex items-center gap-4 px-3 py-4 bg-white-base dark:bg-dark-900 rounded-md border-gray-400 dark:border-dark-600 border">
      <a
        href="#"
        on:click={audioRewind}
        title="Rewind 15 sec"
        class="text-center font-medium items-center justify-center px-2.5 py-2.5 text-sm text-dark-600 dark:text-white flex border border-gray-400 dark:border-dark-300 rounded-md bg-white-text dark:bg-dark-750 hover:bg-white dark:hover:bg-dark-300">
        <span class="material-symbols-outlined">fast_rewind</span>
      </a>
      <a
        href="#"
        bind:this={controlBtn}
        on:click={controlAudio}
        title={btnTitle}
        class="text-center font-medium focus-within:ring-4 focus-within:outline-none items-center justify-center px-2.5 py-2.5 text-sm text-white {btnColor} hover:{btnHoverColor} focus-within:ring-gray-200 dark:focus-within:ring-dark-750 rounded-lg flex">
        <span class="material-symbols-outlined text-[26px]">{btnIcon}</span>
      </a>
      <a
        href="#"
        on:click={audioForward}
        title="Forward 15 sec"
        class="text-center font-medium items-center justify-center px-2.5 py-2.5 text-sm text-dark-600 dark:text-white flex border border-gray-400 dark:border-dark-300 rounded-md bg-white-text dark:bg-dark-750 hover:bg-white dark:hover:bg-dark-300">
        <span class="material-symbols-outlined">fast_forward</span>
      </a>
    </div>
    <div
      class="flex items-center gap-4 p-3 text-dark-750 dark:text-white-text bg-white-base dark:bg-dark-900 border rounded-md border-gray-400 dark:border-dark-600">
      <span class="material-symbols-outlined text-orange-400">volume_up</span>
      <input
        id="volume"
        bind:value={volume}
        type="range"
        max="1"
        step="0.1"
        on:input={updateVolume}
        class="w-full bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 h-1" />
    </div>
    <div
      class="flex gap-1 p-3 text-dark-750 dark:text-white-text bg-white-base dark:bg-dark-900 border rounded-md border-gray-400 dark:border-dark-600">
      <span bind:this={currTimeEl}>00:00</span>
      <span>/</span>
      <span bind:this={durationEl}>00:00</span>
    </div>
  </div>
</Modal>
