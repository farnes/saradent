<?php
require_once '../app/core/Model.php';

class Afiliacion extends Model{
    
    function __construct() {
        parent::__construct();
    }
   
  function contarTabla($where, $table) {

        $cond = "WHERE estado.codigo = 'V'";
        if ($where != "") {
            $cond = "AND estado.codigo = 'V'";
        }


        $query = "SELECT COUNT(*) AS cantidad
                    FROM $table
                    INNER JOIN afiliacion ON($table.idafiliacion=afiliacion.id)
                    INNER JOIN persona ON(afiliacion.idtrabajador = persona.id)
                    INNER JOIN tipo_identificacion ON(persona.idtipo_identificacion = tipo_identificacion.id)
                    INNER JOIN estado ON ($table.idestado = estado.id)
                    $where $cond";
        return $this->_db->query($query)->fetch();
    }

    function consultarTabla($limit, $order, $where, $cols, $table) {

        $cond = "WHERE estado.codigo = 'V'";
        if ($where != "") {
            $cond = "AND estado.codigo = 'V'";
        }


        $query = "SELECT $limit
                        $table.id,
                        tipo_identificacion.descripcion tipoide,
                        persona.identificacion,
                        persona.nombre1,
                        persona.nombre2,
                        persona.apellido1,
                        persona.apellido2,
                        $table.fecha_solicitud,
                        estado.descripcion estado
                    FROM $table
                    INNER JOIN afiliacion ON($table.idafiliacion=afiliacion.id)
                    INNER JOIN persona ON(afiliacion.idtrabajador = persona.id)
                    INNER JOIN tipo_identificacion ON(persona.idtipo_identificacion = tipo_identificacion.id)
                    INNER JOIN estado ON ($table.idestado = estado.id)
                    $where $cond $order ";




        return $this->_db->query($query)->fetchall();
    }
    
    
    
      function contarTablaRechazadas($where, $table) {

        $cond = "WHERE estado.codigo = 'I'";
        if ($where != "") {
            $cond = "AND estado.codigo = 'I'";
        }


        $query = "SELECT COUNT(*) AS cantidad
                    FROM $table
                    INNER JOIN afiliacion ON($table.idafiliacion=afiliacion.id)
                    INNER JOIN persona ON(afiliacion.idtrabajador = persona.id)
                    INNER JOIN tipo_identificacion ON(persona.idtipo_identificacion = tipo_identificacion.id)
                    INNER JOIN estado ON ($table.idestado = estado.id)
                    $where $cond";
        return $this->_db->query($query)->fetch();
    }

    function consultarTablaRechazadas($limit, $order, $where, $cols, $table) {

        $cond = "WHERE estado.codigo = 'I'";
        if ($where != "") {
            $cond = "AND estado.codigo = 'I'";
        }


        $query = "SELECT $limit
                        $table.id,
                        tipo_identificacion.descripcion tipoide,
                        persona.identificacion,
                        persona.nombre1,
                        persona.nombre2,
                        persona.apellido1,
                        persona.apellido2,
                        $table.fecha_solicitud,
                        estado.descripcion estado
                    FROM $table
                    INNER JOIN afiliacion ON($table.idafiliacion=afiliacion.id)
                    INNER JOIN persona ON(afiliacion.idtrabajador = persona.id)
                    INNER JOIN tipo_identificacion ON(persona.idtipo_identificacion = tipo_identificacion.id)
                    INNER JOIN estado ON ($table.idestado = estado.id)
                    $where $cond $order ";




        return $this->_db->query($query)->fetchall();
    }
    
    function traerEmpresa($ide) {
        $query = "SELECT
                    id,
                    idtipo_identificacion,
                    identificacion,
                    razon_social,
                    digito_verificacion
                FROM
                    empresa WHERE identificacion='$ide'";
        return $this->_db->query($query)->fetch();
    }

    
    function guardarPersona($datos){                
        $query = "INSERT
            INTO persona(idtipo_identificacion,identificacion,idgenero,nombre1,nombre2,apellido1,apellido2,idestado_civil,direccion,telefono,correo,idmunicipio_nac,idmunicipio_res,fecha_nacimiento,telefono_movil,direccion_corres,jefe_hogar)
                VALUES
                (                    
                    $datos[tipoide],
                    '$datos[ide]',
                    $datos[genero],
                    '$datos[nom1]',
                    '$datos[nom2]',
                    '$datos[ape1]',
                    '$datos[ape2]',
                    $datos[estcivil],
                    '$datos[direccion]',
                    '$datos[telefono]',
                    '$datos[correo]',
                    $datos[mupio],
                    $datos[mupiores],
                    TO_DATE('$datos[fechanac]','%Y-%m-%d'),
                    '$datos[telefonomov]',
                    '$datos[direccioncorres]',
                    '$datos[jefeh]'    
                )";        
        $this->_db->query($query);        
        return $this->_db->lastInsertId();         
    }
    
    
    function actualizarPersona($datos){                
        $query = "UPDATE
            persona SET
            idtipo_identificacion=$datos[tipoide],
            identificacion='$datos[ide]',
            idgenero=$datos[genero],
            nombre1='$datos[nom1]',
            nombre2='$datos[nom2]',
            apellido1='$datos[ape1]',
            apellido2='$datos[ape2]',
            idestado_civil=$datos[estcivil],
            direccion='$datos[direccion]',
            telefono='$datos[telefono]',
            correo='$datos[correo]',
            idmunicipio_nac=$datos[mupio],
            idmunicipio_res=$datos[mupiores],
            fecha_nacimiento=TO_DATE('$datos[fechanac]','%Y-%m-%d'),
            telefono_movil='$datos[telefonomov]',
            direccion_corres='$datos[direccioncorres]',
            jefe_hogar='$datos[jefeh]'    
            WHERE id=$datos[persona]";   
        
//        echo $query;
        
        $this->_db->query($query);        
       
    }
    

    function guardarAfiliacion($datos,$persona){

        $query1 = "INSERT
                  INTO
                  afiliacion(fecha,idempresa,fecha_ingreso,cargo,horas_laboradas,salario_basico,comisiones,otros_ingresos,idmunicipio,idtrabajador,idestado,idtipootra_empresa,ideotra_empresa,razonsocotra_empresa,dvotra_empresa)
                    VALUES
                    (                        
                        TO_DATE('$datos[fechaing]','%Y-%m-%d'),
                        $datos[idempresa],
                        TO_DATE('$datos[fechaing]','%Y-%m-%d'),
                        '$datos[cargo]',
                        $datos[hlaboradas],
                        $datos[salbasico],
                        $datos[comisiones],
                        $datos[otrosf],
                        $datos[mupioemp],
                        $persona,
                        3,
                        $datos[otratipoideempresa],
                        '$datos[otraideempresa]',
                        '$datos[otraempresa]',
                        '$datos[otradv]'    
                    )";        

        $this->_db->query($query1);   
        return $this->_db->lastInsertId();
    }
    
    function actualizarAfiliacion($datos){

        $query1 = "UPDATE                  
                        afiliacion
                        SET 
                        fecha=TO_DATE('$datos[fechaing]','%Y-%m-%d'),
                        idempresa=$datos[idempresa],
                        fecha_ingreso=TO_DATE('$datos[fechaing]','%Y-%m-%d'),
                        cargo='$datos[cargo]',
                        horas_laboradas=$datos[hlaboradas],
                        salario_basico=$datos[salbasico],
                        comisiones=$datos[comisiones],
                        otros_ingresos=$datos[otrosf],
                        idmunicipio=$datos[mupioemp],
                        idtrabajador=$datos[persona],
                        idestado=3,
                        idtipootra_empresa=$datos[otratipoideempresa],
                        ideotra_empresa='$datos[otraideempresa]',
                        razonsocotra_empresa='$datos[otraempresa]',
                        dvotra_empresa='$datos[otradv]'    
                    WHERE id=$datos[afiliacion]";        

        $this->_db->query($query1);   
       
    }
    
    function guardarSolicitud($afiliacion){
        
        $fecha_actual = date("Y-m-d");
        
        try{
        $query2 = "INSERT
            INTO
                solicitud_trabajador
                (
                    fecha_solicitud,idafiliacion,idmotivo_rechazo,idestado
                )
                VALUES
                (                    
                    TO_DATE('$fecha_actual','%Y-%m-%d'),
                    $afiliacion,
                    -1,                    
                    3
                )";        
        
             
        $row = $this->_db->prepare($query2);
        $this->_db->beginTransaction(); 
        $row->execute();
        $this->_db->commit();
        $error=$row->errorInfo();
        
        }
        catch(PDOException $e)
            {
            $this->_db->rollBack();
            echo $e->getMessage();
            }
         
//            $this->_db->query($query);   
        return $this->_db->lastInsertId();  

    }
    
    function traerAfiliacion($solicitud){
        
        $query = "SELECT
                    solicitud_trabajador.id,
                    solicitud_trabajador.fecha_solicitud,
                    solicitud_trabajador.idafiliacion,
                    solicitud_trabajador.idmotivo_rechazo,
                    afiliacion.id afiliacion,
                    afiliacion.fecha,
                    afiliacion.idempresa,
                    afiliacion.fecha_ingreso,
                    afiliacion.cargo,
                    afiliacion.horas_laboradas,
                    afiliacion.salario_basico,
                    afiliacion.comisiones,
                    afiliacion.otros_ingresos,
                    afiliacion.idmunicipio,
                    afiliacion.idtrabajador,
                    afiliacion.idestado,
                    afiliacion.idtipootra_empresa,
                    afiliacion.ideotra_empresa,
                    afiliacion.razonsocotra_empresa,
                    afiliacion.dvotra_empresa,
                    persona.id persona,
                    persona.idtipo_identificacion,
                    persona.identificacion,
                    persona.idgenero,
                    persona.nombre1,
                    persona.nombre2,
                    persona.apellido1,
                    persona.apellido2,
                    persona.idestado_civil,
                    persona.direccion,
                    persona.telefono,
                    persona.telefono_movil,
                    persona.direccion_corres,
                    persona.correo,
                    persona.idmunicipio_nac,
                    persona.idmunicipio_res,
                    persona.fecha_nacimiento,
                    municipio.iddepartamento,
                    m1.iddepartamento deptores,
                    m2.iddepartamento deptonac,
                    persona.jefe_hogar
                FROM
                    solicitud_trabajador 
                    INNER JOIN afiliacion ON(solicitud_trabajador.idafiliacion = afiliacion.id)
                    INNER JOIN persona ON(afiliacion.idtrabajador = persona.id)        
                    INNER JOIN municipio ON(afiliacion.idmunicipio = municipio.id)
                    INNER JOIN municipio m1 ON(persona.idmunicipio_res = m1.id)
                    INNER JOIN municipio m2 ON(persona.idmunicipio_nac = m2.id)
                    WHERE solicitud_trabajador.id=$solicitud";
        return $this->_db->query($query)->fetch();
        
    }
    
    
    //para la actualización de datos
    function guardarPersonaTmp($datos){            
        
        $fecha_actual = date("Y-m-d");
        
        $query = "INSERT
            INTO personatmp(idtipo_identificacion,identificacion,idgenero,nombre1,
            nombre2,apellido1,apellido2,idestado_civil,direccion,telefono,correo,
            fecha_nacimiento,telefono_movil,direccion_corres,fecha_cedula,origen,documento,fecha)
                VALUES
                (                    
                    $datos[tipoide],
                    '$datos[ide]',
                    $datos[genero],
                    '$datos[nom1]',
                    '$datos[nom2]',
                    '$datos[ape1]',
                    '$datos[ape2]',
                    $datos[estcivil],
                    '$datos[direccion]',
                    '$datos[telefono]',
                    '$datos[correo]',                  
                    TO_DATE('$datos[fechanac]','%Y-%m-%d'),
                    '$datos[telefonomov]',
                    '$datos[direccioncorres]',
                    TO_DATE('$datos[fecexp]','%Y-%m-%d'),                        
                    '$datos[tblorigen]',
                    '$datos[ideorigen]',
                    TO_DATE('$fecha_actual','%Y-%m-%d')          
                )";  
                
        $this->_db->query($query);        
        return $this->_db->lastInsertId();         
    }
    
    
}
