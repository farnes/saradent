<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Pagos extends Controller{
    
    public function index($name = '') {       
        $this->view('pagos/index',['name'=>"NA"]);
    }
        
    public function tabla(){       
       require '../app/util/ssp.class.php';
       $persona = $this->model('Pago');
       
       //configurar tabla
       $columns = array(
	array( 'db' => 'ID','dt' => 0 ),
        array( 'db' => 'IDENTIFICACION','dt' => 1 ),
        array( 'db' => 'FECHA','dt' => 2 ),
        array( 'db' => 'VALOR','dt' => 3 ) 
        ); 
       
       $tabla = "cuenta";       
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
    
    
    function crearpago(){
        $persona = $this->model('Pago');
        $id=$persona->guardar($_POST);
        $pago = $this->traerpago($id);
        echo json_encode($pago);
    }
    
    function traerpago($id){
        $persona = $this->model('Pago');
        $pago=$persona->traerPago($id);
        return $pago;
    }
    
    function traerpagotratamiento(){
        $persona = $this->model('Pago');
        $pago=$persona->traerPagoTratamiento($_POST['id_tratamiento']);
        echo json_encode($pago);
    }
    
    function agregarpago(){
        $persona = $this->model('Pago');
        $id=$persona->agregarPago($_POST);  
        $pagos = $persona->traerPagos($_POST[cuenta]);
        
        echo "<table style='width:100%'>";
        echo "<tr><th>Fecha Pago</th><th>Valor</th><th>Acciones</th></tr>";
        foreach ($pagos as $value) {
            echo "<tr><td>".$value[fecha_pago]."</td><td>".$value[valor]."</td>"
                    . "<td align='center'>"
                    . "<img src='../../public/images/Print-Quick.png' onclick='imprimir(".$value[id].")' />&nbsp;&nbsp;"
                    . "<img src='../../public/images/delete.png' onclick='eliminarPago(".$value[id].",".$_POST[cuenta].")'/>"
                    . "</td></tr>";
        }
        echo "</table>";
    }
    
    function traerpagos(){
        $persona = $this->model('Pago');
        $pagos = $persona->traerPagos($_POST[cuenta]);
        echo "<table style='width:100%'>";
        echo "<tr><th>Fecha Pago</th><th>Valor</th><th>Acciones</th></tr>";
        foreach ($pagos as $value) {
            echo "<tr><td>".$value[fecha_pago]."</td><td>".$value[valor]."</td>"
                    . "<td align='center'>"
                    . "<img src='../../public/images/Print-Quick.png' onclick='imprimir(".$value[id].")' />&nbsp;&nbsp;"
                    . "<img src='../../public/images/delete.png' onclick='eliminarPago(".$value[id].",".$_POST[cuenta].")'/>"
                    . "</td></tr>";
        }
        echo "</table>";
    }
    
    function eliminar(){
        $persona = $this->model('Pago');
        $persona->eliminar($_POST);
        $pagos = $persona->traerPagos($_POST[cuenta]);
        
        echo "<table style='width:100%'>";
        echo "<tr><th>Fecha Pago</th><th>Valor</th><th>Acciones</th></tr>";
        foreach ($pagos as $value) {
            echo "<tr><td>".$value[fecha_pago]."</td><td>".$value[valor]."</td>"
                    . "<td align='center'>"
                    . "<img src='../../public/images/Print-Quick.png'  onclick='imprimir(".$value[id].")'/>&nbsp;&nbsp;"
                    . "<img src='../../public/images/delete.png' onclick='eliminarPago(".$value[id].",".$_POST[cuenta].")'/>"
                    . "</td></tr>";
        }
        echo "</table>";
    }
    
    function traerpagado($id){
        $persona = $this->model('Pago');
        $pago=$persona->traerPagado($_POST[cuenta]);
        echo json_encode($pago);
    }
    
    function imprimir(){
        $persona = $this->model('Pago');
        $pago=$persona->traerPagoRecibo($_REQUEST[id]);
                
        $nombre=""; 
        echo "<center><img src='../../public/images/cab.png' width='200px'/></center>";           
        
        echo "<center><h2>RECIBO DE PAGO TRATAMIENTO</h2></center>";           
       
        echo "<table width='100%'>";
            echo "<tr><td>Fecha: </td><td>".$pago[fecha_pago]."</td></tr>";
        echo "</table><br>";
        
        echo"<p>Recib&iacute; de se&ntilde;or(a) $nombre, la suma de ".$pago[valor]." pesos M/C, por concepto de cuota tratamiento.</p>";
        
        echo "<br>Recibi&oacute;:___________________________";
        
    }
    
    function traerpagorecibo(){
        $persona = $this->model('Pago');
        $pago=$persona->traerPagoRecibo($_POST[id]);
        echo json_encode($pago);
    }
    
} 