<template>
    <div class="container">
        <div class="header">
            <router-link class="header-row1" to="login" v-if="!userData.createTime">
                <div class="header-left">
                <h2 class="userName">
                    立即登录
                </h2>
                <div class="msg">
                    时光回头，当下最重要
                </div>
                </div>
                <div class="header-right">
                    <img src="@/assets/avatar1.jpg" alt="">
                    <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youbian"></use>
                    </svg>
                </div>
            </router-link>

            <div class="header-row1 user-box" v-else>
                <div class="header-left">
                <h2 class="userName">
                    {{userData.usernickname}}
                </h2>
                <div class="msg">
                    {{userData.desc || '这个家伙很懒，什么也没写'}}
                </div>
                </div>
                <div class="header-right">
                    <img :src="userData.avatar || useImg" alt="">
                </div>
            </div>
            <div class="header-row2">
                    <div class="collection-item">
                        <div class="title">
                            {{userData.trace || 0}}
                        </div>
                        <div class="msg">
                            足迹
                        </div>
                    </div>
                    <div class="collection-item">
                        <div class="title">
                            {{userData.collected || 0}}
                        </div>
                        <div class="msg">
                            已收藏
                        </div>
                    </div>
                    <div class="collection-item">
                        <div class="title">
                            {{userData.like || 0}}
                        </div>
                        <div class="msg">
                            喜欢
                        </div>
                    </div>
                    <i class="col-line"></i>
                    <i class="col-line"></i>
            </div>
        </div>
        <div class="footer">
            <ul>
                <li class="item1" @click="handleJump1">
                    <div class="left">
                        <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xiugaigerenxinxi"></use>
                        </svg>
                        <h3>修改个人信息</h3>
                    </div>
                    <div class="right">
                        <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youbian"></use>
                        </svg>
                    </div>
                </li>
                <li class="item2" @click="handleJump2">
                    <div class="left">
                        <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jiazhi1"></use>
                        </svg>
                        <h3>收藏夹</h3>
                    </div>
                    <div class="right">
                        <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youbian"></use>
                        </svg>
                    </div>
                </li>
                <li class="item3" @click="handleJump3">
                    <div class="left">
                        <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon-"></use>
                        </svg>
                        <h3>我的订单</h3>
                    </div>
                    <div class="right">
                        <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youbian"></use>
                        </svg>
                    </div>
                </li>
                <li class="item4" @click="handleJump4">
                    <div class="left">
                        <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zuji"></use>
                        </svg>
                        <h3>我的足迹</h3>
                    </div>
                    <div class="right">
                        <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youbian"></use>
                        </svg>
                    </div>
                </li>
            </ul>
            <div class="btn" v-if="userData.createTime">
                <Button type="primary" size="large" @click="logout">退出登录</Button>
            </div>
        </div>
    </div>
</template>

<script>
import {Button} from 'mint-ui'
import useImg from '@/assets/avatar.jpg'
export default {
  name: 'person',
  components: {
    Button
  },
  data () {
    return {
      useImg
    }
  },
  methods: {
    logout () {
      sessionStorage.removeItem('token')
      this.$store.commit('CHANGE_USER_DATA', {})
    //   history.go(0)
    },
    handleJump1 () {
      this.$router.push({
        name: 'revise'
      })
    },
    handleJump2 () {
      this.$router.push({
        name: 'collection'
      })
    },
    handleJump3 () {
      if (this.userData.createTime) {
        this.$router.push({
          name: 'layout1'
        })
      } else {
        this.$router.push({
          name: 'login'
        })
      }
    },
    handleJump4 () {
      this.$router.push({
        name: 'trace'
      })
    },
    getUserData () {
        this.$axios.get(this.$api.getUserData).then(res => {
            console.log(res)
        })
    }
  },
  created () {
    let token = sessionStorage.getItem('token')
    if (token) {
      this.$store.dispatch('getUserData')
    }
    this.getUserData()
  },
  computed: {
    userData () {
      return this.$store.state.userData
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../globalCss/px2-rem";
    .header{
        background-color: #FF5000;
        background-image: linear-gradient(to right, #FD9126, #FF5000);
        // height: px-to-rem(350);
        padding: px-to-rem(18);
        box-shadow: 0 0 2px 2px linear-gradient(left, orange, orangered);
        .header-row1 {
            position: relative;
            display: flex;
            justify-content: space-between;

            .header-right{
                display: flex;
                justify-content:space-between;
                align-items: center;
                img {
                    height: px-to-rem(140);
                    width: px-to-rem(140);
                    background: #fff;
                    border-radius: 50%
                }
                .icon {
                    font-weight: 600;
                    font-size: 18px;
                    color: #fff;
                }
            }

            .header-left{
                display: flex;
                flex-direction: column;
                // align-items: center;
                justify-content: space-around;
                margin-left: 10px;
                // margin-top: px-to-rem(40);
                color: #fff;
                h2 {
                  font-size: 26px;
                }
                .msg{
                    color: #e0e0e0;
                    font-size: 12px;
                }
            }
        }

        .user-box {
          flex-direction: row-reverse;
          justify-content: flex-end;

          .header-left{
            margin-left: 20px;
            flex: 1;
          }
        }
        .header-row2 {
            position: relative;
            display: flex;
            color: #fff;
            justify-content: space-between;
            margin-top: 30px;
            text-align: center;
            .collection-item {
                &:nth-child(1){
                    width: 30%;
                }
                &:nth-child(2){
                    width: 40%;
                }
                &:nth-child(3){
                    width: 30%;
                }
                .title{
                   font-size: 16px;
                   .little-title{
                       font-size: 12px;
                   }
                }
                .msg {
                    margin-top: 4px;
                }
            }
            .col-line {
                position: absolute;
                height: 20px;
                width: 1px;
                background: #eaeaea;
                top: 50%;
                transform: translateY(-50%);

                &:nth-child(4){
                    left: 30%;
                }
                &:nth-child(5){
                    right: 30%;
                }
            }
        }
    }

    .footer{
        position: relative;
        top:px-to-rem(52);

        ul{
            position: relative;

            .item1 .left .icon {
                color: #0099ff;
            }
            .item2 .left .icon {
                color: #fa5a75;
            }
            .item3 .left .icon {
                color: #f7d871;
            }
            .item4 .left .icon {
                color: #0099ff;
            }

            li {
            display: flex;
            justify-content: space-between;
            height: px-to-rem(135);
            border-bottom: 1px solid #eeeeee;
            line-height: px-to-rem(135);

                .left{
                    display: flex;
                    align-items: center;
                    .icon{
                        font-size: 32px;
                        text-align: center;
                    }
                    h3{
                        margin-left: 4px;
                        font-size: 12px;
                        color: #343333;
                    }
                }
                .right {
                    .icon {
                        color: #e0e0e0;
                    }
                }
            }
        }

        .btn{
            margin-top: px-to-rem(30);
            .mint-button{
                background-image: linear-gradient(to right, #FD9126, #FF5000);
            }
        }
    }

</style>
