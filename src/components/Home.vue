<template>
  <div class="hello">
    <h1>Homepage</h1>
    <p>
        this is homepage.
    </p>
      <button @click="$router.push({name: 'login'})">To Login</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    name: String
  }
}
</script>

<style scoped>
</style>
