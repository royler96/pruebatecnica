

$(document).ready(function () {
    Detalle();
    $("#btnRegistrar").click(function () {
        loadingButton("btnRegistrar", "Guardando...");
        Registrar();
    });

    $("#btnCancelar").click(function () {
        Cancelar();
    });
});

function Registrar() {
    let content_button = `<i class="mdi mdi-content-save" aria-hidden="true"></i> Guardar`;
    try {
        showLoader();
        let nombre_sede = $("#txtNombreSede").val();
        let num_complejos = $("#txtNumComplejos").val();
        let presupuesto = $("#txtPresupuesto").val();
        let estado = $("#selEstado").val();

        if (nombre_sede == null || nombre_sede.trim() == '') {
            resetLoadingButton("btnRegistrar", content_button);
            hideLoader();
            verMensaje('', "El nombre de la sede es obligatorio", 'orange',
                'Ok', function () { }, function () { });
            return false;
        }

        if (num_complejos == null || num_complejos <= 0) {
            resetLoadingButton("btnRegistrar", content_button);
            hideLoader();
            verMensaje('', "Debe ingresar un numero de complejo válido", 'orange',
                'Ok', function () { }, function () { });
            return false;
        }

        if (presupuesto == null || presupuesto <= 0) {
            resetLoadingButton("btnRegistrar", content_button);
            hideLoader();
            verMensaje('', "Debe ingresar un presupuesto válido", 'orange',
                'Ok', function () { }, function () { });
            return false;
        }

        if (estado == null || estado <= -1) {
            resetLoadingButton("btnRegistrar", content_button);
            hideLoader();
            verMensaje('', "Selecciona un estado", 'orange',
                'Ok', function () { }, function () { });
            return false;
        } else {
            if (!(estado == 1 || estado == 0)) {
                resetLoadingButton("btnRegistrar", content_button);
                hideLoader();
                verMensaje('', "Selecciona un estado válido", 'orange',
                    'Ok', function () { }, function () { });
                return false;
            }
        }

        var datos = {
            estado: estado == 1 ? true : false,
            nombre_sede: nombre_sede,
            numero_complejos: parseInt(num_complejos),
            presupuesto: presupuesto
        };

        $.ajax({
            url: rutaPrincipal + `Sede/putSede${_id}`,
            method: 'PUT',
            data: datos,
            success: function (data, textStatus, xhr) {
                hideLoader();
                if (xhr.status == 201) {
                    verMensaje('', "Se ha editado correctamente la sede", 'green',
                        'Ok', function () { location.href = `${rutaPrincipal}Sede/Editar/${data.id_sede}` }, function () { location.href = `${rutaPrincipal}Sede/Index` });

                } else {
                    var mensajeSuccessError = "No se pudo editar la sede.";

                    if (xhr.responseJSON != "undefined" && xhr.responseJSON != null) {
                        mensajeError = xhr.responseJSON.Message.replaceAll("||", " ");
                    } else {
                        if (xhr.status == 400) {
                            mensajeError = "Debe agregar los datos obligatorios.";
                        }
                    }
                    verMensaje('', mensajeSuccessError, 'orange',
                        'Ok', function () { }, function () { });
                }
                resetLoadingButton("btnRegistrar", content_button);
            },
            error: function (xhr, textStatus) {
                hideLoader();
                var mensajeError = "Error al editar la sede.";
                if (xhr.responseJSON != "undefined" && xhr.responseJSON != null) {
                    mensajeError = xhr.responseJSON.Message.replaceAll("||", " ");
                } else {
                    if (xhr.status == 400) {
                        mensajeError = "Debe agregar los datos obligatorios.";
                    }
                }
                verMensaje('', mensajeError, 'red',
                    'Ok', function () { }, function () { });
                resetLoadingButton("btnRegistrar", content_button);
            }

        });
    } catch (e) {
        hideLoader();
        resetLoadingButton("btnRegistrar", content_button);
        verMensaje('', "Error de la página al guardar los datos de la sede", 'red',
            'Ok', function () { }, function () { });
        console.error('Error registrar la sede', e);
    }
}


function Cancelar() {
    verMensaje('', "¿Deseas cancelar la edición de la sede?", 'orange',
        'Si', function () { location.href = `${rutaPrincipal}Sede/Index` }, function () { }, 'No');
}


function Detalle() {    
    try {
        showLoader();
       console.log(111)
        $.ajax({
            url: rutaPrincipal + `Sede/Detalle/${_id}`,
            method: 'GET',            
            success: function (data, textStatus, xhr) {
                hideLoader();
                console.log('data.data.nombre_sede', data.data.data.nombre_sede)
                $("#txtNombreSede").val(data.data.data.nombre_sede);
                $("#txtNumComplejos").val(data.data.data.numero_complejos);
                $("#txtPresupuesto").val(data.data.data.presupuesto);
                $("#selEstado").val(data.data.data.estado === true ? 1 : 0);
            },
            error: function (xhr, textStatus) {
                hideLoader();

                verMensaje('', "No se pudo recuperar los datos de la sede", 'orange',
                    'Ok', function () { location.href = `${rutaPrincipal}Sede/Index` }, function () { location.href = `${rutaPrincipal}Sede/Index` });
            }            

        });
    } catch (e) {
        hideLoader();

        verMensaje('', "No se pudo recuperar los datos de la sede", 'orange',
            'Ok', function () { location.href = `${rutaPrincipal}Sede/Index` }, function () { location.href = `${rutaPrincipal}Sede/Index` });
    }
}

