<template>
  <g>
    <line
        :x1="startX + startOffsetX"
        :y1="startY + startOffsetY"
        :x2="endX - endOffsetX"
        :y2="endY - endOffsetY"
        marker-end="url(#triangle)"
        :style="`stroke:${style.strokeColor};stroke-width:${style.strokeWidth}`"
    />
    <text class="wrap" :x="textX" :y="textY">
      <tspan text-anchor="middle" :fill="style.textColor">{{ title }}</tspan>
    </text>
  </g>
</template>
<script>
export default {
  props: {
    startX: Number,
    startY: Number,
    endX: Number,
    endY: Number,
    startOffset: Number,
    endOffset: Number,
    title: String,
    style: Object
  },
  computed: {
    textX() {
      return this.startX + (this.endX - this.startX) / 2
    },
    textY() {
      return (this.startY + (this.endY - this.startY) / 2) - this.style.textBottomOffset
    },
    a() {
      return this.endX - this.startX
    },
    b() {
      return this.endY - this.startY
    },
    length() {
      return Math.sqrt(Math.pow(this.a, 2) + Math.pow(this.b, 2))
    },
    startOffsetRatio() {
      return this.startOffset / this.length
    },
    endOffsetRatio() {
      return (this.startOffset + this.style.arrowSize) / this.length
    },

    startOffsetX() {
      return this.startOffsetRatio * this.a
    },
    startOffsetY() {
      return this.startOffsetRatio * this.b
    },
    endOffsetX() {
      return this.endOffsetRatio * this.a
    },
    endOffsetY() {
      return this.endOffsetRatio * this.b
    }
  }
}
</script>
