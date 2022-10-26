<?php

namespace App\Http\Traits;

use Illuminate\Support\Str;

trait ApplySortFilter
{
    /**
     * Scope a query to get list of resources apply sort and filter by input fields.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param array $params
     * @param string $order
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeApplySortFilter($query, $params, $order)
    {
        foreach ($params as $field => $value) {
            if (in_array($field, $this->fields)) {

                if ($field == "sort") {
                    $method = "sortBy" . Str::studly($value);
                    if (method_exists($this, $method)) {
                        if ($value == "price" || $value == 'date') {
                            $this->{$method}($query, $order);
                        } else {
                            $this->{$method}($query);
                        }
                    }
                } else {
                    $method = 'filterBy';
                    if (method_exists($this, $method)) {
                        $this->{$method}($query, $field, $value);
                    }
                }
            }
        }

        return $query;
    }
}
