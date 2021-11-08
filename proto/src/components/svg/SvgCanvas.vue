<template>
  <div class="svg-canvas">
    <svg
        :id="id"
        :width="'100%'"
        :height="'100%'"
    >
      <!-- import common SVG components, such as arrow heads that are used when displaying an edge-->
      <SvgComponents
          :style="style.line"/>

      <g :transform="`
            translate(${viewPort.tx}, ${viewPort.ty})
            scale(${viewPort.scale})`">

        <!-- nested in order to be able to create a minimap that is not affected by viewport transformations-->
        <g :id="`${id}-root-element`">

          <Edge v-for="l in edges"
                :start-x="vertices[l.from].x"
                :start-y="vertices[l.from].y"
                :end-x="vertices[l.to].x"
                :end-y="vertices[l.to].y"
                :title="l.description"
                :style="style.line"
                :start-offset="style.node.radius"
                :key="`link-${l.id}`"/>

          <Vertex v-for="n in vertices"
                  :id="n.id"
                  :x="n.x"
                  :y="n.y"
                  :title="n.name"
                  :style="style.node"
                  :radius="n.radius"
                  :highlighted="n.highlighted"
                  :on-click="() => onNodeClicked(n)"
                  :key="`node-${n.id}`"/>

        </g>
      </g>
    </svg>
  </div>
</template>
<script>
import Edge from "@/components/svg/Edge";
import Vertex from "@/components/svg/Vertex";
import SvgComponents from "@/components/svg/SvgComponents";
import {mapActions} from "vuex";

export default {
  components: {SvgComponents, Vertex, Edge},
  props: {
    id: String,
    width: Number,
    height: Number,
    edges: Array,
    vertices: Array,
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
    let id = `${this.id}`
    // hook up event listeners for particular mouse events
    document.getElementById(id).addEventListener("wheel", this.onMouseWheelEvent);
    document.getElementById(id).addEventListener("mousemove", this.onMouseMoveEvent);
    document.getElementById(id).addEventListener("mousedown", this.onMouseDownEvent);
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
      // perform viewport translation
      if (event.buttons > 0) {
        let dx = -(this.iX - event.clientX)
        let dy = -(this.iY - event.clientY)
        this.iX = event.clientX
        this.iY = event.clientY
        this.changeTranslation({dx: dx, dy: dy})
      }
    },
    onNodeClicked(node) {
      // toggle node highlight state when clicked
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
