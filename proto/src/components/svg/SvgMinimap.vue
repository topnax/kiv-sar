<!-- A component displaying a minimap of the given SVG and the state of the viewport -->
<template style="opacity: 0.9">
  <svg
      :width="viewPort.width != null ? viewPort.width : '100%'"
      :height="viewPort.height != null ? viewPort.height : '100%'"
      viewBox="0 0 5000 5000">
    <!-- Use the referenced element -->
    <use :href="`#${refId}-root-element`"/>
    <rect
        :x="-parentViewPort.tx * (1 / parentViewPort.scale)"
        :y="-parentViewPort.ty * (1 / parentViewPort.scale)"
        :width="parentViewPort.width * (1 / parentViewPort.scale)"
        :height="parentViewPort.height * (1 / parentViewPort.scale)"
        fill="rgba(255, 0, 0, 0.2)"
        stroke="rgb(255, 0, 0)"
    />
  </svg>
</template>

<script>
export default {
  props: {
    refId: String,
    viewPort: Object,
    parentViewPort: Object,
  }
}
</script>

<style scoped>
svg {
  border: 2px solid black;
}
</style>
