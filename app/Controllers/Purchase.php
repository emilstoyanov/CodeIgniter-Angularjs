<?php

namespace App\Controllers;

class Purchase extends BaseController
{
    public function index()
    {
        return view('home');
    }

    public function Selected() {
        $items = $this->request->getPost('items');
        $db = db_connect();
        $data = $db->query(sprintf('select a.a_id,a.name,c.name as category,a.img from `articles` a, `categories` c WHERE c.c_id=a.c_id AND a.a_id IN (%s) order by a_id ASC',$items));
        return ('{"success": true, "data":' . json_encode($data->getResultArray()) . ' }');
    }

    public function checkAndPurchase() {
      $name = $this->request->getPost('name');
      $email = filter_var($this->request->getPost('email'), FILTER_VALIDATE_EMAIL);
      $success = "true"; $message="OK";
      if ($name=='') { $success = "false"; $message="Please enter a valid user name!"; }
      if ($email==false) { $success = "false"; $message="Please enter a valid e-mail!"; }

      // other validations from database.............
      return ('{"success": "'.$success.'", "message": "'.$message.'" }');
    }

}
