import {createStore} from 'vuex'
import loadTestData from '@/utils/graph_loader.js'
import force_directed_layout from '@/utils/graph_loader.js'


let scaleD = 0.1

export default createStore({
    state: {
        count: 0,
        lines: [
            //getLine(10, 10, 300, 10, 0,  "loves"),
            //getLine(25, 400, 300, 10, 0,  "hates")
        ],
        nodes: [
            //getNode(10, 10, null, 0, "Node 1"),
            //getNode(300, 10, null, 1, "Node X"),
            //getNode(25, 400, null, 2, "Sherlock"),
        ],
        style: {
            line: {
                strokeColor: "#888888AA",
                tipColor: "#444444",
                strokeWidth: 4,
                fontSize: 1.5,
                textBottomOffset: 15,
                arrowSize: 9,
                textColor: "red"
            },
            node: {
                strokeWidth: 1,
                fillColor: "white",
                highlightedFillColor: "#F44336",
                strokeColor: "black",
                radius: 50
            }
        },
        viewPort: {
            scale: 1,
            tx: 0,
            ty: 0,
            width: window.innerWidth,
            height: window.innerHeight
        }
    },
    getters: {},
    mutations: {
        INCREMENT_COUNTER(state, {targetX, targetY}) {
            console.log(targetX)
            console.log(targetY)
            // let original_scale = state.viewPort.scale
            // let screen_size = [window.innerWidth, window.innerHeight]
            // let viewSize = [window.innerWidth * 1 / original_scale,
            //     window.innerHeight * 1 / original_scale];
            // console.log(`tx=${state.viewPort.tx}, tx=${state.viewPort.ty}`)

            // let shift_fraction = [targetX / screen_size[0], targetY / screen_size[1]];
            state.viewPort.scale += scaleD

            // state.viewPort.tx -= (viewSize[0] - viewSize[0] / (state.viewPort.scale) * (original_scale)) * shift_fraction[0];
            // state.viewPort.ty -= (viewSize[1] - viewSize[1] / (state.viewPort.scale) * (original_scale)) * shift_fraction[1];
        },
        DECREMENT_COUNTER(state) {
            if (state.viewPort.scale - scaleD > 0.1) {
                state.viewPort.scale -= scaleD
            }
        },
        HIGHLIGHT_NODE(state, node) {
            node.highlighted = true
        },
        DISABLE_NODE_HIGHLIGHT(state, node) {
            node.highlighted = false
        },
        CHANGE_TRANSLATION(state, {dx, dy}) {
            state.viewPort.tx += dx
            state.viewPort.ty += dy
        },
        CHANGE_NODE_POS(state, {node, dx, dy}) {
            node.x += dx
            node.y += dy
        },
        // eslint-disable-next-line no-unused-vars
        SET_GRAPH_DATA(state, {edges, vertices}) {
            // console.log(edges)
            // console.log(vertices)
            state.nodes = vertices
            state.lines = edges
            console.log(state)
        }
    },
    actions: {
        async increment({commit}, event) {
            console.log("incre")
            console.log(event)
            commit("INCREMENT_COUNTER", event)
        },
        async decrement({commit}) {
            commit("DECREMENT_COUNTER")
        },
        async toggleNodeHighlightState({commit}, node) {
            if (node.highlighted) {
                commit("DISABLE_NODE_HIGHLIGHT", node)
            } else {
                commit("HIGHLIGHT_NODE", node)
            }
        },
        async changeTranslation({commit}, payload) {
            commit("CHANGE_TRANSLATION", payload)
        },
        async changeNodePos({commit}, payload) {
            commit("CHANGE_NODE_POS", payload)
        },
        // eslint-disable-next-line no-unused-vars
        async loadInitialData({commit}, graph) {
            loadTestData.prepare_graph_object(graph, 5000)
            force_directed_layout.force_directed_layout(graph, 5000, 5000, 20)
            commit("SET_GRAPH_DATA", graph)
        }
    }
})
