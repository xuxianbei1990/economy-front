<template>
  <div>
    <el-row>
      <el-dialog title="建设银行建议" :visible.sync="dialogVisible" width="50%">
        <el-button type="text" @click="setJS">建设银行</el-button>
        <el-button type="text" @click="setICBC">ICBC银行</el-button>
        <el-button type="text" @click="setPER">市盈率</el-button>
        <el-button type="text" @click="setExchangeRate">汇率</el-button>
        <el-button type="text" @click="set600036">招商银行</el-button>
        <el-button type="text" @click="setGraham">格雷厄姆指数</el-button>
        <el-button type="text" @click="setSynthesis">综合指数</el-button>
        <!-- <span>建议内容</span> -->
        <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="textareavalue"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogSure">确 定</el-button>
        </span>
      </el-dialog>
      <el-col :span="1">
        <div class="grid-content bg-purple">
          <el-button type="primary" size="mini" @click="chuangye50">创业50</el-button>
          <el-button type="primary" size="mini" @click="queryData">确定</el-button>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="grid-content bg-purple-light">
          <el-input size="mini" v-model="cyNow" placeholder="现在"></el-input>
          <el-input size="mini" v-model="cyHeight" placeholder="高于"></el-input>
          <el-input size="mini" v-model="cyLow" placeholder="低于"></el-input>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="grid-content bg-purple">
          <el-button type="primary" size="mini" @click="hushen300">沪深300</el-button>
          <el-button type="primary" size="mini" @click="queryData">确定</el-button>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="grid-content bg-purple-light">
          <el-input size="mini" v-model="hushenNow" placeholder="现在"></el-input>
          <el-input size="mini" v-model="heightIndex" placeholder="高于"></el-input>
          <el-input size="mini" v-model="lowIndex" placeholder="低于"></el-input>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="grid-content bg-purple">
          <el-button type="primary" size="mini" @click="shangzheng50">上证50</el-button>
          <el-button type="primary" size="mini" @click="queryDataGraham">确定</el-button>
        </div>
      </el-col>
      <el-col :span="1">
        <div class="grid-content bg-purple-light">
          <el-input size="mini" v-model="szNow" placeholder="现在"></el-input>
          <el-input size="mini" v-model="szHeight" placeholder="高于"></el-input>
          <el-input size="mini" v-model="szLow" placeholder="低于"></el-input>
        </div>
      </el-col>
      <el-col :span="10">
        <el-button type="primary" @click="dialogVisible = true">建议</el-button>
        <el-button type="primary">付费参考</el-button>
        <el-button type="primary" @click="countryMaterialBenefits">国家福利</el-button>
        <el-button type="primary" @click="AmericanReverseRepo">美国逆回购</el-button>
        <el-button type="primary" @click="usdcny">美元兑RBM</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
let proposes = []
export default {
  name: 'MgHeader',
  data () {
    return {
      dialogVisible: false,
      textareavalue: '',
      heightIndex: '',
      lowIndex: '',
      cyNow: '',
      cyHeight: '',
      cyLow: '',
      szHeight: '',
      szLow: '',
      szNow: '',
      hushenNow: '',
      btnIndex: 0
    }
  },
  methods: {
    setSzNow (value) {
      this.szNow = value
    },
    setM (value) {
      this.btnIndex = -1
      this.textareavalue = value
    },
    setJS () {
      this.btnIndex = 0
      this.textareavalue = proposes[0].remark
    },
    setICBC () {
      this.btnIndex = 1
      this.textareavalue = proposes[1].remark
    },
    setPER () {
      this.btnIndex = 2
      this.textareavalue = proposes[2].remark
    },
    setExchangeRate () {
      this.btnIndex = 3
      this.textareavalue = proposes[3].remark
    },
    set600036 () {
      this.btnIndex = 4
      this.textareavalue = proposes[4].remark
    },
    setGraham () {
      this.btnIndex = 5
      this.textareavalue = proposes[5].remark
    },
    dialogSure () {
      if (this.btnIndex !== -1) {
        this.updatePropose()
      }
      this.dialogVisible = false
    },
    usdcny () {
      window.open('https://finance.sina.com.cn/money/forex/hq/USDCNY.shtml', '_blank')
    },
    setSynthesis () {
      this.textareavalue = proposes[6].remark
      this.btnIndex = 6
    },
    countryMaterialBenefits () {
      window.open('countryMaterialBenefits.html', '_blank')
    },
    AmericanReverseRepo () {
      window.open('https://www.newyorkfed.org/markets/desk-operations/reverse-repo#recent-operations', '_blank')
    },
    touzid () {
      window.open('https://www.touzid.com/model/graham.html#/', '_blank')
    },
    chuangye50 () {
      window.open('https://legulegu.com/stockdata/sz399673-ttm-lyr', '_blank')
    },
    shangzheng50 () {
      window.open('https://legulegu.com/stockdata/sz50-ttm-lyr', '_blank')
    },
    hushen300 () {
      window.open('https://legulegu.com/stockdata/marketcap-gdp', '_blank')
    },
    queryData () {
      this.axios({
        method: 'GET',
        url: 'http://localhost:1002/data/show/strategy/buffett?low=' + this.lowIndex + '&high=' + this.heightIndex
      }).then(response => {
        console.log(response)
        const reg = /[;\r\n]/g
        this.open(response.data.replace(reg, '<br/>'))
      })
    },
    queryDataGraham () {
      this.axios({
        method: 'GET',
        url: 'http://localhost:1002/data/show/strategy/graham?low=' + this.szLow + '&high=' + this.szHeight
      }).then(response => {
        console.log(response)
        const reg = /[;\r\n]/g
        this.open(response.data.replace(reg, '<br/>'))
      })
    },
    open (value) {
      this.$alert(value, '标题名称', {
        confirmButtonText: '确定',
        // callback: action => {
        //     console.log("1111")
        //     this.$message({
        //         type: 'info',
        //         message: `action: ${action}`
        //     });
        // },
        dangerouslyUseHTMLString: true
      })
    },
    initData () {
      this.axios({
        method: 'GET',
        url: 'http://localhost:1002/data/show/graph'
      }).then(response => {
        const value = response.data
        this.setM(value.proposes[0].remark)
        this.setSzNow(value.grahamIndex.ratio)
        proposes = value.proposes
      })
    }
  },
  mounted () {
    this.initData()
  }
}
</script>
