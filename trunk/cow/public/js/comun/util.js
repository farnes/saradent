function combo(url,tabla,tipo,objeto){
        $.ajax({
        url: url,
        type: 'POST',
        dataType: 'text',
        data: {tabla:tabla,tipo:tipo},
        async: false,
        success: function(msg){            
            $("#"+objeto).html(msg);
        }
    });
}

function comboDependiente(url,tabla,tipo,objeto,fk,tblfk){
        $.ajax({
        url: url,
        type: 'POST',
        dataType: 'text',
        data: {tabla:tabla,tipo:tipo,fk:fk,tblfk:tblfk},
        async: false,
        success: function(msg){            
            $("#"+objeto).html(msg);
        }
    });
}


function clear_form_elements(ele) {

    $(ele).find(':input').each(function() {
        switch(this.type) {
            case 'password':
            case 'select-multiple':
            case 'select-one':
            case 'text':
            case 'file':
            case 'textarea':
                $(this).val('');
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
        }
    });
}