$(document).ready(function(){   
   $("#guardar-odg").button();  
});


function guardarTratamiento(diente,cara,aplica_cara,aplica_diente,procedimiento){
    
    //alert(diente+"-"+cara+"-"+aplica_cara+"-"+aplica_diente)
    var historia=parent.document.getElementById("hist").value;   
    $.ajax({
        url: '../odontograma/crear',
        type: 'POST',
        dataType: 'text',
        data: {diente:diente,cara:cara,aplica_cara:aplica_cara,aplica_diente:aplica_diente,historia:historia,procedimiento:procedimiento},
        async: false,
        success: function(resp){            
            window.location.reload();
        }
    });
    
    
}