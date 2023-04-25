<template>
    <form id="commentform">
        <textarea class="comment-content" name="comment_content" id="comment_content" placeholder="想对作者说点什么"
            maxlength="1000" :value="modelValue" @change="handleChange"></textarea>
        <div class="comment-operate-box">
            <div class="comment-operate-l">
                <span id="tip_comment" class="tip">还能输入<em>1000</em>个字符</span>
            </div>
            <div class="comment-operate-r">
                <div class="comment-operate-item">
                    <input type="hidden" id="comment_replyId" name="comment_replyId" value="">
                    <input type="hidden" id="article_id" name="article_id" value="127035370">
                    <input type="hidden" id="comment_userId" name="comment_userId" value="">
                    <input type="hidden" id="commentId" name="commentId" value="">
                    <a
                        data-report-click="{&quot;mod&quot;:&quot;1582594662_003&quot;,&quot;spm&quot;:&quot;1001.2101.3001.4227&quot;,&quot;ab&quot;:&quot;new&quot;}">
                        <input @click="submitComment" type="button" class="btn-comment btn-comment-input" value="评论">
                    </a>
                </div>
            </div>
        </div>
    </form>
</template>
<script>
import { reqPublicComment,reqPublicReply } from './req.js'
export default {
    name: "AcTextarea",
    props: {
        type: {
            type: String,
            default: 'comment'
        },
        modelValue: {
            type: String
        }
    },
    emits: ['update:modelValue', 'getBlogComment'],
    inject: ['cid','another'],
    methods: {
        handleChange(e) {
            this.$emit('update:modelValue', e.target.value)
        },
        submitComment() {
            if (this.type == 'comment') {
                reqPublicComment({}, { bid: this.$route.query.bid, title: this.$route.query.title, content: this.modelValue }).then(() => {
                    this.$emit('update:modelValue', '')
                    this.$emit('getBlogComment')
                })
            }else{
                reqPublicReply({},{bid: this.$route.query.bid,cid:this.cid, title: this.$route.query.title, content: this.modelValue,another:this.another}).then(()=>{
                    this.$emit('update:modelValue', '')
                    this.$emit('getBlogComment')
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
form {
    width: 100%;
    position: relative;
    background: rgba(245, 246, 247, 0.8);
    border-radius: 8px;
    padding: 14px 0;
    margin: 0 auto;

    .comment-content {
        display: block;
        width: 100%;
        background: rgba(248, 249, 251, 0.8);
        border: 0px;
        padding: 0 16px;
        border-radius: 4px;
        resize: none;
        height: 88px;
        font-size: 14px;
        line-height: 22px;
        box-sizing: border-box;
        font-family: 'SF Pro Display', Roboto, Noto, Arial, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;

        &:focus {
            outline: none;
        }
    }

    .comment-operate-box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 8px 16px 0 16px;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        -webkit-transition: display .3s ease-in-out;
        transition: display .3s ease-in-out;

        .comment-operate-l {
            display: flex;
            align-items: center;

            .tip {
                font-size: 12px;
                color: #999aaa;
                line-height: 17px;
            }
        }

        .comment-operate-r {
            display: flex;
            align-items: center;
        }
    }
}</style>