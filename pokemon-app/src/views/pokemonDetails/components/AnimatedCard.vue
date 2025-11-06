<script>
export default {
  name: "AnimatedCard",
}
</script>

<template>
  <transition appear name="fade">
    <div class="card">
      <slot/>
    </div>
  </transition>

</template>

<style scoped>
.fade-enter-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter {
  opacity: 0;
  transform: translateY(50px);
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}

.card {
  border-radius: 10px;
  border: 1px solid #292929;
  background-color: #1b1a1a;
  padding: 15px;
  text-align: center;
  color: #c5c5c5;
}
</style>