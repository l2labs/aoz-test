<template>
  <div class="wrap w-1/2 mx-auto mt-64 grid grid-cols-6 gap-4">
    <div class="w-full aspect-w-1 aspect-h-1 transition-all duration-300 ease bg-rose-500 z"></div>
    <div class="w-full aspect-w-1 aspect-h-1 transition-all duration-300 bg-cyan-500 k"></div>
    <div class="w-full aspect-w-1 aspect-h-1 transition-all duration-300 bg-green-500 s"></div>
    <div class="w-full aspect-w-1 aspect-h-1 transition-all duration-300 bg-yellow-500 w"></div>
    <div class="w-full aspect-w-1 aspect-h-1 transition-all duration-300 bg-pink-500 a"></div>
    <div class="w-full aspect-w-1 aspect-h-1 transition-all duration-300 bg-indigo-500 p"></div>
  </div>
</template>

<script setup lang="ts"></script>

<i18n lang="yaml"></i18n>

<style scoped>
.z {
  clip-path: polygon(0 100%, 0 0, 100% 0, 100% 50%, 100% 100%, 50% 100%);
}

.wrap:hover .z {
  clip-path: polygon(1% 32%, 75% 16%, 52% 61%, 97% 73%, 23% 82%, 41% 42%);
  animation: letter 1s infinite alternate steps(3, end);
}

.k {
  clip-path: polygon(0 72%, 0 39%, 0 0, 29% 0, 69% 0, 100% 0, 100% 53%, 100% 100%, 91% 100%, 59% 100%, 0 100%);
}
.wrap:hover .k {
  clip-path: polygon(20% 86%, 22% 10%, 36% 13%, 37% 44%, 71% 10%, 81% 16%, 56% 49%, 89% 88%, 74% 90%, 45% 59%, 33% 88%);
  animation: letter 1s infinite alternate steps(3, end);
}

.s {
  clip-path: polygon(0 45%, 0 0, 100% 0, 100% 100%, 55% 100%, 0 100%);
}
.wrap:hover .s {
  clip-path: polygon(20% 23%, 87% 35%, 53% 43%, 81% 80%, 13% 67%, 51% 59%);
  animation: letter 1s infinite alternate steps(3, end);
}

.w {
  clip-path: polygon(
    0 51%,
    0 72%,
    0 100%,
    32% 100%,
    45% 100%,
    66% 100%,
    100% 100%,
    100% 56%,
    100% 0,
    87% 0,
    37% 0,
    0 0
  );
}

.wrap:hover .w {
  clip-path: polygon(
    11% 25%,
    27% 79%,
    40% 80%,
    57% 45%,
    65% 81%,
    80% 83%,
    95% 35%,
    88% 27%,
    74% 56%,
    57% 22%,
    37% 57%,
    29% 32%
  );
  animation: letter 1s infinite alternate steps(3, end);
}

.a {
  clip-path: polygon(0 76%, 0 33%, 0 0, 41% 0, 100% 0, 100% 42%, 100% 74%, 100% 100%, 57% 100%, 30% 100%, 0 100%);
}

.wrap:hover .a {
  clip-path: polygon(34% 76%, 18% 80%, 47% 15%, 59% 18%, 84% 78%, 71% 78%, 55% 30%, 47% 45%, 56% 45%, 59% 56%, 43% 59%);
  animation: letter 1s infinite alternate steps(3, end);
}

.p {
  clip-path: polygon(0 0, 45% 0, 100% 1%, 100% 61%, 100% 100%, 57% 100%, 23% 100%, 0 100%, 0 59%, 0 32%);
}
.wrap:hover .p {
  clip-path: polygon(26% 77%, 27% 17%, 75% 26%, 73% 55%, 48% 54%, 47% 41%, 64% 45%, 61% 30%, 40% 29%, 37% 90%);
  animation: letter 1s infinite alternate steps(3, end);
}

@keyframes letter {
  25% {
    transform: translate(-5%, 5%) scale(1.05) rotate(-5deg);
  }
  50% {
    transform: translate(5%, -2%) rotate(2deg);
  }
  75% {
    transform: translate(10%, 0%) scale(1.02) rotate(8deg);
  }
  100% {
    transform: translate(0%, -5%) rotate(4deg);
  }
}
</style>
