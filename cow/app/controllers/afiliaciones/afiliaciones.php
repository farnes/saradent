<?php

class Afiliaciones extends Controller {
    
   public function index($name = '') {       
        $this->view('afiliaciones/index',['name'=>"NA"]);
    }

   public function principal(){
        $this->ajax('ajax');
    }
    
   public function afiliacion($name = '') {       
        $this->view('afiliaciones/afiliacion',['name'=>"NA"]);
    } 
    
   public function tabla(){       
       require '../app/util/ssp.class.php';
       $afiliacion = $this->model('Afiliacion');
       
       //configurar tabla
       $columns = array(
	array( 'db' => 'ID','dt' => 0 ),
	array( 'db' => 'TIPOIDE','dt' => 1 ),
        array( 'db' => 'IDENTIFICACION','dt' => 2 ),
        array( 'db' => 'NOMBRE1','dt' => 3 ),
        array( 'db' => 'NOMBRE2','dt' => 4 ),
        array( 'db' => 'APELLIDO1','dt' => 5 ),
        array( 'db' => 'APELLIDO2','dt' => 6 ),
        array( 'db' => 'FECHA','dt' => 7 ),
        array( 'db' => 'ESTADO.DESCRIPCION','dt' => 8 )        
        ); 
       
//       $columns2 = array();      
//       $cols = $_REQUEST['columns'];       
//       for($i=0;$i<count($cols);$i++){           
//           $columns2[$i]['db']=$cols[$i]['data'];
//           $columns2[$i]['dt']= $i; 
//       } 

       $tabla = "solicitud_trabajador";       
       $pk = "id";       
       $sql_config = SSP::tabla($_REQUEST, $vacio, $tabla, $pk, $columns);
       $arr = json_decode($sql_config);
                            
       $sql_data = $afiliacion->consultarTabla($arr->limit, $arr->order, $arr->where, $arr->cols,$tabla);
                
       $sql_cantidad=$afiliacion->contarTabla($arr->where,$tabla);
       $total_registros = count($sql_data);
            
       $menu = json_encode($sql_data);
       
       $data='{"draw":'.intval( $request['draw'] ).',"recordsTotal":'.intval( $total_registros ).',"recordsFiltered":'.intval( $sql_cantidad['CANTIDAD'] ).',"data":'.$menu."}";
       
       $this->ajax('afiliaciones/tabla',['tabla'=>$data]);
    }

   public function tabla_rechazadas(){       
       require '../app/util/ssp.class.php';
       $afiliacion = $this->model('Afiliacion');
       
       //configurar tabla
       $columns = array(
	array( 'db' => 'ID','dt' => 0 ),
	array( 'db' => 'TIPOIDE','dt' => 1 ),
        array( 'db' => 'IDENTIFICACION','dt' => 2 ),
        array( 'db' => 'NOMBRE1','dt' => 3 ),
        array( 'db' => 'NOMBRE2','dt' => 4 ),
        array( 'db' => 'APELLIDO1','dt' => 5 ),
        array( 'db' => 'APELLIDO2','dt' => 6 ),
        array( 'db' => 'FECHA','dt' => 7 ),
        array( 'db' => 'ESTADO.DESCRIPCION','dt' => 8 )        
        ); 
       
       $tabla = "solicitud_trabajador";       
       $pk = "id";       
       $sql_config = SSP::tabla($_REQUEST, $vacio, $tabla, $pk, $columns);
       $arr = json_decode($sql_config);
                            
       $sql_data = $afiliacion->consultarTablaRechazadas($arr->limit, $arr->order, $arr->where, $arr->cols,$tabla);
       
       $sql_cantidad=$afiliacion->contarTablaRechazadas($arr->where,$tabla);
       $total_registros = count($sql_data);
            
       $menu = json_encode($sql_data);
       
       $data='{"draw":'.intval( $request['draw'] ).',"recordsTotal":'.intval( $total_registros ).',"recordsFiltered":'.intval( $sql_cantidad['CANTIDAD'] ).',"data":'.$menu."}";
       
       $this->ajax('afiliaciones/tabla',['tabla'=>$data]);
    }    
    
    
    //TRABAJADORES SUBSI15
    public function tabla_trabajadores(){       
       require '../app/util/ssp.class.php';
       $afiliacion = $this->model('Trabajador');
       
       //configurar tabla
       $columns = array(	
	array( 'db' => 'DETDOC','dt' => 0 ),
        array( 'db' => 'CEDTRA','dt' => 1 ),
        array( 'db' => 'PRINOM','dt' => 2 ),
        array( 'db' => 'SEGNOM','dt' => 3 ),
        array( 'db' => 'PRIAPE','dt' => 4 ),
        array( 'db' => 'SEGAPE','dt' => 5 ),
        array( 'db' => 'FECAFI','dt' => 6 ),
        array( 'db' => 'ESTADO','dt' => 7 )        
        ); 
 

       $tabla = "afiliacion";       
       $pk = "id";       
       $sql_config = SSP::tabla($_REQUEST, $vacio, $tabla, $pk, $columns);
       $arr = json_decode($sql_config);
                            
       $sql_data = $afiliacion->consultarTabla($arr->limit, $arr->order, $arr->where, $arr->cols,$tabla);
                
       
       
       $sql_cantidad=$afiliacion->contarTabla($arr->where,$tabla);
       $total_registros = count($sql_data);
            
       $menu = json_encode($sql_data);
       
       $data='{"draw":'.intval( $request['draw'] ).',"recordsTotal":'.intval( $total_registros ).',"recordsFiltered":'.intval( $sql_cantidad['CANTIDAD'] ).',"data":'.$menu."}";
       
       $this->ajax('afiliaciones/tabla',['tabla'=>$data]);
    } 
    
    
    //TRAER EMRESAS
    function empresa(){
        $ide = $_REQUEST['empresa'];
        $ide = '817003543';
        
        $afiliacion = $this->model('Afiliacion');        
        $datos = $afiliacion->traerEmpresa($ide);        
        echo json_encode($datos);
        
    }
    
    function guardar(){                 
        $afiliacion = $this->model('Afiliacion');        
        $persona=$afiliacion->guardarPersona($_POST);
        $idaf=$afiliacion->guardarAfiliacion($_POST,$persona);
        $rad=$afiliacion->guardarSolicitud($idaf);
                
        //cargar archivo
        if (!file_exists('/opt/soportes/'.$rad)) {
            mkdir('/opt/soportes/'.$rad.'/', 0777, true);
            //para el file
            $target_dir = "/opt/soportes/".$rad.'/';
            $target_dir = $target_dir . basename( $_FILES["cedulapdf"]["name"]);
            move_uploaded_file($_FILES["cedulapdf"]["tmp_name"], $target_dir);
        }
        
        
        
        echo $rad;         
    }
    
    function actualizar(){        
        $afiliacion = $this->model('Afiliacion');        
        $afiliacion->ActualizarPersona($_POST);
        $afiliacion->ActualizarAfiliacion($_POST);     
        
        //cargar archivo
        if (!file_exists('/opt/soportes/'.$_POST[id])) {
            mkdir('/opt/soportes/'.$_POST[id].'/', 0777, true);         
        }
           //para el file
            $target_dir = "/opt/soportes/".$_POST[id]."/";
            $target_dir = $target_dir . basename( $_FILES["cedulapdf"]["name"]);
            move_uploaded_file($_FILES["cedulapdf"]["tmp_name"], $target_dir);            
        
    }
    
    function solicitud(){
        $afiliacion = $this->model('Afiliacion');        
        echo json_encode($afiliacion->traerAfiliacion($_POST['solicitud']));
    }
    
    function soportes(){
        
        if(isset($_POST[id])){
        if ($handle = opendir("/opt/soportes/".$_POST[id]."/")) {
            $dir = array();
            while (false !== ($entry = readdir($handle))) {
                if ($entry != "." && $entry != "..") {
                    $dir[]=array( 'ARCHIVO'=>$entry);
                }
            }            
            closedir($handle);
        }        
        echo json_encode($dir);
        }
    }
    
    function soporte_borrar(){      
        unlink("/opt/soportes/".$_POST[id]."/".$_POST[archivo]);        
    }
    
   public function buscar_persona(){       
       require '../app/util/ssp.class.php';
       $subsidio = $this->model('Trabajador');       
       $trabajador = $subsidio->traerTrabajador($_POST[ide]);
       $conyugue = $subsidio->traerConyugue($_POST[ide]);
       $beneficiario = $subsidio->traerBeneficiario($_POST[ide]);                  
       echo json_encode(array($trabajador,$conyugue,$beneficiario));
   } 
    
}
