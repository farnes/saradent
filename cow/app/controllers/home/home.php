<?php
class Home extends Controller {
    
   public function index($name = '') {
        $user = $this->model('User');
        $user->name = $name;        
        $this->view('login/index',['name'=>$user->name]);
    }

   public function principal(){
        $this->ajax('ajax');
    }
        
   public function validar(){  
        $user = $this->model('Usuario');        
        $usuario = $_POST['usuario'];
        $clave = $_POST['clave'];               
        
        $respuesta = $user->getUsuario($usuario,$clave);
        
        if($respuesta!=""){     
            session_start();
            $_SESSION['session_username']=$usuario;
            $this->view('home/index',['usuario'=>$menu]);
        }else{
            $this->view('login/index',['usuario'=>$respuesta['nombre']]);
        }
    }
    
    
    
    

}
