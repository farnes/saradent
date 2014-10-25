<?php

/**
 * Description of Database
 *
 * @author sarita
 */
//include_once '../config/config.php';
class DatabaseSub extends PDO
{
    public function __construct()
    {
//        parent::__construct(
//            'mysql:host=' . $cfg['db']['hostname'] .
//            ';dbname=' . $cfg['db']['database'],
//            $cfg['db']['username'], 
//            $cfg['db']['password'], 
//            array(
//                PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES '. $cfg['db']['char']
//                ));        
//        
        parent::__construct("informix:host=200.0.0.19;service=9088;database=empresa;server=produccionweb;protocol=onsoctcp;EnableScrollableCursors=1;CLIENT_LOCALE=es_ES.utf8",
                "informix",
                "J@deL-3701,8");        
        
    }
}