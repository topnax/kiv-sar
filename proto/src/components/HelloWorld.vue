<template>
  <div class="container-fluid canvas-container p-0">
      <svg-canvas
          id="main"
          :view-port="this.$store.state.viewPort"
          :nodes="this.$store.state.nodes"
          :links="this.$store.state.lines"
          :style="this.$store.state.style"/>
      </div>
      <div class="col-md-4 canvas-minimap-container" style="opacity: 0.9">
        <svg-minimap
            class="canvas-minimap"
            ref-id="main"
            :view-port="{height: 300}"
            :parent-view-port="this.$store.state.viewPort"
        />
      </div>

</template>

<script>
import {mapActions} from "vuex"
import SvgCanvas from "@/components/svg/SvgCanvas";
import SvgMinimap from "@/components/svg/SvgMinimap";

export default {
  name: 'HelloWorld',
  components: {SvgMinimap, SvgCanvas},
  methods: {
    ...mapActions(["increment", "decrement", "loadInitialData"])
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.canvas-container, .row, .col-md-8 {
  height: 100%;
}
.canvas-minimap-container {
  position: absolute;
  top: 0px;
  background: white;
  right: 0px;

}
</style>
