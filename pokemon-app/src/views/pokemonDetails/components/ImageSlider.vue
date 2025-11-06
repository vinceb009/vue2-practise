<template>
  <div class="slider">
    <button
        :disabled="currentSprite === 0"
        class="controlButton"
        @click="currentSprite = currentSprite - 1"
    >
      <svg aria-hidden="true" class="svg" data-slot="icon" fill="currentColor"
           viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd"
              d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
              fill-rule="evenodd"></path>
      </svg>
    </button>
    <img :src="sprites[currentSprite]" width="150"/>
    <button
        :disabled="currentSprite === sprites.length - 1"
        class="controlButton"
        @click="currentSprite = currentSprite + 1"
    >
      <svg aria-hidden="true" class="svg" data-slot="icon" fill="currentColor"
           viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd"
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              fill-rule="evenodd"></path>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
  name: "ImageSlider",
  data() {
    return {
      currentSprite: 0
    }
  },
  props: {
    sprites: Array
  }
}
</script>
<style scoped>
.slider {
  display: flex;
  align-items: center;
}

.controlButton {
  border-style: none;
  background: none;
  color: white;
  cursor: pointer;
}

.controlButton:disabled {
  visibility: hidden;
}

.svg {
  width: 20px;
}
</style>