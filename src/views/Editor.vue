<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>公告发布</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">
                对辖区下所有乡村发布公告。
                <a href="https://www.wangeditor.com/doc/" target="_blank">发布公告教程</a>
            </div>
            <div class="mgb20" ref='editor'></div>
            <el-button type="primary" @click="syncHTML">提交</el-button>
        </div>
    </div>
</template>

<script>
import WangEditor from "wangeditor";
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
export default {
    name: "editor",
    setup() {
        const editor = ref(null);
        const content = reactive({
            html: "",
            text: "",
        });
        let instance;
        onMounted(() => {
            instance = new WangEditor(editor.value);
            instance.config.zIndex = 1;
            instance.create();
        });
        onBeforeUnmount(() => {
            instance.destroy();
            instance = null;
        });
        const syncHTML = () => {
            content.html = instance.txt.html();
            console.log(content.html);
        };
        return {
            syncHTML,
            editor,
            content,
        };
    },
};
</script>

<style>
</style>
