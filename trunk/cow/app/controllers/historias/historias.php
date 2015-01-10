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
    
    public function creardx(){
        $historia = $this->model('Historia');
        $id = $historia->crearDx($_POST);
        echo $id;
    }
    
    public function crearanamnesis(){
        $historia = $this->model('Historia');
        $id = $historia->crearAnamnesis($_POST,$_POST['historia']);
        echo $id;
    }
    
    public function crearexamenfisico(){
        $historia = $this->model('Historia');
        $id = $historia->crearExamenFisico($_POST,$_POST['historia']);
        echo $id;
    }
    
    public function crearexamendental(){
        $historia = $this->model('Historia');
        $id = $historia->crearExamenDental($_POST,$_POST['historia']);
        echo $id;
    }
    
    public function crearanalisisradio(){
        $historia = $this->model('Historia');
        $id = $historia->crearAnalisisRadio($_POST,$_POST['historia']);
        echo $id;
    }
}