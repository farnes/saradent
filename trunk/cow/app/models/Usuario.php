<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Usuario
 *
 * @author sarita
 */
require_once '../app/core/Model.php';

class Usuario extends Model {

    function __construct() {
        parent::__construct();
    }

    function getUsuarios($param) {
        return $this->_db->query("SELECT * FROM usuario")->fetchall();
    }

    function getUsuario($usuario, $clave) {
        return $this->_db->query("SELECT * FROM usuario where usuario='$usuario' and clave='$clave'")->fetch();
    }
    
    function contarTabla($where, $table) {
        $query = "SELECT COUNT(*) AS cantidad "
                . "FROM $table INNER JOIN rol ON (rol.id = usuario.id_rol) "
                . "$where";
        //echo $query;
        return $this->_db->query($query)->fetch();
    }
    function consultarTabla($limit, $order, $where, $cols, $table) {
     $query="SELECT $table.id, $table.usuario, $table.nombre, rol.descripcion,$table.correo, $table.estado"
             . " FROM $table INNER JOIN rol on(rol.id = usuario.id_rol)"
             . "$where $order $limit"
             ;
     //echo $query;
     return $this->_db->query($query)->fetchall();
        
    }
    
    function traerUsuario($id) {
        $query = "SELECT usuario.id, usuario.usuario, usuario.nombre, usuario.clave, usuario.correo, rol.id idrol, usuario.estado"
                . " FROM usuario INNER JOIN rol ON (rol.id = usuario.id_rol) "
                . "WHERE usuario.id=$id";
        return $this->_db->query($query)->fetch();
    }
    
    function guardar($datos){                
        $query = "INSERT
            INTO usuario(usuario,nombre,clave,correo,id_rol,estado)
                VALUES
                (                    
                    '$datos[usuario]',
                    '$datos[nombre]',
                    '$datos[clave]',
                    '$datos[correo]',
                    $datos[rol],
                    '$datos[estado]'   
                )";        
        
//        echo $query;
        
        $this->_db->query($query);        
        return $this->_db->lastInsertId();         
    }
    
    function actualizar($datos){                
        $query = "UPDATE
            usuario SET
            usuario='$datos[usuario]',
            nombre='$datos[nombre]',
            clave='$datos[clave]',
            correo='$datos[correo]',
            id_rol=$datos[rol],
            estado='$datos[estado]'
            WHERE id=$datos[id]";   
        
//        echo $query;
        
        $this->_db->query($query);        
       
    }
    

}
