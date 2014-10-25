<?php
/**
 * Description of trabajadores
 *
 * @author eorozco
 */
class trabajadores extends Controller {
    
    public function afiliacion($name = '') {       
        $this->view('trabajadores/trabajador',['name'=>"NA"]);
    } 
    
    //TRAER EMRESAS
    function empresa(){
        $ide = $_REQUEST['empresa'];
        $ide = '817003543';
        
        $trabajador = $this->model('Trabajador');        
        $datos = $trabajador->traerEmpresa($ide);        
        echo json_encode($datos);
        
    }
    
    function trabajador(){
        $afiliacion = $this->model('Trabajador');        
        echo json_encode($afiliacion->traerDatosTrabajador($_POST['ide']));
    }
    
    
    function guardar(){                 
        $afiliacion = $this->model('Afiliacion');        
        $persona=$afiliacion->guardarPersonaTmp($_POST);
        
        //cargar archivo
        if (!file_exists('/opt/soportes/actualizaciones/'.$_POST[ide])) {
            mkdir('/opt/soportes/actualizaciones/'.$_POST[ide].'/', 0777, true);
            //para el file
            $target_dir = "/opt/soportes/actualizaciones/".$_POST[ide]."/";
            $target_dir = $target_dir . basename( $_FILES["cedulapdf"]["name"]);
            move_uploaded_file($_FILES["cedulapdf"]["tmp_name"], $target_dir);
            rename($target_dir, "/opt/soportes/actualizaciones/".$_POST[ide]."/".$_POST[ide].".pdf");
        }       
        echo $persona;         
    }
    
    function soportes(){
        
        if(isset($_POST[id])){
        if ($handle = opendir("/opt/soportes/actualizaciones/".$_POST[id]."/")) {
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
    
}
