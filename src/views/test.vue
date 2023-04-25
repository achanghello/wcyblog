<template>
    <div class="infinite-list" style="overflow: auto" v-infinite-scroll.loading.complated.immediate="load">
        <AcCard shadow="hover" class="box-card">
            哈哈哈
            <button @click="ClickChange">点击出现message</button>
            <AcUpload class="avatar-uploader">
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="ac-icon-jiazai avatar-uploader-icon"></i>
            </AcUpload>
        </AcCard>
        <ac-drawer v-model="isShowDrawer4"
      direction="right"
      :clickMaskClose="true"
    >
      <template v-slot:title>
        <span >右侧命名插槽弹出哦^_^</span>
      </template>
      <span>设置点击背景遮罩层不关闭，只能点击小箭头，或自定义按钮关闭</span>
      <br />
      <br />
      <br />
      <br />
      1233
    </ac-drawer>
        <ul>
            <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
        </ul>
        <p v-if="loading && !complated" class="text">加载中...</p>
        <p v-if="complated" class="text">没有更多了</p>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, h, onMounted, reactive, ref } from "vue";
import Message from "../../packages/message/src/index";
export default defineComponent({
    setup(props,ctx) {
        let count = ref(1),
            loading = ref(false),
            complated = ref(false)

        const load = () => {
            loading.value = true
            setTimeout(() => {
                if (count.value >= 30) {
                    complated.value = true
                    return
                }
                count.value += 3
                loading.value = false
            }, 1000)
        }


        let instance = getCurrentInstance()

        const isShowDrawer4 = ref(false)

        function ClickChange(){
            // instance.proxy.$message({
            //     id: "1",
            //     message: "你好呀",
            //     center: true,
            // })
            Message({ text:"你的名字" })
        }
        const imageUrl = ref('')
        return {
            count,
            loading,
            complated,
            load,

            ClickChange,
            imageUrl,
            isShowDrawer4
        }
    }
})
</script>

<style lang="scss" scoped>
.infinite-list {
    padding-top: 100px;
    height: calc(100vh - 100px);
    width: 100%;
    border: 1px solid red;

    .box-card {
        width: 80%;
        min-width: 1000px;
        max-width: 1200px;
        margin: 0 auto;
    }

    li {
        height: 50px;
        background: #e8f3fe;
        margin: 10px;
        color: #7dbcfc;
        text-align: center;
        line-height: 50px;
    }

    .text {
        color: green;
        text-align: center;
        line-height: 50px;
    }
}


.avatar-uploader-icon {
    display: block;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>