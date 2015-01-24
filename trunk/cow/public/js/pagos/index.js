$(document).ready(function(){
    tabla();
    
    //acciones
    $("#nueva_cuenta").click(function(){nuevo(0);}); 
});//a nosotros nos exita el peligro

function inicializarFechas(){   
    $("#fechacuenta").datepicker({ dateFormat: "yy-mm-dd",changeMonth: true, changeYear: true,yearRange: "-100:+0" });
    $("#fechapago").datepicker({ dateFormat: "yy-mm-dd",changeMonth: true, changeYear: true,yearRange: "-100:+0" });
}

function nuevo(id){       
clear_form_elements("#cuentas-frm");
inicializarFechas();

//if(parseInt(id)>0){
//   traerCuenta(id);
//}       

$( "#cuentas-dlg" ).dialog({
      resizable: false,
      height:550,
      width:650,
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

function tabla() {    
    // Setup - add a text input to each footer cell    
    $('#cuentas-dt tfoot th').each(function() {
        var title = $('#pacientes-dt thead th').eq($(this).index()).text();
        $(this).html('<input size="15" id="input_'+$(this).index()+'" type="text" placeholder="' + title + '" />');
    });
    
//    $("#input_0").prop("size","2");
//    $("#input_2").prop("size","12");
//    $("#input_1").hide();
//    $("#input_7").hide();
//    $("#input_9").hide();
    

    var table = $('#cuentas-dt').DataTable({
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
            url: "../pagos/tabla",
            type: "POST"
        },
        "columnDefs": [ {
            "targets": -1,            
            "data": null,
            "defaultContent": "<button id='bnt1'>Pagos</button>"
        } ]

    });

   

    $('#cuentas-dt tbody').on( 'click', '#bnt1', function () {
        var data = table.row( $(this).parents('tr') ).data();
        nuevo(data[0]);
    } );
    
    
    $('#cuentas-dt tbody').on( 'click', '#bnt2', function () {
        var data = table.row( $(this).parents('tr') ).data();
        alert( data[0] +"'s salary is: "+ data[ 2 ] );
    } );
    

    // Apply the filter
    $("#cuentas-dt tfoot input").on('keyup change', function() {
        table
                .column($(this).parent().index() + ':visible')
                .search(this.value)
                .draw();
    });
}