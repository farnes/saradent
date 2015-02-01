<?php
require_once '../app/core/Model.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Odonto
 *
 * @author sarita
 */
class Odonto extends Model {
    
    function traerProcedimientos() {
        $query = "SELECT id, codigo, descripcion, aplica_cara, aplica_diente FROM procedimiento";       
        return $this->_db->query($query)->fetchall();       
    }
    
    function traerTratamiento($paciente) {
        $query = "SELECT
                    tratamiento_diente.id_diente,
                    cara.codigo cara,
                    procedimiento.codigo,
                    procedimiento.descripcion,
                    procedimiento.aplica_cara,
                    procedimiento.aplica_diente,
                    tratamiento_diente.id idtrat,
                    tratamiento_diente.fecha
                FROM
                    tratamiento_diente
                INNER JOIN
                    cara
                ON
                    (
                        tratamiento_diente.id_cara = cara.id)
                INNER JOIN
                    tratamiento_detalle
                ON
                    (
                        tratamiento_diente.id = tratamiento_detalle.id_tratamiento)
                INNER JOIN
                    procedimiento
                ON
                    (
                        tratamiento_detalle.id_procedimiento = procedimiento.id)
                WHERE tratamiento_diente.id_historia=$paciente order by tratamiento_detalle.id asc";
        
        //echo $query;
        
        return $this->_db->query($query)->fetchall();
       
    }
    
    
    function guardar($diente,$cara,$historia){
        $fecha_actual = date("Y-m-d");
        $query = "INSERT INTO `tratamiento_diente` (`id_diente`, `id_cara`, `fecha`, `id_historia`) "
                . "VALUES ($diente, $cara, '$fecha_actual', $historia)";
        $this->_db->query($query);
        return $this->_db->lastInsertId();
    }
    
    function guardarDetalle($id_tratamiento,$procedimiento,$obs){
        $query = "INSERT INTO `tratamiento_detalle` (`id_tratamiento`, `id_procedimiento`,observacion) "
                . "VALUES ($id_tratamiento, $procedimiento,'$obs')";
        $this->_db->query($query);
        return $this->_db->lastInsertId();
    }
    
    
    function borrarDetalle($tratamiento){
        $query = "DELETE FROM `tratamiento_detalle` WHERE id_tratamiento=$tratamiento";
        $this->_db->query($query);
       }
    function borrarCabecera($tratamiento){
        $query = "DELETE FROM `tratamiento_diente` WHERE id=$tratamiento";
        $this->_db->query($query);
       }
    function mostrarTratamiento($tratamiento) {
        $query = "SELECT observacion, procedimiento.descripcion "
                . "FROM tratamiento_detalle "
                . "INNER JOIN procedimiento ON(tratamiento_detalle.id_procedimiento=procedimiento.id)"
                . "where id_tratamiento=$tratamiento";       
        return $this->_db->query($query)->fetch();       
    }
    
}
