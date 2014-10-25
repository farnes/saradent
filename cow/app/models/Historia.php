<?php
require_once '../app/core/Model.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Historia
 *
 * @author eorozco
 */
class Historia extends Model{
    
    function crearHistoria($datos){    
        
        $fecha_actual = date("Y-m-d");
        
        $query = "INSERT
                    INTO
                        historia
                        (
                            fecha,
                            iddx_presuntivo,
                            iddx_definitivo,
                            idpaciente
                        )
                        VALUES
                        (
                            '$fecha_actual',
                            0,
                            0,
                            $datos[id]
                        )";        
        
//        echo $query;
        
        $this->_db->query($query);        
        return $this->_db->lastInsertId();         
    }
    
    
    function validarHistoria($datos) {
       
        $query = "SELECT
                    id,
                    fecha,
                    iddx_presuntivo,
                    iddx_definitivo,
                    idpaciente
                FROM
                    historia WHERE idpaciente = $datos[id]";
        
//        echo $query;
        
        return $this->_db->query($query)->fetch();
    }
    
    
}
