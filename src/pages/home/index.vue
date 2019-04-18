<template>
  <div class="a">
    <section class="padding20X paddingX20">
      <div class="cell flex-align-spacebetween"
           @click="goFillInfo(item)"
           v-for="(item, index) of doctorList" :key="index">
        <div class="flex-align">
          <img :src="doctor" class="block" style="width: 110rpx; height: 110rpx"/>
          <div class="padding-left20 color-666">
            <div class="margin-bottom16 font-size4 bold color-333">{{item.name}}</div>
            <i class="icon-dept"></i>
            <span class=""> {{item.department}}</span>
            <span> · {{item.title}}</span>
          </div>
        </div>
        <i class="icon-enter color-theme"></i>
      </div>
    </section>
  </div>

</template>

<script>
  import doctor from '~/default/default_doctorhead.png'

  export default {
    data() {
      return {
        socketOpen: false,
        socket: null,
        doctor,
        doctorList: []
      }
    },
    onLoad() {
      Object.assign(this, this.$options.data())
      if (!this.$store.state.userInfo) {
        this.$widget.alert('请登陆', () => {
          this.$router.push({path: '/pages/login', reLaunch: true})
        })
      }
      if (this.$store.state.userInfo && !this.$store.state.userInfo.name) {
        this.$widget.alert('请将个人信息补充完整', () => {
          this.$router.push({path: '/pages/my/user_setting'})
        })
      }

    },
    onShow() {
      this.getDoctorList()
    },
    onUnload() {
    },
    methods: {
      getDoctorList() {
        this.$post({
          url: this.$api.getDoctorList,
          param: {
            userType: 1,
            isOnline: 1
          }
        }).then(res => {
          this.doctorList = res.data
        })
      },
      goFillInfo(item) {
        this.$router.push({path: '/pages/home/fill_info', query: {id: item.userId, name: item.name}})
      },
      select() {
        this.$router.push({path: '/pages/home/select_doctor'})
      },
      setCache() {
        this.$cache.set('name', 'alex')
      },
    }
  }
</script>

<style lang="scss" scoped>
  .a {
    text-align: center;
  }
  .cell {
    background-color: #fff;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
  }
</style>
