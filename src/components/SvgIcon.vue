<template>
  <svg :class="svgClass" v-bind="$attrs" :width="width" :height="height" :style="{color: color}">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script setup>


import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '20'
  },
  height: {
    type: String,
    default: '20'
  }
})

const iconName = computed(()=>`#icon-${props.name}`);
const svgClass = computed(()=> {
  if (props.name) {
    return `svg-icon icon-${props.name}`
  }
  return 'svg-icon'
});

</script>

<style lang='less'>
.svg-icon {
  //width: 20px;
  //height: 20px;
  fill: currentColor;
  vertical-align: middle;
}
</style>
