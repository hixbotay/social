<!DOCTYPE html>
<html lang="en">
<head>

	<title>Landing Page</title>

	<!-- Required meta tags always come first -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<!-- Google Fonts -->
	<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
	<script>
		WebFont.load({
			google: {
				families: ['Roboto:300,400,500,700:latin']
			}
		});
	</script>
	<!-- Font Awesome -->
	<script defer src="{{URL::asset('resources/assets/fonts/fontawesome-all.js')}}"></script>

	<link rel="stylesheet" type="text/css" href="{{ URL::asset('resources/assets/app.css') }}">
	<script type="text/javascript" src="{{ URL::asset('resources/assets/app.js') }}"></script>
</head>

<body class="landing-page">

	<!-- <div class="content-bg-wrap"></div> -->


	<!-- Header Standard Landing  -->

	<div class="header--standard header--standard-landing" id="header--standard">
		<div class="container">
			<div class="header--standard-wrap">
				<div class="row">
					<div class="col padding-left-0">
						<a href="#" class="logo">
							<div class="img-wrap">
								<img src="{{ URL::asset('resources/assets/img/logo.png') }}" id="logo">
							</div>
						</a>
					</div>
					<div class="col padding-right-0">
						<div class="float-right auth-buttons">
							<button class="btn btn-outline-primary" id="login-button">Login</button>
							<button class="btn btn-outline-primary" id="register-button">Register</button>
						</div>
						
					</div>
				</div>
				
				
			</div>
		</div>
	</div>

	<!-- ... end Header Standard Landing  -->
	<div class="header-spacer--standard"></div>

	<div class="container">
		<div class="row">
			<div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
				<div class="landing-content">
					<h1>Welcome to the Biggest Social Network in the World</h1>
				</div>
				<div class="landing-video align-items-baseline">
					<iframe width="100%" src="https://www.youtube.com/embed/EFFfVjItjyo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
					<div class="d-flex justify-content-center">
						<img src="{{ URL::asset('resources/assets/img/cycling.gif') }}">
					</div>	
				</div>

			</div>

			<div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">

				<!-- Login-Registration Form  -->

				<div class="registration-login-form">
					<div class="d-flex justify-content-center">
						<img src="{{ URL::asset('resources/assets/img/logo.png') }}" id="logo-in-form">
					</div>
					<!-- Register Form -->
					<div>
						<div id='register-form'>	
							<form>
								<div class="form-group">
									<input type='text' class="form-control" placeholder="Tên của bạn" />
								</div>
								<div class="row">
									<div class="form-group col padding-right-0">
										<select>
											<option>Ngày</option>
											@for($i=1; $i <= 31; $i++)
											<option>{{$i}}</option>
											@endfor
										</select>
									</div>
									<div class="form-group col padding-right-0">
										<select>
											<option>Tháng</option>
											@for($i=1; $i <= 12; $i++)
											<option>{{$i}}</option>
											@endfor
										</select>
									</div>
									<div class="form-group col">
										<select>
											<option>Năm</option>
											@for($i=2000; $i >= 1960; $i--)
											<option>{{$i}}</option>
											@endfor
										</select>
									</div>
								</div>
								<div class="row">
									<div class="form-group col-8 padding-right-0">
										<select>
											<option>Tình trạng hôn nhân</option>
											<option>Độc thân</option>
											<option>Đã kết hôn</option>
										</select>
									</div>
									<div class="form-group col-4">
										<select>
											<option>Giới tính</option>
											<option>Nam</option>
											<option>Nữ</option>
										</select>
									</div>
								</div>
								<div class="row">
									<div class="form-group col-5">
										<select>
											<option>Xã/Phường</option>
										</select>
									</div>
									<div class="form-group col-4 padding-left-0">
										<select>
											<option>Quận/Huyện</option>
										</select>
									</div>
									<div class="form-group col-3 padding-left-0">
										<select>
											<option>Tỉnh</option>
										</select>
									</div>
								</div>
								<div class="form-group">
									<input type='number' class="form-control" placeholder="Số điện thoại" />
								</div>
								<div class="form-group">
									<input type='password' class="form-control" placeholder="Mật khẩu" />
								</div>
								<div class="d-flex justify-content-center">
									<button class="btn btn-primary">Submit</button>	
								</div>
							</form>
							<div>
								<div class="d-flex justify-content-center">hoặc</div>
								<div class="d-flex justify-content-center">
									<button class="btn btn-primary">Đăng ký bằng Facebook</button>
								</div>
								<div class="d-flex justify-content-center">
									<button class="btn btn-primary">Đăng ký bằng Google+</button>
								</div>
								<div class="d-flex text-center">
									<p>By clicking Sign Up, you agree to our Terms and that you have read our Data Use Policy, including our Cookie Use</p>
								</div>
							</div>
						</div>
					</div>
					

					<!-- Login Form -->
					<div id='login-form' class="d-none align-items-center">
						<div>
							<form>
								<div class="form-group">
									<input type='number' class="form-control" placeholder="Số điện thoại" />
								</div>
								<div class="form-group">
									<input type='password' class="form-control" placeholder="Mật khẩu" />
								</div>
								<div class="d-flex justify-content-center">
									<button class="btn btn-primary">Submit</button>	
								</div>
							</form>

							<div>
								<div class="d-flex justify-content-center">hoặc</div>
								<div class="d-flex justify-content-center">
									<button class="btn btn-primary">Đăng nhập bằng Facebook</button>
								</div>
								<div class="d-flex justify-content-center">
									<button class="btn btn-primary">Đăng nhập bằng Google+</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<!-- ... end Login-Registration Form  -->
			</div>
		</div>	
	</div>
	<!-- Footer -->
	<footer class="page-footer font-small blue">
		<div class="row">
			<div class="col footer-link">
				<ul class="list-inline">
					<li><a href="#">Giới thiệu</a></li>
					<li><a href="#">Điều khoản</a></li>
					<li><a href="#">Bảo mật</a></li>
					<li><a href="#">Hỗ trợ</a></li>
				</ul>
			</div>
		</div>
		<!-- Copyright -->
		<div class="footer-copyright text-center py-3">© 2018 Copyright:
			<a href="#"> Zero2603</a>
		</div>
		<!-- Copyright -->

	</footer>
	<!-- Footer -->
</body>
</html>

<style type="text/css">

.landing-content {
	color: #2980b9;
}
@media only screen and (min-width: 576px) {

	#logo {
		width: 30%;
		/*height: 15%;*/
	}

	#logo-in-form {
		/*width: 15%;*/
		height: 50px
	}

	.landing-content {
		min-height: 120px
	}

	.landing-video iframe {
		min-height: 500px;
	}

	#login-form {
		margin-top: 50%;
	}

	.registration-login-form {
		min-height: 650px
	}

	.landing-video img {
		position: absolute;
		bottom: -40px;
		right: -35px;
		width: 30%;
		height: 30% 
	}
}

@media only screen and (max-width: 768px) {
	.auth-buttons {
		margin-top: 2.25em
	}

	#logo {
		margin-top: 1em
	}

	#logo-in-form {
		/*width: 15%;*/
		height: 3em
	}

	.landing-video iframe {
		min-height: 250px;
	}

	.landing-video img {
		display: none;
	}
}

.registration-login-form input, select {
	padding: 0.7em;
	background: #fff;
}

.registration-login-form {
	background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
	padding: 1em
}

.padding-right-0 {
	padding-right: 0;
}

.padding-left-0 {
	padding-left: 0;
}

#header--standard {
	position: absolute;
}

#login-button {
	margin-right: 1em;
}

.landing-video {
	position: relative;
}

footer {
	margin-top: 60px
}

.footer-link {
	display: flex;
	justify-content: center;
}

.list-inline {
	/*margin-top: 20%;*/
	margin-bottom: 0;
}

.list-inline li {
	float: left;
	padding-right: 2em
}

</style>

<script type="text/javascript">
	var login = document.getElementById("login-button");
	var register = document.getElementById("register-button");
	var login_form = document.getElementById("login-form");
	var register_form = document.getElementById("register-form");
	
	login.onclick = function() {
		register_form.classList.add('d-none');
		login_form.classList.remove('d-none');
	};

	register.onclick = function() {
		register_form.classList.remove('d-none');
		login_form.classList.add('d-none');
	};
</script>