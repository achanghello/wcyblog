<template>
    <div class="box">
        <div class="box-left">
            <!-- <img src="https://t7.baidu.com/it/u=4162611394,4275913936&fm=193&f=GIF" alt=""> -->
            <img v-lazy="blog.cover" alt="">
        </div>
        <div class="box-right">
            <h3>
                <span class="fc-blue" v-if="blog.type==0">【转载】</span>
                <span class="fc-blue" v-if="blog.type==1">【原创】</span>
                <span class="fc-blue" v-if="blog.type==2">【VIP原创】</span>
                {{blog.title}}
            </h3>
            <!-- <p>{{blog}}</p> -->
            <p>{{blog.summary}}</p>
            <div class="box-right-footer">
                <div class="left">
                    <div><AcTag type="success">{{blog.tag}}</AcTag></div>
                    <div style="margin:0 15px">{{blog.author}}</div>
                    <div>{{new Date(blog.releaseTime).toLocaleString()}}</div>
                </div>
                <div class="center"></div>
                <div class="right">
                <div>点赞<i class="ac-icon-dianzan"></i>:{{blog.suki}}</div>
                <!-- <div>点赞量:{{blog.suki}}</div> -->
                <div style="margin:0 15px">收藏<i class="ac-icon-shoucang"></i>:{{blog.collection}}</div>
                <div><i class="ac-icon-yanjing">阅读</i>:{{blog.views}}</div>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'AcBlogitem',
    props:{
        blog:{
            type:Object,
            required:true
        }
    }
})
</script>

<style lang="scss" scoped>
.box {
    height: 200px;
    display: flex;
    transition: 1s;
    background: linear-gradient(to right, #ebebeb 0, transparent 100%);
    &:hover {
        background: linear-gradient(to left, #ebebeb 0, transparent 100%);
    }
  }

  .box > div {
    height: 100%;
  }

  .box-left {
    width: 200px;
    img {
            width: 100%;
            height: 80%;
            transition: 1s;
            margin: 10% 0;
            &:hover {
                transform:scale(1.1);
            }
    }
  }

  .box-right {

    flex: 1; // 设置flex-grow属性为1，默认为0
    overflow: hidden;
    // background-color: red;
    position: relative;
    padding-left: 20px;
    .box-right-footer {
        // background-color: blue;
        display: flex;
        width: 95%;
        position: absolute;
        bottom: 10%;
        .left {
            flex: 2;
            display: flex;
            justify-content: flex-start;
        }
        //.center {
        //    flex: 1;
        //}
        .right {
            flex: 2;
            display: flex;
            justify-content: flex-end;
        }
    }
  }
</style>