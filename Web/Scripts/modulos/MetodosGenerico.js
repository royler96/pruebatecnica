function validarIsNullOrEmpty(valor) {
    if (valor == null) {
        return true;
    }
    if (valor == "") {
        return true;
    }
    return false;
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

function validarIsNullOrEmptyMenosUno(valor) {
    if (valor == null) {
        return true;
    }
    if (valor == "") {
        return true;
    }
    if (valor == -1 || valor == "-1") {
        return true;
    }
    return false;
}

function cargandoSelect(idSelects) {//id1, id2, id3, .... -> [id1, id2, id3, ...]
    var idsArray = idSelects.split(',');
    $.each(idsArray, function (index, element) {
        $("#" + element.trim()).html('<option>Cargando...</option>');
    });
}

function restartSelectpicker(idSelectPicker, valueDefect, jsonOption) {
    $(`#${idSelectPicker}`).select2('destroy');
    $(`#${idSelectPicker}`).val(valueDefect);
    if (jsonOption != null && jsonOption != "undefined") {
        $(`#${idSelectPicker}`).select2(jsonOption);
    } else {
        $(`#${idSelectPicker}`).select2();
    }
}

function limpiarSelect(idSelects, texto) {
    var idsArray = idSelects.split(',');
    $.each(idsArray, function (index, element) {
        $("#" + element.trim()).html('<option value="-1">' + texto + '</option>');
    });
}

function cargandoInput(idSelects) {
    var idsArray = idSelects.split(',');
    $.each(idsArray, function (index, element) {
        $("#" + element.trim()).val('Cargando...');
    });
}

function limpiarInput(idSelects) { //'id1, id2'   
    var idsArray = idSelects.split(',');
    $.each(idsArray, function (index, element) {
        $("#" + element.trim()).val('');
    });
}

function fillSelectPicker(idSelectPicker, data, nameCodigo, nameDescripcion, texto) {
    limpiarSelect(idSelectPicker, texto);
    if (data != null && data.length > 0) {
        $.each(data, function (index, element) {
            var selected = "";
            $("#" + idSelectPicker.trim()).append('<option value="' + element[nameCodigo] + '" ' + selected + '>' + element[nameDescripcion] + '</option>');
        });
    }
    $("#" + idSelectPicker.trim()).selectpicker();
}

function fillSelectPickerWithoutDefault(idSelectPicker, data, nameCodigo, nameDescripcion) {
    var idsArray = idSelectPicker.split(',');
    $.each(idsArray, function (index, element) {
        $("#" + element.trim()).html('');
    });

    if (data != null && data.length > 0) {
        $.each(data, function (index, element) {
            var selected = "";
            $("#" + idSelectPicker.trim()).append('<option value="' + element[nameCodigo] + '" ' + selected + '>' + element[nameDescripcion] + '</option>');
        });
    }
    $("#" + idSelectPicker.trim()).select2();
}
function resetSelect(idSelects, text) {
    var idsArray = idSelects.split(',');
    if (text == "undefined" || text == null) {
        text = 'Seleccione...';
    }
    $.each(idsArray, function (index, element) {
        $("#" + element.trim()).html('<option value="-1">' + text + '</option>');
    });
}
function fillSelect(idSelectPicker, data, nameCodigo, nameDescripcion, text) {
    resetSelect(idSelectPicker, text);
    if (data != null && data.length > 0) {
        $.each(data, function (index, element) {
            var selected = "";
            $("#" + idSelectPicker.trim()).append('<option value="' + element[nameCodigo] + '" ' + selected + '>' + element[nameDescripcion] + '</option>');
        });
    }
}

/**
 * No permite escribir caracteres fuera de la expresion regular, este se asigna un input a traves de su id.
 * solo se usa el evento key down
 * @param {any} event
 * @param {any} regularExpression
 */
function noPermitirEscribirCaracteresFueraDelaRegExp(idInputs, regularExpression) {/// txtCaltitud , [0-9\.-]/g
    var idsArray = idInputs.split(',');
    $.each(idsArray, function (index, element) {
        $("#" + element.trim())
            .keydown(function (evt) {

                var key = event.keyCode || event.which;
                var especiales = [8, 9, 16, 35, 36, 37, 39, 46];
                var tecla_especial = false;
                for (var i of especiales) {
                    if (key == i) {
                        tecla_especial = true;
                        break;
                    }
                }
                if (!(regularExpression.test(event.key)) && !tecla_especial) {

                    if (window.event) {
                        window.event.returnValue = null;
                    } //IE
                    else {
                        event.preventDefault();
                    } //Firefox                    
                }
            })/*.keyup(function () {
                //this.value = (this.value + '').replace(/[^0-9\.-]/g, '');
            })*/;
    });

}

function noPermitirEscribirCaracteresFueraDelaRegExpDireccion(idInputs) {/// txtCaltitud , [0-9\.-]/g
    var regularExpression = /[A-Za-záéíóúÁÉÍÓÚ\s0-9ñ#.,\-º°]+$/i;
    var idsArray = idInputs.split(',');
    $.each(idsArray, function (index, element) {
        $("#" + element.trim())
            .keydown(function (evt) {

                var key = event.keyCode || event.which;
                var especiales = [8, 9, 16, 35, 36, 37, 39, 46];
                var tecla_especial = false;
                for (var i of especiales) {
                    if (key == i) {
                        tecla_especial = true;
                        break;
                    }
                }
                if (!(regularExpression.test(event.key)) && !tecla_especial) {

                    if (window.event) {
                        window.event.returnValue = null;
                    } //IE
                    else {
                        event.preventDefault();
                    } //Firefox                    
                }
            })/*.keyup(function () {
                //this.value = (this.value + '').replace(/[^0-9\.-]/g, '');
            })*/;
    });

}

function noPermitirEscribirCaracteresFueraDelaRegExpNombre(idInputs) {/// txtCaltitud , [0-9\.-]/g
    var regularExpression = /[A-Za-záéíóúÁÉÍÓÚ\#.]+$/i;
    var idsArray = idInputs.split(',');
    $.each(idsArray, function (index, element) {
        $("#" + element.trim())
            .keydown(function (evt) {

                var key = event.keyCode || event.which;
                var especiales = [8, 9, 16, 35, 36, 37, 39, 46];
                var tecla_especial = false;
                for (var i of especiales) {
                    if (key == i) {
                        tecla_especial = true;
                        break;
                    }
                }
                if (!(regularExpression.test(event.key)) && !tecla_especial) {

                    if (window.event) {
                        window.event.returnValue = null;
                    } //IE
                    else {
                        event.preventDefault();
                    } //Firefox                    
                }
            })/*.keyup(function () {
                //this.value = (this.value + '').replace(/[^0-9\.-]/g, '');
            })*/;
    });

}

function noPermitirEscribirCaracteresFueraDelaRegExpNumerosPositivos(idInputs) {/// txtCaltitud , [0-9\.-]/g
    var idsArray = idInputs.split(',');
    $.each(idsArray, function (index, element) {
        $("#" + element.trim())
            .keypress(function (evt) {
                // Backspace = 8, Enter = 13, ‘0′ = 48, ‘9′ = 57, ‘.’ = 46, ‘-’ = 43
                var key = window.Event ? evt.which : evt.keyCode;
                var chark = String.fromCharCode(key);
                var tempValue = this.value + chark;
                if (key >= 48 && key <= 57) {
                    if (filterPositivosDecimales(tempValue) === false) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    if (key == 8 || key == 13 || key == 0) {
                        return true;
                    } else if (key == 46) {
                        if (filterPositivosDecimales(tempValue) === false) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return false;
                    }
                }
            });
    });

}

function noPermitirEscribirCaracteresFueraDelaRegExpNumerosPositivosNegativos(idInputs) {/// txtCaltitud , [0-9\.-]/g
    var idsArray = idInputs.split(',');
    $.each(idsArray, function (index, element) {
        $("#" + element.trim())
            .keypress(function (evt) {
                // Backspace = 8, Enter = 13, ‘0′ = 48, ‘9′ = 57, ‘.’ = 46, ‘-’ = 43
                var key = window.Event ? evt.which : evt.keyCode;
                var chark = String.fromCharCode(key);
                var tempValue = this.value + chark;
                if (key >= 48 && key <= 57) {
                    if (filterPosNegDecimales(tempValue) === false) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    if (key == 8 || key == 13 || key == 0) {
                        return true;
                    } else if (key == 46 || key == 45) {
                        if (filterPosNegDecimales(tempValue) === false) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return false;
                    }
                }
            });
    });

}

function filterPositivosDecimales(__val__) {
    var preg = /^([0-9]+\.?[0-9]{0,6})$/;
    if (preg.test(__val__) === true) {
        return true;
    } else {
        return false;
    }
}

function filterPosNegDecimales(__val__) {
    var preg = /^\-?\d*[.]?\d{0,6}$/;
    if (preg.test(__val__) === true) {
        return true;
    } else {
        return false;
    }
}

function verMensaje(title, content, type, textBtntryAgain, callbackTryAgain, callbackClose, textClose) {
    $.confirm({
        title: title,
        content: content,
        type: type,
        typeAnimated: true,
        buttons: {
            tryAgain: {
                text: textBtntryAgain,
                btnClass: 'btn-' + type,
                action: function () {
                    callbackTryAgain();
                }
            },
            close: {
                text: (textClose == null || textClose == "undefined") ? "Cerrar" : textClose,
                action: function () {
                    callbackClose();
                }
            }
        }
    });
}

function showMessage(title, content, type, textBtntryAgain, callbackTryAgain, callbackClose, textClose) {
    $.confirm({
        title: title,
        content: content,
        type: type,
        typeAnimated: true,
        buttons: {
            tryAgain: {
                text: textBtntryAgain,
                btnClass: 'btn-' + type,
                action: function () {
                    callbackTryAgain();
                }
            },
            close: {
                text: (textClose == null || textClose == "undefined") ? "Cerrar" : textClose,
                action: function () {
                    callbackClose();
                }
            }
        }
    });
}
//error-dialog dialog

function setTitlePage_Breadcrumb(title, array_ubicacion) {
    $("#nombrePagina").text(title);
    $("#nombrePagina_ubicacion").html('');
    if (array_ubicacion != null && array_ubicacion.length > 0) {
        let contenido_ubicacion = "";
        $.each(array_ubicacion, function (index, element) {
            let clase_active = "";
            let aria_current = ``;
            let nombre_link = `<a href="${element.link}">${element.nombre}</a>`;
            if ((array_ubicacion.length - 1) === index) {
                clase_active = "active";
                aria_current = `aria-current="page"`;
                nombre_link = element.nombre;
            }
            contenido_ubicacion += `<li class="breadcrumb-item ${clase_active}" ${aria_current}>${nombre_link}</li>`;
        });
        $("#nombrePagina_ubicacion").html(contenido_ubicacion)
    }
}

function loadingButton(id_button, texto) {
    $("#" + id_button).attr("disabled", "disabled");
    if (typeof texto == "undefined" || texto == null) {
        texto = "";
    }
    $("#" + id_button).html(`
         <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        ${texto}
    `);
}

function resetLoadingButton(id_button, content) {
    $("#" + id_button).removeAttr("disabled");
    $("#" + id_button).html(content);
}

function showLoader() {
    $('.loader').css("display", "block");
    $('#xp-container').css("display", "none");
}
function hideLoader() {
    $('.loader').css("display", "none");
    $('#xp-container').css("display", "block");
}

function isValidDate(s) {
    var separators = ['\\.', '\\-', '\\/'];
    var bits = s.split(new RegExp(separators.join('|'), 'g'));
    var d = new Date(bits[2], bits[1] - 1, bits[0]);
    return d.getFullYear() == bits[2] && d.getMonth() + 1 == bits[1];
}

function returnDate(s) {
    var separators = ['\\.', '\\-', '\\/'];
    var bits = s.split(new RegExp(separators.join('|'), 'g'));
    var d = new Date(bits[2], bits[1] - 1, bits[0]);
    return d;
    //return d.getFullYear() == bits[2] && d.getMonth() + 1 == bits[1];
}