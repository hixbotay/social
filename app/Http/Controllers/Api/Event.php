<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Event extends Controller {
    public function list() {
        $events = \App\Event::paginate(10);

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
                    switch ($metadata->meta_key) {
                        case 'job_conditional': {
                            array_push($job, $metadata->name);
                            break;
                        }
                        case 'marital_status': {
                            array_push($marital_status, $metadata->meta_value);
                            break;
                        }
                        case 'min_male_age': {
                            $event['min_male_age'] = $metadata->meta_value;
                            break;
                        }
                        case 'min_female_age': {
                            $event['min_female_age'] = $metadata->meta_value;
                            break;
                        }
                        case 'max_male_age': {
                            $event['max_male_age'] = $metadata->meta_value;
                            break;
                        }
                        case 'max_female_age': {
                            $event['max_female_age'] = $metadata->meta_value;
                            break;
                        }
                        case 'min_male_number': {
                            $event['min_male_number'] = $metadata->meta_value;
                            break;
                        }
                        case 'max_male_number': {
                            $event['max_male_number'] = $metadata->meta_value;
                            break;
                        }
                        case 'min_female_number': {
                            $event['min_female_number'] = $metadata->meta_value;
                            break;
                        }
                        case 'max_female_number': {
                            $event['max_female_number'] = $metadata->meta_value;
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                    $event['job'] = $job;
                    $event['marital_status'] = $marital_status;
                }
            }
        });
        return json_encode($events);
    }
}