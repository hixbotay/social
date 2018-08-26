<?php 
	class User{
		public $roles;
		
		public function __construct(){
			$this->user = \Auth:user();
			$this->roles = $this->get_roles();
		}
		
		function roles(){
			$groups = $this->groups;
			return $groups[$this->user->group];
			}
		function groups(){
			$groups = [
				'admin' => [
					'manage',
					'user',
					'premium',
				],
				'registered' => [
					'user'
				]
			];
		}
	}