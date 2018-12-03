<?php


$string = '{"withdraw_fee":"10000","featured_24h":"20000","message_100":"300000","gift_commission":"50000","vip_1":"300000","vip_2":"400000","vip_3":"50000","vip_4":"60000","vip_5":"70000","vip_6":"80000","group_dating":{"id":1,"type":2,"province_group_id":1,"double_dating_price":10000,"group_dating_m_price":20000,"group_dating_f_price":30000,"created_at":"2018-11-29 16:39:58","updated_at":"2018-11-29 16:39:58","couple_dating_price":null},"couple_dating":{"id":2,"type":3,"province_group_id":1,"double_dating_price":90000,"group_dating_m_price":80000,"group_dating_f_price":70000,"created_at":"2018-11-29 16:42:54","updated_at":"2018-11-29 16:42:54","couple_dating_price":null}}';


$data = json_decode($string);

echo "<pre>";
print_r($data);
die;