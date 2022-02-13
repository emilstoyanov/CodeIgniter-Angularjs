<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index()
    {
        return view('home');
    }

    public function Articles() {
        $start = $this->request->getPost('start');
        $filter = $this->request->getPost('filter');
        $limit = $this->request->getPost('limit');
        $filter = ( $filter === '' ? '' : 'AND match(a.name) against( "'.$filter.'" IN BOOLEAN MODE)');
        $db = db_connect();
        $data = $db->query(sprintf('select a.a_id,a.name,c.name as category,a.img from `articles` a, `categories` c WHERE c.c_id=a.c_id %s order by a_id ASC LIMIT %u, %u',$filter,$start,$limit));
        $count = $db->query(sprintf('select count(a.a_id) as count  from `articles` a WHERE 1=1 %s',$filter));
        return ('{"success": true, "data":' . json_encode($data->getResultArray()) .', "count": ' . json_encode($count->getResultArray()) . ' }');
    }
}
