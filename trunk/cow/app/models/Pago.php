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
}