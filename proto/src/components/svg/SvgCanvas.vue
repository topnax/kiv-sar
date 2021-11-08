<template>

  <div class="svg-canvas">
    <svg
        :id="id"
        :width="'100%'"
        :height="'100%'"
    >
      <SvgComponents
       :style="style.line"/>
      <g :transform="`
    translate(${viewPort.tx}, ${viewPort.ty})
    scale(${viewPort.scale})
    `">
        <g :id="`${id}-root-element`">

          <Line v-for="l in links"
                :start-x="nodes[l.from].x"
                :start-y="nodes[l.from].y"
                :end-x="nodes[l.to].x"
                :end-y="nodes[l.to].y"
                :title="l.description"
                :style="style.line"
                :start-offset="style.node.radius"
                :key="`link-${l.id}`"/>

          <Node v-for="n in nodes"
                :id="n.id"
                :x="n.x"
                :y="n.y"
                :title="n.name"
                :style="style.node"
                :radius="n.radius"
                :highlighted="n.highlighted"
                :on-click="() => nodeClicked(n)"
                :key="`node-${n.id}`"/>

        </g>
      </g>
    </svg>
  </div>
</template>
<script>
import Line from "@/components/svg/Line";
import Node from "@/components/svg/Node";
import {mapActions} from "vuex";
import SvgComponents from "@/components/svg/SvgComponents";

export default {
  components: {SvgComponents, Node, Line},
  props: {
    id: String,
    width: Number,
    height: Number,
    links: Array,
    nodes: Array,
    style: {
      line: Object,
      node: Object
    },
    viewPort: Object
  },
  data() {
    return {
      iX: 0,
      iY: 0
    }
  },
  mounted() {
    let idx = `${this.id}`
    document.getElementById(idx).addEventListener("wheel", this.onMouseWheelEvent);
    document.getElementById(idx).addEventListener("mousemove", this.onMouseMoveEvent);
    document.getElementById(idx).addEventListener("mousedown", this.onMouseDownEvent);
  },
  methods: {
    ...mapActions(["increment", "decrement", "toggleNodeHighlightState", "changeTranslation"]),
    onMouseDownEvent(event) {
      this.iX = event.clientX
      this.iY = event.clientY
    },
    onMouseWheelEvent(event) {
      const delta = Math.sign(event.deltaY)
      if (delta < 0) {
        console.log(event)
        this.increment({targetX: event.clientX, targetY: event.clientY})
      } else {
        this.decrement()
      }
    },
    onMouseMoveEvent(event) {
      if (event.buttons > 0) {
        let dx = -(this.iX - event.clientX)
        let dy = -(this.iY - event.clientY)
        this.iX = event.clientX
        this.iY = event.clientY
        this.changeTranslation({dx: dx, dy: dy})
      }
    },
    nodeClicked(node) {
      this.toggleNodeHighlightState(node)
    }
  }
}
</script>

<style scoped>
.svg-canvas {
  border: 1px solid black;;
  height: 100%;
}
</style>
