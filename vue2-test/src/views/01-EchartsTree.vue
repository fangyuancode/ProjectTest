<template>
  <div class="ent-structure" ref="ent-structure">
    <div class="ent-tree" ref="ent-tree"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      treeData: {
        id: "1362",
        name: "总企业",
        relationType: 0,
        childList: [
          {
            id: "2095",
            name: "测试企业dfsfsf1",
            relationType: 1,
            childList: [],
          },

          {
            id: "2120",
            name: "测试企业2",
            relationType: 2,
            childList: [
              {
                id: "2121",
                name: "测试企业21",
                relationType: 1,
                childList: [],
              },
              {
                id: "2122",
                name: "测试企业22",
                relationType: 1,
                childList: [],
              },
            ],
          },
          {
            id: "1448",
            name: "测试企业3",
            relationType: 2,
            childList: [
              {
                id: "2048",
                name: "测试企业31",
                relationType: 1,
                childList: [],
              },

              {
                id: "2177",
                name: "90794",
                relationType: 1,
                childList: [],
              },
              {
                id: "2179",
                name: "51425",
                relationType: 2,
                childList: [
                  {
                    id: "2180",
                    name: "67685",
                    relationType: 2,
                    childList: [],
                  },
                  {
                    id: "2181",
                    name: "666",
                    relationType: 1,
                    childList: [],
                  },
                ],
              },
              {
                id: "2188",
                name: "28701",
                relationType: 2,
                childList: [],
              },
            ],
          },
        ],
      },
      Echarts: null,
      childLength: [],
    };
  },

  mounted() {
    this.formatData(this.treeData);
    window.onresize = () => {
      this.$nextTick(() => {
        this.Echarts.resize();
      });
    };
  },

  methods: {
    formatData(data) {
      this.$nextTick(() => {
        this.recursive(data);
        this.setCanvasWidth();
        this.renderTree(data);
      });
    },

    // 递归-给每个子节点中添加 children
    recursive(data) {
      if (data.childList) {
        this.childLength.push(data.childList.length);
        data.children = data.childList;
        data.childList.forEach((item) => {
          this.recursive(item);
        });
      } else {
        return;
      }
    },

    //  根据树的childList设置容器宽度
    setCanvasWidth() {
      let container = document.getElementsByClassName("ent-structure")[0];
      let maxLen = Math.max(...this.childLength);
      if (maxLen <= 5) {
        container.style.width = "1000px";
        container.style.height = "700px";
      } else {
        container.style.width = `${maxLen * 180}px`;
      }
    },

    // 绘制企业结构的echarts
    renderTree(data) {
      this.childLength = [];
      this.Echarts = echarts.init(this.$refs["ent-tree"]);

      const options = {
        tooltip: {
          // 提示框浮层设置
          trigger: "item",
          triggerOn: "mousemove", // 提示框触发条件
        },
        series: [
          {
            type: "tree",
            data: [this.treeData],
            nodePadding: 30, //结点间距 （发现没用）
            layerPadding: 10, //连接线长度 （发现没用）
            name: "树图",
            top: "1%", // 组件离容器上侧的距离，像素值20，或相对容器的百分比20%
            left: "1%", // 组件离容器左侧的距离
            bottom: "1%", // 组件离容器下侧的距离
            right: "1%", // 组件离容器右侧的距离
            layout: "orthogonal", // 树图的布局，正交orthogonal和径向radial两种
            orient: "TB", // 树图中正交布局的方向，'LR','RL','TB','BT'，只有布局是正交时才生效
            edgeShape: "curve", // 树图边的形状，有曲线curve和折线polyline两种，只有正交布局下生效
            zoom: 0.8, //当前视角的缩放比例
            roam: true, //是否开启平游或缩放  // 是否开启鼠标缩放或平移，默认false
            scaleLimit: {
              //滚轮缩放的极限控制
              min: 0.2,
              max: 1,
            },
            initialTreeDepth: undefined, // 树图初始的展开层级（深度），根节点是0，不设置时全部展开
            symbol: "circle", // 标记的图形，默认是emptyCircle;circle,rect,roundRect,triangle,diamond,pin,arrow,none
            // symbolRotate: 270, // 配合arrow图形使用效果较好
            symbolSize: 6, // 大于0时是圆圈，等于0时不展示，标记的大小
            itemStyle: {
              // 树图中每个节点的样式
              color: "#0780ED", // 节点未展开时的填充色
              // borderWidth: 1, // 描边线宽，为0时无描边
              // borderType: 'dotted', // 描边类型
              borderCap: "round", // 指定线段末端的绘制方式butt方形结束，round圆形结束，square
              // shadowColor: 'rgba(0,121,221,0.3)', // 阴影颜色
              // shadowBlur: 16, // 图形阴影的模糊大小
              // opacity: 1 // 图形透明度
            },
            label: {
              // 每个节点对应的文本标签样式
              show: true, // 是否显示标签
              distance: 8, // 文本距离图形元素的距离
              position: ["50%", "50%"], // 标签位置
              verticalAlign: "middle", // 文字垂直对齐方式，默认自动，top，middle，bottom
              align: "center", // 文字水平对齐方式，默认自动，left，right，center
              fontSize: 16, // 字体大小
              color: "#333", // 字体颜色
              // color: 'red', // 字体颜色
              backgroundColor: "#F8F9FA", // 文字块的背景颜色
              borderColor: "#CED4DA", // 文字块边框颜色
              borderWidth: 1, // 文字块边框宽度
              borderType: "solid", // 文字块边框描边类型 solid dashed dotted
              borderRadius: 2, // 文字块的圆角
              padding: [6, 12], // 文字块内边距
              shadowColor: "rgba(0,121,221,0.3)", // 文字块的背景阴影颜色
              shadowBlur: 6, // 文字块的背景阴影长度
              // height: 130,
              // width: 12,
              // rotate: -90,
              // 文字超出宽度是否截断或者换行；只有配置width时有效
              // overflow: 'truncate', // truncate截断，并在末尾显示ellipsis配置的文本，默认为...;break换行;breakAll换行，并强制单词内换行
              // ellipsis: '...',
              formatter: (params) => {
                let newName = "";
                let len = params.data.name.length;
                let strLen = params.data.relationType === 0 ? 100 : 1; //一行显示几个字
                let rowNum = Math.ceil(len / strLen);
                if (len > strLen) {
                  for (let p = 0; p < rowNum; p++) {
                    let tempStr = "";
                    let start = p * strLen;
                    let end = start + strLen;
                    if (p == rowNum - 1) {
                      tempStr = params.data.name.substring(start, len);
                    } else {
                      tempStr = params.data.name.substring(start, end) + "\n";
                    }
                    newName += tempStr;
                  }
                } else {
                  newName = params.data.name;
                }
                let n = newName;
                if (n.length > 16) {
                  n = n.slice(0, 16) + "...";
                }
                let str = `{name|${n}}`;
                let isMain = params.data.relationType === 0;
                str = isMain ? `{name|${n}} {current|本企业} {main|总部}` : str;
                // console.log("str", str);
                return str;
              },
              rich: {
                name: {
                  fontSize: 14,
                },
                current: {
                  fontSize: 12,
                  padding: 0,
                  color: "#07CA42",
                  fontWeight: 600,
                  backgroundColor: "#E5F7EA",
                  borderRadius: 2,
                },
                main: {
                  color: "#0780ED",
                  fontSize: 12,
                  padding: 0,
                  fontWeight: 600,
                  backgroundColor: "#E6F2FD",
                  borderRadius: 2,
                },
              },
            },

            labelLayout: {
              dy: -20,
              verticalAlign: "top",
            },
            lineStyle: {
              // 树图边的样式
              // color: 'rgba(0,0,0,.35)', // 树图边的颜色
              width: 1, // 树图边的宽度
              // curveness: 1, // 树图边的曲度
              shadowColor: "rgba(0, 0, 0, 0.5)", // 阴影颜色
              // shadowBlur: 10 // 图形阴影的模糊大小
            },
            blur: {
              // 淡出状态的相关配置，开启emphasis.focus后有效
              itemStyle: {}, // 节点的样式
              lineStyle: {}, // 树图边的样式
              label: {}, // 淡出标签的文本样式
            },
            leaves: {
              // 叶子节点的特殊配置
              label: {
                // 叶子节点的文本标签样式
                distance: 0,
                position: "bottom",
                verticalAlign: "middle",
              },
              itemStyle: {}, // 叶子节点的样式
              emphasis: {}, // 叶子节点高亮状态的配置
              blur: {}, // 叶子节点淡出状态的配置
              select: {}, // 叶子节点选中状态的配置
            },
            animation: true, // 是否开启动画
            expandAndCollapse: true, // 子树折叠和展开的交互，默认打开
            animationDuration: 550, // 初始动画的时长
            animationEasing: "linear", // 初始动画的缓动效果
            animationDelay: 0, // 初始动画的延迟
            animationDurationUpdate: 750, // 数据更新动画的时长
            animationEasingUpdate: "cubicInOut", // 数据更新动画的缓动效果
            animationDelayUpdate: 0, // 数据更新动画的延迟
          },
        ],
      };

      /**
       * 遍历数节点
       */
      function nodesStutes(nodes) {
        if (nodes.childList && nodes.childList.length) {
          for (let i = 0; i < nodes.childList.length; i++) {
            if (nodes.childList[i].relationType === 2) {
              // 修改连线颜色
              nodes.childList[i].lineStyle = {
                color: "#6DD400",
              };
            } else if (nodes.childList[i].relationType === 1) {
              nodes.childList[i].lineStyle = {
                color: "#0780ED",
              };
            }
            nodesStutes(nodes.childList[i]);
          }
        }
      }

      nodesStutes(data);
      this.Echarts.setOption(options, true);
    },
  },
  watch: {
    "$route.path": {
      handler(val, oldval) {
        console.log("老路由信息", oldval); //老路由信息
        console.log("新路由信息", val); //新路由信息
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style  scoped>
.ent-structure {
  width: 100%;
  height: 100%;
  background: #fff;
}

.ent-tree {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
