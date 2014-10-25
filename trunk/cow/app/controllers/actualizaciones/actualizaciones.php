<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of actualizaciones
 *
 * @author eorozco
 */
class Actualizaciones extends Controller{
    
    public function index($name = '') {       
        $this->view('actualizaciones/index',['name'=>"NA"]);
    }
    
    public function validacion($name = '') {       
        $this->view('actualizaciones/validacion',['name'=>"NA"]);
    }
    
    public function tabla(){       
       require '../app/util/ssp.class.php';
       $persona = $this->model('Persona');
       
       //configurar tabla
       $columns = array(
	array( 'db' => 'ID','dt' => 0 ),
	array( 'db' => 'TIPOIDE','dt' => 1 ),
        array( 'db' => 'IDENTIFICACION','dt' => 2 ),
        array( 'db' => 'NOMBRE1','dt' => 3 ),
        array( 'db' => 'NOMBRE2','dt' => 4 ),
        array( 'db' => 'APELLIDO1','dt' => 5 ),
        array( 'db' => 'APELLIDO2','dt' => 6 ),
        array( 'db' => 'FECHA','dt' => 7 )       
        ); 

       $tabla = "personatmp";       
       $pk = "id";       
       $sql_config = SSP::tabla($_REQUEST, $vacio, $tabla, $pk, $columns);
       $arr = json_decode($sql_config);
                            
       $sql_data = $persona->consultarTabla($arr->limit, $arr->order, $arr->where, $arr->cols,$tabla);
                
       $sql_cantidad=$persona->contarTabla($arr->where,$tabla);
       $total_registros = count($sql_data);
            
       $menu = json_encode($sql_data);
       
       $data='{"draw":'.intval( $request['draw'] ).',"recordsTotal":'.intval( $total_registros ).',"recordsFiltered":'.intval( $sql_cantidad['CANTIDAD'] ).',"data":'.$menu."}";
       
       $this->ajax('afiliaciones/tabla',['tabla'=>$data]);
    }
        
 function actualizacion(){
     $persona = $this->model('Persona');     
     echo json_encode($persona->traerActualizacion($_POST[id]));     
 }   
 
 function soporte(){
     $ide = $_POST[ide];
     $resp = copy("/opt/soportes/actualizaciones/".$ide."/".$ide.".pdf","/var/www/comfacauca-linea/tmp/".$ide.".pdf");
     
     $salida = $ide;
     if($resp!=1){
         $salida = 0;
     }     
     echo $salida;
 }
 
 function guardar(){
     $persona = $this->model('Persona');     
     $persona->actualizarSubsidio($_POST);
 }
 
 
    
}