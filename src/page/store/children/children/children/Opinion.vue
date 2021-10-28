<template>
    <div class="Opinion">
        <!-- <Header :title="title" :isBack="true" :isBanBack="true" :isWhite="false" @onBack="onBack"></Header>21312 -->
        <yzg-header :title="'常见问题'" :isBack="true" @click="onBack"></yzg-header>
        <div class="opinionBox">
            <p class="toTop">{{toptxt}}</p>
            <div class="contenr">
                <ul class="list">
                    <li v-for ="(item, index) in list" :key="index">
                        <h4>{{item.title}}</h4>
                        <p>{{item.text}}</p>
                    </li>
                </ul>
            <div class="textareaBox">
                    <textarea class="text" :placeholder="palc" @input="discInput" v-model="disc" maxlength="100"></textarea>
                    <p class="remanent">{{remanent}}/100</p>
            </div>

                <div class="comtBtn" @click="commit">提交</div>
            </div>
        </div>
    </div>
</template>
<script>
import YzgHeader from "../../../../../components/header/header.vue";
import {opinion} from "../../../../../service/index";
import Validator from '../../../../../tools/validator';
import { mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {
            disc:'',
            palc:'留下您的手机号，并留下您的问题，我们会有工作人员联系您为您解答疑惑~',
            remanent:'100',
            toptxt:'写在前面的话：直接提现到银行卡方式，为邮乐和中国银联进行合作完成此功能，填写的资料都为银联要求。',
            list:[
                {
                    title:'●银行卡所属人怎么选？',
                    text:'您添加的银行卡所属人与您营业执照上的姓名一致，则选择“营业执照注册人”，否则选其他；'
                },{
                    title:'●开户行支行和联行号是什么？',
                    text:'您开卡银行的信息，可自己在网上查询，也可以直接打银行客服电话95580进行询问，比如中国邮政储蓄银行上海市浦东新区金杨支行的联行号为403290023058 ；'
                },
                {
                    title:'●商户收单协议、结算授权书我没有怎么办？',
                    text:'您可以在邮掌柜官网（yzg.ule.com/yzg）常见问题一栏进行下载，保存电脑上再打印出来。'
                },
                {
                    title:'●这些资料太多了我还是不会填怎么办？',
                    text:'您可以拨打我们的客服电话11185，接通后转4，询问人工客服，也可以在下方输入框中留下您的手机号，我们会有工作人员联系您，并专门为您解答疑惑。'
                },
            ]
        };
    },
    components: {
        YzgHeader
    },
    computed:{
        ...mapGetters([
            "userInfo"
        ])
    },
    // mounted(){this.$loading();},
    methods: {
        
        onBack() {
            window.history.go(-1);
        },
        discInput() {
            let txtVal = this.disc.length;
            this.remanent = 100 - txtVal;
        },
        commit() {
            
            this.$loading()
            let vals = this.disc.trim();
            if(this.disc && vals != ""){
                let param = {
                    content: this.disc,
                    usrOnlyId: this.userInfo.usrOnlyId
                }
                opinion(param).then(result => {
                    this.$closeLoading()
                    const {returnCode, returnMessage} = result || {}
                    if(returnCode == '0000' || returnCode == '9999'){
                        this.disc = "";
                        this.$toast(returnMessage);
                    } else {
                        console.log('result', result)
                    }
                })
            } else {
                
                this.$closeLoading()
                this.$toast('请输入留言内容')
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.Opinion {
    .opinionBox{
        margin-top: 50px;
        .toTop{
            background: #FAFAE9;
            color: #ff8800;
            font-size: 14px;
            padding: 8px;
        }
        .contenr {
            margin: 0px 5px 5px;
            .list li{
                h4{
                    margin-bottom: 10px;
                }
                font-size: 16px;
                padding: 10px 5px;
                border-bottom: 1px solid #ccc;
                &:last-child{
                    border:none;
                }
            }
            .textareaBox{
                position: relative;
                .text {
                    border: 1px solid #cccccc;
                    border-radius: 5px;
                    width: 93%;
                    height: 100px;
                    padding: 10px;
                    resize: none;
                }
                .remanent{
                    font-size: 12px;
                    color: #acacac;
                    position: absolute;
                    right: 10px;
                    bottom: 8px;
                }
            }
            
            .comtBtn{
                height: 35px;
                width: 100%;
                border-radius: 5px;
                background: #f13a3c;
                color: #ffffff;
                font-size: 14px;
                text-align: center;
                line-height: 35px;
                margin: 10px 0 30px;
            }
        }
    }
}
</style>