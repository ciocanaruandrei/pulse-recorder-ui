<script lang="ts">
  import { cn } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";

  type $$Props = HTMLAttributes<HTMLDivElement>;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<div
  class={cn(
    "bg-white-mantle dark:text-white-base dark:bg-dark-750 mt-4 flex flex-col space-y-4 rounded-md sm:flex-row sm:space-x-4 sm:space-y-0",
    className,
  )}
  {...$$restProps}
>
  <slot />
</div>
