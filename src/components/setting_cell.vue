<template>
  <div class="flex-baseline-spacebetween paddingX20" :class="{'border-bottom1' : border}">
    <div class="flex-align margin28X ">
      <i :class="[icon, 'font-size10', 'margin-right20']"></i>
      <span class="font-size6"> {{title}} </span>
    </div>
    <i class="inline-block icon-enter"></i>
  </div>
</template>

<script>
  export default {
    props: ['icon', 'title', 'border'],
    name: "cell",
    data() {
      return {
      }
    },
  }
</script>

<style scoped>

</style>
