<script lang="ts">
  import { Button, Dropdown, DropdownItem, Input } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";

  export let totalPages: number;
  let currentPage = 1;
  let perPage = 10;
  const dispatch = createEventDispatcher();

  let prevPage = () => {
    if (currentPage > 1) {
      currentPage--;
      emitChange();
    }
  };

  let nextPage = () => {
    if (currentPage < totalPages) {
      currentPage++;
      emitChange();
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
    emitChange();
  };

  let changePerPage = (nr: number) => {
    perPage = nr;
    window.document.getElementById("dropdown-btn")?.click();
    emitChange();
  };

  let emitChange = () => {
    const data = {
      currentPage,
      perPage,
    };
    dispatch("pageChange", data);
  };
</script>

<div class="flex gap-2 max-sm:pt-5 max-sm:justify-between">
  <Button
    id="dropdown-btn"
    class="dark:!bg-dark-100 hover:dark:!bg-dark-300 bg-white-crust text-dark-500 dark:text-white dark:border-white-text border-dark-100 me-2 rounded-md border-2 pl-5 pr-2">
    {perPage} per page
    <span class="material-symbols-outlined">expand_more</span>
  </Button>
  <Dropdown class="dark:bg-dark-300 border-dark-100 dark:border-white-text w-32 rounded-md border-2">
    <DropdownItem on:click={() => changePerPage(10)}>10</DropdownItem>
    <DropdownItem on:click={() => changePerPage(25)}>25</DropdownItem>
    <DropdownItem on:click={() => changePerPage(50)}>50</DropdownItem>
    <DropdownItem on:click={() => changePerPage(100)}>100</DropdownItem>
  </Dropdown>
  <div
    class="dark:border-white-crust dark:text-white-text dark:bg-dark-800 border-dark-100 bg-white-base flex items-center justify-between gap-8 rounded-md border-2 p-2 max-sm:gap-0">
    <a href="#" on:click={prevPage} class="flex" title="Previous page">
      <span class="material-symbols-outlined text-[32px]">chevron_left</span>
    </a>
    <div class="flex items-center justify-center gap-2">
      <Input
        type="number"
        class="{totalPages > 1000
          ? 'w-[60px]'
          : 'w-[50px]'} dark:bg-dark-500 dark:border-dark-100 h-[25px] text-center custom-input"
        bind:value={currentPage}
        on:change={changePage} />
      <div>/</div>
      <div class="w-[30px]">{totalPages}</div>
    </div>
    <a href="#" on:click={nextPage} class="flex" title="Next page">
      <span class="material-symbols-outlined text-[32px]">chevron_right</span>
    </a>
  </div>
</div>
