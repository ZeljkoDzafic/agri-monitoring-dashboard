<template>
  <div class="d-flex justify-center align-center" :style="{ minHeight: height }">
    <v-progress-circular
      :size="size"
      :width="width"
      color="primary"
      indeterminate
    />
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: [Number, String],
    default: 64
  },
  width: {
    type: [Number, String],
    default: 4
  },
  height: {
    type: String,
    default: '200px'
  }
})
</script>
