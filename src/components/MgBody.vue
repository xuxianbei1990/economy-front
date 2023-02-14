<template>
    <div class="box">
        <div id="rra" style="height: 300%; width: 50%;"></div>
        <div id="per" style="height: 300%; width: 50%;"></div>
    </div>
</template>

<script type="text/javascript">
    let perChart;
    let optionra;
    let optionPer;
    let usdcnyChart;
    export default {
        name: 'MgBody',
        data() {
            return {

            }
        },
        methods: {
            initGraph() {
                var usdcnyDom = document.getElementById('rra');
                var perDom = document.getElementById('per');
                usdcnyChart = this.$echarts.init(usdcnyDom, null, {
                    renderer: 'canvas',
                    useDirtyRect: false
                });

                perChart = this.$echarts.init(perDom, null, {
                    renderer: 'canvas',
                    useDirtyRect: false
                });

                optionra = {
                    title: {
                        text: 'USDCNY'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    // legend: {
                    //     // top:20,
                    //     // data: ['reverse-repurchase-agreement']
                    // },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: "value",
                        scale: true,
                        minInterval: 0,
                        splitNumber: 4
                    },
                    series: [
                        {
                            name: 'USDCNY',
                            type: 'line',
                            stack: 'Total',
                            data: [6.2, 6.3]
                        }
                    ]
                };


                optionPer = {
                    title: {
                        text: 'price-earings-radio'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    // legend: {
                    //     // data: ['price-earings-radio']
                    // },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: "value",
                        scale: true,
                        minInterval: 0,
                        splitNumber: 4
                    },
                    series: [
                        {
                            name: 'price-earings-radio',
                            type: 'line',
                            stack: 'Total',
                            data: [6.2, 6.3]
                        }
                    ]
                };
                window.addEventListener('resize', perChart.resize);
                window.addEventListener('resize', usdcnyChart.resize);
            },
            getNumTwoBit(n) {
                n = Number(n);
                return (n > 9 ? '' : '0') + n;
            },
            timestampToDate(timestamp) {
                let date = new Date(timestamp);
                return date.getFullYear() + '-' + this.getNumTwoBit(date.getMonth() + 1) + '-' + this.getNumTwoBit(date.getDate());
            },
            getGraphData() {
                this.axios({
                    method: "GET",
                    url: 'http://localhost:1002/data/show/graph'
                }).then(response => {
                    var value = response.data;
                    for (let index = 0; index < value.usdcnies.length; index++) {
                        const element = value.usdcnies[index];
                        optionra.series[0].data[index] = element.exchangeRate;
                        optionra.xAxis.data[index] = this.timestampToDate(element.createDate);
                    }
                    for (let index = 0; index < value.priceEarningsRatios.length; index++) {
                            const element = value.priceEarningsRatios[index];
                            optionPer.series[0].data[index] = element.ratio;
                            optionPer.xAxis.data[index] = this.timestampToDate(element.createDate);
                        }
                    if (optionra && typeof optionra === 'object') {
                        usdcnyChart.setOption(optionra);
                        perChart.setOption(optionPer)
                    }
                })
            }
        },
        mounted() {
            this.initGraph();
            this.getGraphData();
        }
    }

</script>

<style>
    /* 多个div并行 */
    .box {
        display: flex;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .el-col {
        border-radius: 4px;
    }
</style>