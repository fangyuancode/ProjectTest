<template>
  <div class="home">

    <div id="paper"></div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { dia, shapes } from "@joint/core";
const handlePicture = () => {
  const namespace = shapes;

  const graph = new dia.Graph({}, { cellNamespace: namespace });

  const paper = new dia.Paper({
    el: document.getElementById("paper"),
    model: graph,
    width: 800,
    height: 800,
    background: { color: "#F5F5F5" },
    cellViewNamespace: namespace,
  });
  console.log("paper", paper);
  const rect1 = new shapes.standard.Rectangle();
  rect1.position(25, 25);
  rect1.resize(180, 50);
  rect1.addTo(graph);

  const rect2 = new shapes.standard.Rectangle();
  rect2.position(95, 225);
  rect2.resize(180, 50);
  rect2.addTo(graph);

  const rect3 = new shapes.standard.Rectangle();
  rect3.position(405, 225);
  rect3.resize(180, 50);
  rect3.addTo(graph);

  rect1.attr("body", { stroke: "#C94A46", rx: 2, ry: 2 });
  rect2.attr("body", { stroke: "#C94A46", rx: 2, ry: 2 });
  rect3.attr("body", { stroke: "#C94A46", rx: 2, ry: 2 });

  rect1.attr("label", { text: "RS", fill: "#353535" });
  rect2.attr("label", { text: "&", fill: "#353535" });
  rect3.attr("label", { text: "R", fill: "#353535" });
  const link = new shapes.standard.Link();
  link.source(rect1);
  link.target(rect2);
  link.addTo(graph);
  link.appendLabel({
    attrs: {
      text: {
        text: "to the",
      },
    },
  });
  link.router("orthogonal");
  link.connector("straight", { cornerType: "line" });

  const link1 = new shapes.standard.Link();
  link1.source(rect2);

  link1.target(rect3);
  link1.addTo(graph);
  link1.appendLabel({
    attrs: {
      text: {
        text: "to the",
      },
    },
  });
  link1.router("orthogonal");
  link1.connector("straight", { cornerType: "line" });
};

onMounted(() => {
  handlePicture();
});
</script>
<style  scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>