<?php
namespace App\Filters;
use Illuminate\Http\Request;
class EventFilters extends Filters
{
    public function __construct(Request $request)
    {
        parent::__construct($request);
    }
    public function name($name)
    {
        return $this->builder->where('name', '=', $name);
    }
    public function popular($order = 'desc')
    {
        return $this->builder->orderBy('id', $order);
    }
    public function difficulty($level)
    {
        return $this->builder->where('difficulty', $level);
    }
    public function length($order = 'desc')
    {
        return $this->builder->orderBy('length', $order);
    }
}