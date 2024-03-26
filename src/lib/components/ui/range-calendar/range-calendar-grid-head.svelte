<script lang="ts">
  import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";

  type $$Props = RangeCalendarPrimitive.GridHeadProps;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<RangeCalendarPrimitive.GridHead class={cn("bg-logo-500 block rounded-t-md py-1 text-white", className)} {...$$restProps}>
  <slot />
</RangeCalendarPrimitive.GridHead>
