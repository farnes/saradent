$(document).ready(function(){
    validarSesion();
    cargarMenu();
});

function validarSesion(){
    
}
function cargarMenu(){
    $.ajax({
            url: "principal",
            dataType: 'json',
            data: {id:1},
            async: false,
            success: function(json){    
                                
                var menu = "";                
                $.each(json,function(i){               
                    menu += '<li><a href="javascript:cargarPagina(\''+json[i].url+'\')">'+json[i].menu+'</a></li><li class="divider"></li>';
                });                            
                
                $("#menu_afiliaciones").html(menu);                
            }
        });
}

function cargarPagina(pagina){   
   $( "#container" ).html(""); 
   $( "#container" ).load(pagina);
}