<template>
  <div
    tabindex="0"
    :class="['el-upload', `el-upload--text`]"
    @click="handleClick"
  >
    <slot class="i"></slot>
    <input
      class="el-upload__input"
      type="file"
      ref="input"
      :name="name"
      @change="handleChange"
      :multiple="multiple"
      :accept="accept"
    />
  </div>
</template>
<script>
export default {
  name: "AcUpload",
  data() {
    return {
      tempIndex: 0,
      uploadFilesArr: [],
      // uploadFiles:[]
    };
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: "image/*",
    },
    disabled: {
      type: String,
      default: false,
    },
    url: {
      type: String,
    },
    onChange: Function,
    beforeUpload: Function,
    onSuccess: Function,
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
      let file = files[0];
      if(!this.url){
        this.onChange(file)
        return
      }
      let formData = new FormData();
      formData.append(this.name, file);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", this.url, true);
      xhr.onload = () => {
        // console.log(xhr.responseText);
        if (xhr.status === 200) {
          console.log("上传成功！");
          // this.onSuccess(xhr.retData)
          // console.log("阳光下", JSON.parse(xhr.responseText).retData);
          this.onSuccess(JSON.parse(xhr.responseText).retData);
        }
      };
      xhr.send(formData);
    },
  },
};
</script>
  
<style lang="scss" scoped>
.el-upload {
  color: #d9d9d9;
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
  border-color: #409eff;
  color: #409eff;
}
</style>