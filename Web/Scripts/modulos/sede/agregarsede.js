

$(document).ready(function () {

    MostrarTipoMateriales();
    $('#selMarca').select2();
    $('#selMailGroup').select2();

    $('#selArea').select2();

    $('#selZona').select2();

    $('#selTipoRol').select2();

    $('#selTipoZona').select2();
    $('.datapicker-here').datepicker({
        language: 'es',
        dateFormat: 'dd/mm/yyyy',
    });
    $("input[name=rb_cobertura]").change(function () {
        let valor_rb = $(this).val();
        if (valor_rb == "COB_MAILGROUP") {
            $("#container_area").hide();
            $("#container_mail_group").show();
        } else if (valor_rb == "COB_AREA") {
            $("#container_mail_group").hide();
            $("#container_area").show();
        } else {
            $("#container_mail_group").hide();
            $("#container_area").hide();
        }
    });

    $("#btnRegistrarMaterial").click(function () {
        loadingButton("btnRegistrarMaterial", "Guardando...");
        RegistrarMaterial();
    });

    $("#btnCancelarMaterial").click(function () {
        CancelarMaterial();
    });
});

function MostrarTipoMateriales() {
    showLoader();

    let cod_marca = "selMarca";
    cargandoSelect(cod_marca);
    
    let cod_mailgroup = "selMailGroup";
    cargandoSelect(cod_mailgroup);

    let cod_zona = "selZona";
    cargandoSelect(cod_zona);

    let cod_area = "selArea";
    cargandoSelect(cod_area);

    let cod_rol = "selTipoRol";
    cargandoSelect(cod_rol);

    let cod_tipo_zona = "selTipoZona";
    cargandoSelect(cod_tipo_zona);

    $.ajax({
        type: "GET",
        url: rutaPrincipal + "Material/ListadoFiltros",
        success: function (data, textStatus, xhr) {
            if (xhr.status == 200) {
                if (data.listaMailgroup != null) {
                    fillSelectPickerWithoutDefault(cod_mailgroup, data.listaMailgroup, 'cod_mailgroup',
                        'nombre_mailgroup', 'Seleccione...');
                    restartSelectpicker(cod_mailgroup, '-1', { liveSearch: true, size: 7 });
                }
                if (data.listaZona != null) {
                    fillSelectPickerWithoutDefault(cod_zona, data.listaZona, 'cod_zona',
                        'nombre_zona', 'Seleccione...');
                      restartSelectpicker(cod_zona, '-1', { liveSearch: true, size: 7 });
                }
                if (data.listaArea != null) {
                    fillSelectPickerWithoutDefault(cod_area, data.listaArea, 'cod_area',
                        'nombre_area', 'Seleccione...');
                     restartSelectpicker(cod_area, '-1', { liveSearch: true, size: 7 });
                }
                if (data.listaRol != null) {
                    fillSelectPickerWithoutDefault(cod_rol, data.listaRol, 'cod_rol',
                        'nombre_rol', 'Seleccione...');
                     restartSelectpicker(cod_rol, '-1', { liveSearch: true, size: 7 });
                }
                if (data.listaTipoZona != null) {
                    fillSelectPickerWithoutDefault(cod_tipo_zona, data.listaTipoZona, 'cod_tipo_zona',
                        'nombre_tipo_zona', 'Seleccione...');
                    restartSelectpicker(cod_tipo_zona, '-1', { liveSearch: true, size: 7 });
                }
                if (data.listaMarca != null) {
                    fillSelectPickerWithoutDefault(cod_marca, data.listaMarca, 'cod_empresa',
                        'nombre_empresa', 'Seleccione...');
                    restartSelectpicker(cod_marca, '-1', { liveSearch: true, size: 7 });
                }
                $("#container_mail_group").hide();
                $("#container_area").hide();
            }
            hideLoader();
        },
        error: function (xhr, textStatus) {
            hideLoader();           
            verMensaje('', xhr.responseJSON.Message, 'red',
                'Ok', function () { }, function () { });
        }
    });
}

function RegistrarMaterial() {
    let content_button = `<i class="mdi mdi-content-save" aria-hidden="true"></i> Registrar`;
    try {
        showLoader();
        let _listaMarca = $("#selMarca").val();
        let _codCobertura = $("input[name=rb_cobertura]:checked").val();
        let _codTipoZona = $("#selTipoZona").val();

        let _fechaInicio = $("#txtFechaInicio").val();
        let _fechaFin = $("#txtFechaFin").val();
        let _listaRoles = $("#selTipoRol").val();
        if (_fechaInicio != null && _fechaInicio != "" && _fechaFin != null && _fechaFin != "") {
            if (returnDate(_fechaInicio) > returnDate(_fechaFin)) {
                resetLoadingButton("btnEditarMaterial", content_button);
                hideLoader();
                verMensaje('', "La fecha de inicio debe ser menor a la fecha fin", 'orange',
                    'Ok', function () { }, function () { });
                return false;
            }
        }
        

        let _listaAreaMailgroup = $("#selMailGroup").val();
        let _listaArea = $("#selArea").val();
        let _listaZona = $("#selZona").val();

        let _titulo = $("#txtTitulo").val();
        let _descripcion = $("#txtDescripcion").val();

        if (typeof _codTipoZona == "undefined" || _codTipoZona == null || _codTipoZona == "") {
            _codTipoZona = "";
        }
        let variableFinalArregloArea = [];
        let variableFinalArregloMailGroup = [];
        if (typeof _codCobertura != "undefined" && _codCobertura != null && _codCobertura != "") {
            if (_codCobertura == "COB_MAILGROUP") {
                if (_listaAreaMailgroup != null) {
                    _listaAreaMailgroup.forEach(element => {
                        variableFinalArregloMailGroup.push({ codMailgroup: element });
                    });
                }
            } else if (_codCobertura == "COB_AREA") {
                if (_listaArea != null) {
                    _listaArea.forEach(element => {
                        variableFinalArregloArea.push({ codArea: element });
                    });
                }
            }
        } else {
            _codCobertura = "";
        }

        let variableFinalArregloZona = [];
        if (_listaZona != null) {
            _listaZona.forEach(element => {
                variableFinalArregloZona.push({ codZona: element });
            });
        }

        
        let variableFinalArregloRol = [];
        _listaRoles.forEach(element => {
            variableFinalArregloRol.push({ codRol: element });
        });

        let variableFinalArregloMarca = [];
        if (_listaMarca != null) {
            _listaMarca.forEach(element => {
                variableFinalArregloMarca.push({ codMarca: element });
            });
        }

        var datos = {
            codCobertura: _codCobertura,
            listaMailgroup: variableFinalArregloMailGroup,
            listaAreas: variableFinalArregloArea,
            listaZonas: variableFinalArregloZona,
            listaRoles: variableFinalArregloRol,
            codTipoZona: _codTipoZona,
            titulo: _titulo,
            descripcion: _descripcion,
            fechaInicio: _fechaInicio,
            fechaFin: _fechaFin,
            listaMarca: variableFinalArregloMarca
        };


        $.ajax({
            url: rutaPrincipal + `Material/RegistrarMaterial`,
            method: 'POST',
            data: datos,
            success: function (data, textStatus, xhr) {
                hideLoader();
                if (xhr.status == 201) {
                    verMensaje('', "Se ha agregado correctamente el material", 'green',
                        'Ok', function () { location.href = `${rutaPrincipal}Material/EditarMaterial/${data.idMaterial}` }, function () { location.href = `${rutaPrincipal}Material/Material` });

                } else {
                    var mensajeSuccessError = "No se pudo agregar el material.";

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
                resetLoadingButton("btnRegistrarMaterial", content_button);
            },
            error: function (xhr, textStatus) {
                hideLoader();
                var mensajeError = "Error al registrar el material.";
                if (xhr.responseJSON != "undefined" && xhr.responseJSON != null) {
                    mensajeError = xhr.responseJSON.Message.replaceAll("||", " ");
                } else {
                    if (xhr.status == 400) {
                        mensajeError = "Debe agregar los datos obligatorios.";
                    }
                }
                verMensaje('', mensajeError, 'red',
                    'Ok', function () { }, function () { });
                resetLoadingButton("btnRegistrarMaterial", content_button);
            }

        });
    } catch (e) {
        hideLoader();
        resetLoadingButton("btnRegistrarMaterial", content_button);
        verMensaje('', "Error de la página al guardar los datos del material", 'red',
            'Ok', function () { }, function () { });
        console.error('Error registrar el material', e);
    }
}


function CancelarMaterial() {
    verMensaje('', "¿Deseas cancelar el registro del material?", 'orange',
        'Si', function () { location.href = `${rutaPrincipal}Material/Material` }, function () { }, 'No');
}

