<script setup>
const props = defineProps({
  positions: {
    type: Array,
    default: () => [],
  },
});

function isPlayerThere(x, y) {
  return props.positions.filter((i) => i.x === x && i.y === y).length > 0;
}
</script>

<template>
  <div
    class="flex"
    v-for="y in 10"
    :key="'y_' + y"
  >
    <div
      class="bg-stone-100 p-5 border relative"
      v-for="x in 10"
      :key="'x_' + x"
    >
      <span
        class="absolute left-0 right-0"
        v-if="isPlayerThere(x - 1, y - 1)"
      >x</span>
    </div>
  </div>
</template>
