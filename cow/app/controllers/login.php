<?php
/**
 * Description of login
 *
 * @author sarita
 */
class login extends Controller {
    
    public function index($name = '') {        
        $this->view('login/index',['name'=>'']);
    }
    
    public function validar(){
        $user = $this->model('Usuario');
        
        $usuario = $_POST['usuario'];
        $clave = $_POST['clave'];
        
        $respuesta = $user->getUsuario($usuario,$clave);
        
        if($respuesta!=""){        
            $this->view('home/index',['usuario'=>$menu]);
        }else{
            $this->view('home/error',['usuario'=>$respuesta['nombre']]);
        }
    }
    
    public function principal(){
        $this->ajax('ajax');
    }
    
    
    
    
    
}