

$(document).ready(function () {

    $("#btnRegistrar").click(function () {
        loadingButton("btnRegistrar", "Guardando...");
        Registrar();
    });

    $("#btnCancelar").click(function () {
        Cancelar();
    });
});

function Registrar() {
    let content_button = `<i class="mdi mdi-content-save" aria-hidden="true"></i> Registrar`;
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
            if (!(estado == 1 || estado == 0))  {
                resetLoadingButton("btnRegistrar", content_button);
                hideLoader();
                verMensaje('', "Selecciona un estado válido", 'orange',
                    'Ok', function () { }, function () { });
                return false;
            }
        }

        var datos = {
            estado: estado,
            nombre_sede: nombre_sede,
            num_complejos: num_complejos,
            presupuesto: presupuesto
        };

        $.ajax({
            url: rutaPrincipal + `Sede/RegistrarSede`,
            method: 'POST',
            data: datos,
            success: function (data, textStatus, xhr) {
                hideLoader();
                if (xhr.status == 201) {
                    verMensaje('', "Se ha agregado correctamente la sede", 'green',
                        'Ok', function () { location.href = `${rutaPrincipal}Sede/Editar/${data.id_sede}` }, function () { location.href = `${rutaPrincipal}Sede/Index` });

                } else {
                    var mensajeSuccessError = "No se pudo agregar la sede.";

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
                var mensajeError = "Error al registrar la sede.";
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
    verMensaje('', "¿Deseas cancelar el registro de la sede?", 'orange',
        'Si', function () { location.href = `${rutaPrincipal}Sede/Index` }, function () { }, 'No');
}

