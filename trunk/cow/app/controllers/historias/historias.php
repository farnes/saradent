<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of historias
 *
 * @author eorozco
 */
class Historias extends Controller {

    public function index($name = '') {
        $this->view('historias/index', ['name' => "NA"]);
    }

    public function crear() {
        $historia = $this->model('Historia');
        $id = $historia->crearHistoria($_POST);
        echo $id;
    }

    public function historiaexiste() {
        $historia = $this->model('Historia');
        $historias = $historia->validarHistoria($_POST);

        $resp = 0;
        if ($historias != "") {
            $resp = $historias[id];
        }

        echo $resp;
    }

    public function creardx() {
        $historia = $this->model('Historia');
        $id = $historia->crearDx($_POST);
        $datos = $historia->traerTabla("historia", $_POST['historia']);
        echo json_encode($datos);
    }

    public function traertabla() {
        $historia = $this->model('Historia');
        $datos = $historia->traerTabla($_POST['tabla'], $_POST['id']);
        echo json_encode($datos);
    }

    public function traertablahistoria() {
        $historia = $this->model('Historia');
        $datos = $historia->traerTablaHistoria($_POST['tabla'], $_POST['id']);
        echo json_encode($datos);
    }

    public function crearanamnesis() {
        $historia = $this->model('Historia');
        $id = $historia->crearAnamnesis($_POST, $_POST['historia']);
        $datos = $historia->traerTabla("anamnesis", $id);
        echo json_encode($datos);
    }

    public function crearexamenfisico() {
        $historia = $this->model('Historia');
        $id = $historia->crearExamenFisico($_POST, $_POST['historia']);
        $datos = $historia->traerTabla("examen_fisico", $id);
        echo json_encode($datos);
    }

    public function crearexamendental() {
        $historia = $this->model('Historia');
        $id = $historia->crearExamenDental($_POST, $_POST['historia']);
        $datos = $historia->traerTabla("examen_dental", $id);
        echo json_encode($datos);
    }

    public function crearanalisisradio() {
        $historia = $this->model('Historia');
        $id = $historia->crearAnalisisRadio($_POST, $_POST['historia']);
        $datos = $historia->traerTabla("analisis_radiografico", $id);
        echo json_encode($datos);
    }

    public function crearevolucion() {
        $historia = $this->model('Historia');
        $id = $historia->crearEvolucion($_POST, $_POST['historia']);
        $datos = $historia->traerTabla("evolucion", $id);
        echo json_encode($datos);
    }

    public function traerevoluciones() {
        $historia = $this->model('Historia');
        $evoluciones = $historia->traerEvoluciones($_POST['id']);
        echo "<table style='width:100%' >";
        echo "<tr><th>Evoluci&oacute;n</th><th>Fecha</th></tr>";
        foreach ($evoluciones as $value) {
            echo "<tr><td style='text-align:justify; border: 2px solid gray'>" . $value[evolucion] . "</td><td style='text-align:center; border: 2px solid gray'>" . $value[fecha] . "</td>" . "</tr>";
        }
        echo "</table>";
    }

    public function crearinterconsultas() {
        $historia = $this->model('Historia');
        $id = $historia->crearInterconsultas($_POST, $_POST['historia']);
        $datos = $historia->traerTabla("interconsultas", $id);
        echo json_encode($datos);
    }

    public function creartratamiento() {
        $historia = $this->model('Historia');
        $id = $historia->crearTratamiento($_POST, $_POST['historia']);
        $tratamiento = $historia->traerTratamiento($id);
        echo json_encode($tratamiento);
    }

    public function traertratamiento() {
        $historia = $this->model('Historia');
        $tratamiento = $historia->traerTratamiento($_POST[id_tratamiento]);
        echo json_encode($tratamiento);
    }

    public function traertratamientohistoria() {
        $historia = $this->model('Historia');
        $tratamiento = $historia->traerTratamientoHistoria($_POST[id_historia]);
        echo json_encode($tratamiento);
    }

    public function actualizartratamiento() {
        $historia = $this->model('Historia');
        $id = $historia->actualizarTratamiento($_POST);
        $tratamiento = $historia->traerTratamiento($_POST['id_tratamiento']);
        echo json_encode($tratamiento);
    }

    public function guardarimagen() {
        $historia = $_REQUEST[historia];

        if (!file_exists('c:\\imagenes\\' . $historia))
            mkdir('c:\\imagenes\\' . $historia . '\\', 0777, true);

//para el file
        $target_dir = "c:\\imagenes\\" . $historia . '\\';
        echo '+++++++++++TE QUIERO ISA+++++--------+++++';
        print_r($_FILES);
        $target_dir = $target_dir . basename($_FILES["imagenrx"]["name"]);
        move_uploaded_file($_FILES["imagenrx"]["tmp_name"], $target_dir);
        //rename($target_dir, "c:\\imagenes\\" . $historia . "\\xxx.jpg");
    }

    function imagenes() {

        if (isset($_POST[id])) {
            if ($handle = opendir("c:\\imagenes\\" . $_POST[id] . "\\")) {
                $dir = array();
                while (false !== ($entry = readdir($handle))) {
                    if ($entry != "." && $entry != "..") {
                        $dir[] = array('ARCHIVO' => $entry);
                    }
                }
                closedir($handle);
            }
            echo json_encode($dir);
        }
    }

    function imagen_borrar() {
        unlink("c:\\imagenes\\" . $_POST[id] . "\\" . $_POST[archivo]);
    }

public function verimagen(){

$id = $_GET[id];
$archivo = $_GET[archivo];
$resp = copy("c:\\imagenes\\".$id."\\".$archivo,"D:\\Programacion-Desarrollo\\xampp\htdocs\\cow\\tmp".$archivo);

$file = '../tmp/'.$archivo;
$filename = 'filename.jpg';
header('Content-type: image/jpg');
header('Content-Disposition: inline; filename="' . $filename . '"');
header('Content-Transfer-Encoding: binary');
header('Accept-Ranges: bytes');
@readfile($file);

}
}
