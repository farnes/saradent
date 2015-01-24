$(document).ready(function (){
  
    $("#ingresar").click(function(){validarSesion();}); 
   
});


function validarSesion(){
   
      data = new FormData($("#sesion-frm")[0]);
      
            $.ajax({
                
                url:'/login/validar',
                type: 'POST',
                dataType: 'text',
                success: function(resp){            
                 jqAlert("info","Información","Inicio sesion correcto",250,400);                 
                
            }
            });
             
}