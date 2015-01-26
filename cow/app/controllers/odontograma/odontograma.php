<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Odontograma extends Controller {
    public function index($name = '') {       
        $this->view('odontograma/index',['name'=>"NA"]);
    }
    
    public function procedimientos(){
          $odontograma = $this->model('Odonto');
          $datos = $odontograma->traerProcedimientos();  
          echo json_encode($datos);
     }
    
    
    public function cargar(){
          $odontograma = $this->model('Odonto');
          
          $paciente=1;
          
          $datos = $odontograma->traerTratamiento($paciente);

          $resp .= '[';

            foreach ($datos as $value) {

                $det.= '{
                    "diente": {
                    "id": '.$value['id_diente'].'
                    },
                    "cara": "'.$value['cara'].'",
                    "tratamiento": {
                            "id": "'.$value['codigo'].'",
                            "nombre": "'.$value['descripcion'].'",
                            "aplicaCara": '.$value['aplica_cara'].',
                            "aplicaDiente": '.$value['aplica_diente'].'
                    }
                    },';    
            }
            $resp .= substr($det, 0, strlen($det)-1);
            $resp .=']';
            echo $resp;          
     }
    
    
    
}