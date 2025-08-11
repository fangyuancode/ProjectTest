<template>
  <el-row class="contnet" :gutter="20">
    <!-- // 1. 左侧树 -->
    <el-col id="left-tree" class="left-tree" :offset="0" :span="6">
      <!-- // 目录树（不是该文章的主要解析项，不多介绍） -->

      <el-tree :data="data" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps">
      </el-tree>
      <!-- // 2. 中间拖动栏 -->
      <div id="resize" class="resize" title="收缩侧边栏">⋮</div>
    </el-col>
    <!-- // 3. 右侧内容 -->
    <el-col id="right-content" class="right-content" :offset="0" :span="18">
      <el-table ref="table" border :data="list" row-key="id" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column align="center" label="#" width="55">
          <template #default="{ $index }">
            {{ $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="文件名称" prop="originalName" />
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      list: [],
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  mounted() {
    this.dragControllerDiv();
  },
  methods: {
    dragControllerDiv() {
      // 获取左侧树形结构的DOM元素
      const left = document.getElementById("left-tree");
      // 获取用于调整大小的线条的DOM元素
      const line = document.getElementById("resize");
      // 获取右侧内容区域的DOM元素
      const right = document.getElementById("right-content");

      // 为调整大小的线条添加鼠标按下事件监听器
      line.onmousedown = (e) => {
        // 记录鼠标按下时的X坐标
        const startX = e.clientX;
        // 记录线条初始的left偏移量
        const initialLeft = line.offsetLeft;

        // 定义鼠标拖动事件的处理函数
        const onMouseMove = (e) => {
          // 计算线条新的left偏移量
          const moveLen = initialLeft + (e.clientX - startX);
          // 计算最小宽度（视口宽度的10%）
          const minWidth = document.body.clientWidth * 0.1;
          // 计算最大宽度（视口宽度的40%）
          const maxWidth = document.body.clientWidth * 0.4;

          // 检查新的left偏移量是否在允许的范围内
          if (moveLen >= minWidth && moveLen <= maxWidth) {
            // 设置线条新的left偏移量
            line.style.left = moveLen + "px";
            // 设置左侧树形结构新的宽度
            left.style.width = moveLen + "px";
            // 设置右侧内容区域新的宽度，确保左右两侧总宽度等于视口宽度
            right.style.width = document.body.clientWidth - moveLen + "px";
          }
        };

        // 定义鼠标抬起事件的处理函数
        const onMouseUp = () => {
          // 移除鼠标拖动事件监听器
          document.removeEventListener("mousemove", onMouseMove);
          // 移除鼠标抬起事件监听器
          document.removeEventListener("mouseup", onMouseUp);
        };

        // 添加鼠标拖动事件监听器
        document.addEventListener("mousemove", onMouseMove);
        // 添加鼠标抬起事件监听器
        document.addEventListener("mouseup", onMouseUp);
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.contnet {
  display: flex; /* 使用flex布局，使子元素可以按照弹性盒子模型排列 */
}

.left-tree {
  position: relative; /* 相对定位，使内部的绝对定位元素（如.resize）相对于此元素定位 */
  width: 500px; /* 左侧树形结构的宽度为500像素 */
  height: 100%; /* 高度占满父元素的100%，如果存在box-sizing，此处设置会影响，可以先去掉看看效果 */
  background: #fff; /* 背景颜色为白色 */
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.050980392156862744); /* 添加轻微的阴影效果 */
  border-radius: 4px; /* 边框圆角为4像素 */
  vertical-align: top; /* 垂直方向上与相邻行内元素顶部对齐 */
  display: inline-block; /* 显示为行内块元素 */
  box-sizing: border-box; /* 盒模型采用border-box，这样padding和border不会增加元素的宽度和高度 */
  -ms-flex-negative: 0; /* 兼容性设置，阻止在IE 10及以下版本中收缩 */
  flex-shrink: 0; /* 阻止收缩，确保左侧树形结构在父容器中不被压缩 */
  padding: 10px 0 0 10px; /* 内边距设置，上0，右0，下0，左10像素 */
  margin-right: 8px; /* 右侧外边距为8像素 */
}

.resize {
  cursor: col-resize; /* 鼠标悬停时显示列调整的光标 */
  position: absolute; /* 绝对定位，相对于最近的已定位祖先元素进行定位 */
  top: 45%; /* 距离顶部50%，垂直居中 */
  right: -8px; /* 距离右侧-8像素，显示在左侧树形结构的右侧边缘 */
  background-color: #d6d6d6; /* 背景颜色为浅灰色 */
  border-radius: 5px; /* 边框圆角为5像素 */
  margin-top: -10px; /* 上方外边距为-10像素，调整垂直位置 */
  width: 10px; /* 宽度为10像素 */
  height: 50px; /* 高度为50像素 */
  background-size: cover; /* 背景图片覆盖整个元素 */
  background-position: 50%; /* 背景图片居中显示 */
  font-size: 32px; /* 字体大小为32像素 */
  color: #fff; /* 字体颜色为白色 */
}

.right-content {
  display: inline-block; /* 显示为行内块元素 */
  width: calc(
    100% - 510px
  ); /* 宽度为父元素宽度减去左侧树形结构宽度和调整边距，这里假设左侧树形结构宽度500px，右侧外边距8px，左侧内边距10px */
  height: 100%; /* 高度占满父元素的100% */
  background: #fff; /* 背景颜色为白色 */
  -webkit-box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.050980392156862744); /* 添加轻微的阴影效果，兼容webkit内核浏览器 */
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.050980392156862744); /* 添加轻微的阴影效果 */
  border-radius: 4px; /* 边框圆角为4像素 */
  -webkit-box-sizing: border-box; /* 兼容性设置，盒模型采用border-box */
  box-sizing: border-box; /* 盒模型采用border-box，这样padding和border不会增加元素的宽度和高度 */
  padding: 10px; /* 上下左右内边距均为10像素 */
  vertical-align: top; /* 垂直方向上与相邻行内元素顶部对齐 */
  overflow: auto; /* 内容超出容器时出现滚动条 */
}
</style>
