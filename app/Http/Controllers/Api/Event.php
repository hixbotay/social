<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Event extends Controller {
    public function list($status) {
        $events = \App\Event::leftjoin('users', 'events.creator', '=', 'users.id')
            ->leftjoin('agency', 'events.agency_id', '=', 'agency.id')
            ->leftjoin('agency_photos', 'events.agency_id', '=', 'agency_photos.agency_id')
            ->where([
                ['agency_photos.type', '=', 'avatar'],
                ['status', '=', $status]
            ])
            ->select(DB::raw('events.*, users.name as creator_name, users.avatar as creator_avatar, agency.address as address, agency_photos.source as address_avatar'))
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
        $result = DB::table('event_register')
            ->insert([
                'user_id' => Auth::id(),
                'event_id' => $event_id,
                'status' => 1,
                'created' => date('Y-m-d h:i:s')
            ]);
        return json_encode($result);
    }
}