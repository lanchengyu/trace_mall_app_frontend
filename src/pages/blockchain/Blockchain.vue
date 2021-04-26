<template>
  <div style="height:100%;">
    <Top-Header title="区块链验证"></Top-Header>
    <div class="main-container">
      <div class="qa-search">
        <div class="search-h">区块链信息查询</div>
        <div class="qa-input">
          <input v-model="hash"
                 placeholder="请输入区块链交易hash查询真假">
          <a @click="search"
             class="qa-btn"></a>
        </div>
      </div>
      <div v-show="result"
           class="result">
        <label>上链信息</label>
        <table>
          <tr>
            <td class="label">产品名：</td>
            <td class="value">{{originalInfo.batchName}}</td>
          </tr>
          <tr>
            <td class="label">批次号：</td>
            <td class="value">{{originalInfo.batchId}}</td>
          </tr>
          <tr>
            <td class="label">创建人：</td>
            <td class="value">{{originalInfo.creator}}</td>
          </tr>
          <tr>
            <td class="label">生产日期：</td>
            <td class="value">{{originalInfo.produceDate}}</td>
          </tr>
        </table>

        <el-collapse>
          <el-collapse-item title="完整信息"
                            name="1">
            <pre>{{result}}</pre>
          </el-collapse-item>
        </el-collapse>
      </div>
      <Copyright-Footer>
      </Copyright-Footer>
    </div>
  </div>
</template>

<script>
import TopHeader from "@/common/Header";
import CopyrightFooter from "@/common/CopyrightFooter";
import { Loading, CollapseItem } from "element-ui";

export default {
  name: "Blockchain",
  data () {
    return {
      hash: '',
      result: '',
      originalInfo: '',
      selected: 'tab-container1'
    };
  },
  components: {
    TopHeader,
    CopyrightFooter
  },
  computed: {
  },
  created () {
    var hash = this.$route.query.hash
    this.hash = hash
  },
  methods: {
    search () {
      const loading = this.$loading({
        lock: true,
        text: '查询中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.$post('anon/blockchain/verify', {
        hash: this.hash
      }).then((res) => {
        let data = res.data
        this.originalInfo = data.originalInfo
        delete data.originalInfo;
        this.result = data
        loading.close();
      }).catch(() => {
        loading.close();
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
.main-container {
  width: 100%;
  height: calc(100% - 1.45rem);
  overflow: auto;
}

.result >>> .el-collapse-item__header {
  padding-left: 0.4rem;
}

.result {
  padding: 0 0.4rem;

  label {
    font-size: 0.4rem;
    margin: 0.3rem 0;
  }

  table {
    font-size: 0.4rem;
    background: white;
    width: 100%;

    tr {
      border-bottom: 1px solid #eee;
    }

    .label {
      width: 30%;
    }

    .value {
      width: 70%;
    }

    td {
      padding: 0.4rem;
    }
  }

  pre {
    font-size: 0.3rem;
    overflow: auto;
    background: black;
    color: white;
    margin: 0;
  }
}

.qa-search {
  background: url('~@/../static/img/qa_bg2.jpg') #567ca1 no-repeat center bottom;
  background-size: auto 100%;
  padding: 0 0 30px;
  text-align: center;

  .search-h {
    padding: 25px 0 15px;
  }

  .qa-input {
    padding-left: 0.2rem;
    background: #fff;
    margin: 0 1rem;
    text-align: left;
    align-items: center;
    height: 1.2rem;
    line-height: 1.2rem;
    display: flex;

    input {
      height: 0.8rem;
      line-height: 0.8rem;
      float: left;
      font-size: 0.3rem;
      width: 100%;
    }

    a {
      float: left;
      width: 0.8rem;
      margin: 0 0.2rem;
      height: 0.8rem;
      line-height: 0.8rem;
      background: url('~@/../static/img/pd4_btn.jpg') no-repeat center center;
    }
  }

  .qa-btn {
  }
}
</style>