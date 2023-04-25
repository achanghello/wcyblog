<template>
  <div tabindex="0" :class="['el-upload', `el-upload--text`]" @click="handleClick">
    <slot class="i"></slot>
    <input class="el-upload__input" type="file" ref="input" :name="name" @change="handleChange" :multiple="multiple"
      :accept="accept" />
  </div>
</template>
<script>
export default {
  name:"AcUpload",
  data(){
    return {
      tempIndex:0,
      uploadFilesArr:[]
      // uploadFiles:[]
    }
  },
  props:{
    name:{
      type:String,
      default:''
    },
    multiple:{
      type:Boolean,
      default:false
    },
    accept:{
      type:String,
      default:'image/*'
    },
    disabled:{
      type:String,
      default:false
    },
    onChange:Function,
    beforeUpload:Function
  },
  methods: {
    handleClick() {
      if (!this.disabled) {
        this.$refs.input.value = null;
        this.$refs.input.click();
      }
    },
    handleChange(ev) {
      const files = ev.target.files;
      // console.log("所选中的文件",files);
      // return
      if (!files) return;
      this.uploadFiles(files);
      // console.log("什么鬼",this);
    },
    uploadFiles(files) {
      // ...
      // 对文件进行数据格式化，并自动上传
      console.log("对文件进行数据处理",files)
      let postFiles = Array.from(files,item=>item)
    
      postFiles.forEach(rawFile => {
        // 文件数据进行处理
        this.handleStart(rawFile);
        // if (this.autoUpload) 
        this.upload(rawFile);
      });
    },
    upload(rawFile) {
      this.$refs.input.value = null;
      // 没有beforeUpload钩子函数，直接执行上传文件接口
      // if (!this.beforeUpload) {
      //   return this.post(rawFile);
      // }

      const before = this.beforeUpload(rawFile);
      if (before !== false) {
        this.post(rawFile);
      } else {
        // this.onRemove(null, rawFile);

      }
    },

    // 上传文件
    post(rawFile) {
      const { uid } = rawFile;
      // 进行包装
      // const options = {
      //   headers: this.headers,
      //   withCredentials: this.withCredentials,
      //   file: rawFile,
      //   data: this.data,
      //   filename: this.name,
      //   action: this.action,
      //   onProgress: e => {
      //     this.onProgress(e, rawFile);
      //   },
      //   onSuccess: res => {
      //     this.onSuccess(res, rawFile);
      //     delete this.reqs[uid];
      //   },
      //   onError: err => {
      //     this.onError(err, rawFile);
      //     delete this.reqs[uid];
      //   }
      // };
      const options = {}
      // httpRequest方法默认内部实现的上传方法，也可以自定义方法
      const req = this.httpRequest(options);
      this.reqs[uid] = req;
      // 返回的req也可以支持promise
      if (req && req.then) {
        req.then(options.onSuccess, options.onError);
      }
    },
    // 中断请求
    abort(file) {
      const { reqs } = this;
      if (file) {
        let uid = file;
        if (file.uid) uid = file.uid;
        if (reqs[uid]) {
          reqs[uid].abort();
        }
      } else {
        // 不传参数，中断所有xhr请求
        Object.keys(reqs).forEach((uid) => {
          if (reqs[uid]) reqs[uid].abort();
          delete reqs[uid];
        });
      }
    },
    handleStart(rawFile) {
      rawFile.uid = Date.now() + this.tempIndex++;
      let file = {
        status: 'ready',
        name: rawFile.name,
        size: rawFile.size,
        percentage: 0,
        uid: rawFile.uid,
        raw: rawFile
      };
      // console.log("对比一下");
      // console.log(rawFile)
      // console.log(file)
      this.uploadFilesArr.push(file);
      this.onChange(file, this.uploadFilesArr); // 触发传入的onChange函数
    }
  }
}
</script>

<style lang="scss" scoped>
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
  text-align: center;
  line-height: 178px;
  // display: inline-block;

  .el-upload__input {
    display: none;
  }
}
.el-upload:hover {
  border-color: #409EFF;
  color: #409EFF;
}
</style>