<?php 
	class FactoryUser{

		public static $roles;


		function __construct(){
			$this->user = \Auth::user();
			$this->roles = 'NGUYEN VAN TU';
		}
		
		function roles(){
			$groups = $this->groups;
			return $groups[$this->user->group];
        }

        static function getAccount(){
		    return \Auth::user();
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