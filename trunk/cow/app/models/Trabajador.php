<?php

require_once '../app/core/ModelSub.php';

class Trabajador extends ModelSub{
    
    function __construct() {
        parent::__construct();
    }
    
     function contarTabla($where, $table) {
//        $query = "SELECT COUNT(*) AS cantidad FROM $table $where";     
        
        $cond =  "WHERE subsi15.nit = '817003543'"; 
        if($where!=""){
            $cond =  "AND subsi15.nit = '817003543'";
        }
         
         
        $query = "SELECT COUNT(*) AS cantidad
                   FROM
                    subsi15
                INNER JOIN
                    gener18
                ON
                    (
                        subsi15.coddoc = gener18.coddoc)
                
                    $where $cond ";
        return $this->_db->query($query)->fetch();
    }

    function consultarTabla($limit, $order, $where, $cols, $table) {
        //$query = "SELECT $limit $cols FROM $table $where";     
        
        $cond =  "WHERE subsi15.nit = '817003543'"; 
        if($where!=""){
            $cond =  "AND subsi15.nit = '817003543'";
        }
        
        
        $query = "SELECT $limit                    
                    trim(gener18.detdoc),
                    trim(subsi15.cedtra),
                    trim(subsi15.prinom),
                    trim(subsi15.segnom),
                    trim(subsi15.priape),
                    trim(subsi15.segape),
                    subsi15.fecafi,
                    trim(subsi15.estado)
                FROM
                    subsi15
                INNER JOIN
                    gener18
                ON
                    (
                        subsi15.coddoc = gener18.coddoc)
                
                   $where $cond $order ";

//        echo $query;
        
        
          $res = $this->_db->query($query)->fetchall();
        
          return $res;
    }
    
    
    function traerTrabajador($ide) {            
        $query = "SELECT
                    trim(subsi15.cedtra) cedtra,
                    subsi15.coddoc,
                    trim(subsi15.priape) priape,
                    trim(subsi15.segape) segape,
                    trim(subsi15.prinom) prinom,
                    trim(subsi15.segnom) segnom,
                    trim(subsi15.direccion) direccion,
                    trim(subsi15.codciu) codciu,
                    trim(subsi15.telefono) telefono,
                    trim(subsi15.email) email,
                    subsi15.fecnac,
                    trim(subsi15.sexo) sexo,
                    trim(subsi15.estciv) estciv,
                    'TRAB' origen
                FROM
                    subsi15 where subsi15.cedtra = '$ide'";
        return $this->_db->query($query)->fetch();        
    }
    
    function traerConyugue($ide) {            
        $query = "SELECT           
                    trim(subsi20.cedcon) as cedtra,
                    subsi20.coddoc,
                    trim(subsi20.priape) priape,
                    trim(subsi20.segape) segape,
                    trim(subsi20.prinom) prinom,
                    trim(subsi20.segnom) segnom,
                    trim(subsi20.direccion) direccion,
                    trim(subsi20.codciu) codciu,
                    trim(subsi20.telefono) telefono,
                    trim(subsi20.email) email,
                    subsi20.fecnac,
                    trim(subsi20.sexo) sexo,
                    trim(subsi20.estciv) estciv,
                    'CONY' origen
                    FROM subsi20 WHERE subsi20.cedcon='$ide'";
        return $this->_db->query($query)->fetch();        
    }
    
    function traerBeneficiario($ide) {            
        $query = "SELECT   
                    trim(subsi22.documento) as cedtra,
                    subsi22.coddoc,
                    trim(subsi22.priape) priape,
                    trim(subsi22.segape) segape,
                    trim(subsi22.prinom) prinom,
                    trim(subsi22.segnom) segnom, 
                    trim(subsi15.direccion) direccion,
                    trim(subsi15.codciu) codciu,
                    trim(subsi15.telefono) telefono,
                    trim(subsi15.email) email,  
                    subsi22.fecnac,
                    trim(subsi22.sexo) sexo,
                    trim(subsi15.estciv) estciv,
                    'BENF' origen
                FROM subsi22 
                INNER JOIN subsi23 ON(subsi22.codben=subsi23.codben)
                INNER JOIN subsi15 ON(subsi23.cedtra=subsi15.cedtra)
                WHERE documento='$ide'";
        return $this->_db->query($query)->fetch();        
    }
    
    function traerEmpresa($ide) {
        $query = "SELECT
                    0 as id,
                    coddoc idtipo_identificacion,
                    nit identificacion,
                    razsoc razon_social,
                    digver digito_verificacion
                FROM
                    subsi02 WHERE nit='$ide'";
        return $this->_db->query($query)->fetch();
    }      
    
    
    function traerDatosTrabajador($ide) {            
        $query = "SELECT
                    0 as id,
                    trim(coddoc) idtipo_identificacion,
                    trim(cedtra) identificacion,
                    trim(sexo) idgenero,
                    trim(prinom) nombre1,
                    trim(segnom) nombre2,    
                    trim(priape) apellido1,
                    trim(segape) apellido2,
                    estciv idestado_civil,
                    trim(direccion) direccion,    
                    trim(telefono),
                    trim(celular) telefono_movil,
                    direccion_corres direccion_corres,
                    trim(email) correo,
                    fecnac fecha_nacimiento
                FROM
                    subsi15 where cedtra ='$ide' ";
        return $this->_db->query($query)->fetch();        
    }
    

    
    
}