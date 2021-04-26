<template>
  <div style="height:100%;">
    <Top-Header title="质量体系"></Top-Header>
    <div class="main-container">
      <!-- <div class="nav">
        <mt-button size="small"
                   class="nav-item"
                   @click.native.prevent="active = 'tab-container1'">生产环境</mt-button>
        <mt-button size="small"
                   class="nav-item"
                   @click.native.prevent="active = 'tab-container2'">荣誉资质</mt-button>
        <mt-button size="small"
                   class="nav-item"
                   @click.native.prevent="active = 'tab-container3'">质量认证</mt-button>
      </div> -->
      <div class="tab-container">
        <!-- <mt-tab-container v-model="active">
          <mt-tab-container-item id="tab-container1"> -->
            <!-- <div class="img-item"
                 v-for="(item, index) in environments"
                 :key="index">
              <img v-lazy="item.imageUrl">
              <p>{{item.title}}</p>
            </div> -->
          <!-- </mt-tab-container-item>
          <mt-tab-container-item id="tab-container2"> -->
            <!-- <div class="img-item"
                 v-for="(item, index) in honors"
                 :key="index">
              <img v-lazy="item.imageUrl">
              <p>{{item.title}}</p>
            </div> -->
          <!-- </mt-tab-container-item>
          <mt-tab-container-item id="tab-container3"> -->
            <div class="img-item"
                 v-for="(item, index) in qualities"
                 :key="index">
              <img v-lazy="item.imageUrl">
              <p>{{item.title}}</p>
            </div>
          <!-- </mt-tab-container-item>
        </mt-tab-container> -->
      </div>
      <Copyright-Footer>
      </Copyright-Footer>
    </div>
  </div>

</template>

<script>
import TopHeader from "@/common/Header";
import CopyrightFooter from "@/common/CopyrightFooter";

export default {
  name: "Quality",
  data () {
    return {
      active: 'tab-container1',
      honors: [],
      environments: [],
      qualities: []
    };
  },
  components: {
    TopHeader,
    CopyrightFooter
  },
  //    mounted(){
  //       this.$nextTick(() => {
  //         this.scroll = new BScroll(this.$refs.wrapper, {})
  //         this.scroll = new BScroll(this.$refs.wrapper2, {})
  //       })
  //   },
  computed: {
  },
  created () {
    var companyId = this.$route.query.id
    this.$get('anon/image/list', {
      ownerId: companyId
    }).then((r) => {
      let data = r.data
      let honors = []
      let qualities = []
      let environments = []
      var item
      for (var i = 0, len = data.length; i < len; i++) {
        item = data[i]
        if (item.label === 'honor') {
          honors.push(item)
        } else if (item.label === 'quality') {
          qualities.push(item)
        } else if (item.label === 'environment') {
          environments.push(item)
        }
      }
      this.honors = honors
      this.qualities = qualities
      this.environments = environments
    })
  },
  methods: {
  }
};
</script>

<style lang="stylus" scoped>
.tab-container {
  background: #f3f2f2;
  padding: 0 0.3rem;
  overflow: auto;

  .img-item {
    text-align: center;
    min-height: 2.5rem;
    margin-top:14px;
    img {
      max-width: 100%;
    }

    p {
      font-size: 0.34rem;
    }
  }
}

.introduce {
  color: #999;
  line-height: 0.6rem;
  font-size: 0.34rem;

  pre {
    white-space: pre-wrap;
  }
}

.item-card {
  background: white;
  padding: 0.3rem;
  min-height: 2rem;
}

.nav {
  background: white;
  padding: 0.3rem;
  min-height: 1.5rem;
  margin: 0.3rem 0;
  display: flex;
  justify-content: center;
  width: 100%;

  .nav-item {
    width: 25%;
    margin: auto;
    text-align: center;
    vertical-align: middle;
  }

  .active {
    border-left: 2px solid;
    background: #f3f2f2;
    color: #199cfe;
  }
}

.main-container {
  width: 100%;
  height: calc(100% - 1.45rem);
  overflow: auto;
}
</style>