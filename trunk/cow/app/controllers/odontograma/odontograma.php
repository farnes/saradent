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
          
          $historia=$_REQUEST[historia];
          
          $datos = $odontograma->traerTratamiento($historia);

          $resp .= '[';

            foreach ($datos as $value) {

                $det.= '{
                    "diente": {
                    "id": '.$value['id_diente'].'
                    },
                    "cara": "'.$value['cara'].'",
                    "tratamiento": {
                            "idtrat": "'.$value['idtrat'].'",
                            "fecha": "'.$value['fecha'].'",
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
    
     
     
     function crear(){
         $odontograma = $this->model('Odonto');
         
         $diente = $_POST[diente];
         
         $cara =0;
         switch ($_POST[cara]) {
             case "I":$cara=1;break;
             case "S":$cara=2;break;
             case "C":$cara=3;break;
             case "D":$cara=4;break;
             case "Z":$cara=5;break;
             case "X":$cara=6;break;             
         }
         
        $id_tratamiento=$odontograma->guardar($diente,$cara,$_POST[historia]);
        
        $odontograma->guardarDetalle($id_tratamiento,$_POST[procedimiento]);
        
     }
    
     
     function borrar(){
        $odontograma = $this->model('Odonto');        
        $odontograma->borrarDetalle($_POST[tratamiento]);
        $odontograma->borrarCabecera($_POST[tratamiento]);
     }
     
    
}