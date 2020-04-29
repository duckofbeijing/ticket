<template>
    <div class="header_container">
        <el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>

		<el-dropdown @command="handleCommand" menu-align='start'>
			<el-avatar icon="el-icon-user-solid" class="avator"></el-avatar>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="home">首页</el-dropdown-item>
				<el-dropdown-item command="signout">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                a:'fhdjfhjd'
            }
		},
		methods:{
			handleCommand(command) {
				if (command == 'home') {
					this.$router.push('/manage');
				}else if(command == 'signout'){
					this.$router.push('/');
					// const res = await signout()
					// if (res.status == 1) {
					// 	this.$message({
	                //         type: 'success',
	                //         message: '退出成功'
	                //     });
	                //     this.$router.push('/');
					// }else{
					// 	this.$message({
	                //         type: 'error',
	                //         message: res.message
	                //     });
					// }
				}
			}
		}
    }
</script>

<style lang="less">
    @import '../style/mixin';
	.header_container{
        background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>