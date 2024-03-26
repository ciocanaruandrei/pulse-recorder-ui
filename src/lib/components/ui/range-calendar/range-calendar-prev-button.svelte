<script lang="ts">
  import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
  import ChevronLeft from "lucide-svelte/icons/chevron-left";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";

  type $$Props = RangeCalendarPrimitive.PrevButtonProps;
  type $$Events = RangeCalendarPrimitive.PrevButtonEvents;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<RangeCalendarPrimitive.PrevButton
  on:click
  class={cn(
    buttonVariants({ variant: "outline" }),
    "bg-logo-500 dark:text-white-base dark:border-dark-500 h-7 w-7 p-0 text-white opacity-70 hover:opacity-100",
    className,
  )}
  {...$$restProps}
  let:builder
>
  <slot {builder}>
    <ChevronLeft class="h-4 w-4" />
  </slot>
</RangeCalendarPrimitive.PrevButton>
