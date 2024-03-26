<script lang="ts">
  import { Calendar as CalendarPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";

  type $$Props = CalendarPrimitive.HeaderProps;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<CalendarPrimitive.Header
  class={cn(
    "dark:!bg-dark-500 !bg-white-text dark:text-white-text relative flex w-full items-center justify-between rounded-md p-2",
    className,
  )}
  {...$$restProps}
>
  <slot />
</CalendarPrimitive.Header>
