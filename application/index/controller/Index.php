<?php

namespace app\index\controller;

use app\common\controller\Frontend;

class Index extends Frontend
{

    public function _initialize()
    {
        parent::_initialize(); // TODO: Change the autogenerated stub
    }

    public function index()
    {
        return $this->view->fetch();
    }

    public function submit()
    {
        $model = new \app\admin\model\Form;

        $model->save($this->request->post('row/a'));
    }
}
