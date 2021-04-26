<!--
使用说明:
   v-on:  map-confirm,参数为array数组,传递经纬度值
   v-on   cancel    取消时发出事件
-->
<template>
  <div v-if="showMapComponent"
       style="border:1px solid lightgray">
    <baidu-map v-bind:style="mapStyle"
               class="bm-view"
               ak="1dweTUj6HlNxAPGkBQFnaG5Xe9Ms4meK"
               :center="center"
               :zoom="zoom"
               :scroll-wheel-zoom="true"
               :dragging="false"
               @moving="syncCenterAndZoom"
               @moveend="syncCenterAndZoom"
               @zoomend="syncCenterAndZoom">
      <bm-view :style="mapStyle"></bm-view>
      <bm-marker :position="{lng: center.lng, lat: center.lat}"
                 :dragging="true"
                 @click="infoWindowOpen"
                 animation="BMAP_ANIMATION_BOUNCE">
      </bm-marker>
      <bm-info-window :position="{lng: center.lng, lat: center.lat}"
                      :show="infoWindow.show"
                      :height=0
                      :width=220
                      @close="infoWindowClose"
                      @open="infoWindowOpen">
        <div class="info-window-content">
          <div style="color:red;">{{initCompany.companyName}}</div>
          <div class="image">
            <img v-lazy="initCompany.picture"
                 :key="initCompany.picture"
                 alt="公司图片">
          </div>
          <div>地址：{{initCompany.address}}</div>
        </div>
      </bm-info-window>
    </baidu-map>
  </div>
</template>
<script>
import { BaiduMap, BmView, BmMarker, BmInfoWindow } from 'vue-baidu-map'
export default {
  name: 'VMap',
  components: {
    BaiduMap,
    BmView,
    BmMarker,
    BmInfoWindow
  },
  data: function () {
    return {
      mapStyle: {
        width: '100%',
        height: this.mapHeight + 'px'
      },
      center: { lng: 0, lat: 0 },
      zoom: 10,
      infoWindow: {
        show: true
      }
    }
  },
  props: {
    initCompany: {},
    showMapComponent: {
      default: false
    },
    mapHeight: {
      default: 300
    }
  },
  mounted () {
    this.$emit('ready')
  },
  watch: {
    initCompany: function (newVal, oldVal) {
      if (newVal) {
        this.center.lng = newVal.lng;
        this.center.lat = newVal.lat;
      }
    }
  },
  methods: {
    syncCenterAndZoom (e) {
      // const { lng, lat } = e.target.getCenter()
      // this.lng = lng
      // this.lat = lat
      this.zoom = e.target.getZoom()
    },
    infoWindowClose (e) {
      this.infoWindow.show = false
    },
    infoWindowOpen (e) {
      this.infoWindow.show = true
    }
  }
}
</script>

<style lang=stylus>
.info-window-content {
  font-size: 0.2rem;

  .image {
    overflow: hidden;
    margin: 5px 0px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>
