var _languageDataTables = {
    "sProcessing": "Procesando...",
    "sLengthMenu": "Mostrar _MENU_ registros",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "Ningún dato disponible en esta tabla.",
    //"sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfo": "Registros del _START_ al _END_. Total: _TOTAL_",
    //"sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoEmpty": "No hay registros para mostrar",
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
    },
    "buttons": {
        "copy": "Copiar",
        "colvis": "Visibilidad"
    }
};

function validarPaseSeveralsInputs(idInputs) {
    var arrayInputs = idInputs.split(',');
    var arrayValores = [];
    var arrayVacios = [];
    var arrayLlenos = [];
    var inputPrimeroVacio = '';
    $.each(arrayInputs, function (index, element) {
        arrayValores.push($("#" + element.trim()).val());
    });
    if (arrayValores.length == 1) {
        if (validarIsNullOrEmpty(arrayValores[0])) {
            return { valor: true, input: arrayInputs[0], vacio: true };
        } else {
            return { valor: true, input: '', vacio: false };
        }
    }
    $.each(arrayValores, function (index, element) {
        if (validarIsNullOrEmpty(element)) {
            arrayVacios.push(element);
            if (inputPrimeroVacio == '') {
                inputPrimeroVacio = arrayInputs[index].trim();
            }
        } else {
            arrayLlenos.push(element);
        }
    });
    if (arrayLlenos.length == arrayValores.length || arrayVacios.length == arrayValores.length) {
        return { valor: true, input: inputPrimeroVacio, vacio: arrayVacios.length == arrayValores.length ? true : false };
    }
    return { valor: false, input: inputPrimeroVacio, vacio: true };
}
function validarPaseSeveralsSelects(idInputs) {
    var arrayInputs = idInputs.split(',');
    var arrayValores = [];
    var arrayVacios = [];
    var arrayLlenos = [];
    var inputPrimeroVacio = '';

    $.each(arrayInputs, function (index, element) {
        arrayValores.push($("#" + element.trim()).val());
    });
    if (arrayValores.length == 1) {
        if (validarIsNullOrEmptyCERO(arrayValores[0])) {
            return { valor: true, input: arrayInputs[0], vacio: true };
        } else {
            return { valor: true, input: '', vacio: false };
        }
    }
    $.each(arrayValores, function (index, element) {
        if (validarIsNullOrEmptyCERO(element)) {
            arrayVacios.push(element);
            if (inputPrimeroVacio == '') {
                inputPrimeroVacio = arrayInputs[index].trim();
            }
        } else {
            arrayLlenos.push(element);
        }
    });
    if (arrayLlenos.length == arrayValores.length || arrayVacios.length == arrayValores.length) {
        return { valor: true, input: inputPrimeroVacio, vacio: arrayVacios.length == arrayValores.length ? true : false };
    }
    return { valor: false, input: inputPrimeroVacio, vacio: true };
}
function validarIsNullOrEmptyCERO(valor) {
    if (valor == null) {
        return true;
    }
    if (valor == "") {
        return true;
    }
    if (valor == 0 || valor == "0") {
        return true;
    }
    return false;
}

function rotateImage(degree) {
    $('#figureDoc').animate({ transform: degree }, {
        step: function (now, fx) {
            $(this).css({
                '-webkit-transform': 'rotate(' + now + 'deg)',
                '-moz-transform': 'rotate(' + now + 'deg)',
                'transform': 'rotate(' + now + 'deg)'
            });
        }
    });
}

function rotateImageDoc(degree) {
    $('#figureDocumento').animate({ transform: degree }, {
        step: function (now, fx) {
            $(this).css({
                '-webkit-transform': 'rotate(' + now + 'deg)',
                '-moz-transform': 'rotate(' + now + 'deg)',
                'transform': 'rotate(' + now + 'deg)'
            });
        }
    });
}

function CerrarSesion() {
    verMensaje('', "Sesion expirada. Vuelva a iniciar Sesión", 'red',
        'Ok', function () { CerrarSesionAction(); }, function () { CerrarSesionAction(); });

}

function CerrarSesionAction() {
    $.ajax({
        url: rutaPrincipal + "Account/CerrarSesion",
        type: "GET",
        success: function (resp) {
            window.location.reload();
        }
    });
}