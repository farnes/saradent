$(document).ready(function(){
    tablaTrabajadores();
    tabla();
    tablaRechazadas();
    
    //tabs
    $( "#afiliaciones-tabs" ).tabs();
        
    //acciones
    $("#nuevo_afiliado").click(function(){nuevo(0);});       
        
        
});

//Utilizar este metodo para que el componenete de fechas se carguen en el momento de abrir el form
function inicializarFechas(){   
    $("#fechanac").datepicker({ dateFormat: "yy-mm-dd",changeMonth: true, changeYear: true,yearRange: "-100:+0" });
    $("#fechaing").datepicker({ dateFormat: "yy-mm-dd",changeMonth: true, changeYear: true,yearRange: "-100:+0"  });
//    $('#fechanac').dateEntry({dateFormat: 'ymd-',maxDate: new Date(),minDate: new Date(1910,01,01)});
//    $('#fechaing').dateEntry({dateFormat: 'ymd-',maxDate: new Date(),minDate: new Date(1910,01,01)});
}

//Utilizar este metodo para llamar los combos al cargar el formulario
function inicializarCombos(){
    combo("../utilidades/combo","tipo_identificacion",0,"tipoide");  
    combo("../utilidades/combo","tipo_identificacion",0,"tipoideempresa");
    combo("../utilidades/combo","tipo_identificacion",0,"otratipoideempresa");
    combo("../utilidades/combo","genero",0,"genero");
    combo("../utilidades/combo","estado_civil",0,"estcivil");
    combo("../utilidades/combo","departamento",0,"depto");
    combo("../utilidades/combo","municipio",0,"mupio");
    combo("../utilidades/combo","municipio",0,"mupiores");
    combo("../utilidades/combo","municipio",0,"mupioemp");
    combo("../utilidades/combo","departamento",0,"deptores");    
    combo("../utilidades/combo","departamento",0,"deptoemp");
}

function tablaTrabajadores() {    
    // Setup - add a text input to each footer cell    
    $('#trabajadores-dt tfoot th').each(function() {
        var title = $('#trabajadores-dt thead th').eq($(this).index()).text();
        $(this).html('<input size="15" id="inputt_'+$(this).index()+'" type="text" placeholder="' + title + '" />');
    });
    
    $("#inputt_0").hide();
    $("#inputt_1").prop("size","12");    
    $("#inputt_6").hide();
    $("#inputt_8").hide();
    $("#inputt_7").prop("size","8");    
    

    var table = $('#trabajadores-dt').DataTable({
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
            url: "../afiliaciones/tabla_trabajadores",
            type: "POST"
        },
        "columnDefs": [ {
            "targets": -1,            
            "data": null,
            "defaultContent": "<button id='bntt1'>Actualizar</button>"
        } ]
//        ,        
//        columns: [
//            {data: "ID"},
//            {data: "FECHA"},
//            {data: "CARGO"}
//            {
//                "mData": null,
//                "bSortable": false,
//                "mRender": function (dato) { return '<a href=javascript:cargar(' + dato.id + ')>' + 'Editar' + '</a>&nbsp;/&nbsp;<a href=javascript:eliminar(' + dato.id + ')>' + 'Eliminar' + '</a>'; }
//            }
//        ]
    });

   

    $('#trabajadores-dt tbody').on( 'click', '#bntt1', function () {
        var data = table.row( $(this).parents('tr') ).data();
        actualizarSubdisio( data[1] );
    } );
    
    
    $('#trabajadores-dt tbody').on( 'click', '#bntt2', function () {
        var data = table.row( $(this).parents('tr') ).data();
        alert( data[0] +"'s salary is: "+ data[ 2 ] );
    } );
    

    // Apply the filter
    $("#trabajadores-dt tfoot input").on('keyup change', function() {
        table
                .column($(this).parent().index() + ':visible')
                .search(this.value)
                .draw();
    });
}

function tabla() {    
    // Setup - add a text input to each footer cell    
    $('#afiliaciones-dt tfoot th').each(function() {
        var title = $('#afiliaciones-dt thead th').eq($(this).index()).text();
        $(this).html('<input size="15" id="input_'+$(this).index()+'" type="text" placeholder="' + title + '" />');
    });
    
    $("#input_0").prop("size","2");
    $("#input_2").prop("size","12");
    $("#input_1").hide();
    $("#input_7").hide();
    $("#input_9").hide();
    

    var table = $('#afiliaciones-dt').DataTable({
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
            url: "../afiliaciones/tabla",
            type: "POST"
        },
        "columnDefs": [ {
            "targets": -1,            
            "data": null,
            "defaultContent": "<button id='bnt1'>Detalles</button>"
        } ]
//        ,        
//        columns: [
//            {data: "ID"},
//            {data: "FECHA"},
//            {data: "CARGO"}
//            {
//                "mData": null,
//                "bSortable": false,
//                "mRender": function (dato) { return '<a href=javascript:cargar(' + dato.id + ')>' + 'Editar' + '</a>&nbsp;/&nbsp;<a href=javascript:eliminar(' + dato.id + ')>' + 'Eliminar' + '</a>'; }
//            }
//        ]
    });

   

    $('#afiliaciones-dt tbody').on( 'click', '#bnt1', function () {
        var data = table.row( $(this).parents('tr') ).data();
        nuevo(data[0]);
    } );
    
    
    $('#afiliaciones-dt tbody').on( 'click', '#bnt2', function () {
        var data = table.row( $(this).parents('tr') ).data();
        alert( data[0] +"'s salary is: "+ data[ 2 ] );
    } );
    

    // Apply the filter
    $("#afiliaciones-dt tfoot input").on('keyup change', function() {
        table
                .column($(this).parent().index() + ':visible')
                .search(this.value)
                .draw();
    });
}

function tablaRechazadas() {    
    // Setup - add a text input to each footer cell    
    $('#rechazadas-dt tfoot th').each(function() {
        var title = $('#afiliaciones-dt thead th').eq($(this).index()).text();
        $(this).html('<input size="15" id="inputr_'+$(this).index()+'" type="text" placeholder="' + title + '" />');
    });
    
    $("#inputr_0").prop("size","2");
    $("#inputr_2").prop("size","12");
    $("#inputr_1").hide();
    $("#inputr_7").hide();
    $("#inputr_9").hide();
    

    var table = $('#rechazadas-dt').DataTable({
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
            url: "../afiliaciones/tabla_rechazadas",
            type: "POST"
        },
        "columnDefs": [ {
            "targets": -1,            
            "data": null,
            "defaultContent": "<button id='bntr1'>Detalles</button>"
        } ]
//        ,        
//        columns: [
//            {data: "ID"},
//            {data: "FECHA"},
//            {data: "CARGO"}
//            {
//                "mData": null,
//                "bSortable": false,
//                "mRender": function (dato) { return '<a href=javascript:cargar(' + dato.id + ')>' + 'Editar' + '</a>&nbsp;/&nbsp;<a href=javascript:eliminar(' + dato.id + ')>' + 'Eliminar' + '</a>'; }
//            }
//        ]
    });

   

    $('#rechazadas-dt tbody').on( 'click', '#bntr1', function () {
        var data = table.row( $(this).parents('tr') ).data();
        alert( data[0] +"'s salary is: "+ data[ 2 ] );
    } );
    
    
    $('#rechazadas-dt tbody').on( 'click', '#bntr2', function () {
        var data = table.row( $(this).parents('tr') ).data();
        alert( data[0] +"'s salary is: "+ data[ 2 ] );
    } );
    

    // Apply the filter
    $("#rechazadas-dt tfoot input").on('keyup change', function() {
        table
                .column($(this).parent().index() + ':visible')
                .search(this.value)
                .draw();
    });
}

function nuevo(id){       
 $('#subsidio-dlg').html('');
 $('#validacion-dlg').html('');
 
// $("#afiliaciones-dlg").load("../afiliaciones/afiliacion",function(){
//     $( "#subsitabs" ).tabs({
//                    collapsible: true
//                  });
//     inicializarFechas();
//     inicializarCombos();
//     $("#depto").change(function(){
//        comboDependiente("../utilidades/comboDependiente","municipio",0,"mupio",$(this).val(),"departamento");
//     });
//     $("#deptores").change(function(){
//        comboDependiente("../utilidades/comboDependiente","municipio",0,"mupiores",$(this).val(),"departamento");
//     });
//     $("#deptoemp").change(function(){
//        comboDependiente("../utilidades/comboDependiente","municipio",0,"mupioemp",$(this).val(),"departamento");
//     });
//     
//     //buscador persona en subsidio
//     $("#ide").blur(function(){buscarPersona($(this).val());});
//
//     //datos de la empresa
//     traerEmpresa();
//     if(parseInt(id)>0){
//        traerSolicitud(id);
//     }
// });  
 
 
 $.ajax({
        url: '../afiliaciones/afiliacion',
        type: 'POST',
        dataType: 'text',        
        async: false,
        success: function(datos){     
           $("#afiliaciones-dlg").html(datos);
                      
        }
        });
 
            $( "#subsitabs" ).tabs({
                    collapsible: true
                  });
            inicializarFechas();
            inicializarCombos();
            $("#depto").change(function(){
               comboDependiente("../utilidades/comboDependiente","municipio",0,"mupio",$(this).val(),"departamento");
            });
            $("#deptores").change(function(){
               comboDependiente("../utilidades/comboDependiente","municipio",0,"mupiores",$(this).val(),"departamento");
            });
            $("#deptoemp").change(function(){
               comboDependiente("../utilidades/comboDependiente","municipio",0,"mupioemp",$(this).val(),"departamento");
            });

            //buscador persona en subsidio
            $("#ide").blur(function(){buscarPersona($(this).val());});

            //datos de la empresa
            traerEmpresa();
            if(parseInt(id)>0){
               traerSolicitud(id);
            }       
 
 
 
 

 $( "#afiliaciones-dlg" ).dialog({
      resizable: false,
      height:750,
      width:1024,
      modal: true,
      buttons: {
        "Guardar": function() {                
                if(validar()){                    
                      guardar();
                      $( this ).dialog( "close" );
                }                                    
            },
        Cancelar: function() {
//          clear_form_elements("#afiliaciones-frm");  
          $( this ).dialog( "close" );
        }
      }
    });
}

function requerido(campo){
    var resp = true;
    
    if($("#"+campo).val()===""){
        $("#"+campo).prev('label').addClass("error-input");     
        resp = false;
    }else{
        $("#"+campo).prev('label').removeClass("error-input");
    }
    
    return resp;
}

function validaMail(campo){
    var resp = false;    
    if( /(.+)@(.+){2,}\.(.+){2,}/.test($("#"+campo).val()) ){         
        $("#"+campo).prev('label').removeClass("error-input");
        resp=true;
    }else{
        $("#"+campo).prev('label').addClass("error-input");   
    } 
    return resp;
}

function validarFiletype(campo){
    var resp = true;
    
    if (!contarSoportes()) {
        if ($('#' + campo).val() !== "") {
            var ext = $('#' + campo).val().split('.').pop().toLowerCase();
            if ($.inArray(ext, ['pdf']) === -1) {
                alert('El documento de soporte debe ser de tipo pdf');
                resp = false;
            }
        }
    }
    
    return resp;
}

function validar(){
    var valido = false;    
    v1 = requerido("tipoide");
    v2 = requerido("ide");
    v3 = requerido("fechanac");
    v4 = requerido("genero");
    v5 = requerido("nom1");    
    v7 = requerido("ape1");
    v9 = requerido("estcivil");
    v10 = requerido("direccion");
    v11 = requerido("telefono");
    v12 = validaMail("correo");
    v13 = requerido("depto");
    v14 = requerido("mupio");
    v15 = requerido("deptores");
    v16 = requerido("mupiores");
    v17 = requerido("telefonores");
    v18 = requerido("direccioncorres");    
    v19 = requerido("deptoemp");
    v20 = requerido("mupioemp");
    v21 = requerido("fechaing");
    v22 = requerido("cargo");
    v23 = requerido("hlaboradas");
    v24 = requerido("salbasico");
    v25 = requerido("tdevengado");
    v26 = requerido("cedulapdf");
    v27 = validarFiletype("cedulapdf");
       
    if(v1&&v2&&v3&&v4&&v5&&v7&&v9&&v10&&v11&&v12&&v13&&v14&&v15&&v16&&v17&&v18&&v19&&v20&&v21&&v22&&v23&&v24&&v25&&v26&&v27){
        valido = true;
    }
    return valido;
}

function traerEmpresa(){
     $.ajax({
        url: '../afiliaciones/empresa',
        type: 'POST',
        dataType: 'json',
        data: {id:0},
        async: false,
        success: function(json){            
            $("#empresa").val(json.RAZON_SOCIAL);
            $("#tipoideempresa").val(json.IDTIPO_IDENTIFICACION);
            $("#ideempresa").val(json.IDENTIFICACION);
            $("#idempresa").val(json.ID);
            $("#dv").val(json.DIGITO_VERIFICACION);            
        }
    });
}



function guardar(){    
    
    if(parseInt($("#id").val())===0){
//        var datos = $("#afiliaciones-frm").serialize();    
        
        data = new FormData($("#afiliaciones-frm")[0]);
//        alert(data)
        
        $.ajax({
            url: '../afiliaciones/guardar',
            type: 'POST',
            dataType: 'text',
            contentType: false,
            processData: false,
            data: data,
            async: false,
            success: function(resp){            
                 jqAlert("info","Información","Su solicitud de afiliaci&oacute;n se ha generado con el consecutivo: <b style='color:red'>"+resp+"<b>",250,400);
                 $( "#afiliaciones-tabs" ).tabs({active:1});
                 tabla();
            }
        });
    }else{
//        var datos = $("#afiliaciones-frm").serialize();    
        data = new FormData($("#afiliaciones-frm")[0]);
        $.ajax({
            url: '../afiliaciones/actualizar',
            type: 'POST',
            contentType: false,
            processData: false,
            dataType: 'text',
            data: data,
            async: false,
            success: function(resp){            
                 jqAlert("info","Información","La informaci&oacute;n se ha almacenado correctamente",250,400);
                 $( "#afiliaciones-tabs" ).tabs({active:1});
                 tabla();
            }
        });
    }
    
    
}

function traerSolicitud(solicitud){
    
    $.ajax({
        url: '../afiliaciones/solicitud',
        type: 'POST',
        dataType: 'json',
        data: {solicitud:solicitud},
        async: false,
        success: function(json){            
            $("#id").val(json.ID);
            $("#afiliacion").val(json.AFILIACION);
            $("#persona").val(json.PERSONA);
            $("#tipoide").val(json.IDTIPO_IDENTIFICACION);
            $("#ide").val(json.IDENTIFICACION);
            $("#fechanac").val(json.FECHA_NACIMIENTO);
            $("#genero").val(json.IDGENERO);
            $("#nom1").val(json.NOMBRE1);
            $("#nom2").val(json.NOMBRE2);
            $("#ape1").val(json.APELLIDO1);
            $("#ape2").val(json.APELLIDO2);
            $("#estcivil").val(json.IDESTADO_CIVIL);
            $("#jefeh").val(json.JEFE_HOGAR);
            $("#direccion").val(json.DIRECCION);
            $("#telefono").val(json.TELEFONO);
            $("#correo").val(json.CORREO);
            $("#depto").val(json.DEPTONAC);
            $("#mupio").val(json.IDMUNICIPIO_NAC);
            $("#deptores").val(json.DEPTORES);
            $("#mupiores").val(json.IDMUNICIPIO_RES);
            $("#telefonomov").val(json.TELEFONO_MOVIL);
            $("#direccioncorres").val(json.DIRECCION_CORRES);
            $("#deptoemp").val(json.IDDEPARTAMENTO);
            $("#mupioemp").val(json.IDMUNICIPIO);
            $("#fechaing").val(json.FECHA_INGRESO);
            $("#cargo").val(json.CARGO);
            $("#hlaboradas").val(json.HORAS_LABORADAS);
            $("#salbasico").val(json.SALARIO_BASICO);
            $("#comisiones").val(json.COMISIONES);
            $("#otrosf").val(json.OTROS_INGRESOS);
            $("#tdevengado").val(json.SALARIO_BASICO);
            $("#otratipoideempresa").val(json.IDTIPOOTRA_EMPRESA);
            $("#otraideempresa").val(json.IDEOTRA_EMPRESA);
            $("#otraempresa").val(json.RAZONSOCOTRA_EMPRESA);
            $("#otradv").val(json.DVOTRA_EMPRESA);
            listarSoportes(json.ID);
        }
    });    
}


function listarSoportes(id){
    $.ajax({
        url: '../afiliaciones/soportes',
        type: 'POST',
        dataType: 'json',
        data: {id:id},
        async: false,
        success: function(json){                
            var li = "";
            if (json.length > 0) {    
                if(json!==null){
                        $.each(json, function(i) {
                            li += "<li>" + json[i].ARCHIVO;
                            li+="&nbsp;<img src='../../public/images/delete.png' width='11px' height='11px' onclick='javascript:borrarSoporte(\""+json[i].ARCHIVO+"\","+id+")' />";  
                            li+= "</li>";
                        });
                    }
            }else{
                li += "<li>No hay soportes cargados</li>";
            }
            $("#soportes").show();
            $("#soportes").html(li);
        }
    });    
}

function borrarSoporte(archivo,id){
    if(confirm("Seguro de eliminar el archivo?")){
        $.ajax({
            url: "../afiliaciones/soporte_borrar",
            dataType: 'text',
            type: 'POST',
            data: {id:id,archivo:archivo},
            async: false,
            success: function(text){     
                listarSoportes(id);
                alert("Archivo eliminado correctamente");               
            }
        });
    }
}

function buscarPersona(ide){    
    var band = false;    
    $.ajax({
            url: "../afiliaciones/buscar_persona",
            dataType: 'json',
            type: 'POST',
            data: {ide:ide},
            async: false,
            success: function(json){                                
            var resultado = "<table id='trabajador-tbl' style='font-size:10px'  width='100%'>";
                resultado += "<tr class='ui-widget-header'>";
                    resultado += "<td>.:.</td>";
                    resultado += "<td>Origen</td>";
                    resultado += "<td>Identificaci&oacute;n</td>";
                    resultado += "<td>Tipo</td>";
                    resultado += "<td>Primer Apellido</td>";
                    resultado += "<td>Segundo Apellido</td>";
                    resultado += "<td>Primer Nombre</td>";
                    resultado += "<td>Segundo Nombre</td>";
                    resultado += "<td>Direcci&oacute;n</td>";
                    resultado += "<td>Ciudad</td>";
                    resultado += "<td>Tel&eacute;fono</td>";
                    resultado += "<td>Email</td>";
                    resultado += "<td>Fecha Nac</td>";
                    resultado += "<td>Genero</td>";
                    resultado += "<td>Estado Civil</td>";
                    resultado += "<td style='display:none'>Oc</td>";
                resultado += "</tr>";
                var j=0;
                $.each(json, function(i) {
                    if(json[i]!==false){
                        band = true;
                        resultado += "<tr class='ui-widget-content'>";
                            resultado += "<td><input type='radio' name='trab' id='r"+j+"' /></td>";
                            resultado += "<td>"+json[i].ORIGEN+"</td>";
                            resultado += "<td>"+json[i].CEDTRA+"</td>";                            
                            resultado += "<td>"+homologarIdentificacion(json[i].CODDOC)+"</td>";                            
                            resultado += "<td>"+json[i].PRIAPE+"</td>";                            
                            resultado += "<td>"+((json[i].SEGAPE===null)?"":json[i].SEGAPE)+"</td>";                            
                            resultado += "<td>"+json[i].PRINOM+"</td>";                            
                            resultado += "<td>"+((json[i].SEGNOM===null)?"":json[i].SEGNOM)+"</td>";                            
                            resultado += "<td>"+((json[i].DIRECCION===null)?"":json[i].DIRECCION)+"</td>";                            
                            resultado += "<td>"+json[i].CODCIU+"</td>";                            
                            resultado += "<td>"+((json[i].TELEFONO===null)?"":json[i].TELEFONO)+"</td>";     
                            resultado += "<td>"+((json[i].EMAIL===null)?"":json[i].EMAIL)+"</td>";                            
                            resultado += "<td>"+json[i].FECNAC+"</td>";                            
                            resultado += "<td>"+json[i].SEXO+"</td>";                            
                            resultado += "<td>"+json[i].ESTCIV+"</td>"; 
                            resultado += "<td style='display:none'>"+json[i].CODDOC+"</td>"; 
                        resultado += "</tr>";
                        j++;
                    }
                });
                resultado+="</table>";                
                $("#trabajador-dlg").html(resultado);                
            }
        });
        
        if(band){
            $( "#trabajador-dlg" ).dialog({
              resizable: false,
              height:450,
              width:1024,
              modal: true,
              buttons: {
                Aceptar: function() {                
                        seleccionarRegistro();
                        $( this ).dialog( "close" );
                    },
                Cancelar: function() {
                  $( this ).dialog( "close" );
                }
              }
            });
        }
}


function seleccionarRegistro(){    
    var i = 0;
    jQuery.each(jQuery('#trabajador-tbl tr:gt(0)'),function () {
       if(jQuery("#r"+i).is(':checked')){     
            $("#fechanac").val(jQuery(this).children('td').eq(12).html());
            $("#genero").val((jQuery(this).children('td').eq(13).html()==="F")?2:1);
            $("#tipoide").val(jQuery(this).children('td').eq(14).html());
            $("#nom1").val(jQuery(this).children('td').eq(6).html());
            $("#nom2").val(jQuery(this).children('td').eq(7).html());
            $("#ape1").val(jQuery(this).children('td').eq(4).html());
            $("#ape2").val(jQuery(this).children('td').eq(5).html());
            $("#estcivil").val(jQuery(this).children('td').eq(14).html());
            $("#direccion").val(jQuery(this).children('td').eq(8).html());
            $("#telefono").val(jQuery(this).children('td').eq(10).html());
            $("#correo").val(jQuery(this).children('td').eq(11).html());
       }
       i++;
    });
}

function homologarIdentificacion(tipo){
    var resp = "";
    switch (parseInt(tipo)){
        case 1:resp="Cedula";break;
        case 2:resp="T. Identidad";break;
        case 3:resp="Nit";break;
        case 4:resp="Cedula Extr";break;
        case 5:resp="Otro";break;
        case 6:resp="R. Civil";break;
        case 7:resp="NUIP";break;
        case 8:resp="RUT";break;
        case 9:resp="Pasaporte";break;
    }
    return resp;
} 

function contarSoportes(){
    var resp = false;
    var i = 0;
    $("#soportes li").each(function() {
        i++;
    });
    if(parseInt(i)>0){
        resp = true;
    }
    return resp;
}



//METODOS PARA ACTUALZIAR LA BASE DE SUBSIDIO

//Utilizar este metodo para que el componenete de fechas se carguen en el momento de abrir el form
function inicializarFechasSubsidio(){   
    $("#fechanac").datepicker({ dateFormat: "yy-mm-dd",changeMonth: true, changeYear: true,yearRange: "-100:+0" });
    $("#fecexp").datepicker({ dateFormat: "yy-mm-dd",changeMonth: true, changeYear: true,yearRange: "-100:+0"  });
//    $('#fechanac').dateEntry({dateFormat: 'ymd-',maxDate: new Date(),minDate: new Date(1910,01,01)});
//    $('#fecexp').dateEntry({dateFormat: 'ymd-',maxDate: new Date(),minDate: new Date(1910,01,01)});
}

function actualizarSubdisio(id){   
 $('#afiliaciones-dlg').html('');
 $('#trabajador-dlg').html('');
 
// $("#subsidio-dlg").load("../trabajadores/afiliacion",function(){
//     $( "#trabtabs" ).tabs({
//                    collapsible: true
//                  });
//     inicializarFechasSubsidio();
//     inicializarCombos();
//    //datos de la empresa
//     traerEmpresaSubsidio();
//     traerDatosSubsidio(id);     
// });  
// 
 $.ajax({
        url: '../trabajadores/afiliacion',
        type: 'POST',
        dataType: 'text',        
        async: false,
        success: function(datos){     
           $("#subsidio-dlg").html(datos)
           $( "#trabtabs" ).tabs({
                    collapsible: true
                  });
            inicializarFechasSubsidio();
            inicializarCombos();
           //datos de la empresa
            traerEmpresaSubsidio();
            traerDatosSubsidio(id);          
        }
        });
 
 
 
 
 

 $( "#subsidio-dlg" ).dialog({
      resizable: false,
      height:750,
      width:1024,
      modal: true,
      buttons: {
        "Guardar": function() {                
                if(validarSubsidio()){                    
                      guardarSubsidio();
                      $( this ).dialog( "close" );
                }                                    
            },
        Cancelar: function() {
//          clear_form_elements("#afiliaciones-frm");  
          $( this ).dialog( "close" );
        }
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
            $("#tipoide").val(json.IDTIPO_IDENTIFICACION);
            $("#ide").val(json.IDENTIFICACION);
            $("#ideorigen").val(json.IDENTIFICACION);
            $("#fechanac").val(json.FECHA_NACIMIENTO);
            $("#genero").val((json.IDGENERO==='F')?2:1);
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
            listarSoportesSubsidio(json.IDENTIFICACION);
        }
    });
}

function traerEmpresaSubsidio(){
     $.ajax({
        url: '../trabajadores/empresa',
        type: 'POST',
        dataType: 'json',
        data: {id:0},
        async: false,
        success: function(json){            
            $("#empresa").text(json.RAZON_SOCIAL);
            //$("#tipoideempresa").val(json.IDTIPO_IDENTIFICACION);
            $("#ideempresa").text(json.IDENTIFICACION+" - "+json.DIGITO_VERIFICACION);
        }
    });
}


function guardarSubsidio(){    

        data = new FormData($("#trabajadores-frm")[0]);
        $.ajax({
            url: '../trabajadores/guardar',
            type: 'POST',
            contentType: false,
            processData: false,
            dataType: 'text',
            data: data,
            async: false,
            success: function(resp){            
                 jqAlert("info","Información","Su solicitud de afiliaci&oacute;n se ha generado con el consecutivo: <b style='color:red'>"+resp+"<b>",250,400);
                 $( "#afiliaciones-tabs" ).tabs({active:1});
                 tabla();
            }
        });            
}

function listarSoportesSubsidio(id){
    $.ajax({
        url: '../trabajadores/soportes',
        type: 'POST',
        dataType: 'json',
        data: {id:id},
        async: false,
        success: function(json){                
            var li = "";
            if(json!==null){
            if (json.length > 0) {
                
                    $.each(json, function(i) {
                        li += "<li>" + json[i].ARCHIVO;
                        li+="&nbsp;<img src='../../public/images/delete.png' width='11px' height='11px' onclick='javascript:borrarSoporte(\""+json[i].ARCHIVO+"\","+id+")' />";  
                        li+= "</li>";
                    });
                
            }else{
                li += "<li>No hay soportes cargados</li>";
            }
        }
            $("#soportes").show();
            $("#soportes").html(li);
        }
    });    
}

function validarSubsidio(){
    var valido = false;    
    v1 = requerido("tipoide");
    v2 = requerido("ide");
    v3 = requerido("fechanac");
    v4 = requerido("genero");
    v5 = requerido("nom1");    
    v7 = requerido("ape1");
    v9 = requerido("estcivil");
    v10 = requerido("direccion");
    v11 = requerido("telefono");
    v12 = validaMail("correo");
    v17 = requerido("telefonores");
    v18 = requerido("direccioncorres");    
    v19 = requerido("deptoemp");
    v20 = requerido("mupioemp");
    v21 = requerido("fechaing");    
    v27 = validarFiletype("cedulapdf");
       
    if(v1&&v2&&v3&&v4&&v5&&v7&&v9&&v10&&v11&&v12&&v17&&v18&&v19&&v20&&v21&&v27){
        valido = true;
    }
    return valido;
}