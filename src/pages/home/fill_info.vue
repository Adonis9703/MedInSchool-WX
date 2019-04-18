<template>
  <main class="paddingX20 padding20X">
    <div class="card-panel shadow padding30X paddingX30">
      <textarea class="margin-bottom20" placeholder="准确描述病情有助于医生判断" v-model="describeInfo.text"></textarea>
      <div
        class="inline-block color-theme bold padding6X border-radius font-size4 paddingX18 margin-right20 margin-top20"
        :class="{'cell-light': item.selected, 'cell-dark': !item.selected}"
        v-for="(item, index) of desList" :key="index"
        @click="select(index)">
        {{item.name}}
      </div>
      <div class="margin-top40 flex-align">
        <i class="theicon-freeupload" @click="upload"></i>
        <div class="margin-left20 color-999"> 添加图片</div>
      </div>
      <div class="inline-block image-wrap" v-for="(item, index) in tempFilePaths" :key="index">
        <img :src="item" @tap="deleteImgBtn(index)">
      </div>
      <div v-if="tempFilePaths.length>0" class="color-999">轻点图片删除</div>
    </div>
    <div>
    </div>
    <div class="margin-top60">
      <div class="btn-primary font-size4 shadow" @click="goChat">发起问诊</div>
    </div>
    <van-toast id="van-toast"/>
  </main>
</template>

<script>
  export default {
    name: "fill_info",
    onLoad() {
      Object.assign(this, this.$options.data())
    },
    onShow() {
      this.getDisease()
      let patientId = this.$store.state.userInfo.userId
      let doctorId = this.$route.query.id
      let date = this.$date.formatWithPatternDate('yyyymmdd', new Date())
      let time = new Date().toTimeString().substring(0, 8).replace(new RegExp(':', 'g'), '')
      this.timing = `${date}  ${time}`
      this.chatIdTemp = date + time + patientId.substring(patientId.length - 4) + doctorId.substring(doctorId.length - 4)
    },
    data() {
      return {
        describeInfo: {
          text: '',
          photos: [],
        },
        desSelected: '',
        desList: [],
        tempFilePaths: [],
        chatIdTemp: '',
        uploadedImg: [],
        timing: '',
      }
    },
    methods: {
      getDisease() {
        wx.showLoading({
          title: '加载中'
        })
        this.$post({
          url: this.$api.getDiseaseList
        }).then(res => {
          wx.hideLoading()
          let resTemp = []
          res.data.forEach(item => {
            item.selected = false
            resTemp.push(item)
          })
          this.desList = resTemp
        })
      },
      goChat() {
        if (this.describeInfo.text === '') {
          this.$widget.toastWarn('请填写病情描述')
          return
        }
        wx.showLoading({
          title: '发起问诊中'
        })
        let textTemp = '·'
        this.desList.forEach(item => {
          if (item.selected) {
            textTemp = textTemp + item.name + '·'
          }
        })
        this.uploadOneImg(0).then(async res => {
          if (res === 'complete') {
            let patientId = this.$store.state.userInfo.userId
            let doctorId = this.$route.query.id
            await this.$post({
              url: this.$api.createChat,
              param: {
                chatId: this.chatIdTemp,
                doctorId: doctorId,
                patientId: patientId,
                chatStatus: 0,
                complain: this.desSelected + this.describeInfo.text,
                chatTime: this.$date.format(new Date()),
                doctorName: this.$route.query.name,
                patientName: this.$store.state.userInfo.name,
                patientSex: this.$store.state.userInfo.sex,
                patientAge: this.$store.state.userInfo.age,
                patientBloodType: this.$store.state.userInfo.bloodType,
                patientAllergy: this.$store.state.userInfo.allergy,
                patientOther: this.$store.state.userInfo.other,
                complainImgs: this.uploadedImg.toString()
              }
            }).then(res => {
              wx.hideLoading()
              this.$widget.toastSuccess('问诊请求提交成功！', () => {
                this.$router.replace({
                  path: '/pages/message/chat_room',
                  query: {chatId: this.chatIdTemp, doctorId: doctorId, createNew: true}
                })
              })
            })
          }
        })
      },
      upload() {
        let that = this
        wx.chooseImage({
          count: 9 - this.tempFilePaths.length,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success(res) {
            that.tempFilePaths = res.tempFilePaths
          }
        })
      },
      deleteImgBtn (index) {
        this.tempFilePaths.splice(index, 1)
      },
      uploadOneImg(index) {
        // wx.uploadFile只能一张一张传
        return new Promise((resolve, reject) => {
          if (this.tempFilePaths.length === 0) {
            return resolve('complete')
          }
          wx.uploadFile({
            url: this.$api.uploadImg,
            filePath: this.tempFilePaths[index],
            name: 'file',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            formData: {
              chatId: this.chatIdTemp
            },
            success: res => {
              this.uploadedImg.push(JSON.parse(res.data).data.name)
              if (index < this.tempFilePaths.length - 1) {
                resolve(this.uploadOneImg(++index))
              } else {
                resolve('complete')
              }
            },
            fail: res => {
              this.$widget.toastWarn('上传图片失败，请重试')
              reject(res)
            }
          })
        })
      },

      select(val) {
        this.desSelected = ''
        this.desList[val].selected = !this.desList[val].selected
        this.desList.forEach(item => {
          if (item.selected) {
            this.desSelected += ` #${item.name}# `
          }
        })
      }
    }
  }
</script>

<!--suppress CssInvalidPropertyValue -->
<style lang="scss" scoped>
  .image-wrap {
    min-width: 120rpx;
    min-height: 120rpx;
    border-radius: 12rpx;
    margin: 20rpx;
    img {
      max-width: 120rpx;
      max-height: 120rpx;
      border-radius: 12rpx;
    }
  }

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
    transition: all .1s;
  }

  .cell-dark {
    background-color: #f5f5f5;
    color: #32AE57;
    transition: all .1s;
  }
</style>
