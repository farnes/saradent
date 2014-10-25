$(document).ready(function(){
    tabla();    
});

//Utilizar este metodo para que el componenete de fechas se carguen en el momento de abrir el form
function inicializarFechas(){   
    $("#fechanac").datepicker({ dateFormat: "yy-mm-dd",changeMonth: true, changeYear: true,yearRange: "-100:+0" });
    $("#fechanac_sub").datepicker({ dateFormat: "yy-mm-dd",changeMonth: true, changeYear: true,yearRange: "-100:+0" });
//    $('#fechanac').dateEntry({dateFormat: 'ymd-',maxDate: new Date(),minDate: new Date(1910,01,01)});
}

//Utilizar este metodo para llamar los combos al cargar el formulario
function inicializarCombos(){
    combo("../utilidades/combo","tipo_identificacion",0,"tipoide");  
    combo("../utilidades/combo","genero",0,"genero");
    combo("../utilidades/combo","estado_civil",0,"estcivil");
    combo("../utilidades/combo","tipo_identificacion",0,"tipoide_sub");  
    combo("../utilidades/combo","genero",0,"genero_sub");
    combo("../utilidades/combo","estado_civil",0,"estcivil_sub");
}

function tabla() {    
    // Setup - add a text input to each footer cell    
    $('#actualizaciones-dt tfoot th').each(function() {
        var title = $('#actualizaciones-dt thead th').eq($(this).index()).text();
        $(this).html('<input size="15" id="inputt_'+$(this).index()+'" type="text" placeholder="' + title + '" />');
    });
    
    $("#inputt_0").hide();
    $("#inputt_1").prop("size","12");    
    $("#inputt_6").hide();
    $("#inputt_8").hide();
    $("#inputt_7").prop("size","8");    
    

    var table = $('#actualizaciones-dt').DataTable({
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
            url: "../actualizaciones/tabla",
            type: "POST"
        },
        "columnDefs": [ {
            "targets": -1,            
            "data": null,
            "defaultContent": "<button id='bnt1'>Validar</button>"
        } ]

    });
    
    $('#actualizaciones-dt tbody').on( 'click', '#bnt1', function () {
        var data = table.row( $(this).parents('tr') ).data();
        validar(data[0],data[2]);
    } );
    
    
    $('#actualizaciones-dt tbody').on( 'click', '#bnt2', function () {
        var data = table.row( $(this).parents('tr') ).data();
        alert( data[0] +"'s salary is: "+ data[ 2 ] );
    } );
    

    // Apply the filter
    $("#actualizaciones-dt tfoot input").on('keyup change', function() {
        table
                .column($(this).parent().index() + ':visible')
                .search(this.value)
                .draw();
    });
    
}

function validar(id, ide){ 
    $('#subsidio-dlg').html('');
    $('#trabajador-dlg').html('');
    
    
//        $("#validacion-dlg").load("../actualizaciones/validacion",function(){   
//            $("#tipo_persona").text("TRABAJADOR");
//            inicializarFechas();
//            inicializarCombos();
//            cargarDatos(id);
//            traerDatosSubsidio(ide);
//            cargarSoporte(ide);
//        });
 
 
        $.ajax({
        url: '../actualizaciones/validacion',
        type: 'POST',
        dataType: 'text',        
        async: false,
        success: function(datos){     
           $("#validacion-dlg").html(datos)
           $("#tipo_persona").text("TRABAJADOR");
            inicializarFechas();
            inicializarCombos();
            cargarDatos(id);
            traerDatosSubsidio(ide);
            cargarSoporte(ide);            
        }
        });
        
        //checkear todo
        $('#todo').click(function () {    
            $('input:checkbox').prop('checked', this.checked);    
        });
 
        //validar iguales
        compararValores();
 
        $("#actualizar-btn").click(actualizarValores)
    
        $( "#validacion-dlg" ).dialog({
          resizable: false,
          height:750,
          width:1200,
          modal: true,
          buttons: {
            "Guardar": function() {                

                },
            Cancelar: function() {
              $( this ).dialog( "close" );
            }
          }
        });
    
}

function cargarDatos(id){
    $.ajax({
        url: '../actualizaciones/actualizacion',
        type: 'POST',
        dataType: 'json',
        data: {id:id},
        async: false,
        success: function(json){            
            $("#id").val(json.ID);           
            $("#tipoide").val(json.IDTIPO_IDENTIFICACION);
            $("#ide").val(json.IDENTIFICACION);
            $("#fechanac").val(json.FECHA_NACIMIENTO);
            $("#genero").val(json.IDGENERO);
            $("#nom1").val(json.NOMBRE1);
            $("#nom2").val(json.NOMBRE2);
            $("#ape1").val(json.APELLIDO1);
            $("#ape2").val(json.APELLIDO2);
            $("#estcivil").val(json.IDESTADO_CIVIL);           
            $("#direccion").val(json.DIRECCION);
            $("#telefono").val(json.TELEFONO);
            $("#correo").val(json.CORREO);           
            $("#telefonomov").val(json.TELEFONO_MOVIL);
            $("#direccioncorres").val(json.DIRECCION_CORRES);       
            $("#fecexp").val(json.FECHA_CEDULA);       
        }
    });
}

function traerDatosSubsidio(ide){
    $.ajax({
        url: '../trabajadores/trabajador',
        type: 'POST',
        dataType: 'json',
        data: {ide:ide},
        async: false,
        success: function(json){            
            $("#tipoide_sub").val(json.IDTIPO_IDENTIFICACION);
            $("#ide_sub").val(json.IDENTIFICACION);           
            $("#fechanac_sub").val(json.FECHA_NACIMIENTO);
            $("#genero_sub").val((json.IDGENERO==='F')?2:1);
            $("#nom1_sub").val(json.NOMBRE1);
            $("#nom2_sub").val(json.NOMBRE2);
            $("#ape1_sub").val(json.APELLIDO1);
            $("#ape2_sub").val(json.APELLIDO2);
            $("#estcivil_sub").val(json.IDESTADO_CIVIL);           
            $("#direccion_sub").val(json.DIRECCION);
            $("#telefono_sub").val(json.TELEFONO);
            $("#correo_sub").val(json.CORREO);            
            $("#telefonomov_sub").val(json.TELEFONO_MOVIL);
            $("#direccioncorres_sub").val(json.DIRECCION_CORRES);   
            $("#fecexp_sub").val(json.FECHA_CEDULA);
            
        }
    });
}

function cargarSoporte(ide){
    $.ajax({
        url: '../actualizaciones/soporte',
        type: 'POST',
        dataType: 'text',
        data: {ide:ide},
        async: false,
        success: function(json){     
            if(json!=="0"){
                $("#soporte_error").hide();
                $("#soporte_file").prop("href","../../tmp/"+json+".pdf");                
                $('a.media').media({width:650, height:550});
            }else{
                $("#soporte_error").text("No es posible cargar el soporte, consulte al administrador");
                $("#soporte_error").show();
            }
        }
    });
}

function compararValores(){
    jQuery.each(jQuery('#actualizacion-tbl tr:gt(0)'),function () {

        var fields = $(this).find('input[type="text"]');
          if(fields.eq(1).val()!==fields.eq(0).val()){
              $(this).find('input[type="checkbox"]').prop("checked","true");
          }
          
          var valsel = $(this).find('option:selected');
          if(valsel.eq(1).val()!==valsel.eq(0).val()){
              $(this).find('input[type="checkbox"]').prop("checked","true");
          } 
    });
}

function actualizarValores(){
    
    var data = $("#actualizacion-frm").serialize();
    
    $.ajax({
        url: '../actualizaciones/guardar',
        type: 'POST',
        dataType: 'text',
        data: data,
        async: false,
        success: function(json){     
            
        }
    });
}