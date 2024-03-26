<script lang="ts">
  import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";

  type $$Props = RangeCalendarPrimitive.GridBodyProps;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<RangeCalendarPrimitive.GridBody
  class={cn("dark:bg-dark-750 bg-white-mantle dark:border-dark-100 h-full border", className)}
  {...$$restProps}
>
  <slot />
</RangeCalendarPrimitive.GridBody>
