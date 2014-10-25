<?php
class Venta extends Controller {
    
   public function index($name = '') {
        
        $this->view('venta/index',['name'=>'Hola Mundo']);
    }

    

}
