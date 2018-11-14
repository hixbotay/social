<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use \App\Notification;

class Event extends Controller {
    // list events forthcoming, finished, cancelled which current_user joined
    public function list($status) {
        $event_id = DB::table('event_register')->where('user_id', '=', Auth::id())->get();
        $temp = [];
        foreach($event_id as $item) {
            array_push($temp, $item->event_id);
        }

        $events = \App\Event::leftjoin('users', 'events.creator', '=', 'users.id')
            ->leftjoin('agency', 'events.agency_id', '=', 'agency.id')
            ->leftjoin('agency_photos', function ($join) {
                $join->on('events.agency_id', '=', 'agency_photos.agency_id');
                $join->on(function($query) {
                    $query->where('agency_photos.type', '=', 'avatar'); 
                });
            })
            ->where('status', '=', $status)
            ->whereIn('events.id', $temp)
            ->select(DB::raw('
                events.*,
                users.name as creator_name, 
                users.avatar as creator_avatar, 
                agency.address as address, 
                agency_photos.source as address_avatar
            '))
            ->paginate(10);

        $events_id = [];
        foreach($events as $key => $event) {
            $event['is_joined'] = 1;
            array_push($events_id, $event->id);
        }

        $event_meta = DB::table('event_meta')
                    ->whereIn('event_id', $events_id)
                    ->leftJoin('user_jobs', function($join) {
                        $join->on('user_jobs.id', '=', 'event_meta.meta_value');
                        $join->on('event_meta.meta_key', '=', DB::raw("'job_conditional'"));
                    })
                    ->get();

        $events->map( function ($event, $key) use ($event_meta) {
            $job = [];
            $marital_status = [];
            foreach($event_meta as $metadata) {
                if($metadata->event_id == $event->id) {
                    $key = $metadata->meta_key;

                    if($key == 'job_conditional') {
                        array_push($job, $metadata->name);
                    } else if($key == 'marital_status') {
                        array_push($marital_status, $metadata->meta_value);
                    } else {
                        $event[$key] = $metadata->meta_value;
                    }

                    $event['job'] = $job;
                    $event['marital_status'] = $marital_status;
                }
            }
        });
        return json_encode($events);
    }

    // list events around here and current user does not join 
    public function listEventsAround() {
        $event_registers = DB::table('event_register')->where('user_id', '=', Auth::id())->get();
        $temp = [];
        foreach($event_registers as $item) {
            array_push($temp, $item->event_id);
        }

        // print_r($event_id);

        $events = \App\Event::leftjoin('users', 'events.creator', '=', 'users.id')
            ->leftjoin('agency', 'events.agency_id', '=', 'agency.id')
            ->leftjoin('agency_photos', function ($join) {
                $join->on('events.agency_id', '=', 'agency_photos.agency_id');
                $join->on(function($query) {
                    $query->where('agency_photos.type', '=', 'avatar'); 
                });
            })
            ->where('status', '=', 'forthcoming')
            ->whereNotIn('events.id', $temp)
            ->select(DB::raw('
                events.*, 
                users.name as creator_name, 
                users.avatar as creator_avatar, 
                agency.address as address, 
                agency_photos.source as address_avatar
            '))
            ->paginate(10);

        $events_id = [];
        foreach($events as $key => $event) {
            $event['is_joined'] = 0;
            array_push($events_id, $event->id);
        }

        $event_meta = DB::table('event_meta')
                    ->whereIn('event_id', $events_id)
                    ->leftJoin('user_jobs', function($join) {
                        $join->on('user_jobs.id', '=', 'event_meta.meta_value');
                        $join->on('event_meta.meta_key', '=', DB::raw("'job_conditional'"));
                    })
                    ->get();

        $events->map( function ($event, $key) use ($event_meta) {
            $job = [];
            $marital_status = [];
            foreach($event_meta as $metadata) {
                if($metadata->event_id == $event->id) {
                    $key = $metadata->meta_key;

                    if($key == 'job_conditional') {
                        array_push($job, $metadata->name);
                    } else if($key == 'marital_status') {
                        array_push($marital_status, $metadata->meta_value);
                    } else {
                        $event[$key] = $metadata->meta_value;
                    }

                    $event['job'] = $job;
                    $event['marital_status'] = $marital_status;
                }
            }
        });
        return json_encode($events);
    }

    // list events around here and current user does not join 
    public function listEventsHasYourCrush() {
        $event_registers = DB::table('event_register')
            ->leftjoin('user_relationship', function($join) {
                $join->on('to_user_id', '=', 'event_register.user_id');
                $join->on(function($query) {
                    $query->where('from_user_id', '=', Auth::id()); 
                });
            })
            ->select(DB::raw('event_register.*'))
            ->get();

        $temp = [];
        foreach($event_registers as $item) {
            array_push($temp, $item->event_id);
        }

        $events = \App\Event::leftjoin('users', 'events.creator', '=', 'users.id')
            ->leftjoin('event_register', 'events.id', '=', 'event_register.event_id')
            ->leftjoin('agency', 'events.agency_id', '=', 'agency.id')
            ->leftjoin('agency_photos', function ($join) {
                $join->on('events.agency_id', '=', 'agency_photos.agency_id');
                $join->on(function($query) {
                    $query->where('agency_photos.type', '=', 'avatar'); 
                });
            })
            ->where('events.status', '=', 'forthcoming')
            ->whereIn('events.id', $temp)
            ->select(DB::raw('
                events.*,
                (CASE event_register.user_id WHEN '.Auth::id().' THEN 1 ELSE 0 END) AS is_joined,
                users.name as creator_name, 
                users.avatar as creator_avatar, 
                agency.address as address, 
                agency_photos.source as address_avatar
            '))
            ->paginate(10);

        $events_id = [];
        foreach($events as $key => $event) {
            array_push($events_id, $event->id);
        }

        $event_meta = DB::table('event_meta')
                    ->whereIn('event_id', $events_id)
                    ->leftJoin('user_jobs', function($join) {
                        $join->on('user_jobs.id', '=', 'event_meta.meta_value');
                        $join->on('event_meta.meta_key', '=', DB::raw("'job_conditional'"));
                    })
                    ->get();

        $events->map( function ($event, $key) use ($event_meta) {
            $job = [];
            $marital_status = [];
            foreach($event_meta as $metadata) {
                if($metadata->event_id == $event->id) {
                    $key = $metadata->meta_key;

                    if($key == 'job_conditional') {
                        array_push($job, $metadata->name);
                    } else if($key == 'marital_status') {
                        array_push($marital_status, $metadata->meta_value);
                    } else {
                        $event[$key] = $metadata->meta_value;
                    }

                    $event['job'] = $job;
                    $event['marital_status'] = $marital_status;
                }
            }
        });
        return json_encode($events);
    }

    public function create(Request $request) {
        $user_id = Auth::id();
        $newEvent = [
            'creator' => $user_id,
            'status' => 'forthcoming'
        ];
        $metadata = [];

        $data = json_decode($request->getContent());
        // if dating type is group
        if($data->event->type == 'group') {
            $newEvent['limit_number'] = $data->event_meta->max_male_number + $data->event_meta->max_female_number;
            $newEvent['min_number'] = $data->event_meta->min_male_number + $data->event_meta->min_female_number;
        } else {
            // else dating type is couple
            $newEvent['limit_number'] = 2;
            $newEvent['min_number'] = 2;
        }

        foreach($data->event as $key => $value) {
            $newEvent[$key] = $value;
        }
        $result = \App\Event::create($newEvent);

        // if type is couple, creator is first event register
        if($result['type'] == 'couple') {
            DB::table('event_register')
            ->insert([
                'user_id' => $user_id,
                'event_id' => $result['id'],
                'status' => 1,
                'created' => date('Y-m-d h:i:s')
            ]);
        }

        foreach($data->event_meta as $key => $value) {
            if($key === 'job_conditional') {
                foreach($value as $temp) {
                    array_push(
                        $metadata, 
                        [
                            'event_id' => $result['id'],
                            'meta_key' => $key,
                            'meta_value' => $temp
                        ]
                    );
                }
            } else {
                array_push(
                    $metadata, 
                    [
                        'event_id' => $result['id'],
                        'meta_key' => $key,
                        'meta_value' => $value
                    ]
                );
            }
        }
        $result_1 = DB::table('event_meta')->insert($metadata);

        return json_encode($result);
    }

    public function joinEvent($event_id) {
        // check if exist 
        $register= DB::table('event_register')
            ->where([
                ['user_id', '=', Auth::id()],
                ['event_id', '=', $event_id],
            ])
            ->get();
        
        if(count($register) == 0) {
            $result = DB::table('event_register')
            ->insert([
                'user_id' => Auth::id(),
                'event_id' => $event_id,
                'status' => 1,
                'created' => date('Y-m-d h:i:s')
            ]);
        } else $result = false;
        
        return json_encode($result);
    }

    public function get($event_id) {
        $event = \App\Event::leftjoin('users', 'events.creator', '=', 'users.id')
            ->leftjoin('agency', 'events.agency_id', '=', 'agency.id')
            ->leftjoin('agency_photos', function ($join) {
                $join->on('events.agency_id', '=', 'agency_photos.agency_id');
                $join->on(function($query) {
                    $query->where('agency_photos.type', '=', 'avatar'); 
                });
            })
            ->where('events.id', '=', $event_id)
            ->select(DB::raw('
                events.*,
                users.name as creator_name, 
                users.avatar as creator_avatar, 
                agency.address as address, 
                agency_photos.source as address_avatar
            '))
            ->first();

        $creator = \App\User::where('users.id', '=', $event->creator)
            ->leftjoin('user_relationship', 'user_relationship.to_user_id', '=', 'users.id')
            ->select(DB::raw(
                'users.id, users.name, users.address, users.avatar, users.birthday,
                SUM(case user_relationship.is_loved WHEN 1 THEN 1 ELSE null END) AS loveNumber, 
                SUM(case user_relationship.is_like WHEN 1 THEN 1 ELSE null END) AS likeNumber'
            ))
            ->first();
        $creator['is_like'] = 0;
        $creator['is_loved'] = 0;

        if($creator->id != Auth::id()) {
            $temp = DB::table('user_relationship')
                ->where([
                    ['from_user_id', '=', Auth::id()],
                    ['to_user_id', '=', $creator->id]
                ])
                ->first();
            if($temp != null) {
                $creator['is_like'] = $temp->is_like;
                $creator['is_loved'] = $temp->is_loved;
            }
        }

        $event->creator = $creator;

        $event_meta = DB::table('event_meta')
                    ->where('event_id', '=', $event_id)
                    ->leftJoin('user_jobs', function($join) {
                        $join->on('user_jobs.id', '=', 'event_meta.meta_value');
                        $join->on('event_meta.meta_key', '=', DB::raw("'job_conditional'"));
                    })
                    ->get();


        $job = [];
        $marital_status = [];
        foreach($event_meta as $metadata) {
            if($metadata->event_id == $event->id) {
                $key = $metadata->meta_key;

                if($key == 'job_conditional') {
                    array_push($job, $metadata->name);
                } else if($key == 'marital_status') {
                    array_push($marital_status, $metadata->meta_value);
                } else {
                    $event[$key] = $metadata->meta_value;
                }

                $event['job'] = $job;
                $event['marital_status'] = $marital_status;
            }
        }

        $event_registers = DB::table('event_register')
            ->where('event_id', '=', $event_id)
            ->get();
        
        $temp = [];
        foreach($event_registers as $item) {
            array_push($temp, $item->user_id);
        }
        $users = \App\User::whereIn('users.id', $temp)
            ->leftjoin('user_relationship', 'user_relationship.to_user_id', '=', 'users.id')
            ->select(DB::raw(
                'users.id, users.name, users.address, users.avatar, users.birthday,
                SUM(case user_relationship.is_loved WHEN 1 THEN 1 ELSE null END) AS loveNumber, 
                SUM(case user_relationship.is_like WHEN 1 THEN 1 ELSE null END) AS likeNumber'
            ))
            ->groupBy('users.id')
            ->paginate(10);

        foreach($users as $user) {
            if($user->id == Auth::id()) $event['is_joined'] = 1;

            $user['is_like'] = 0;
            $user['is_loved'] = 0;

            $temp = DB::table('user_relationship')
                ->where([
                    ['from_user_id', '=', Auth::id()],
                    ['to_user_id', '=', $user->id]
                ])
                ->first();
            if($temp != null) {
                $user['is_like'] = $temp->is_like;
                $user['is_loved'] = $temp->is_loved;
            }

            $user->viewNumber = DB::table('profile_visitor')->where('profile_id', '=', $user->id)->count();
        }

        $event['registers'] = $users->items();

        return json_encode($event);
    }

    public function invite(Request $request, $event_id) {
        // find if exists
        $invitation = DB::table('event_invitations')
            ->where([
                ['event_id', '=', $event_id],
                ['invitee', '=', $request->input('user_id')]
            ])
            ->get();
        if(count($invitation) == 0) {
            $register = DB::table('event_register')->where([
                ['user_id', '=', Auth::id()],
                ['event_id', '=', $event_id]    
            ])->get();

            if(count($register) == 0) {
                $message = 'Bạn chưa đăng ký cuộc hẹn này, hãy đăng  ký trước khi mời.';
            } else {
                $result = DB::table('event_invitations')
                    ->insert([
                        'event_id' => $event_id,
                        'inviter' => Auth::id(),
                        'invitee' => $request->input('user_id'),
                        'content' => $request->input('content'),
                        "created_at" =>  \Carbon\Carbon::now(), # \Datetime()
                        "updated_at" => \Carbon\Carbon::now(),  # \Datetime()
                    ]);

                if($result) {
                    $message = "Bạn đã gửi lời mời thành công!";
                    Notification::insert([
                        'user_id' => $request->input('user_id'),
                        'actor' => Auth::id(),
                        'content' => "Bạn nhận được lời mời tham gia cuộc hẹn mới",
                        'type' => 'event',
                        'created_at' => date("Y-m-d H:i:s"),
                        'updated_at' => date("Y-m-d H:i:s")
                    ]);
                } 
                else $message = "Đã có lỗi xảy ra, vui lòng thử lại";
            }
            

        } else $message = "Người này đã được mời tham gia vào cuộc hẹn này!"; 

        return json_encode(['message' => $message]);
    }

    // accept or reject invitation 
    public function updateInvitation(Request $request, $event_id) {
        $type = $request->input('type');

        if($type === 'accept') {
            $invitation = DB::table('event_invitations')
                ->where([
                    ['event_id', '=', $event_id],
                    ['invitee', '=', Auth::id()]
                ])
                ->update(['status' =>  1]);
            DB::table('event_register')->insert([
                'event_id' => $event_id,
                'user_id' => Auth::id(),
                "created" =>  \Carbon\Carbon::now(), # \Datetime()
                "status" => 1
            ]);
        } else {
            $invitation = DB::table('event_invitations')
                ->where([
                    ['event_id', '=', $event_id],
                    ['invitee', '=', Auth::id()]
                ])
                ->update(['status' =>  2]);
        }
        return json_encode($invitation);
    }

    public function listInvitation() {
        $invitations = DB::table('event_invitations')
            ->where([
                ['invitee', '=', Auth::id()],
                ['status', '=', 0]    
            ])
            ->get();

        $temp = [];
        foreach($invitations as $invitation) {
            array_push($temp, $invitation->event_id);
        }

        $events = \App\Event::leftjoin('users', 'events.creator', '=', 'users.id')
            ->leftjoin('agency', 'events.agency_id', '=', 'agency.id')
            ->leftjoin('agency_photos', function ($join) {
                $join->on('events.agency_id', '=', 'agency_photos.agency_id');
                $join->on(function($query) {
                    $query->where('agency_photos.type', '=', 'avatar'); 
                });
            })
            ->where('status', '=', 'forthcoming')
            ->whereIn('events.id', $temp)
            ->select(DB::raw('
                events.*, 
                users.name as creator_name, 
                users.avatar as creator_avatar, 
                agency.address as address, 
                agency_photos.source as address_avatar
            '))
            ->orderBy('start_time', 'DESC')
            ->paginate(10);

        $events_id = [];
        foreach($events as $key => $event) {
            $event['is_joined'] = 0;
            array_push($events_id, $event->id);
        }

        $event_meta = DB::table('event_meta')
                    ->whereIn('event_id', $events_id)
                    ->leftJoin('user_jobs', function($join) {
                        $join->on('user_jobs.id', '=', 'event_meta.meta_value');
                        $join->on('event_meta.meta_key', '=', DB::raw("'job_conditional'"));
                    })
                    ->get();

        $events->map( function ($event, $key) use ($event_meta) {
            $job = [];
            $marital_status = [];
            foreach($event_meta as $metadata) {
                if($metadata->event_id == $event->id) {
                    $key = $metadata->meta_key;

                    if($key == 'job_conditional') {
                        array_push($job, $metadata->name);
                    } else if($key == 'marital_status') {
                        array_push($marital_status, $metadata->meta_value);
                    } else {
                        $event[$key] = $metadata->meta_value;
                    }

                    $event['job'] = $job;
                    $event['marital_status'] = $marital_status;
                }
            }
        });
        return json_encode($events);
    }

    public function search(Request $request) {
        $data = $request->all();

        // search from event_meta
        $temp_1 = array_key_exists('marital_status', $data);
        $temp_2 = array_key_exists('job_conditional', $data);

        if($temp_1 && $temp_2) {
            $results = DB::select("SELECT DISTINCT event_id FROM event_meta WHERE event_id IN 
                    (SELECT event_id FROM event_meta WHERE meta_key = 'marital_status' AND meta_value = ? )
                    AND meta_key = 'job_conditional' AND meta_value = ?", [$data['marital_status'], $data['job_conditional']]);
        } else if ($temp_1) {
            $results = DB::select("SELECT event_id FROM event_meta WHERE meta_key = 'marital_status' AND meta_value = ?", [$data['marital_status']]);
        } else if ($temp_2) {
            $results = DB::select("SELECT event_id FROM event_meta WHERE meta_key = 'job_conditional' AND meta_value = ?", [$data['job_conditional']]);
        } else {
            $results = null;
        }

        unset($data['marital_status']);
        unset($data['job_conditional']);

        if($results !== null) {
            $event_id = [];
            foreach($results as $item) {
                array_push($event_id, $item->event_id);
            }
        }

        // search from agency
        $cafe_id = [];
        if(array_key_exists('province_id', $data) && array_key_exists('district_id', $data)) {
            $cafes = \App\Agency::select(['id'])->where(['province_id' => $data['province_id'], 'district_id' => $data['district_id']])->get();
            foreach($cafes as $item) {
                array_push($cafe_id, $item->id);
            }
        } else {
            return json_encode(['error' => "Mising province and district"]);
        }
            
        unset($data['province_id']);
        unset($data['district_id']);

        if($results !== null) {
            $events = \App\Event::leftjoin('users', 'events.creator', '=', 'users.id')
                ->leftjoin('event_register', function ($join) {
                    $join->on('events.id', '=', 'event_register.event_id');
                    $join->on(function($query) {
                        $query->where('user_id', '=', Auth::id());
                    });
                })
                ->leftjoin('agency', 'events.agency_id', '=', 'agency.id')
                ->leftjoin('agency_photos', function ($join) {
                    $join->on('events.agency_id', '=', 'agency_photos.agency_id');
                    $join->on(function($query) {
                        $query->where('agency_photos.type', '=', 'avatar'); 
                    });
                })
                ->where($data)
                ->whereIn('events.id', $event_id)
                ->whereIn('events.agency_id', $cafe_id)
                ->select(DB::raw('
                    events.*, 
                    (CASE event_register.user_id WHEN '.Auth::id().' THEN 1 ELSE 0 END) AS is_joined,
                    users.name as creator_name, 
                    users.avatar as creator_avatar, 
                    agency.address as address, 
                    agency_photos.source as address_avatar
                '))
                ->orderBy('start_time', 'DESC')
                ->paginate(10);
        } else {
            $events = \App\Event::leftjoin('users', 'events.creator', '=', 'users.id')
                ->leftjoin('event_register', function ($join) {
                    $join->on('events.id', '=', 'event_register.event_id');
                    $join->on(function($query) {
                        $query->where('user_id', '=', Auth::id());
                    });
                })
                ->leftjoin('agency', 'events.agency_id', '=', 'agency.id')
                ->leftjoin('agency_photos', function ($join) {
                    $join->on('events.agency_id', '=', 'agency_photos.agency_id');
                    $join->on(function($query) {
                        $query->where('agency_photos.type', '=', 'avatar'); 
                    });
                })
                ->where($data)
                ->whereIn('events.agency_id', $cafe_id)
                ->select(DB::raw('
                    events.*, 
                    (CASE event_register.user_id WHEN '.Auth::id().' THEN 1 ELSE 0 END) AS is_joined,
                    users.name as creator_name, 
                    users.avatar as creator_avatar, 
                    agency.address as address, 
                    agency_photos.source as address_avatar
                '))
                ->orderBy('start_time', 'DESC')
                ->paginate(10);
        }

        $events_id = [];
        foreach($events as $key => $event) {
            array_push($events_id, $event->id);
        }

        $event_meta = DB::table('event_meta')
                    ->whereIn('event_id', $events_id)
                    ->leftJoin('user_jobs', function($join) {
                        $join->on('user_jobs.id', '=', 'event_meta.meta_value');
                        $join->on('event_meta.meta_key', '=', DB::raw("'job_conditional'"));
                    })
                    ->get();

        $events->map( function ($event, $key) use ($event_meta) {
            $job = [];
            $marital_status = [];
            foreach($event_meta as $metadata) {
                if($metadata->event_id == $event->id) {
                    $key = $metadata->meta_key;

                    if($key == 'job_conditional') {
                        array_push($job, $metadata->name);
                    } else if($key == 'marital_status') {
                        array_push($marital_status, $metadata->meta_value);
                    } else {
                        $event[$key] = $metadata->meta_value;
                    }

                    $event['job'] = $job;
                    $event['marital_status'] = $marital_status;
                }
            }
        });

        return json_encode($events);
    }

    public function updateStatus(Request $request, $id) {
        $event = \App\Event::find($id);
        $event->status = $request->get('status');
        $event->save();
        return json_encode($event);
    }

    public function subscribeEvent(Request $request) {
        $data = $request->all();
        $data['user_id'] = Auth::id();
        $response = DB::table('event_subscribers')->insert($data);
        return json_encode($response);
    }
}