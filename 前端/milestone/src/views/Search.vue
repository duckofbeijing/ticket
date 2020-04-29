<template>
    <div> 
        <head-top></head-top>
        
        <div class="block">


            <el-date-picker
            v-model="info.dep_date"
            value-format="yyyy-MM-dd"
            align="right"
            type="date"
            placeholder="请选择出发日期"
            :picker-options="pickerOptions">
            </el-date-picker>

            <el-select v-model="info.dep_city"  filterable placeholder="请选择出发城市" style="margin-left: 30px;">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
                :disabled="item.disabled"
                @click.native.prevent="disable(item)">
                </el-option>
            </el-select>

            <el-select
                v-model="info.arr_city"
                collapse-tags
                filterable
                style="margin-left: 30px;"
                placeholder="请选择到达城市">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
                :disabled="item.disabled"
                @click.native.prevent="disable(item)">
                </el-option>
            </el-select>

            <el-button type="primary" icon="el-icon-search" style="margin-left: 50px;"
            @click="search()">搜索</el-button>
        </div>
        

        
        <div class="data_show" v-if="isData">
            <el-table
                :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                style="width: 100%"
                :default-sort = "{prop: 'search_date', order: 'descending'}"
                >
                <el-table-column
                prop="search_date"
                label="爬取日期"
                width="110">
                </el-table-column>
                <el-table-column
                prop="date_gap"
                label="提前搜索天数"
                sortable
                width="130">
                </el-table-column>
                <el-table-column
                prop="week_day"
                label="周几">
                </el-table-column>
                <el-table-column
                prop="holiday"
                label="节假日">
                </el-table-column>
                <el-table-column
                prop="airlineName"
                label="航空公司">
                </el-table-column>
                <el-table-column
                prop="departureDate"
                label="起飞时间">
                </el-table-column>
                <el-table-column
                prop="airportName_dep"
                label="起飞机场">
                </el-table-column>
                <el-table-column
                prop="arrivalDate"
                label="到达时间">
                </el-table-column>
                <el-table-column
                prop="airportName_arr"
                label="到达机场">
                </el-table-column>
                <el-table-column
                prop="price"
                label="价格"
                sortable>
                </el-table-column>
            </el-table>
      
                
            <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="current_change"
            style="margin-top: 30px; margin-bottom: 60px;">
            </el-pagination>
       
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {info_search} from '../network/api'
    export default {
        components : {
            headTop
        },
        data(){
            return {
                pickerOptions: {        
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                 },
                options: [{
                    value: '选项1',
                    label: '成都',
                    disabled: false
                }, {
                    value: '选项2',
                    label: '上海',
                    disabled: false
                }, {
                    value: '选项3',
                    label: '天津',
                    disabled: false
                }, {
                    value: '选项4',
                    label: '北京',
                    disabled: false
                }],
                info:{},
                value1:'',
                tableData: [],
                isData : false,
                total:0,
                currentPage: 1,
                pagesize:10
            }
        },
        methods:{
            disable(item){
                // console.log(item.disabled)
                for(var i=0; i<this.options.length;i++){
                    this.options[i].disabled=false
                }
                item.disabled = true

            },
            async search(){
                // console.log(this.info)
                const res = await info_search(this.info)
                this.tableData = res.data
                this.total = res.data.length
                this.isData = true
                
            },
            current_change(currentPage){
                this.currentPage = currentPage;
            }
        }
    }
</script>

<style  scoped>
    .block{
        /* background-color: aqua; */
        margin-top: 50px;
        margin-inline-start: 30px;
    }
    .data_show{
        margin-left: 30px;
        margin-top: 50px;
    }
   
    
</style>

