<?php
/**
 * Description of pacientes
 *
 * @author eorozco
 */
class Pacientes extends Controller {
    public function index($name = '') {       
        $this->view('pacientes/index',['name'=>"NA"]);
    }
    
    public function tabla(){       
       require '../app/util/ssp.class.php';
       $persona = $this->model('Persona');
       
       //configurar tabla
       $columns = array(
	array( 'db' => 'ID','dt' => 0 ),
        array( 'db' => 'IDENTIFICACION','dt' => 1 ),
        array( 'db' => 'NOMBRE1','dt' => 2 ),
        array( 'db' => 'NOMBRE2','dt' => 3 ),
        array( 'db' => 'APELLIDO1','dt' => 4 ),
        array( 'db' => 'APELLIDO2','dt' => 5) 
        ); 
       
       $tabla = "persona";       
       $pk = "id";       
       $sql_config = SSP::tabla($_REQUEST, $vacio, $tabla, $pk, $columns);
       $arr = json_decode($sql_config);
                            
       $sql_data = $persona->consultarTabla($arr->limit, $arr->order, $arr->where, $arr->cols,$tabla);
                
       $sql_cantidad=$persona->contarTabla($arr->where,$tabla);
       $total_registros = count($sql_data);
            
       $menu = json_encode($sql_data);
       
       $data='{"draw":'.intval( $request['draw'] ).',"recordsTotal":'.intval( $total_registros ).',"recordsFiltered":'.intval( $sql_cantidad['CANTIDAD'] ).',"data":'.$menu."}";
       
       echo $data;
    }
    
    public function paciente(){
        $persona = $this->model('Persona');
        echo json_encode($persona->traerPersona($_POST['id']));
    }
    
    public function guardar(){
        $persona = $this->model('Persona');
        $id=$persona->guardar($_POST);
        echo $id;
    }
    
    public function actualizar(){
        $persona = $this->model('Persona');
        $persona->actualizar($_POST);
    }
    
}
