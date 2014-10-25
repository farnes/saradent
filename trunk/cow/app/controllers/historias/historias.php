<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of historias
 *
 * @author eorozco
 */
class Historias extends Controller {
    public function index($name = '') {       
        $this->view('historias/index',['name'=>"NA"]);
    }
    
    public function crear(){
        $historia = $this->model('Historia');
        $id = $historia->crearHistoria($_POST);
        echo $id;
    }
    
    public function  historiaexiste(){
        $historia = $this->model('Historia');
        $historias = $historia->validarHistoria($_POST);
            
        $resp = 0;
        if($historias!=""){
            $resp = $historias[id];
        }
        
        echo $resp;
    }
    
}
