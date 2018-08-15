<p align="center"><img src="https://laravel.com/assets/img/components/logo-laravel.svg"></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/d/total.svg" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/v/stable.svg" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/license.svg" alt="License"></a>
</p>

## About Laravel
#Cach them database https://laravel.com/docs/4.2/schema

1. php artisan make:migration add_mot_cai_gi_do
2. Khai báo
public function up()
{
    Schema::table('users', function($table) {
        $table->integer('paid');
    });
}
Khai báo roll back
public function down()
{
    Schema::table('users', function($table) {
        $table->dropColumn('paid');
    });
}
3. php artisan migrate
# Backend artisan tool
1. php artisan make:model -make
2. php artisan make:controller Admin/Test -r

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
