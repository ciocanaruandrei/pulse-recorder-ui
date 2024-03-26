<script lang="ts">
  import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";

  type $$Props = RangeCalendarPrimitive.HeaderProps;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<RangeCalendarPrimitive.Header
  class={cn(
    "dark:!bg-dark-500 !bg-white-text dark:text-white-text relative flex w-full items-center justify-between rounded-md p-2",
    className,
  )}
  {...$$restProps}
>
  <slot />
</RangeCalendarPrimitive.Header>
