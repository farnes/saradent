$(document).ready(function () {
    tabla();
    $("#historiatabs").tabs();
    //$("#anamnesis-btn").button();
    //$("#dx-btn").button();
    //$("#interconsultas-btn").button();    
    //$("#examen_fisico-btn").button();
    //$("#examen_dental-btn").button();
    //$("#analisis_radio-btn").button();
    //$("#plan_tratamiento-btn").button();


    $("#dx-btn").button().click(guardarDx);
    $("#anamnesis-btn").button().click(guardarAnamnesis);
    $("#interconsultas-btn").button().click(guardarInterConsultas);
    $("#examen_fisico-btn").button().click(guardarExamenFisico);
    $("#examen_dental-btn").button().click(guardarExamenDental);
    $("#analisis_radio-btn").button().click(guardarAnalisisRadio);
    $("#plan_tratamiento-btn").button().click(guardarPlanTratamiento);
    $("#pagos-btn").button().click(nuevoPago); //PENDIENTE
    $("#agregar_pago-btn").button().click(agregarPago);
    $("#crear_cuenta-btn").button().click(guardarPlanPago);
    $("#evolucion-btn").button().click(nuevaEvolucion);
    $("#evolucion-guardar-btn").button().click(guardarEvolucion);
    $("#imagenes-guardar-btn").button().click(guardarImagenes);
    $("#td_evolucion").hide();




});

function inicializarFechasPago() {

    $("#fechacuenta").datepicker({dateFormat: "yy-mm-dd", changeMonth: true, changeYear: true, yearRange: "-100:+0"});
    $("#fechapago").datepicker({dateFormat: "yy-mm-dd", changeMonth: true, changeYear: true, yearRange: "-100:+0"});
}

function nuevoPago() {
    clear_form_elements("#cuentas-frm");
    inicializarFechasPago();
    $("#pagos-div").hide();
    $("#crear_cuenta-btn").show();


    var id_tratamiento = $("#id_tratamiento").val();

    if (parseInt(id_tratamiento) > 0) {
        traerCuenta(id_tratamiento);
    }


    $("#cuentas-dlg").dialog({
        resizable: false,
        height: 650,
        width: 650,
        modal: true,
        buttons: {
            Cancelar: function () {
                $(this).dialog("close");
            }
        }
    });

}

function tabla() {
    // Setup - add a text input to each footer cell    
    $('#pacientes-dt tfoot th').each(function () {
        var title = $('#pacientes-dt thead th').eq($(this).index()).text();
        $(this).html('<input size="15" id="input_' + $(this).index() + '" type="text" placeholder="' + title + '" />');
    });

    $("#input_0").prop("size", "2");
    $("#input_2").prop("size", "12");
    $("#input_1").hide();
    $("#input_7").hide();
    $("#input_9").hide();


    var table = $('#pacientes-dt').DataTable({
        dom: 'T<"clear">lfrtip',
        processing: true,
        "bAutoWidth": false,
        "language": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        },
        serverSide: true,
        "bDestroy": true,
        "order": [[0, "desc"]],
        ajax: {
            url: "../pacientes/tabla",
            type: "POST"
        },
        "columnDefs": [{
                "targets": -1,
                "data": null,
                "defaultContent": "<button id='bnt1'>Historia Cl&iacute;nica</button>"
            }]

    });



    $('#pacientes-dt tbody').on('click', '#bnt1', function () {
        var data = table.row($(this).parents('tr')).data();
        historia(data[0]);
    });


    $('#pacientes-dt tbody').on('click', '#bnt2', function () {
        var data = table.row($(this).parents('tr')).data();
        alert(data[0] + "'s salary is: " + data[ 2 ]);
    });


    // Apply the filter
    $("#pacientes-dt tfoot input").on('keyup change', function () {
        table
                .column($(this).parent().index() + ':visible')
                .search(this.value)
                .draw();
    });
}

//Utilizar este metodo para que el componenete de fechas se carguen en el momento de abrir el form
function inicializarFechas() {
    $("#fechanac").datepicker({dateFormat: "yy-mm-dd", changeMonth: true, changeYear: true, yearRange: "-100:+0"});
//    $("#fechaing").datepicker({ dateFormat: "yy-mm-dd",changeMonth: true, changeYear: true,yearRange: "-100:+0"  });
//    $('#fechanac').dateEntry({dateFormat: 'ymd-',maxDate: new Date(),minDate: new Date(1910,01,01)});
//    $('#fechaing').dateEntry({dateFormat: 'ymd-',maxDate: new Date(),minDate: new Date(1910,01,01)});
}

//Utilizar este metodo para llamar los combos al cargar el formulario
function inicializarCombos() {
    combo("../utilidades/combo", "tipo_identificacion", 0, "tipoide");
    combo("../utilidades/combo", "genero", 0, "genero");
    combo("../utilidades/combo", "departamento", 0, "depto");
    combo("../utilidades/combo", "municipio", 0, "mupio");
    combo("../utilidades/combo", "grupo_poblacion", 0, "gpoblacion");
    combo("../utilidades/combo", "diagnostico", 0, "dxpresuntivo");
    combo("../utilidades/combo", "diagnostico", 0, "dxdefinitivo");

    combo("../utilidades/combo", "actividad", 0, "cnmedica");
    combo("../utilidades/combo", "actividad", 0, "cnodontologica");
}


function historiaExiste(id) {
    var resp = 0;
    $.ajax({
        url: '../historias/historiaexiste',
        type: 'POST',
        dataType: 'text',
        data: {id: id},
        async: false,
        success: function (dato) {
            resp = dato;
        }
    });
    return resp;
}


function historia(id) {

    clear_form_elements("#historias-frm");

    inicializarFechas();
    inicializarCombos();
    var hist = historiaExiste(id);
    if (parseInt(hist) > 0) {
        traerHistoria(id);
        $("#historia").val(hist);
        $("#hist").val(hist);
        traerDetalleHistoria(hist);
        document.getElementById('ifr-odontograma').src = '../odontograma/index?historia=' + hist;
    } else {
        traerHistoria(id);
        crearHistoria(id);
    }



    $("#historia-dlg").dialog({
        resizable: false,
        height: 650,
        width: 1200,
        modal: true,
        buttons: {
//        "Guardar": function() {                
//                if(validar()){                    
//                    guardar();
//                    $( this ).dialog( "close" );
//                }                                    
//            },
            Cancelar: function () {
                $(this).dialog("close");
            }
        }
    });

}

function traerHistoria(id) {
    $.ajax({
        url: '../pacientes/paciente',
        type: 'POST',
        dataType: 'json',
        data: {id: id},
        async: false,
        success: function (json) {
            $("#id").val(json.id);
            $("#tipoide").val(json.idtipo_identificacion);
            $("#ide").val(json.identificacion);
            $("#fechanac").val(json.fecha_nacimiento);
            $("#genero").val(json.idgenero);
            $("#nom1").val(json.nombre1);
            $("#nom2").val(json.nombre2);
            $("#ape1").val(json.apellido1);
            $("#ape2").val(json.apellido2);
            $("#gpoblacion").val(json.idgrupo_poblacion);
        }
    });
}

function traerDetalleHistoria(id) {
    traerTratamiento(id);
    traerDx(id);
    traerAnamensis(id);
    traerExamenFisico(id);
    traerExamenDental(id);
    traerAnalisisRadio(id);
    traerInterconsultas(id);
    traerEvoluciones(id);
    listarImagenes(id);

}

function guardar() {

    if (parseInt($("#id").val()) === 0) {
//        var datos = $("#afiliaciones-frm").serialize();            
        data = new FormData($("#pacientes-frm")[0]);
        $.ajax({
            url: '../pacientes/guardar',
            type: 'POST',
            dataType: 'text',
            contentType: false,
            processData: false,
            data: data,
            async: false,
            success: function (resp) {
                jqAlert("info", "Información", "El paciente se ha guardado correctamente", 250, 400);
                tabla();
            }
        });
    } else {
//        var datos = $("#afiliaciones-frm").serialize();    
        data = new FormData($("#pacientes-frm")[0]);
        $.ajax({
            url: '../pacientes/actualizar',
            type: 'POST',
            contentType: false,
            processData: false,
            dataType: 'text',
            data: data,
            async: false,
            success: function (resp) {
                jqAlert("info", "Información", "La informaci&oacute;n se ha actualizado correctamente", 250, 400);
                tabla();
            }
        });
    }
}

//function validar(){
//    var valido = false;    
//    v1 = requerido("tipoide");
//    v2 = requerido("ide");
//    v3 = requerido("fechanac");
//    v4 = requerido("genero");
//    v5 = requerido("nom1");    
//    v6 = requerido("ape1");    
//    v7 = requerido("direccion");
//    v8 = requerido("telefono");
//    v9 = validaMail("correo");
//    v10 = requerido("depto");
//    v11 = requerido("mupio");
//
//       
//    if(v1&&v2&&v3&&v4&&v5&&v6&&v7&&v8&&v9&&v10&&v11){
//        valido = true;
//    }
//    return valido;
//}
//
//function requerido(campo){
//    var resp = true;
//    
//    if($("#"+campo).val()===""){
//        $("#"+campo).prev('label').addClass("error-input");     
//        resp = false;
//    }else{
//        $("#"+campo).prev('label').removeClass("error-input");
//    }
//    
//    return resp;
//}
//
//function validaMail(campo){
//    var resp = false;    
//    if( /(.+)@(.+){2,}\.(.+){2,}/.test($("#"+campo).val()) ){         
//        $("#"+campo).prev('label').removeClass("error-input");
//        resp=true;
//    }else{
//        $("#"+campo).prev('label').addClass("error-input");   
//    } 
//    return resp;
//}

function crearHistoria(id) {

    $.ajax({
        url: '../historias/crear',
        type: 'POST',
        dataType: 'text',
        data: {id: id},
        async: false,
        success: function (resp) {
            $("#historia").val(resp);
        }
    });


}

function guardarDx() {
    var data = $("#dx-frm").serialize();
    $.ajax({
        url: '../historias/creardx',
        type: 'POST',
        dataType: 'json',
        data: data + "&historia=" + $("#historia").val(),
        async: false,
        success: function (json) {
            jqAlert("info", "Información", "La informaci&oacute;n se ha almacenado correctamente", 250, 400);
            $("#dxpresuntivo").val(json.iddx_presuntivo);
            $("#dxdefinitivo").val(json.iddx_definitivo);
        }
    });
}

function traerDx(id) {
    $.ajax({
        url: '../historias/traertabla',
        type: 'POST',
        dataType: 'json',
        data: {id: id, tabla: "historia"},
        async: false,
        success: function (json) {
            $("#dxpresuntivo").val(json.iddx_presuntivo);
            $("#dxdefinitivo").val(json.iddx_definitivo);
            if (json.iddx_presuntivo === "0") {
                $("#dxpresuntivo").val("");
            }
            if (json.iddx_definitivo === "0") {
                $("#dxdefinitivo").val("")
            }
        }
    });
}


function guardarAnamnesis() {
    var data = $("#anamnesis-frm").serialize();
    $.ajax({
        url: '../historias/crearanamnesis',
        type: 'POST',
        dataType: 'json',
        data: data + "&historia=" + $("#historia").val(),
        async: false,
        success: function (resp) {
            jqAlert("info", "Información", "La informaci&oacute;n se ha almacenado correctamente", 250, 400);
        }
    });
}
/*
 
 */
function traerAnamensis(id) {
    $.ajax({
        url: '../historias/traertablahistoria',
        type: 'POST',
        dataType: 'json',
        data: {id: id, tabla: "anamnesis"},
        async: false,
        success: function (json) {
            $("#cardiopatias").val(json.cardiopatias);
            $("#cepillado").val(json.cepillado);
            $("#diabetes").val(json.diabetes);
            $("#enf_respiratorias").val(json.enf_respiratorias);
            $("#fiebre").val(json.fiebre);
            $("#hemorragias").val(json.hemorragias);
            $("#hepatitis").val(json.hepatitis);
            $("#hiper_arterial").val(json.hiper_arterial);
            $("#ingestion_medicamentos").val(json.ingestion_medicamentos);
            $("#irradiaciones").val(json.irradiaciones);
            $("#nro_cepillado").val(json.nro_cepillado);
            $("#observaciones").val(json.observaciones);
            $("#otra_enfermedad").val(json.otra_enfermedad);
            $("#reacciones_alergicas").val(json.reacciones_alergicas);
            $("#seda_dental").val(json.seda_dental);
            $("#sinusitis").val(json.sinusitis);
            $("#tratamiento_medico").val(json.tratamiento_medico);

            if (!json) {
                $("#cardiopatias").val("N");
                $("#cepillado").val("N");
                $("#diabetes").val("N");
                $("#enf_respiratorias").val("N");
                $("#fiebre").val("N");
                $("#hemorragias").val("N");
                $("#hepatitis").val("N");
                $("#hiper_arterial").val("N");
                $("#ingestion_medicamentos").val("N");
                $("#irradiaciones").val("N");
                $("#nro_cepillado").val("");
                $("#observaciones").val("");
                $("#otra_enfermedad").val("");
                $("#reacciones_alergicas").val("N");
                $("#seda_dental").val("N");
                $("#sinusitis").val("N");
                $("#tratamiento_medico").val("N");
            }
        }
    });
}

function guardarExamenFisico() {
    var data = $("#examen_fisico-frm").serialize();
    $.ajax({
        url: '../historias/crearexamenfisico',
        type: 'POST',
        dataType: 'text',
        data: data + "&historia=" + $("#historia").val(),
        async: false,
        success: function (resp) {
            jqAlert("info", "Información", "La informaci&oacute;n se ha almacenado correctamente", 250, 400);
        }
    });
}

function traerExamenFisico(id) {
    $.ajax({
        url: '../historias/traertablahistoria',
        type: 'POST',
        dataType: 'json',
        data: {id: id, tabla: "examen_fisico"},
        async: false,
        success: function (json) {
            $("#art_temp_mandib").val(json.art_temp_mandib);
            $("#carrillos").val(json.carrillos);
            $("#funcion_oclusion").val(json.funcion_oclusion);
            $("#glandulas_salivales").val(json.glandulas_salivales);
            $("#labio").val(json.labio);
            $("#lengua").val(json.lengua);
            $("#maxilares").val(json.maxilares);
            $("#musculo_masticador").val(json.musculo_masticador);
            $("#observaciones_ef").val(json.observaciones);
            $("#paladar").val(json.paladar);
            $("#piso_boca").val(json.piso_boca);
            $("#pulso").val(json.pulso);
            $("#respiracion").val(json.respiracion);
            $("#senos_maxilares").val(json.senos_maxilares);
            $("#sistema_linfatico").val(json.sistema_linfatico);
            $("#sistema_nervioso").val(json.sistema_nervioso);
            $("#sistema_vascular").val(json.sistema_vascular);
            $("#temperatura").val(json.temperatura);
            $("#tension_arterial").val(json.tension_arterial);
            if (!json) {
                $("#art_temp_mandib").val("N");
                $("#carrillos").val("N");
                $("#funcion_oclusion").val("N");
                $("#glandulas_salivales").val("N");
                $("#labio").val("N");
                $("#lengua").val("N");
                $("#maxilares").val("N");
                $("#musculo_masticador").val("N");
                $("#observaciones_ef").val("");
                $("#paladar").val("N");
                $("#piso_boca").val("N");
                $("#pulso").val("");
                $("#respiracion").val("");
                $("#senos_maxilares").val("N");
                $("#sistema_linfatico").val("N");
                $("#sistema_nervioso").val("N");
                $("#sistema_vascular").val("N");
                $("#temperatura").val("");
                $("#tension_arterial").val("");
            }
        }
    });
}

function guardarExamenDental() {
    var data = $("#examen_dental-frm").serialize();
    $.ajax({
        url: '../historias/crearexamendental',
        type: 'POST',
        dataType: 'text',
        data: data + "&historia=" + $("#historia").val(),
        async: false,
        success: function (resp) {
            jqAlert("info", "Información", "La informaci&oacute;n se ha almacenado correctamente", 250, 400);
        }
    });
}

function traerExamenDental(id) {
    $.ajax({
        url: '../historias/traertablahistoria',
        type: 'POST',
        dataType: 'json',
        data: {id: id, tabla: "examen_dental"},
        async: false,
        success: function (json) {
            $("#abrasion").val(json.abrasion);
            $("#manchas").val(json.manchas);
            $("#otro_ed").val(json.otros);
            $("#patologia_pulpar").val(json.patologia_pulpar);
            $("#placa_blanda").val(json.placa_blanda);
            $("#placa_calcificada").val(json.placa_calcificada);
            $("#supernumerario").val(json.supernumerario);
            if (!json) {
                $("#abrasion").val("N");
                $("#manchas").val("N");
                $("#otro_ed").val("");
                $("#patologia_pulpar").val("N");
                $("#placa_blanda").val("N");
                $("#placa_calcificada").val("N");
                $("#supernumerario").val("N");
            }
        }
    });
}

function guardarAnalisisRadio() {
    var data = $("#analisis_radio-frm").serialize();
    $.ajax({
        url: '../historias/crearanalisisradio',
        type: 'POST',
        dataType: 'text',
        data: data + "&historia=" + $("#historia").val(),
        async: false,
        success: function (resp) {
            jqAlert("info", "Información", "La informaci&oacute;n se ha almacenado correctamente", 250, 400);
        }
    });
}

function traerAnalisisRadio(id) {

    $.ajax({
        url: '../historias/traertablahistoria',
        type: 'POST',
        dataType: 'json',
        data: {id: id, tabla: "analisis_radiografico"},
        async: false,
        success: function (json) {
            $("#interpretacion").val(json.interpretacion);
            $("#placas_tomadas").val(json.placas_tomadas);
            $("#pronostico").val(json.pronostico);
            if (!json) {
                $("#interpretacion").val("");
                $("#placas_tomadas").val("");
                $("#pronostico").val("");
            }
        }
    });
}

function guardarInterConsultas() {
    var data = $("#interconsultas-frm").serialize();
    $.ajax({
        url: '../historias/crearinterconsultas',
        type: 'POST',
        dataType: 'text',
        data: data + "&historia=" + $("#historia").val(),
        async: false,
        success: function (resp) {
            jqAlert("info", "Información", "La informaci&oacute;n se ha almacenado correctamente", 250, 400);
        }
    });
}

function traerInterconsultas(id) {
    $.ajax({
        url: '../historias/traertablahistoria',
        type: 'POST',
        dataType: 'json',
        data: {id: id, tabla: "interconsultas"},
        async: false,
        success: function (json) {
            $("#cnmedica").val(json.medica);
            $("#cnodontologica").val(json.odontologica);
            if (!json) {
                $("#cnmedica").val("");
                $("#cnodontologica").val("");
            }
        }
    });
}

function guardarPlanTratamiento() {
    var data = $("#tratamiento-frm").serialize();

    if (parseInt($("#id_tratamiento").val()) > 0) {
        $.ajax({
            url: '../historias/actualizartratamiento',
            type: 'POST',
            dataType: 'json',
            data: data + "&historia=" + $("#historia").val(),
            async: false,
            success: function (json) {
                jqAlert("info", "Información", "La informaci&oacute;n se ha almacenado correctamente", 250, 400);
                $("#id_tratamiento").val(json.id);
                $("#operatoria").val(json.operatoria);
                $("#periodoncia").val(json.periodoncia);
                $("#medicina_oral").val(json.medicina_oral);
                $("#cirugia_oral").val(json.cirugia_oral);
                $("#endodoncia").val(json.endodoncia);
                $("#prevencion").val(json.prevencion);
                $("#protesis").val(json.protesis);
                $("#ortopedia").val(json.ortopedia);
                $("#ortodoncia").val(json.ortodoncia);
            }
        });
    } else
        $.ajax({
            url: '../historias/creartratamiento',
            type: 'POST',
            dataType: 'json',
            data: data + "&historia=" + $("#historia").val(),
            async: false,
            success: function (json) {
                jqAlert("info", "Información", "La informaci&oacute;n se ha almacenado correctamente", 250, 400);
                $("#id_tratamiento").val(json.id);
                $("#operatoria").val(json.operatoria);
                $("#periodoncia").val(json.periodoncia);
                $("#medicina_oral").val(json.medicina_oral);
                $("#cirugia_oral").val(json.cirugia_oral);
                $("#endodoncia").val(json.endodoncia);
                $("#prevencion").val(json.prevencion);
                $("#protesis").val(json.protesis);
                $("#ortopedia").val(json.ortopedia);
                $("#ortodoncia").val(json.ortodoncia);
            }
        });
}
function nuevaEvolucion() {
    $("#td_evolucion").show();
}

function guardarEvolucion() {
    var data = $("#evolucion-frm").serialize();
    $.ajax({
        url: '../historias/crearevolucion',
        type: 'POST',
        dataType: 'text',
        data: data + "&historia=" + $("#historia").val(),
        async: false,
        success: function (resp) {
            jqAlert("info", "Información", "La informaci&oacute;n se ha almacenado correctamente", 250, 400);
        }
    });
}
function traerEvoluciones(id) {
    $.ajax({
        url: '../historias/traerevoluciones',
        type: 'POST',
        dataType: 'text',
        data: {id: id, tabla: "evolucion"},
        async: false,
        success: function (rta) {
            $("#div_evoluciones").html(rta);

        }
    });
}

function traerTratamiento(id) {
    $.ajax({
        url: '../historias/traertratamientohistoria',
        type: 'POST',
        dataType: 'json',
        data: {id_historia: id},
        async: false,
        success: function (json) {

            $("#id_tratamiento").val(json.id);
            $("#operatoria").val(json.operatoria);
            $("#periodoncia").val(json.periodoncia);
            $("#medicina_oral").val(json.medicina_oral);
            $("#cirugia_oral").val(json.cirugia_oral);
            $("#endodoncia").val(json.endodoncia);
            $("#prevencion").val(json.prevencion);
            $("#protesis").val(json.protesis);
            $("#ortopedia").val(json.ortopedia);
            $("#ortodoncia").val(json.ortodoncia);

            if (!json) {
                $("#operatoria").val("N");
                $("#periodoncia").val("N");
                $("#medicina_oral").val("N");
                $("#cirugia_oral").val("N");
                $("#endodoncia").val("N");
                $("#prevencion").val("N");
                $("#protesis").val("N");
                $("#ortopedia").val("N");
                $("#ortodoncia").val("N");
            }


        }
    });
}
function guardarImagenes() {

    data = new FormData($("#imagenes-frm")[0]);
    $.ajax({
        url: '../historias/guardarimagen?historia=' + $("#historia").val(),
        type: 'POST',
        contentType: false,
        processData: false,
        dataType: 'text',
        data: data,
        async: false,
        success: function (resp) {
            listarImagenes($("#historia").val());
            jqAlert("info", "Información", "La informaci&oacute;n se ha almacenado correctamente", 250, 400);
        }
    });
}
function listarImagenes(id) {
    $.ajax({
        url: '../historias/imagenes',
        type: 'POST',
        dataType: 'json',
        data: {id: id},
        async: false,
        success: function (json) {
            var li = "";


            if (json !== null) {

                if (json.length > 0) {

                    $.each(json, function (i) {
                        li += "<li>" + json[i].ARCHIVO;
                        li += "&nbsp;<img src='../../public/images/lupa.png' width='13px' height='13px' onclick='javascript:verImagen(\"" + json[i].ARCHIVO + "\"," + id + ")' /><img src='../../public/images/delete.png' width='11px' height='11px' onclick='javascript:borrarImagen(\"" + json[i].ARCHIVO + "\"," + id + ")' />";
                        li += "</li>";
                    });

                }
            }

            $("#ul-imagenesrx").show();
            $("#ul-imagenesrx").html(li);
        }
    });
}

function verImagen(archivo,id){
pop("../historias/verimagen?archivo="+archivo+"&ide="+id,"Imagen","top=0 ,left=0 ,width=1024, height=600, scrollbars=yes, menubar=no, location=no, resizable=no");
}
function borrarImagen(archivo, id) {

    if (confirm("Seguro de eliminar el archivo?")) {
        $.ajax({
            url: "../historias/imagen_borrar",
            dataType: 'text',
            type: 'POST',
            data: {id: id, archivo: archivo},
            async: false,
            success: function (text) {
                listarImagenes(id);
                alert("Archivo eliminado correctamente");
                
            }
        });
    }
}

function guardarPlanPago() {
    var data = $("#cuentas-frm").serialize();
    $.ajax({
        url: '../pagos/crearpago',
        type: 'POST',
        dataType: 'json',
        data: data + "&id_tratamiento=" + $("#id_tratamiento").val(),
        async: false,
        success: function (json) {
            jqAlert("info", "Información", "La informaci&oacute;n se ha almacenado correctamente", 250, 400);
            $("#id_cuenta").val(json.id);
            $("#fechacuenta").val(json.fecha);
            $("#valor").val(json.valor);
            $("#tipopago").val(json.tipo);
            $("#fechapago").val(json.fecha_pago);
            $("#numcuotas").val(json.num_cuotas);
            $("#estadopago").val(json.estado);
            $("#crear_cuenta-btn").hide();
            $("#pagos-div").show();
        }
    });
}


function agregarPago() {
    $.ajax({
        url: '../pagos/agregarpago',
        type: 'POST',
        dataType: 'text',
        data: {cuenta: $("#id_cuenta").val(), valor: $("#vrpago").val()},
        async: false,
        success: function (resp) {
            $("#detalle-pagos").html(resp);
        }
    });

}

function traerCuenta(id) {
    $.ajax({
        url: '../pagos/traerpagotratamiento',
        type: 'POST',
        dataType: 'json',
        data: {id_tratamiento: id},
        async: false,
        success: function (json) {

            if (!json) {
                $("#fechacuenta").val("");
                $("#valor").val("");
                $("#tipopago").val("E");
                $("#fechapago").val("");
                $("#numcuotas").val("");
                $("#estadopago").val("A");

            } else {
                $("#id_cuenta").val(json.id);
                $("#fechacuenta").val(json.fecha);
                $("#valor").val(json.valor);
                $("#tipopago").val(json.tipo);
                $("#fechapago").val(json.fecha_pago);
                $("#numcuotas").val(json.num_cuotas);
                $("#estadopago").val(json.estado);
                $("#pagos-div").show();
                $("#crear_cuenta-btn").hide();
                traerPagos(json.id);
            }


        }
    });
}


function traerPagos(id) {
    $.ajax({
        url: '../pagos/traerpagos',
        type: 'POST',
        dataType: 'text',
        data: {cuenta: id},
        async: false,
        success: function (resp) {
            $("#detalle-pagos").html(resp);
            traerPagado(id);
        }
    });
}

function traerPagado(id) {
    $.ajax({
        url: '../pagos/traerpagado',
        type: 'POST',
        dataType: 'json',
        data: {cuenta: id},
        async: false,
        success: function (json) {
            $("#pagado").val(json.PAGADO);
        }
    });
}




function eliminarPago(id, cuenta) {
    $.ajax({
        url: '../pagos/eliminar',
        type: 'POST',
        dataType: 'text',
        data: {id: id, cuenta: cuenta},
        async: false,
        success: function (resp) {
            $("#detalle-pagos").html(resp);
            traerPagado(cuenta);
        }
    });
}

function imprimir(id) {
    window.open("../pagos/imprimir?id=" + id, "Recibo de pago", "toolbar=yes, scrollbars=yes, resizable=yes, top=50, left=50, width=400, height=400");
}

function pop(pagina,ventana,parametros){
window.open(pagina,ventana,parametros);
}