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

    function getUsuario($usuario,$clave) {                       
        return $this->_db->query("SELECT * FROM usuario where usuario='$usuario' and clave='$clave'")->fetch();
    }
    
}
