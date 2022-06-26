<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>新建乡村表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="乡村名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
                                    style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2"></el-col>
                        <el-col :span="11">
                            <el-form-item prop="date2">
                                <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;">
                                </el-time-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="城市级联" prop="options">
                        <el-cascader :options="options" v-model="form.options"></el-cascader>
                    </el-form-item>
                    <el-form-item label="乡村图片">
                    	<el-upload
                    	  action="https://jsonplaceholder.typicode.com/posts/"
                    	  list-type="picture-card">
                    	  <i class="el-icon-plus"></i>
                    	</el-upload>
                    </el-form-item>
                    <el-form-item label="乡村简介" prop="desc">
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button @click="onReset">重置表单</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
export default {
    name: "baseform",
    setup() {
        const options = [
            {
                value: "sichuan",
                label: "四川省",
                children: [
                    {
                        value: "chengdu",
                        label: "成都市",
                        children: [
                            {
                                value: "shuangliu",
                                label: "双流区",
                            },
                            {
                                value: "tianfuxinqu",
                                label: "天府新区",
                            },
                        ],
                    },
                    {
                        value: "zigong",
                        label: "自贡市",
                        children: [
                            {
                                value: "ziliujing",
                                label: "自流井区",
                            },
                            {
                                value: "xinqu",
                                label: "新区",
                            },
                        ],
                    },
                ],
            },
            {
                value: "chongqing",
                label: "重庆市",
                children: [
                    {
                        value: "chongqing",
                        label: "重庆市",
                        children: [
                            {
                                value: "chongqing",
                                label: "重庆市",
                            },
                        ],
                    },
                ],
            },
        ];
        const rules = {
            name: [
                { required: true, message: "请输入乡村名称", trigger: "blur" },
            ],
        };
        const formRef = ref(null);
        const form = reactive({
            name: "",
            region: "",
            date1: "",
            date2: "",
            delivery: true,
            type: ["步步高"],
            resource: "小天才",
            desc: "",
            options: [],
        });
        // 提交
        const onSubmit = () => {
            // 表单校验
            formRef.value.validate((valid) => {
                if (valid) {
                    console.log(form);
                    ElMessage.success("提交成功！");
                } else {
                    return false;
                }
            });
        };
        // 重置
        const onReset = () => {
            formRef.value.resetFields();
        };

        return {
            options,
            rules,
            formRef,
            form,
            onSubmit,
            onReset,
        };
    },
};
</script>