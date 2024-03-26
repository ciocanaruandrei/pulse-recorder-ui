<script lang="ts">
  import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
  import ChevronRight from "lucide-svelte/icons/chevron-right";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";

  type $$Props = RangeCalendarPrimitive.NextButtonProps;
  type $$Events = RangeCalendarPrimitive.NextButtonEvents;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<RangeCalendarPrimitive.NextButton
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
    <ChevronRight class="h-4 w-4" />
  </slot>
</RangeCalendarPrimitive.NextButton>
