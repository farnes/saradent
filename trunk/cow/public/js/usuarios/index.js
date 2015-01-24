$(document).ready(function (){
    tabla();
    $("#nuevo_usuario").click(function(){nuevo(0);}); 
});

function tabla() {    
    // Setup - add a text input to each footer cell    
    $('#usuarios-dt tfoot th').each(function() {
        var title = $('#usuarios-dt thead th').eq($(this).index()).text();
        $(this).html('<input size="15" id="input_'+$(this).index()+'" type="text" placeholder="' + title + '" />');
    });
    
    $("#input_0").prop("size","2");
    $("#input_2").prop("size","12");    
    $("#input_0").hide();
    $("#input_4").hide();
    $("#input_5").hide();
    $("#input_6").hide();
    

    var table = $('#usuarios-dt').DataTable({
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
            url: "../usuarios/tabla",
            type: "POST"
        },
        "columnDefs": [ {
            "targets": -1,            
            "data": null,
            "defaultContent": "<button id='bnt1'>Actualizar</button>"
        } ]

    });

   

    $('#usuarios-dt tbody').on( 'click', '#bnt1', function () {
        var data = table.row( $(this).parents('tr') ).data();
        nuevo(data[0]);
    } );
    
    
    $('#usuarios-dt tbody').on( 'click', '#bnt2', function () {
        var data = table.row( $(this).parents('tr') ).data();
        alert( data[0] +"'s salary is: "+ data[ 2 ] );
    } );
    

    // Apply the filter
    $("#usuarios-dt tfoot input").on('keyup change', function() {
        table
                .column($(this).parent().index() + ':visible')
                .search(this.value)
                .draw();
    });
}

//Utilizar este metodo para llamar los combos al cargar el formulario
function inicializarCombos(){
    combo("../utilidades/combo","rol",0,"rol");      
}


function nuevo(id){       
clear_form_elements("#usuarios-frm");
inicializarCombos();

if(parseInt(id)>0){
   traerUsuario(id);
}       

$( "#usuarios-dlg" ).dialog({
      resizable: false,
      height:350,
      width:600,
      modal: true,
      buttons: {
        "Guardar": function() {                
                if(validar()){                    
                    guardar();
                    $( this ).dialog( "close" );
                }                                    
            },
          Cancelar: function() {
          $( this ).dialog( "close" );
        }
      }
});

}

function traerUsuario(id){
    $.ajax({
        url: '../usuarios/usuario',
        type: 'POST',
        dataType: 'json',
        data: {id:id},
        async: false,
        success: function(json){            
            $("#id").val(json.id);
            $("#usuario").val(json.usuario);
            $("#clave").val(json.clave);
            $("#nombre").val(json.nombre);
            $("#rol").val(json.idrol);
            $("#correo").val(json.correo);
            $("#estado").val(json.estado);           
        }
    });
}


function guardar(){
    
    if(parseInt($("#id").val())===0){
//        var datos = $("#afiliaciones-frm").serialize();            
        data = new FormData($("#usuarios-frm")[0]);
        $.ajax({
            url: '../usuarios/guardar',
            type: 'POST',
            dataType: 'text',
            contentType: false,
            processData: false,
            data: data,
            async: false,
            success: function(resp){            
                 jqAlert("info","Información","El usuario se ha guardado correctamente",250,400);                 
                 tabla();
            }
        });
    }else{
//        var datos = $("#afiliaciones-frm").serialize();    
        data = new FormData($("#usuarios-frm")[0]);
        $.ajax({
            url: '../usuarios/actualizar',
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

function validar(){
    var valido = false;    
    v1 = requerido("usuario");
    v2 = requerido("clave");
    v3 = requerido("nombre");
    v4 = requerido("rol");
    v5 = requerido("correo");    
    v6 = requerido("estado");
    
    if(v1&&v2&&v3&&v4&&v5&&v6){
        valido = true;
    }
    return valido;
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