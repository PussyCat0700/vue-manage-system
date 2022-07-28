<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 新建村庄申请
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
                    <el-option key="1" label="四川省" value="四川省"></el-option>
                    <el-option key="2" label="重庆市" value="重庆市"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="uid" label="用户ID" width="70" align="center"></el-table-column>
                <el-table-column prop="name" label="申请人"></el-table-column>
                <el-table-column label="申请创建乡村信息">
                    <template #default="scope">{{ scope.row.cdesc }}</template>
                </el-table-column>
                <el-table-column prop="location" label="地址"></el-table-column>
                <el-table-column label="当前审核状态" align="center">
                    <template #default="scope">
                        <el-tag :type="
                                scope.row.passed === 0
                                    ? 'warning'
									: scope.row.passed === 1
                                    ? 'success'
									: 'danger'
                            ">{{ scope.row.passed === 0 ? "待审核" : scope.row.passed === 1 ? "审核通过" : "复议中"}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-circle-plus" @click="handleEdit(scope.$index, scope.row)">查看材料
                        </el-button>
                        <el-button type="text" icon="el-icon-error" class="red"
                            @click="handleDelete(scope.$index, scope.row)">拒绝</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                    :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="查看详细信息" v-model="editVisible" width="30%">
            <el-form label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.location"></el-input>
                </el-form-item>
				<el-form-item label="证明文件">
					<el-upload
					  action="https://jsonplaceholder.typicode.com/posts/"
					  list-type="picture-card">
					  <i class="el-icon-download"></i>
					</el-upload>
				</el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">通过审核</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData, updateCountry } from "../api/index";

export default {
    name: "basetable",
    setup() {
        const query = reactive({
            // location: "",
            // name: "",
            // pageIndex: 1,
            // pageSize: 10,
        });
        const tableData = ref([]);
        const pageTotal = ref(0);
        // 获取表格数据
        const getData = () => {
            fetchData(query).then((res) => {
                tableData.value = res.list;
                pageTotal.value = res.pageTotal || 50;
            });
        };
		const submitUpdate = (row, onSuccess, onError) =>{
			updateCountry(row).then((res)=>{
				onSuccess();
			}).catch((err)=>{
				onError();
				standardErrorProcedure(err);
			});
		}
        getData();

        // 查询操作
        const handleSearch = () => {
            query.pageIndex = 1;
            getData();
        };
        // 分页导航
        const handlePageChange = (val) => {
            query.pageIndex = val;
            getData();
        };
		const standardErrorProcedure = (err) => {
			console.log('出错啦！');
			console.log(err);
			ElMessage.error("操作失败，请检查网络");
		}

        // 删除操作
        const handleDelete = (index) => {
            // 二次确认删除
			let lastState = tableData.value[index].passed;
            ElMessageBox.confirm("确定要拒绝该请求吗？", "提示", {
                type: "warning",
            })
                .then(() => {
					tableData.value[index].passed = null;
					submitUpdate(tableData.value[index], 
					()=>{
						ElMessage.success('成功拒绝该请求');
					},
					()=>{
						tableData.value[index].passed = lastState;
					}
					);
                })
        };

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            name: "",
            location: "",
        });
        let idx = -1;
        const handleEdit = (index, row) => {
            idx = index;
            Object.keys(form).forEach((item) => {
                form[item] = row[item];
            });
            editVisible.value = true;
        };
        const saveEdit = () => {
			let lastState = tableData.value[idx].passed; 
			tableData.value[idx].passed = 1;
			submitUpdate(tableData.value[idx],
			()=>{
				ElMessage.success('审核通过');
				Object.keys(form).forEach((item) => {
				    tableData.value[idx][item] = form[item];
				});
				editVisible.value = false;
			},
			()=>{
				tableData.value[idx].passed = lastState;
			});
        };

        return {
            query,
            tableData,
            pageTotal,
            editVisible,
            form,
            handleSearch,
            handlePageChange,
            handleDelete,
            handleEdit,
            saveEdit,
        };
    },
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
