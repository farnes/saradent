$(document).ready(function(){   
   $("#guardar-odg").button();  
   $("#obs_tra").val("");
});


function guardarTratamiento(diente,cara,aplica_cara,aplica_diente,procedimiento){   
    var historia=parent.document.getElementById("hist").value; 
    var obs = $("#obs_tra").val();
    if(obs!==""){
    $.ajax({
        url: '../odontograma/crear',
        type: 'POST',
        dataType: 'text',
        data: {diente:diente,cara:cara,aplica_cara:aplica_cara,aplica_diente:aplica_diente,historia:historia,procedimiento:procedimiento,obs:obs},
        async: false,
        success: function(resp){            
            window.location.reload();
        }
    });
    }else{
        alert("Debe ingresar una observación para el tratamiento")
    }
}

//

function borrarTratamiento(tratamiento){       
    $.ajax({
        url: '../odontograma/borrar',
        type: 'POST',
        dataType: 'text',
        data: {tratamiento:tratamiento},
        async: false,
        success: function(resp){            
            window.location.reload();
        }
    });
}

function limpiar(){
    $("#obs_tra").val("");
    $("#des_tra").val("");
}

function mostrarTratamiento(tratamiento){  
    $.ajax({
        url: '../odontograma/mostrar',
        type: 'POST',
        dataType: 'json',
        data: {tratamiento:tratamiento},
        async: false,
        success: function(resp){            
            $("#obs_tra").val(resp.observacion);
            $("#des_tra").val(resp.descripcion);
        }
    });
  /*  
    $( "#div_obs_trat" ).dialog({
      resizable: false,
      height:300,
      width:400,
      modal: true,
      buttons: {       
          Cancelar: function() {
          $( this ).dialog( "close" );
        }
      }
});
*/
}