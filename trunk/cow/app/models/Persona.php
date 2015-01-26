<?php
require_once '../app/core/Model.php';
/**
 * Description of Persona
 *
 * @author eorozco
 */
class Persona extends Model {
    function __construct() {
        parent::__construct();
    }
    
    function contarTabla($where, $table) {
    
        $query = "SELECT COUNT(*) AS cantidad
                    FROM $table                    
                    INNER JOIN tipo_identificacion ON(persona.idtipo_identificacion = tipo_identificacion.id)                   
                    $where";
//        echo $query;
        
        return $this->_db->query($query)->fetch();
    }

    function consultarTabla($limit, $order, $where, $cols, $table) {
       
        $query = "SELECT 
                        $table.id,                        
                        $table.identificacion,
                        $table.nombre1,
                        $table.nombre2,
                        $table.apellido1,
                        $table.apellido2
                    FROM $table
                    INNER JOIN tipo_identificacion ON($table.idtipo_identificacion = tipo_identificacion.id)                    
                    $where $order $limit";
        
//        echo $query;
        
        return $this->_db->query($query)->fetchall();
    }
    
    
    function traerPersona($id){
        
        $query = "SELECT                    
                    persona.id,
                    persona.idtipo_identificacion,
                    persona.identificacion,
                    persona.idgenero,
                    persona.nombre1,
                    persona.nombre2,
                    persona.apellido1,
                    persona.apellido2,                   
                    persona.direccion,
                    persona.telefono,
                    persona.correo,
                    persona.idmunicipio,
                    persona.idgrupo_poblacion,
                    persona.fecha_nacimiento,
                    municipio.iddepartamento
                FROM
                    persona                     
                    INNER JOIN municipio ON(persona.idmunicipio = municipio.id)
                    WHERE persona.id=$id";
                        
        return $this->_db->query($query)->fetch();
        
    }
    
    function guardar($datos){                
        $query = "INSERT
            INTO persona(idtipo_identificacion,identificacion,idgenero,nombre1,nombre2,apellido1,apellido2,direccion,telefono,correo,idmunicipio,fecha_nacimiento,idgrupo_poblacion)
                VALUES
                (                    
                    $datos[tipoide],
                    '$datos[ide]',
                    $datos[genero],
                    '$datos[nom1]',
                    '$datos[nom2]',
                    '$datos[ape1]',
                    '$datos[ape2]',                   
                    '$datos[direccion]',
                    '$datos[telefono]',
                    '$datos[correo]',
                    $datos[mupio],                   
                    '$datos[fechanac]',       
                     $datos[gpoblacion]   
                )";        
        
//        echo $query;
        
        $this->_db->query($query);        
        return $this->_db->lastInsertId();         
    }
    
    function actualizar($datos){                
        $query = "UPDATE
            persona SET
            idtipo_identificacion=$datos[tipoide],
            identificacion='$datos[ide]',
            idgenero=$datos[genero],
            nombre1='$datos[nom1]',
            nombre2='$datos[nom2]',
            apellido1='$datos[ape1]',
            apellido2='$datos[ape2]',
            direccion='$datos[direccion]',
            telefono='$datos[telefono]',
            correo='$datos[correo]',
            idmunicipio=$datos[mupio],
            fecha_nacimiento='$datos[fechanac]',        
            idgrupo_poblacion='$datos[gpoblacion]'    
            WHERE id=$datos[id]";   
        
//        echo $query;
        
        $this->_db->query($query);        
       
    }
    
    
    
    
}
