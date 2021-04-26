<template>
  <div>
    <div class="category"
         @click="show=!show">
      <div v-show="government"
           class="category-con">
        <i class="iconfont icon-icon--"></i>
        <p>支持政府监管</p>
      </div>
      <div v-show="hash"
           class="category-con">
        <i class="iconfont icon-icon--"></i>
        <p>支持区块链验证</p>
      </div>

      <div class="category-rigth">
        <i class="iconfont icon-youjiantou"></i>
      </div>
    </div>
    <transition name="fade">
      <div class="boxbox"
           v-show="show"
           @click="close">
        <div class="layer"
             v-show="show">
          <div class="layer-box">
            <div class="layer-box-left"></div>
            <div class="layer-box-in">
              <h3>服务说明</h3>
            </div>
            <div class="layer-box-rigt"
                 @click.stop="show=!show">
              <i class="iconfont icon-cancel-1-copy"></i>
            </div>
          </div>
          <div class="layer-box-2">
            <div v-show="government"
                 class="layer-box-2-1">
              <i class="iconfont icon-icon--"></i>
              <h3>支持政府监管</h3>
              <p>{{government}}监管</p>
            </div>
            <div v-show="hash"
                 class="layer-box-2-1 top">
              <i class="iconfont icon-icon--"></i>
              <h3>支持区块链验证</h3>
              <p>
                通过hash值获取指定的上链信息详情，确保信息真实可靠
              </p>
            </div>
          </div>
          <div class="layer-box-button">
            <div>关闭</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "BatchLayer",
  props: {
    government: {
      default: ''
    },
    hash: {
      default: ''
    }
  },
  data () {
    return {
      show: false
    };
  },
  methods: {
    close () {
      this.show = false
    }
  }
};
</script>

<style lang="stylus" >
.category {
  width: 100%;
  height: 1.88rem;
  border-bottom: 0.3rem solid #f4f4f4;
  border-top: 0.3rem solid #f4f4f4;

  .category-con {
    float: left;
    margin-left: 10px;
    line-height: 1.28rem;
    height: 1.28rem;
    font-size: 0.34rem;

    i {
      float: left;
      color: #0098df;
    }

    p {
      float: left;
      color: #777;
      padding-left: 0.1rem;
    }
  }

  .category-rigth {
    float: right;
    margin-right: 0.5rem;
    line-height: 1.28rem;
    height: 1.28rem;
    font-size: 0.34rem;
  }
}

.boxbox {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  bottom: 0;
  z-index: 9999;
}

.layer {
  width: 100%;
  height: 9rem;
  background: white;
  position: fixed;
  bottom: 0;
  z-index: 2;

  .layer-box {
    width: 100%;
    height: 1.5rem;
    line-height: 1.5rem;

    .layer-box-left {
      width: 10%;
      height: 100%;
      float: left;
    }

    .layer-box-in {
      width: 80%;
      height: 100%;
      font-size: 0.4rem;
      float: left;
      text-align: center;
    }

    .layer-box-right {
      width: 10%;
      height: 100%;
      float: left;

      i {
        font-size: 0.4rem;
      }
    }
  }

  .layer-box-2 {
    width: 85%;
    margin: 20px auto;

    .layer-box-2-1 {
      width: 100%;

      h3 {
        font-size: 0.5rem;
        padding-left: 0.1rem;
        display: flex;
      }

      p {
        font-size: 0.35rem;
        height: 0.7rem;
        line-height: 0.7rem;
        color: #666;
        margin-top: 0.15rem;
        padding-left: 0.3rem;

        a {
          color: #00acff;
        }
      }

      i {
        float: left;
        color: #0098df;
        font-size: 0.5rem;
      }
    }

    .top {
      margin-top: 0.6rem;
    }
  }

  .layer-box-button {
    width: 100%;
    height: 1.5rem;
    border-top: 1px solid #eee;
    position: absolute;
    bottom: 0;

    div {
      width: 95%;
      height: 0.89rem;
      line-height: 0.89rem;
      display: block;
      text-align: center;
      margin: 0.25rem auto;
      background: #00acff;
      border-radius: 30px;
      color: white;
      font-size: 0.35rem;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter, .fade-leave-active {
  transform: translateY(100%);
}
</style>