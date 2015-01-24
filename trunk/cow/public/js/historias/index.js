$(document).ready(function(){
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
});

function inicializarFechas(){   
    $("#fechacuenta").datepicker({ dateFormat: "yy-mm-dd",changeMonth: true, changeYear: true,yearRange: "-100:+0" });
    $("#fechapago").datepicker({ dateFormat: "yy-mm-dd",changeMonth: true, changeYear: true,yearRange: "-100:+0" });
}

function nuevoPago(){       
clear_form_elements("#cuentas-frm");
inicializarFechas();

//if(parseInt(id)>0){
//   traerCuenta(id);
//}       



$( "#cuentas-dlg" ).dialog({
      resizable: false,
      height:500,
      width:650,
      modal: true,
      buttons: {
        "Guardar": function() {                
                if(validar()){                    
                    guardarPlanPago()();
                    $( this ).dialog( "close" );
                }                                    
            },
          Cancelar: function() {
          $( this ).dialog( "close" );
        }
      }
});

}

function tabla() {    
    // Setup - add a text input to each footer cell    
    $('#pacientes-dt tfoot th').each(function() {
        var title = $('#pacientes-dt thead th').eq($(this).index()).text();
        $(this).html('<input size="15" id="input_'+$(this).index()+'" type="text" placeholder="' + title + '" />');
    });
    
    $("#input_0").prop("size","2");
    $("#input_2").prop("size","12");
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
        "columnDefs": [ {
            "targets": -1,            
            "data": null,
            "defaultContent": "<button id='bnt1'>Historia Cl&iacute;nica</button>"
        } ]

    });

   

    $('#pacientes-dt tbody').on( 'click', '#bnt1', function () {
        var data = table.row( $(this).parents('tr') ).data();
        historia(data[0]);
    } );
    
    
    $('#pacientes-dt tbody').on( 'click', '#bnt2', function () {
        var data = table.row( $(this).parents('tr') ).data();
        alert( data[0] +"'s salary is: "+ data[ 2 ] );
    } );
    

    // Apply the filter
    $("#pacientes-dt tfoot input").on('keyup change', function() {
        table
                .column($(this).parent().index() + ':visible')
                .search(this.value)
                .draw();
    });
}

//Utilizar este metodo para que el componenete de fechas se carguen en el momento de abrir el form
function inicializarFechas(){   
    $("#fechanac").datepicker({ dateFormat: "yy-mm-dd",changeMonth: true, changeYear: true,yearRange: "-100:+0" });
//    $("#fechaing").datepicker({ dateFormat: "yy-mm-dd",changeMonth: true, changeYear: true,yearRange: "-100:+0"  });
//    $('#fechanac').dateEntry({dateFormat: 'ymd-',maxDate: new Date(),minDate: new Date(1910,01,01)});
//    $('#fechaing').dateEntry({dateFormat: 'ymd-',maxDate: new Date(),minDate: new Date(1910,01,01)});
}

//Utilizar este metodo para llamar los combos al cargar el formulario
function inicializarCombos(){
    combo("../utilidades/combo","tipo_identificacion",0,"tipoide");  
    combo("../utilidades/combo","genero",0,"genero");
    combo("../utilidades/combo","departamento",0,"depto");
    combo("../utilidades/combo","municipio",0,"mupio");  
    combo("../utilidades/combo","grupo_poblacion",0,"gpoblacion");
    combo("../utilidades/combo","diagnostico",0,"dxpresuntivo");
    combo("../utilidades/combo","diagnostico",0,"dxdefinitivo");
    
    combo("../utilidades/combo","actividad",0,"cnmedica");
    combo("../utilidades/combo","actividad",0,"cnodontologica");
}


function historiaExiste(id){    
    var resp =0;
    $.ajax({
        url: '../historias/historiaexiste',
        type: 'POST',
        dataType: 'text',
        data: {id:id},
        async: false,
        success: function(dato){            
           resp = dato;
        }
    });
    return resp;    
}


function historia(id){

clear_form_elements("#historias-frm");
    
inicializarFechas();
inicializarCombos();

var hist=historiaExiste(id);


if(parseInt(hist)>0){
   traerHistoria(id);
   $("#historia").val(hist);
}else{    
    traerHistoria(id);
    crearHistoria(id); 
}       



$( "#historia-dlg" ).dialog({
      resizable: false,
      height:650,
      width:1100,
      modal: true,
      buttons: {
//        "Guardar": function() {                
//                if(validar()){                    
//                    guardar();
//                    $( this ).dialog( "close" );
//                }                                    
//            },
          Cancelar: function() {
          $( this ).dialog( "close" );
        }
      }
});

}

function traerHistoria(id){
    $.ajax({
        url: '../pacientes/paciente',
        type: 'POST',
        dataType: 'json',
        data: {id:id},
        async: false,
        success: function(json){            
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


function guardar(){
    
    if(parseInt($("#id").val())===0){
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
            success: function(resp){            
                 jqAlert("info","Información","El paciente se ha guardado correctamente",250,400);                 
                 tabla();
            }
        });
    }else{
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
            success: function(resp){            
                 jqAlert("info","Información","La informaci&oacute;n se ha actualizado correctamente",250,400);                 
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

function crearHistoria(id){
   
   $.ajax({
        url: '../historias/crear',
        type: 'POST',
        dataType: 'text',
        data: {id:id},
        async: false,
        success: function(resp){            
            $("#historia").val(resp);
        }
    });
   
    
}

function guardarDx(){    
    var data = $("#dx-frm").serialize();    
    $.ajax({
        url: '../historias/creardx',
        type: 'POST',
        dataType: 'text',
        data: data,
        async: false,
        success: function(resp){            
            jqAlert("info","Información","La informaci&oacute;n se ha almacenado correctamente",250,400);
        }
    });
}

function guardarAnamnesis(){
    var data = $("#anamnesis-frm").serialize();    
    $.ajax({
        url: '../historias/crearanamnesis',
        type: 'POST',
        dataType: 'text',
        data: data+"&historia="+$("#historia").val(),
        async: false,
        success: function(resp){            
            jqAlert("info","Información","La informaci&oacute;n se ha almacenado correctamente",250,400);
        }
    });
}

function guardarExamenFisico(){
    var data = $("#examen_fisico-frm").serialize();    
    $.ajax({
        url: '../historias/crearexamenfisico',
        type: 'POST',
        dataType: 'text',
        data: data+"&historia="+$("#historia").val(),
        async: false,
        success: function(resp){            
            jqAlert("info","Información","La informaci&oacute;n se ha almacenado correctamente",250,400);
        }
    });
}

function guardarExamenDental(){
    var data = $("#examen_dental-frm").serialize();    
    $.ajax({
        url: '../historias/crearexamendental',
        type: 'POST',
        dataType: 'text',
        data: data+"&historia="+$("#historia").val(),
        async: false,
        success: function(resp){            
            jqAlert("info","Información","La informaci&oacute;n se ha almacenado correctamente",250,400);
        }
    });
}

function guardarAnalisisRadio(){
    var data = $("#analisis_radio-frm").serialize();    
    $.ajax({
        url: '../historias/crearanalisisradio',
        type: 'POST',
        dataType: 'text',
        data: data+"&historia="+$("#historia").val(),
        async: false,
        success: function(resp){            
            jqAlert("info","Información","La informaci&oacute;n se ha almacenado correctamente",250,400);
        }
    });
}

function guardarInterConsultas(){
    
}



function guardarPlanTratamiento(){
    
}

function guardarPlanPago(){
    var data = $("#cuentas-frm").serialize();    
    $.ajax({
        url: '../pagos/crearpago',
        type: 'POST',
        dataType: 'text',
        data: data,
        async: false,
        success: function(resp){            
            jqAlert("info","Información","La informaci&oacute;n se ha almacenado correctamente",250,400);
        }
    });
    
}

function agregarPago(){
     $.ajax({
        url: '../pagos/agregarpago',
        type: 'POST',
        dataType: 'text',
        data: data,
        async: false,
        success: function(resp){            
            $("#detalle-pagos").html(resp);
        }
    });
    
}