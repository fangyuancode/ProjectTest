<template>
	<div class="table">
		<el-table :data="tableData" :span-method="objectSpanMethods" border style="width: 100%">
			<template v-for="cols in colConfigs">
				<!-- 无需合并的列 -->
				<el-table-column
					v-if="cols.type === 'label' && !cols.children"
					:key="cols.prop"
					:prop="cols.prop"
					:label="cols.label"
				>
				</el-table-column>
				<!-- 需要合并的列 -->
				<template v-else-if="cols.type === 'label' && cols.children">
					<el-table-column
						v-for="children in cols.children"
						:key="children.prop"
						:prop="children.prop"
						:label="children.label"
					/>
				</template>
			</template>
		</el-table>
	</div>
</template>

<script>
	export default {
		name: 'Table',
		data() {
			return {
				tableData: [
					{ time: '2020-08-10', grade: '三年二班', name: '小明', subjects: '语文', score: 80 },
					{ time: '2020-08-10', grade: '三年二班', name: '小明', subjects: '数学', score: 80 },
					{ time: '2020-08-10', grade: '总成绩', name: '总成绩', subjects: '总成绩', score: 160 },
					{ time: '2020-08-10', grade: '三年一班', name: '小雷', subjects: '语文', score: 70 },
					{ time: '2020-08-10', grade: '三年一班', name: '小雷', subjects: '数学', score: 80 },
					{ time: '2020-08-10', grade: '总成绩', name: '总成绩', subjects: '总成绩', score: 150 },
					{ time: '2020-08-11', grade: '三年三班', name: '小花', subjects: '语文', score: 60 },
					{ time: '2020-08-11', grade: '三年三班', name: '小花', subjects: '数学', score: 60 },
					{ time: '2020-08-11', grade: '总成绩', name: '总成绩', subjects: '总成绩', score: 120 },
				],
				// 表格的信息 需要合并的需要放在 children 中
				colConfigs: [
					{
						type: 'label',
						children: [
							{ prop: 'time', label: '时间' },
							{ prop: 'grade', label: '年级' },
							{ prop: 'name', label: '姓名' },
							{ prop: 'subjects', label: '科目' },
							{ prop: 'score', label: '成绩' },
						],
					},
					// { type: 'label', prop: 'age', label: '年龄' },
				],
				// 需要合并的行列信息 index必须是table表格对应的下标 不能随意修改
				mergeCols: [
					{ index: 0, name: 'time' },
					{ index: 1, name: 'grade' },
					{ index: 2, name: 'name' },
					{ index: 3, name: 'subjects' },
					{ index: 4, name: 'score' },
					// { index: 5, name: 'age' }
				],
				// 用来记录每一个单元格的下标
				tableMergeIndex: [],
			};
		},
		methods: {
			objectSpanMethods({ row, column, rowIndex, columnIndex }) {
				let key = columnIndex + '_' + rowIndex;
				if (this.tableMergeIndex[key]) {
					return this.tableMergeIndex[key];
				}
			},
			newTableMergeData() {
				for (let i = 0; i < this.tableData.length; i++) {
					for (let j = 0; j < this.mergeCols.length; j++) {
						// 初始化行、列坐标信息
						let rowIndex = 1;
						let columnIndex = 1;
						// 比较横坐标左方的第一个元素
						if (
							j > 0 &&
							this.tableData[i][this.mergeCols[j]['name']] ===
								this.tableData[i][this.mergeCols[j - 1]['name']]
						) {
							columnIndex = 0;
						}
						// 比较纵坐标上方的第一个元素
						if (
							i > 0 &&
							this.tableData[i][this.mergeCols[j]['name']] ===
								this.tableData[i - 1][this.mergeCols[j]['name']]
						) {
							rowIndex = 0;
						}
						// 比较横坐标右方元素
						if (columnIndex > 0) {
							columnIndex = this.onColIndex(this.tableData[i], j, j + 1, 1, this.mergeCols.length);
						}
						// 比较纵坐标下方元素
						if (rowIndex > 0) {
							rowIndex = this.onRowIndex(this.tableData, i, i + 1, 1, this.mergeCols[j]['name']);
						}
						let key = this.mergeCols[j]['index'] + '_' + i;
						this.tableMergeIndex[key] = [rowIndex, columnIndex];
					}
				}
			},
			/**
			 * 计算列坐标信息
			 * data 单元格所在行数据
			 * index 当前下标
			 * nextIndex 下一个元素坐标
			 * count 相同内容的数量
			 * maxLength 当前行的列总数
			 */
			onColIndex(data, index, nextIndex, count, maxLength) {
				// 比较当前单元格中的数据与同一行之后的单元格是否相同
				if (
					nextIndex < maxLength &&
					data[this.mergeCols[index]['name']] === data[this.mergeCols[nextIndex]['name']]
				) {
					return this.onColIndex(data, index, ++nextIndex, ++count, maxLength);
				}
				return count;
			},
			/**
			 * 计算行坐标信息
			 * data 表格总数据
			 * index 当前下标
			 * nextIndex 下一个元素坐标
			 * count 相同内容的数量
			 * name 数据的key
			 */
			onRowIndex(data, index, nextIndex, count, name) {
				// 比较当前单元格中的数据与同一列之后的单元格是否相同
				if (nextIndex < data.length && data[index][name] === data[nextIndex][name]) {
					return this.onRowIndex(data, index, ++nextIndex, ++count, name);
				}
				return count;
			},
		},
		mounted() {
			if (this.mergeCols.length > 0) {
				this.newTableMergeData();
			}
		},
	};
</script>

<style lang="scss" scoped>
	.table {
		height: 100vh;
		width: 100%;
		padding: 40px;
		box-sizing: border-box;
		::v-deep .el-table__body tr:hover > td {
			background-color: #fff;
		}
	}
</style>
