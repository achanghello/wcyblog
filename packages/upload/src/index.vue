<script>
export default {
    props: {
        // // 必选参数，上传的地址	string
        // action: {
        //     type: String,
        //     required: true
        // },
        // // headers	设置上传的请求头部	object
        // headers: {
        //     type: Object,
        //     default() {
        //         return {};
        //     }
        // },
        // // data	上传时附带的额外参数	object
        // data: Object,
        // // multiple	是否支持多选文件	boolean
        // multiple: Boolean,
        // // name	上传的文件字段名	string
        // name: {
        //     type: String,
        //     default: 'file'
        // },
        // // drag	是否启用拖拽上传	boolean
        // drag: Boolean,
        // // 没用到
        // dragger: Boolean,
        // // with-credentials	支持发送 cookie 凭证信息	boolean
        // withCredentials: Boolean,
        // show-file-list	是否显示已上传文件列表	boolean
        showFileList: {
            type: Boolean,
            default: true
        },
        // // accept	接受上传的文件类型（thumbnail-mode 模式下此参数无效）	string
        // accept: String,
        // // 
        // type: {
        //     type: String,
        //     default: 'select'
        // },
        // // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。	function(file)
        // beforeUpload: Function,
        // // 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。	function(file, fileList)
        // beforeRemove: Function,
        // 文件列表移除文件时的钩子	function(file, fileList)
        onRemove: {
            type: Function,
            default: noop
        },
        // // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用	function(file, fileList)
        // onChange: {
        //     type: Function,
        //     default: noop
        // },
        // // 点击文件列表中已上传的文件时的钩子	function(file)
        onPreview: {
            type: Function
        },
        // // 文件上传成功时的钩子	function(response, file, fileList)
        // onSuccess: {
        //     type: Function,
        //     default: noop
        // },
        // // 文件上传时的钩子	function(event, file, fileList)
        // onProgress: {
        //     type: Function,
        //     default: noop
        // },
        // // 文件上传失败时的钩子	function(err, file, fileList)
        // onError: {
        //     type: Function,
        //     default: noop
        // },
        // // 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]	array
        // fileList: {
        //     type: Array,
        //     default() {
        //         return [];
        //     }
        // },
        // // 是否在选取文件后立即进行上传	boolean
        // autoUpload: {
        //     type: Boolean,
        //     default: true
        // },
        // 文件列表的类型	string
        listType: {
            type: String,
            default: 'text' // text,picture,picture-card
        },
        // // 覆盖默认的上传行为，可以自定义上传的实现	function
        // httpRequest: Function,
        // 是否禁用	boolean
        disabled: Boolean,
        // // 最大允许上传个数	number
        // limit: Number,
        // // 文件超出个数限制时的钩子	function(files, fileList)
        // onExceed: {
        //     type: Function,
        //     default: noop
        // }
    },

    render(h) {
        let uploadList; // 用于存储UploadList组件

        if (this.showFileList) { // 显示已上传文件列表
            uploadList = (
                <UploadList
                    disabled={this.disabled}
                    listType={this.listType}
                    files={this.uploadFiles}
                    on-remove={this.onRemove}
                    handlePreview={this.onPreview}>
                    {
                        (props) => {
                            if (this.$scopedSlots.file) {
                                return this.$scopedSlots.file({
                                    file: props.file
                                });
                            }
                        }
                    }
                </UploadList>
            );
        }

        const uploadData = {
            props: {
                type: this.type,
                drag: this.drag,
                action: this.action,
                multiple: this.multiple,
                'before-upload': this.beforeUpload,
                'with-credentials': this.withCredentials,
                headers: this.headers,
                name: this.name,
                data: this.data,
                accept: this.accept,
                fileList: this.uploadFiles,
                autoUpload: this.autoUpload,
                listType: this.listType,
                disabled: this.disabled,
                limit: this.limit,
                'on-exceed': this.onExceed,
                'on-start': this.handleStart,
                'on-progress': this.handleProgress,
                'on-success': this.handleSuccess,
                'on-error': this.handleError,
                'on-preview': this.onPreview,
                'on-remove': this.handleRemove,
                'http-request': this.httpRequest
            },
            ref: 'upload-inner'
        };

        // trigger	触发文件选择框的内容
        const trigger = this.$slots.trigger || this.$slots.default;
        const uploadComponent = <upload {...uploadData}>{trigger}</upload>;

        return (
            <div>
                {this.listType === 'picture-card' ? uploadList : ''}
                {
                    //  tip	提示说明文字
                    this.$slots.trigger
                        ? [uploadComponent, this.$slots.default]
                        : uploadComponent
                }
                {this.$slots.tip}
                {this.listType !== 'picture-card' ? uploadList : ''}
            </div>
        );
    }
}
</script>