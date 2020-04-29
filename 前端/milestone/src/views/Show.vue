<template>
    
    <div> 
        <head-top></head-top>
    
        {{title1}}
        <div id="pic1" style="width: 600px;height:400px;"></div>
        {{title2}}
        <div id="pic2" style="width: 600px;height:400px;"></div>
    </div>
    
</template>

<script>
    import headTop from '../components/headTop'
    import {getShowInfo} from '../network/api'
    export default {
        data(){
            return{
                x_value_pic1: [],
                y_value_pic1: [],
                x_value_pic2: [],
                y_value_pic2: [],
                title1: '上海到北京三月机票走势',
                title2: '北京到成都三月机票走势'

            }
        },
        components : {
            headTop
        },
       created(){
            // const res =  getShowInfo()
            // console.log(res)
            this.get_info()
            
        },
        methods:{
            // 不用async + await 就取不到数据，得到的是一个promise。虽然里面有data，但就是取不到
            async get_info(){
                const res = await getShowInfo() 
                // this.x_value = res.data.dates
                for(var i=0;i<res.data.Sha_ctu_mar_dates.length;i++){
                    // console.log(res.data.dates[i].split('-')[2])
                    this.x_value_pic1.push(res.data.Sha_ctu_mar_dates[i].split('-')[2])

                }
                this.y_value_pic1 = res.data.Sha_ctu_mar_prices

                for(var j=0;j<res.data.Bjs_ctu_mar_dates.length;j++){
                    // console.log(res.data.dates[i].split('-')[2])
                    this.x_value_pic2.push(res.data.Bjs_ctu_mar_dates[j].split('-')[2])

                }
                this.y_value_pic2 = res.data.Bjs_ctu_mar_prices
                // 因为异步 所以showCharts没有拿到更新的数据
                this.showCharts()
            },
            showCharts(){
                var myChart1 = this.$echart.init(document.getElementById('pic1'))
                var myChart2 = this.$echart.init(document.getElementById('pic2'))

                // 指定图表的配置项和数据
                var option1 = {
                        xAxis: {
                            type: 'category',
                            data: this.x_value_pic1
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: this.y_value_pic1,
                            type: 'line'
                        }]
                    };


                var option2 = {
                        xAxis: {
                            type: 'category',
                            data: this.x_value_pic2
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: this.y_value_pic2,
                            type: 'line'
                        }]
                    };
                // 使用刚指定的配置项和数据显示图表。
                myChart1.setOption(option1);
                myChart2.setOption(option2);
            }
        },
        mounted(){
            // this.showCharts()
        },
    }
</script>

<style lang="less" scoped>

</style>


