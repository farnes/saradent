function jqAlert(icon,titulo,msg,alto,ancho) {
    console.log("Alert: " + msg);
    $('<div id="sfUI-Dialog-Alert" title="'+titulo+'" style="font-size: 1em"><p><span class="ui-icon ui-icon-'+icon+'" style="float: left; margin: 0 7px 20px 0;"></span>' + msg + '</div>').dialog({
        modal: true,
        width: ancho,
        height: alto,
        show: {
            effect: "blind",
            duration: 444
        },
        hide: {
            effect: "explode",
            duration: 333
        },
        buttons: {
            Ok: function () {
                $(this).dialog("close");
            }
        }
    });
}


function jqConfirm(icon,titulo,msg,alto,ancho,funcion) {
    
    $('<div id="sfUI-Dialog-Cofirm" title="'+titulo+'" style="font-size: 1em"><p><span class="ui-icon ui-icon-'+icon+'" style="float: left; margin: 0 7px 20px 0;"></span>' + msg + '</div>').dialog({
        modal: true,
        width: ancho,
        height: alto,
        show: {
            effect: "blind",
            duration: 444
        },
        hide: {
            effect: "explode",
            duration: 333
        },
        buttons: {
            Si: function () {
                if (typeof (funcion) === 'function') {
                    setTimeout(funcion, 50);
                    $(this).dialog("close");
                  }
            },
            No: function () {
                $(this).dialog("close");
            }
        }
    });
}
