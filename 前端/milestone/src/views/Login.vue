<template>
    <div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>“携程”机票数据分析网站的设计与实现</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
				  	</el-form-item>
				</el-form>
				<p class="tip">温馨提示：</p>
				<p class="tip"></p>
				<p class="tip">created by cool liu</p>
	  		</section>
	  	</transition>
  	</div>
      
</template>



<script>
	import {login} from '../network/api';
	
 export default {
	 data(){
		 return{
			// checked: true
			loginForm: {
					username: '',
					password: '',
			},
			rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
			showLogin: false
		 }
	 },
	 methods:{
		
		async submitForm(formName) {
			


			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					const res = await login({user_name: this.loginForm.username, password: this.loginForm.password})
					// console.log(res)
					// sessionStorage.token = res.data.token //浏览器关闭就清除token
					localStorage.token = res.data.token
					this.$message({
							type: 'success',
							message: res.data.message
						});
					this.$router.push('search')
					
					
				} else {
					this.$notify.error({
						title: '错误',
						message: '请输入正确的用户名密码',
						offset: 100
					});
					return false;
				}
			});
		}

	 },
	 mounted(){
		
		this.showLogin = true;

	 }
}
</script>





<style lang="less" scoped>

	@import '../style/mixin';
	.login_page{
		background-color: #324057;
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p{
			font-size: 34px;
			color: #fff;
		}
	}
	.form_contianer{
		.wh(320px, 230px);
		.ctp(320px, 210px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
