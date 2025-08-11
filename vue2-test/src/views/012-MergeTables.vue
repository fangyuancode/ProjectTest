<template>
	<div class="table">
		<el-table :data="tableData" :span-method="objectSpanMethod" border style="width: 100%">
			<el-table-column prop="time" label="时间"></el-table-column>
			<el-table-column prop="grade" label="年级"></el-table-column>
			<el-table-column prop="name" label="姓名"></el-table-column>
			<el-table-column prop="subjects" label="科目"></el-table-column>
			<el-table-column prop="score" label="成绩"></el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		name: 'Table',
		data() {
			return {
				tableData: [
					{ time: '2025-08-10', grade: '三年二班', name: '小明', subjects: '语文', score: 80 },
					{ time: '2025-08-10', grade: '三年二班', name: '小明', subjects: '数学', score: 80 },
					{ time: '2025-08-10', grade: '三年一班', name: '小雷', subjects: '语文', score: 70 },
					{ time: '2025-08-10', grade: '三年一班', name: '小雷', subjects: '数学', score: 80 },
					{ time: '2025-08-11', grade: '三年三班', name: '小花', subjects: '语文', score: 60 },
				],
				mergeObj: {},
				mergeArr: ['time', 'grade', 'name', 'subjects', 'score'],
			};
		},
		methods: {
			getSpanArr(data) {
				// 遍历需要合并单元格的列（mergeArr 数组中的每一项代表一个需要合并的列名）
				this.mergeArr.forEach((key, index1) => {
					let count = 0; // 记录当前连续相同值的起始行索引
					this.mergeObj[key] = []; // 为当前列初始化合并信息存储数组

					// 遍历数据源每一行
					data.forEach((item, index) => {
						// 第一行数据特殊处理
						if (index === 0) {
							// 第一行总是需要显示（合并计数为1）
							this.mergeObj[key].push(1);
						} else {
							// 判断当前行与上一行在当前列的值是否相同
							if (item[key] === data[index - 1][key]) {
								// 值相同：增加起始行的合并数，当前行标记为0（表示被合并）
								this.mergeObj[key][count] += 1;
								this.mergeObj[key].push(0);
							} else {
								// 值不同：更新连续相同值的起始位置为当前行索引
								count = index;
								// 当前行作为新合并组的起始行（合并计数为1）
								this.mergeObj[key].push(1);
							}
						}
					});
				});
				console.log('mergeObj', this.mergeObj);
			},

			// 单元格合并方法（Element UI 表格合并要求的方法）
			objectSpanMethod({ row, column, rowIndex, columnIndex }) {
				// 检查当前列是否在需要合并的列数组中
				if (this.mergeArr.indexOf(column.property) !== -1) {
					// 获取当前列的合并配置信息
					const spanInfo = this.mergeObj[column.property];
					// console.log('spanInfo', spanInfo);
					// 当前行有有效合并配置（>0 表示是合并组的第一行）
					if (spanInfo[rowIndex]) {
						// 返回合并配置 [纵向合并行数, 横向合并列数]
						return [spanInfo[rowIndex], 1]; // 1表示不横向合并
					} else {
						// 0表示当前行被合并，不显示
						return [0, 0];
					}
				}
			},
		},
		mounted() {
			this.getSpanArr(this.tableData);
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
