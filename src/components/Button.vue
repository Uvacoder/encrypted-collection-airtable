<template>
  <button class="button">{{ msg }}</button>
</template>

<script>
export default {
  name: "Button",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  padding: 0 15px;
  border-radius: 0.35rem;
  height: 40px;
  background-color: #fff;
  border: 3px solid #27292b;
  margin: 0 10px;
}
button:focus {
  outline: none;
}
</style>
