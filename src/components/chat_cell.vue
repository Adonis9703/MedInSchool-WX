<template>
  <div class="chat-cell shadow">
    <div @touchstart="slideStart" @touchend="slideEnd" @tap="onPush"
         class="flex-align"
         :class="{'slideLeft': isSlide, 'slideRight': !isSlide}"
         style="width: 120%">
      <div class=" padding-top20" style="width: 100%">
        <section>
          <main class="flex-align margin-left20">
            <img :src="doctor">
            <div class="margin-left20" style="width: 80%;">
              <div class="flex-align-spacebetween">
                <title class="color-333 font-size8 bold">{{chat.doctorName}}</title>
                <span class="dot margin-right12"></span>
              </div>
              <div class="color-666 margin-top10 flex-align-spacebetween">
                <!--<div> {{chat.user}}：{{chat.message}}</div>-->
                <div class="padding-right12">{{chat.chatTime}}</div>
              </div>
            </div>
          </main>
          <div class="border-top1 flex-align-spacebetween margin-top8 padding8X padding-left20 color-999">
            <div>主诉：{{chat.complain}}</div>
            <div class="padding-right30 color-theme">问诊中</div>
          </div>
        </section>
      </div>
      <div class="end text-align-center font-size6 flex-align" @click.stop="handleDelete">删除</div>
    </div>

  </div>
</template>

<script>
  import doctor from '~/default/default_doctorhead.png'

  export default {
    props: ['chat'],
    name: "chat-cell",
    data() {
      return {
        doctor,
        start: 0,
        end: 0,
        isSlide: false,
      }
    },
    methods: {
      onPush() {
        this.$emit('push')
      },
      handleDelete() {
        this.$emit('slide')
      },
      sliding(e) {
        console.log(e.clientX)
      },
      slideStart(e) {
        this.start = e.clientX
      },
      slideEnd(e) {
        this.end = e.mp.changedTouches[0].clientX
        if (this.start - e.mp.changedTouches[0].clientX > 40) {
          this.isSlide = true
        }
        if (e.mp.changedTouches[0].clientX - this.start > 40) {
          this.isSlide = false
        }
      }
    }
  }
</script>

<!--suprpess CssInvalidrpopertyValue -->
<style lang="scss" scoped>
  .chat-cell {
    background: white;
    width: 100%;
    margin-bottom: 16rpx;
    img {
      height: 110rpx;
      width: 110rpx;
      display: block;
    }
  }
  .slideLeft {
    transform: translateX(-75px);
    transition: all .2s;
  }
  .slideRight {
    transform: translateX(0px);
    transition: all .2s;
  }
  .end {
    padding: 0 40rpx;
    color: white;
    height: 194rpx;
    background-color: red;
  }
  .dot {
    background: red;
    display: inline-block;
    width: 20rpx;
    height: 20rpx;
    border-radius: 10rpx;
  }
</style>
