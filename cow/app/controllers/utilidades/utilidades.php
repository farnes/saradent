<?php
class utilidades extends Controller {
      
   public function combo(){
       
       $util = $this->model('Utilidad');
       $lista = $util->comboSimple($_POST['tabla'],"ID","DESCRIPCION");
       echo "<option value=''>.::Seleccione::.</option>";
       foreach ($lista as $valor) {
           echo "<option value='".$valor['ID']."'>".$valor['DESCRIPCION']."</option>";
       }
    }

   public function comboDependiente(){
       
       $util = $this->model('Utilidad');
       $lista = $util->comboDependiente($_POST['tabla'],"ID","DESCRIPCION",$_POST['fk'],$_POST['tblfk']);
       echo "<option value=''>.::Seleccione::.</option>";
       foreach ($lista as $valor) {
           echo "<option value='".$valor['ID']."'>".$valor['DESCRIPCION']."</option>";
       }
    }
    
    
}