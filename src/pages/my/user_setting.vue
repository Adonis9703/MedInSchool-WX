<template>
  <div class="padding-top40 color-666 paddingX36">
    <div class="card-panel shadow padding26X paddingX26" style="margin-bottom: 40rpx">
      <div class="logo flex-align-justify">
        <img :src="logo"/>
      </div>
      <div class="flex-align">
        <img :src="zust" class="zust margin-right20">
        <span class=" font-size4">个人信息</span>
      </div>
      <section class="paddingX20 font-size2">
        <div class="flex-align margin20X">
          <span class="title">性别</span>
          <div class=" border-left" :class="{'btn-light': userInfo.sex==='男', 'btn-dark': userInfo.sex!=='男'}"
               @click="selectedSex('男')">♂
          </div>
          <div class=" border-right" :class="{'btn-light': userInfo.sex==='女', 'btn-dark': userInfo.sex!=='女'}"
               @click="selectedSex('女')">♀
          </div>
        </div>
        <div class="flex-align margin20X">
          <span class="title">姓名</span>
          <input v-model="userInfo.name"/>
        </div>
        <div class="flex-align margin20X">
          <span class="title">学号</span>
          <input type="number" v-model="userInfo.userId"/>
        </div>
        <div class="flex-align margin20X">
          <span class="title">手机号</span>
          <input type="number" v-model="userInfo.tel"/>
        </div>
      </section>
    </div>
    <div class="card-panel shadow paddingX26 padding26X ">
      <div class="flex-align">
        <i class="theicon-homeinsurancepay  margin-right16"></i>
        <span class=" font-size4">就诊备注</span>
        <span class="color-999 relative top2 left10">完善信息，有助于医生精确诊断</span>
      </div>
      <section class="paddingX20 font-size2">
        <div class="flex-align margin20X">
          <span class="title">血型</span>
          <div @click="selectedBlood(index)" v-for="(item, index) of bloodTypes" :key="index"
               :class="{'btn-light': item.selected, 'btn-dark': !item.selected, 'border-left': index===0,'border-right': index===4}">
            {{item.type}}
          </div>
        </div>
        <div class="flex-align margin20X">
          <span class="title">年龄</span>
          <input type="number" v-model="userInfo.age"/>
        </div>
        <div class="flex-align margin20X">
          <span class="title">过敏</span>
          <input v-model="userInfo.allergy"/>
        </div>
        <div class="flex-align margin20X">
          <span class="title">其他</span>
          <input v-model="userInfo.other"/>
        </div>
      </section>
    </div>
    <van-toast id="van-toast"/>
    <div class="btn-primary font-size4" style="margin-top: 40rpx" @click="doUpdate">保 存 修 改</div>
  </div>
</template>

<script>
  import zust from '~/logo/logo_zust.png'
  import logo from '~/default/user_heading.png'

  export default {
    name: "user_setting",
    onLoad() {
      Object.assign(this, this.$options.data())
    },
    data() {
      return {
        zust,
        logo,
        userInfo: {},
        bloodTypes: [
          {
            type: 'A',
            selected: false
          },
          {
            type: 'B',
            selected: false
          },
          {
            type: 'O',
            selected: false
          },
          {
            type: 'AB',
            selected: false
          }, {
            type: '未知',
            selected: false
          },

        ]
      }
    },
    onShow() {
      this.userInfo = this.$store.state.userInfo
      this.bloodTypes.forEach(item => {
        if (item.type === this.userInfo.bloodType) {
          item.selected = true
        }
      })
    },
    methods: {
      selectedSex(val) {
        if (val === '男') {
          this.userInfo.sex = '男'
        } else {
          this.userInfo.sex = '女'
        }
      },
      selectedBlood(val) {
        this.bloodTypes.forEach(item => {
          item.selected = false
        })
        this.bloodTypes[val].selected = true
        this.userInfo.bloodType = this.bloodTypes[val].type
      },
      doUpdate() {
        this.$post({
          url: this.$api.updateUser,
          param: {
            ...this.userInfo,
            oldId: this.userInfo.userId
          }
        }).then(res => {
            if (res.success) {
              this.$store.commit('setUserInfo', this.userInfo)
              this.$widget.toastSuccess('更新成功', () => {
                this.$router.back()
              })
            } else {
              this.$widget.toastWarn(res.message)
            }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .zust {
    height: 30rpx;
    width: 80rpx;
    display: inline-block;
  }

  input {
    display: inline-block;
    background-color: #f5f5f5;
    border-radius: 10rpx;
    padding: 4rpx 20rpx;
    color: #666666;
  }

  .title {
    min-width: 120rpx;
    display: inline-block;
  }

  .title80 {
    min-width: 80rpx;
    display: inline-block;
  }

  .logo {
    float: right;
    margin: 0 auto;
    width: 172rpx;
    height: 172rpx;
    background-color: white;
    border-radius: 85rpx;
    img {
      width: 162rpx;
      height: 162rpx;
    }
  }

  .btn-light {
    display: inline-block;
    background-color: #32AE57;
    color: white;
    padding: 6rpx 26rpx;
  }

  .border-left {
    border-bottom-left-radius: 10rpx;
    border-top-left-radius: 10rpx;
  }

  .border-right {
    border-bottom-right-radius: 10rpx;
    border-top-right-radius: 10rpx;
  }

  .btn-dark {
    display: inline-block;
    background-color: #f5f5f5;
    color: #32AE57;
    padding: 6rpx 26rpx;
  }

</style>
