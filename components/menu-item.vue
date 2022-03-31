<template>
  <NuxtLink :to="to" class="underline transition hover:(opacity-50)"><slot /></NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>

<i18n lang="yaml"></i18n>

<style></style>
