<template>
  <main class="paddingX20 padding20X">
    <div class="card-panel shadow padding30X paddingX30">
      <textarea class="margin-bottom20" placeholder="准确描述病情有助于医生判断" v-model="describeInfo.text"></textarea>
      <div class="inline-block color-theme bold padding6X border-radius font-size4 paddingX18 margin-right20 margin-top20"
        :class="{'cell-light': item.selected, 'cell-dark': !item.selected}"
        v-for="(item, index) of desList" :key="index"
        @click="select(index)">
        {{item.name}}
      </div>
      <div class="margin-top40 flex-align">
        <i class="theicon-freeupload" @click="upload"></i>
        <div class="margin-left20 color-999"> 添加图片 </div>
      </div>
    </div>
    <div class="margin-top60">
      <div class="btn-primary font-size4 shadow" @click="goChat">发起问诊</div>
    </div>

  </main>
</template>

<script>
  export default {
    name: "fill_info",
    onLoad() {
      Object.assign(this, this.$options.data())
    },
    data() {
      return {
        describeInfo: {
          text: '',
          photos: [],
        },
        desList: [
          {
            name: '腹痛',
            selected: false,
          },
          {
            name: '脑壳疼',
            selected: false,
          },
          {
            name: '眩晕',
            selected: false
          },
          {
            name: '眩晕',
            selected: false
          },
          {
            name: '眩晕',
            selected: false
          },
          {
            name: '眩晕',
            selected: false
          },
        ]
      }
    },
    methods: {
      goChat(){
        this.$router.replace({path: '/pages/message/chat_room'})
      },
      upload() {
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success(res) {
            // tempFilePath可以作为img标签的src属性显示图片
            console.log(res)
          }
        })
      },
      //todo  wx.uploadFile  wx.uploadFile只能一张一张传;删除已选照片

      // deleteImgBtn (index) {
      //   this.fileArr.splice(index, 1)
      // }
      // uploadOneImg (index) { // wx.uploadFile只能一张一张传
      //   return new Promise((resolve, reject) => {
      //     if (this.fileArr.length === 0) {
      //       return resolve('complete')
      //     }
      //     wx.uploadFile({
      //       url: this.$apis.commonUpload,
      //       filePath: this.fileArr[index].path,
      //       name: 'file',
      //       header: this.header,
      //       formData: {
      //         belong: this.belong,
      //         type: 2 // 1.一般图片2.咨询图片3.pdf4.pdf图片5.反馈与意见图片 6.历史图片中重复的图片
      //       },
      //       success: res => {
      //         this.fileArr[index].id = JSON.parse(res.data).data.successList[0].fileid
      //         if (index < this.fileArr.length - 1) {
      //           resolve(this.uploadOneImg(++index))
      //         } else {
      //           resolve('complete')
      //         }
      //       },
      //       fail: res => {
      //         this.$widget.toastWarn('上传图片失败，请重试')
      //         this.ableSubmit = true
      //         reject(res)
      //       }
      //     })
      //   })
      // },

      select(val) {
        this.desList[val].selected = !this.desList[val].selected
        // this.desList.forEach(item => {
        //   if (item.selected) {
        //     this.describeInfo.text += ` #${item.name}# `
        //   }
        // })
      }
    }
  }
</script>

<!--suppress CssInvalidPropertyValue -->
<style lang="scss" scoped>
  textarea {
    box-sizing: border-box;
    background-color: #f5f5f5;
    border-radius: 10rpx;
    width: 100%;
    height: 200rpx;
    padding: 20rpx 20rpx;
  }

  .cell-light {
    background-color: #32AE57;
    color: white;
  }

  .cell-dark {
    background-color: #f5f5f5;
    color: #32AE57;
  }
</style>
