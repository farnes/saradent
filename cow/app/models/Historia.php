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
        return $this->_db->query($query)->fetch();
    }
    
    
    function crearDx($datos){          
        $query = "UPDATE historia SET  iddx_presuntivo = $datos[dxpresuntivo], iddx_definitivo = $datos[dxdefinitivo]
                    WHERE id = $datos[historia]";               
        $this->_db->query($query);        
        return $this->_db->lastInsertId();         
    }

    function crearAnamnesis($datos,$historia){    
        $fecha_actual = date("Y-m-d");
        $query = "INSERT INTO anamnesis (id_historia, tratamiento_medico, ingestion_medicamentos, 
                    reacciones_alergicas, hemorragias, irradiaciones, sinusitis, enf_respiratorias, 
                    cardiopatias, diabetes, fiebre, hepatitis, hiper_arterial, otra_enfermedad, 
                    cepillado, seda_dental, nro_cepillado, observaciones, fecha) 
                    VALUES ($historia, '$datos[tratamiento_medico]', '$datos[ingestion_medicamentos]', 
                    '$datos[reacciones_alergicas]', '$datos[hemorragias]', '$datos[irradiaciones]', '$datos[sinusitis]', '$datos[enf_respiratorias]', '$datos[cardiopatias]',
                    '$datos[diabetes]', '$datos[fiebre]', '$datos[hepatitis]', '$datos[hiper_arterial]', '$datos[otra_enfermedad]', '$datos[cepillado]',
                    '$datos[seda_dental]', $datos[nro_cepillado], '$datos[observaciones]', '$fecha_actual')";      
        //echo $query;
        
        $this->_db->query($query);        
        return $this->_db->lastInsertId();         
    }
    
    function crearExamenFisico($datos,$historia){    
        $fecha_actual = date("Y-m-d");
        $query = "INSERT INTO examen_fisico (id_historia, fecha, art_temp_mandib, labio, lengua, paladar, 
                    piso_boca, carrillos, gladulas_salivales, maxilares, senos_maxilares, musculo_masticador, 
                    sistema_nervioso, sistema_vascular, sistema_linfatico, observaciones, funcion_oclusion, 
                    temperatura, pulso, tension_arterial, respiracion) 
                    VALUES ($historia, '$fecha_actual', '$datos[art_temp_mandib]', '$datos[labio]', '$datos[lengua]', '$datos[paladar]', 
                    '$datos[piso_boca]', '$datos[carrillos]', '$datos[glandulas_salivales]', '$datos[maxilares]', '$datos[senos_maxilares]', '$datos[musculo_masticador]', '$datos[sistema_nervioso]',
                    '$datos[sistema_vascular]', '$datos[sistema_linfatico]', '$datos[observaciones_ef]', '$datos[funcion_oclusion]', $datos[temperatura], $datos[pulso], '$datos[tension_arterial]', $datos[respiracion])";      
        
        $this->_db->query($query);        
        return $this->_db->lastInsertId();         
    }
    
    function crearExamenDental($datos,$historia){    
        $fecha_actual = date("Y-m-d");
        $query = "INSERT INTO examen_dental (id_historia, supernumerario, abrasion, manchas, patologia_pulpar, placa_blanda, placa_calcificada, otros,fecha) 
                  VALUES ($historia, '$datos[supernumerario]', '$datos[abrasion]', '$datos[manchas]', '$datos[patologia_pulpar]', '$datos[placa_blanda]', '$datos[placa_calcificada]', '$datos[otro_ed]','$fecha_actual')";      
        
        $this->_db->query($query);        
        return $this->_db->lastInsertId();         
    }
    
    function crearAnalisisRadio($datos,$historia){    
        $fecha_actual = date("Y-m-d");
        $query = "INSERT INTO analisis_radiografico (placas_tomadas, interpretacion, pronostico, id_historia, fecha) 
                  VALUES ('$datos[placas_tomadas]', '$datos[interpretacion]', '$datos[pronostico]', $historia, '$fecha_actual');";      
        
        $this->_db->query($query);        
        return $this->_db->lastInsertId();         
    }
    
    function crearEvolucion($datos,$historia){
        $fecha_actual = date("Y-m-d");
        $query="INSERT INTO evolucion(id_historia, evolucion, fecha) VALUES ('$historia', '$datos[obs_evolucion]', '$fecha_actual');";
        
        $this->_db->query($query);        
        return $this->_db->lastInsertId();  
    }
    
    function traerEvoluciones($id){
       $query="SELECT * FROM evolucion WHERE id_historia = $id "; 
       return $this->_db->query($query)->fetchall();
    }
            function crearInterconsultas($datos,$historia){            
        $query = "INSERT INTO interconsultas (medica, odontologica,id_historia) 
                  VALUES ('$datos[cnmedica]', '$datos[cnodontologica]', $historia);";      
        
        $this->_db->query($query);        
        return $this->_db->lastInsertId();         
    }
    
    
    function crearTratamiento($datos,$historia){    
        $fecha_actual = date("Y-m-d");
        $query ="INSERT INTO `tratamiento` 
                (`operatoria`, `periodoncia`, `medicina_oral`, `cirugia_oral`, `endodoncia`, `prevencion`, `protesis`, `ortopedia`, `ortodoncia`, `fecha`, `id_historia`) 
                VALUES (                
                        '$datos[operatoria]', 
                        '$datos[periodoncia]', 
                        '$datos[medicina_oral]', 
                        '$datos[cirugia_oral]', 
                        '$datos[endodoncia]', 
                        '$datos[prevencion]', 
                        '$datos[protesis]', 
                        '$datos[ortopedia]', 
                        '$datos[ortodoncia]', 
                        '$fecha_actual', 
                        $historia)";      
        
        //echo $query;
        
        $this->_db->query($query);        
        return $this->_db->lastInsertId();         
    }
    
    function actualizarTratamiento($datos){    
        
        $query ="UPDATE `tratamiento` SET                               
                        operatoria='$datos[operatoria]', 
                        periodoncia='$datos[periodoncia]', 
                        medicina_oral='$datos[medicina_oral]', 
                        cirugia_oral='$datos[cirugia_oral]', 
                        endodoncia='$datos[endodoncia]', 
                        prevencion='$datos[prevencion]', 
                        protesis='$datos[protesis]', 
                        ortopedia='$datos[ortopedia]', 
                        ortodoncia'$datos[ortodoncia]' WHERE id =$datos[id_tratamiento]";      
        $this->_db->query($query);        
        return $this->_db->lastInsertId();         
    }
    
    function traerTratamiento($id) {       
        $query = "SELECT `id`, 
                    `operatoria`,
                    `periodoncia`,
                    `medicina_oral`, 
                    `cirugia_oral`, 
                    `endodoncia`, 
                    `prevencion`,
                    `protesis`, 
                    `ortopedia`,
                    `ortodoncia`, 
                    `fecha`,
                    `id_historia` 
                    FROM `tratamiento` WHERE `id`=$id";
        return $this->_db->query($query)->fetch();
    }
    
    function traerTratamientoHistoria($id_historia) {       
        $query = "SELECT `id`, 
                    `operatoria`,
                    `periodoncia`,
                    `medicina_oral`, 
                    `cirugia_oral`, 
                    `endodoncia`, 
                    `prevencion`,
                    `protesis`, 
                    `ortopedia`,
                    `ortodoncia`, 
                    `fecha`,
                    `id_historia` 
                    FROM `tratamiento` WHERE `id_historia`=$id_historia";
        return $this->_db->query($query)->fetch();
    }
    
    
    function traerTabla($tabla,$id) {       
        $query = "SELECT * 
                    FROM $tabla WHERE id=$id";
        
        //echo $query;
        
        return $this->_db->query($query)->fetch();
    }
    
    function traerTablaHistoria($tabla,$id) {       
        $query = "SELECT * 
                    FROM $tabla WHERE id_historia=$id";
        return $this->_db->query($query)->fetch();
    }
    
    
    
}
