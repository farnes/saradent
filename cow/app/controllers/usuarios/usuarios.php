<?php

/*
 * Descripcion de usuarios
 * @author Isabel Samboni
 */

class usuarios extends Controller {

    public function index($name = '') {
        $this->view('usuarios/index', ['name' => "NA"]);
    }

    public function tabla() {
        require '../app/util/ssp.class.php';
        $usuario = $this->model('Usuario');

        $columns = array(
            array('db' => 'ID', 'dt' => 0),
            array('db' => 'nombre', 'dt' => 1),
            array('db' => 'usuario', 'dt' => 2),
            array('db' => 'descripcion', 'dt' => 3),
            array('db' => 'Correo', 'dt' => 4),
            array('db' => 'Estado', 'dt' => 5),
        );

        $tabla = "usuario";
        $pk = "id";
        $sql_config = SSP::tabla($_REQUEST, $vacio, $tabla, $pk, $columns);
        $arr = json_decode($sql_config);
        
        $sql_data = $usuario->consultarTabla($arr->limit, $arr->order, $arr->where, $arr->cols, $tabla);
              
        $sql_cantidad=$usuario->contarTabla($arr->where,$tabla);
            
       $total_registros = count($sql_data);
            
       $menu = json_encode($sql_data);
       
       $data='{"draw":'.intval( $request['draw'] ).',"recordsTotal":'.intval( $total_registros ).',"recordsFiltered":'.intval( $sql_cantidad['CANTIDAD'] ).',"data":'.$menu."}";
       
       echo $data;
    }
    public function usuario(){
        $usuario = $this->model('Usuario');
        echo json_encode($usuario->traerUsuario($_POST['id']));
    }
    
    public function guardar(){
        $usario = $this->model('Usuario');
        $id=$usario->guardar($_POST);
        echo $id;
    }
    
    public function actualizar(){
        $usuario = $this->model('Usuario');
        $usuario->actualizar($_POST);
    }
}
