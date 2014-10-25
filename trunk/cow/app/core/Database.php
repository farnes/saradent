<?php

/**
 * Description of Database
 *
 * @author sarita
 */
//include_once '../config/config.php';
class Database extends PDO
{
    public function __construct()
    {
        parent::__construct('mysql:host=localhost;dbname=saradent', "root", "1234", 
            array(
                PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
                ));        
//        
//        parent::__construct("informix:host=200.0.0.19;service=9088;database=acceso;server=produccionweb;protocol=onsoctcp;EnableScrollableCursors=1", "informix", "J@deL-3701,8");        
        
    }
}