<?php

require_once '../app/core/Model.php';
/**
 * Description of Persona
 *
 * @author eorozco
 */
class Pago extends Model {
    function __construct() {
        parent::__construct();
    }
    
    function contarTabla($where, $table) {
    
        $query = "SELECT COUNT(*) AS cantidad
                    FROM $table                    
                    INNER JOIN tratamiento ON($table.id_tratamiento = tratamiento.id)
                    INNER JOIN historia ON(tratamiento.id_historia=historia.id)
                    INNER JOIN persona ON (historia.idpaciente=persona.id)
                    $where";
//        echo $query;
        
        return $this->_db->query($query)->fetch();
    }

    function consultarTabla($limit, $order, $where, $cols, $table) {
       
        $query = "SELECT 
                        $table.id,                        
                        persona.identificacion,
                        $table.fecha,
                        $table.valor
                    FROM $table
                    INNER JOIN tratamiento ON($table.id_tratamiento = tratamiento.id)
                    INNER JOIN historia ON(tratamiento.id_historia=historia.id)
                    INNER JOIN persona ON (historia.idpaciente=persona.id)                    
                    $where $order $limit";
        
//        echo $query;
        
        return $this->_db->query($query)->fetchall();
    }
    
    
    function guardar($datos){        
        $query="INSERT INTO `cuenta` "
                . "(`id_tratamiento`, `fecha`, `valor`, `tipo`, `fecha_pago`, `num_cuotas`, `estado`) "
                . "VALUES ('$datos[id_tratamiento]', "
                . "'$datos[fechacuenta]', "
                . "'$datos[valor]', "
                . "'$datos[tipopago]', "
                . "'$datos[fechapago]', "
                . "'$datos[numcuotas]', "
                . "'$datos[estadopago]');";
        $this->_db->query($query);        
        return $this->_db->lastInsertId();
    }
    
    function agregarPago($datos){  
        
        $fecha = date('Y-m-d');
        
        $query="INSERT INTO `pago` "
                . "(`id_cuenta`, `fecha_pago`, `valor`) "
                . "VALUES ('$datos[id]', "
                . "'$fecha', "                
                . "'$datos[valor]');";
        $this->_db->query($query);        
        return $this->_db->lastInsertId();
    }
    
    
    function traerPagos($id) {
       
        $query = "SELECT 
                        *
                    FROM pago
                    where id_cuenta=$id";
        
//        echo $query;
        
        return $this->_db->query($query)->fetchall();
    }
}