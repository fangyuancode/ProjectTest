<template>
	<div id="app">
		<nav>
			<router-link to="/wangEditor">编辑器</router-link> |
			<router-link to="/">echarts树形图结构配置</router-link> |
			<router-link to="/about">记住密码</router-link> |
			<router-link to="/test">二维码生成</router-link> |
			<router-link to="/getheight">获取元素高度</router-link> |
			<router-link to="/ExportWord">导出world</router-link> |
			<router-link to="/getContent">导出试题</router-link> |
			<router-link to="/NewPage">打开新页面</router-link> |
			<router-link to="/menu">菜单</router-link> |
			<router-link to="/DragSide">拖拽侧边栏</router-link> |
			<router-link to="/MergeTable">合并行单元格</router-link> |
			<router-link to="/MergeColumn">合并列单元格</router-link> |

			<!-- MergeColumn -->
		</nav>
		<router-view />
	</div>
</template>
<style src="@wangeditor/editor/dist/css/style.css"></style>

<style lang="scss">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		width: 100%;
		height: 100%;
	}
</style>
