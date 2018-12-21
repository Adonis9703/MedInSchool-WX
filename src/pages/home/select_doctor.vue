<template>
  <main class="padding20X paddingX20">
    <div class="cell flex-align-spacebetween"
        @click="goFillInfo"
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
  </main>
</template>

<script>
  import doctor from '~/default/default_doctorhead.png'

  export default {
    onLoad() {
      Object.assign(this, this.$options.data())
    },
    data() {
      return {
        doctor,
        doctorList: [
          {
            id: '1234',
            name: '医生1',
            title: '医师',
            department: '外科',
          },
          {
            id: '12345',
            name: '医生2',
            title: '护士',
            department: '内科'
          },
          {
            id: '32145',
            name: '医生3',
            title: '医师',
            department: '科室'
          },
        ]
      }
    },
    methods: {
      goFillInfo() {
        this.$router.push({path: '/pages/home/fill_info'})
      }
    }
  }
</script>

<style lang="scss" scoped>
.cell {
  background-color: #fff;
  padding: 20rpx;
  margin-top: 20rpx;
  border-radius: 10rpx;
}
</style>
