<?php

class Controller {

    public function model($model) {
        require_once '../app/models/' . $model . '.php';
        return new $model();
    }
    
    public function view($view,$data=[]) {
        require_once '../app/views/'. $view .'.html';
    } 
    
    public function ajax($view,$data=[]) {
        require_once '../app/controllers/'. $view .'.php';
    }
    

}