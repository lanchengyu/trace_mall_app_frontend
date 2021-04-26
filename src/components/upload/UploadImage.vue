<template>
  <div class="vue-uploader">
    <div class="file-list">
      <section v-for="(file, index) in files"
               :key="index"
               class="file-item draggable-item">
        <img :src="file.src"
             alt=""
             ondragstart="return false;">
        <p class="file-name">{{file.name}}</p>
        <span class="file-remove"
              @click="remove(index)">+</span>
      </section>
      <section v-if="status == 'ready'"
               class="file-item">
        <div @click="add"
             class="add">
          <span>+</span>
        </div>
      </section>
    </div>

    <section class="upload-func">
      选中{{files.length}}张文件，共{{bytesToSize(this.totalSize)}};
      最多上传<span class="text-primary">{{limitNum}}</span> 张图片！
      <!-- <div class="progress-bar">
        <section v-if="uploading"
                 :width="(percent * 100) + '%'">{{(percent * 100) + '%'}}</section>
      </div> -->
    </section>
    <input type="file"
           accept="image/*"
           @change="fileChanged"
           ref="file"
           multiple="multiple">
  </div>
</template>
<script>
export default {
  name:"UploadImage",
  props: {
    limitNum: {
      default: 3
    }
  },
  data () {
    return {
      status: 'ready',
      files: [],
      uploading: false,
      percent: 0,
      totalSize: 0,
      src: null
    }
  },
  methods: {
    emitLimitNum(){
      this.$emit("limitNum");
    },
    add () {
      if (this.files.length >= this.limitNum) {
        this.$message.info('最多允许传' + this.limitNum + '张图片')
        return
      }
      this.$refs.file.click()
    },
    bytesToSize (bytes) {
      if (bytes === 0) return '0 B'
      let k = 1000 // or 1024
      let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      let i = Math.floor(Math.log(bytes) / Math.log(k))
      return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
    },
    finished () {
      this.files = []
      this.totalSize = 0
    },
    remove (index) {
      this.totalSize = this.totalSize - this.files[index].size
      this.files.splice(index, 1)
      this.$emit('fileRemove', index)
    },
    fileChanged () {
      const list = this.$refs.file.files
      for (let i = 0; i < list.length; i++) {
        if (!this.isContain(list[i])) {
          const that = this
          let name = list[i].name
          that.imgCompress(list[i], function (base64) {
            let newFile = that.convertBase64UrlToBlob(base64)
            const item = {
              name: name,
              size: newFile.size,
              src: base64
            }
            that.totalSize = that.totalSize + newFile.size // 总大小
            that.files.push(item)
            that.$emit('fileSelect', newFile)
          })
        }
      }
      this.$refs.file.value = ''
    },
    // 将图片文件转成BASE64格式  url
    html5Reader (file, item) {
      const reader = new FileReader()
      const that = this
      reader.onload = (e) => {
        that.$set(item, 'src', e.target.result)
      }
      reader.readAsDataURL(file)
    },
    isContain (file) {
      return this.files.find((item) => item.name === file.name && item.size === file.size)
    },
    uploadProgress (evt) {
      const component = this
      if (evt.lengthComputable) {
        const percentComplete = Math.round((evt.loaded * 100) / evt.total)
        component.percent = percentComplete / 100
      } else {
        console.warn('upload progress unable to compute')
      }
    },
    // 图片压缩
    imgCompress (fileobj, callback) { // path是指上传的图片
      var filename = fileobj.name
      var index = filename.lastIndexOf('.')
      var type = filename.substring(index + 1)
      var img = new Image()
      img.src = URL.createObjectURL(fileobj)
      let canvas = document.createElement('canvas')
      let context = canvas.getContext('2d')
      img.onload = function () {
        // 图片原始尺寸
        var originWidth = this.width
        var originHeight = this.height
        // 最大尺寸限制
        let maxWidth = 600
        let maxHeight = 600
        // 目标尺寸
        let targetWidth = originWidth
        let targetHeight = originHeight
        // 图片尺寸超过400x400的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth
            targetHeight = Math.round(maxWidth * (originHeight / originWidth))
          } else {
            targetHeight = maxHeight
            targetWidth = Math.round(maxHeight * (originWidth / originHeight))
          }
        }
        // canvas对图片进行缩放
        canvas.width = targetWidth
        canvas.height = targetHeight
        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight)
        // 图片压缩
        context.drawImage(img, 0, 0, targetWidth, targetHeight)
        let base64 = canvas.toDataURL('image/' + type, 0.8)
        callback(base64)
      }
    },

    // 将base64码转化为file（Blob）
    // 此处函数对压缩后的base64经过处理返回{size: "", type: ""}
    convertBase64UrlToBlob (urlData) {
      var arr = urlData.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    }
  }
}
</script>
<style>
.vue-uploader {
  border: 1px solid #e5e5e5;
}
.vue-uploader .file-list {
  padding: 10px 0px;
}
.vue-uploader .file-list:after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
  font-size: 0;
}
.vue-uploader .file-list .file-item {
  float: left;
  position: relative;
  width: 100px;
  text-align: center;
}
.vue-uploader .file-list .file-item img {
  width: 80px;
  height: 80px;
  border: 1px solid #ececec;
}
.vue-uploader .file-list .file-item .file-remove {
  position: absolute;
  right: 12px;
  display: none;
  top: 4px;
  width: 14px;
  height: 14px;
  color: white;
  cursor: pointer;
  line-height: 12px;
  border-radius: 100%;
  transform: rotate(45deg);
  background: rgba(0, 0, 0, 0.5);
}
.vue-uploader .file-list .file-item:hover .file-remove {
  display: inline;
}
.vue-uploader .file-list .file-item .file-name {
  margin: 0;
  height: 40px;
  word-break: break-all;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.vue-uploader .add {
  width: 80px;
  height: 80px;
  margin-left: 10px;
  float: left;
  text-align: center;
  line-height: 80px;
  border: 1px dashed #ececec;
  font-size: 30px;
  cursor: pointer;
}
.vue-uploader .upload-func {
  display: flex;
  padding: 10px;
  margin: 0px;
  background: #f8f8f8;
  border-top: 1px solid #ececec;
}
.vue-uploader .upload-func .progress-bar {
  flex-grow: 1;
}
.vue-uploader .upload-func .progress-bar section {
  margin-top: 5px;
  background: #00b4aa;
  border-radius: 3px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  transition: all 0.5s ease;
}
.vue-uploader .upload-func .operation-box {
  flex-grow: 0;
  padding-left: 10px;
}
.vue-uploader .upload-func .operation-box button {
  padding: 4px 12px;
  color: #fff;
  background: #007acc;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}
.vue-uploader > input[type="file"] {
  display: none;
}
</style>
