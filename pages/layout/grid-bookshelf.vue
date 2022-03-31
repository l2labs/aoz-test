<template>
  <div class="w-full h-full pt-12 pb-24 px-12 bg-black text-white">
    <div class="flex flex-col items-center mb-64">
      <h1 class="mb-12 text-4xl font-bold">Book Shelf</h1>
      <NuxtLink
        to="/"
        class="py-2 px-8 bg-white text-black rounded-lg shadow-lg shadow-light-100/20 transition duration-300 hover:(text-white bg-gray-600)"
      >
        Home
      </NuxtLink>
    </div>

    <ul class="grid grid-cols-9">
      <li
        v-for="i in 60"
        :key="i"
        class="book-item relative col-span-2 aspect-w-1 aspect-h-1 flex items-center justify-center"
      >
        <img
          :src="`https://picsum.photos/seed/${i}/400/600`"
          alt=""
          class="w-2/5 h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 transition hover:(rotate-15 -translate-y-3/4)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'normal',
})
</script>

<i18n lang="yaml"></i18n>

<style scoped>
.book-item {
  --bg-color: rgb(236, 72, 153);

  @apply relative -mt-1/2 z-0;

  img {
    box-shadow: 5px -5px 10px rgb(0 0 0 / 30%);
  }

  &::before {
    @apply absolute inset-0 bg-no-repeat -z-1;

    content: '';
    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
    background-image: linear-gradient(
        -45deg,
        var(--bg-color) 0%,
        var(--bg-color) 53%,
        #ffffff 53%,
        #ffffff 58%,
        var(--bg-color) 58%,
        var(--bg-color) 100%
      ),
      linear-gradient(
        45deg,
        var(--bg-color) 0%,
        var(--bg-color) 53%,
        #ffffff 53%,
        #ffffff 58%,
        var(--bg-color) 58%,
        var(--bg-color) 100%
      );
    background-size: 50% 100%, 50% 100%;
    background-position: left, right;
  }

  &::after {
    @apply absolute inset-0 bg-no-repeat;

    content: '';
    clip-path: polygon(100% 50%, 50% 100%, 0 50%, 20% 50%, 50% 80%, 80% 50%);
    background-image: linear-gradient(
        45deg,
        var(--bg-color) 0%,
        var(--bg-color) 42%,
        #ffffff 42%,
        #ffffff 48%,
        transparent 48%,
        transparent 100%
      ),
      linear-gradient(
        -45deg,
        var(--bg-color) 0%,
        var(--bg-color) 42%,
        #ffffff 42%,
        #ffffff 48%,
        transparent 48%,
        transparent 100%
      );
    background-size: 50% 100%, 50% 100%;
    background-position: left, right;
  }
}
.book-item:nth-child(2n + 1) {
  --bg-color: rgb(245, 158, 11);
}
.book-item:nth-child(3n + 1) {
  --bg-color: rgb(6, 182, 212);
}
.book-item:nth-child(8n-3) {
  @apply col-start-2;
}
</style>
