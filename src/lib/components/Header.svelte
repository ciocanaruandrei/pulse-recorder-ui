<script lang="ts">
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from "flowbite-svelte";
  import logo from "../../assets/images/logo.svg";
  import { Link } from "svelte-routing";
  import { DarkMode } from "flowbite-svelte";

  export let isAuthenticated: boolean;
  export let username: string;
</script>

<Navbar rounded class="bg-white-base dark:bg-dark-900 mt-3 drop-shadow-lg" fluid>
  <Link to={isAuthenticated ? "/" : "login"}>
    <NavBrand>
      <img src={logo} class="drop-shadow-logo me-3 h-20" alt="Logo" />
    </NavBrand>
  </Link>

  <NavHamburger />
  <NavUl
    ulClass="flex flex-col items-center p-4 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium max-sm:dark:bg-dark-750 max-sm:items-start">
    {#if isAuthenticated}
      <Link to="/" let:active>
        <NavLi
          class="text-dark-600 dark:text-white-text hover:text-logo-500 flex justify-center gap-1 text-xl
        {active ? 'text-logo-500 dark:text-white' : ''}">
          <span class="material-symbols-outlined text-logo-500">home</span>
          <span>Home</span>
        </NavLi>
      </Link>
      <Link to="/recordings" let:active>
        <NavLi
          class="text-dark-600 dark:text-white-text hover:text-logo-500 flex justify-center gap-1 text-xl
        {active ? 'text-logo-500 dark:text-white' : ''}">
          <span class="material-symbols-outlined text-logo-500"> library_music </span>
          <span>All recordings</span>
        </NavLi>
      </Link>
      <Link to="/custom-trims" let:active>
        <NavLi
          class="text-dark-600 dark:text-white-text hover:text-logo-500 flex justify-center gap-1 text-xl
      {active ? 'text-logo-500 dark:text-white' : ''}">
          <span class="material-symbols-outlined text-logo-500">content_cut</span>
          <span>Custom trims</span>
        </NavLi>
      </Link>
      <NavLi class="text-dark-600 dark:text-white-text hover:text-logo-500 flex justify-center gap-1 text-xl">
        <span class="material-symbols-outlined text-logo-500">account_circle</span>
        <span class="text-table-icon">{username}</span>
      </NavLi>
    {/if}

    <DarkMode
      class="text-primary-500 dark:text-primary-600 border-dark-600 dark:border-white-text dark:bg-dark-600 bg-white-base border max-sm:hidden" />
  </NavUl>

  <DarkMode
    class="text-primary-500 dark:text-primary-600 border-dark-600 dark:border-white-text dark:bg-dark-600 bg-white-base border fixed top-8 right-16 sm:hidden" />
</Navbar>
