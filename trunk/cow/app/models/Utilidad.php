<?php
require_once '../app/core/Model.php';

class Utilidad extends Model {

    function __construct() {
        parent::__construct();
    }

    function comboSimple($tabla, $campoid, $campodes) {
        $query = "SELECT $campoid,$campodes FROM $tabla";
        return $this->_db->query($query)->fetchall();
    }
    function comboDependiente($tabla, $campoid, $campodes, $fk, $tblfk) {
        $query = "SELECT $campoid,$campodes FROM $tabla WHERE id$tblfk=$fk";
        return $this->_db->query($query)->fetchall();
    }


}
