<template>
  <label class="like" style="--size: 30px;--frames: 62;">
    <input type="checkbox">
    <div class="hearth" />
  </label>
</template>

<style scoped>
:root {
  --size: 30px;
  --frames: 62;
}

input {
  display: none;
}

.like {
  display: block;
  width: var(--size);
  height: var(--size);
  cursor: pointer;
  border-radius: 999px;
  overflow: visible;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}

.hearth {
  background-image: url('https://assets.codepen.io/23500/Hashflag-AppleEvent.svg');
  background-size: calc(var(--size) * var(--frames)) var(--size);
  background-repeat: no-repeat;
  background-position-x: calc(var(--size) * (var(--frames) * -1 + 2));
  background-position-y: calc(var(--size) * 0.02);
  width: var(--size);
  height: var(--size);
}

input:checked + .hearth {
  animation: like 1s steps(calc(var(--frames) - 3));
  animation-fill-mode: forwards;
}

@keyframes like {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: calc(var(--size) * (var(--frames) * -1 + 3));
  }
}

@media (hover: hover) {
  .like:hover {
    background-color: #E1255E15;
  }
  .like:hover .hearth {
    background-position-x: calc(var(--size) * (var(--frames) * -1 + 1));
  }
}
</style>
