Dropzone.autoDiscover = false;
var dropzoneCargaRuta = null;
var tablaDatos;
var cant_registros = 10;
var _dataSelEstado = [{ estado: true, nombre: "Activo" }, { estado: false, nombre: "Inactivo" }];

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

    $("#btnEditarMaterial").click(function () {
        loadingButton("btnEditarMaterial", "Guardando...");
        EditarMaterial();
    });

    $("#btnCancelarMaterial").click(function () {
        CancelarMaterial();
    });

    iniciarDropzoneProcesoCarga();
    tablaDatos = $("#TablaDatos").DataTable({
        language: _languageDataTables,
        responsive: true,
        dom: "<'pull-left'Bf>rtip",
        searching: false,
        ordering: false,
        initComplete: function () {
        }
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

                if (_dataSelEstado != null) {
                    fillSelectPickerWithoutDefault('selEstado', _dataSelEstado, 'estado',
                        'nombre', 'Seleccione...');
                    restartSelectpicker('selEstado', '-1', { liveSearch: true, size: 2 });
                }

                $("#container_mail_group").hide();
                $("#container_area").hide();
                obtenerDatosMaterial();
            }
        },
        error: function (xhr, textStatus) {
            hideLoader();            
            let mensajeError = "Error al obtener los datos de los filtros.";
            if (xhr.responseJSON != "undefined" && xhr.responseJSON != null && xhr.responseJSON.Message != null) {
                mensajeError = xhr.responseJSON.Message;
            }
            var colormensaje = 'red';
            if (xhr.status == 404) {
                colormensaje = 'orange';
                mensajeError = "No se encontraron datos de los filtros.";
            }
            verMensaje('', mensajeError, colormensaje,
                'Ok', function () { }, function () { });
        }
    });
}


function obtenerDatosMaterial() {
    showLoader();
    $.ajax({
        url: `${rutaPrincipal}Material/GetDatosMaterial/${_id_materiales}`,
        method: 'GET',
        success: (function (data, textStatus, xhr) {
            if (xhr.status == 200) {
                $("#txtTitulo").val(data.data.titulo);
                $("#txtDescripcion").val(data.data.descripcion);

                let arrayMarcaSeleccionadas = [];

                $.each(data.data.dataMarca, function (index, element) {
                    if (element.codMarca != null && element.codMarca != "") {
                        arrayMarcaSeleccionadas.push(element.codMarca);
                    }
                });
                $("#selMarca").val(arrayMarcaSeleccionadas).trigger("change");

                if (data.data.cod_tipo_zona != null && data.data.cod_tipo_zona != "") {
                    $("#selTipoZona").val(data.data.cod_tipo_zona).trigger("change");
                }

                if (data.data.fechaInicio != null && data.data.fechaInicio != "") {
                    $("#txtFechaInicio").val(data.data.fechaInicio);
                }
                if (data.data.fechaFin != null && data.data.fechaFin != "") {
                    $("#txtFechaFin").val(data.data.fechaFin);
                }


                if (data.data.codigo_cobertura != null && data.data.codigo_cobertura != "") {
                    if (data.data.codigo_cobertura == "COB_MAILGROUP") {
                        $("#rbMailgroup").prop("checked", true);
                        $("#container_area").hide();
                        $("#container_mail_group").show();
                        let arrayMailgroupSeleccionadas = [];

                        $.each(data.data.dataMailGroup, function (index, element) {
                            if (element.cod_mailgroup != null && element.cod_mailgroup != "") {
                                arrayMailgroupSeleccionadas.push(element.cod_mailgroup);
                            }
                        });
                        $("#selMailGroup").val(arrayMailgroupSeleccionadas).trigger("change");
                    } else if (data.data.codigo_cobertura == "COB_AREA") {
                        $("#rdArea").prop("checked", true);
                        $("#container_mail_group").hide();
                        $("#container_area").show();
                        let arrayAreaSeleccionadas = [];

                        $.each(data.data.dataArea, function (index, element) {
                            if (element.cod_area != null && element.cod_area != "") {
                                arrayAreaSeleccionadas.push(element.cod_area);
                            }
                        });
                        $("#selArea").val(arrayAreaSeleccionadas).trigger("change");
                    }
                }

                let arrayZonaSeleccionadas = [];

                $.each(data.data.dataZonas, function (index, element) {
                    if (element.cod_zona != null && element.cod_zona != "") {
                        arrayZonaSeleccionadas.push(element.cod_zona);
                    }
                });
                $("#selZona").val(arrayZonaSeleccionadas).trigger("change");


                let arrayTipoRolSeleccionadas = [];

                $.each(data.data.dataRol, function (index, element) {
                    if (element.cod_rol != null && element.cod_rol != "") {
                        arrayTipoRolSeleccionadas.push(element.cod_rol);
                    }
                });
                $("#selTipoRol").val(arrayTipoRolSeleccionadas).trigger("change");

                $("#selEstado").val(data.data.estado.toString()).trigger("change");

                ListarArchivos(data.data.dataArchivos);
            } else {
                var mensajeError = "No se pudo obtener los datos del material";
                if (xhr.responseJSON != "undefined" && xhr.responseJSON != null) {
                    mensajeError = xhr.responseJSON.Message;
                }
                verMensaje('', mensajeError, 'red',
                    'Ok', function () { location.href = `${rutaPrincipal}Material/Material` }, function () { location.href = `${rutaPrincipal}Material/Material` });

            }
            hideLoader();
        }),
        error: function (xhr, textStatus) {
            hideLoader();
            var mensajeError = "Error al obtener los datos del material.";
            if (xhr.responseJSON != "undefined" && xhr.responseJSON != null && xhr.responseJSON.Message != null) {
                mensajeError = xhr.responseJSON.Message;
            }
            var colormensaje = 'red';
            if (xhr.status == 404) {
                colormensaje = 'orange';
                mensajeError = "No se encontraron datos del material.";
            }
            verMensaje('', mensajeError, colormensaje,
                'Ok', function () { location.href = `${rutaPrincipal}Material/Material` }, function () { location.href = `${rutaPrincipal}Material/Material` });
        }
    });
}

function EditarMaterial() {
    let content_button = `<i class="mdi mdi-content-save" aria-hidden="true"></i> Guardar`;
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

        let _estado = $("#selEstado").val();

        if (typeof _estado == "undefined" || _estado == null || _estado == "") {
            _estado = true;
        }

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
            listaMarca: variableFinalArregloMarca,
            estado: _estado
        };


        $.ajax({
            url: rutaPrincipal + `Material/EditarMaterial/${_id_materiales}`,
            method: 'POST',
            data: datos,
            success: function (data, textStatus, xhr) {
                hideLoader();
                if (xhr.status == 200) {
                    obtenerDatosMaterial();
                    verMensaje('', "Se ha editado correctamente el material", 'green',
                        'Ok', function () { }, function () { });

                } else {
                    var mensajeSuccessError = "No se pudo editar el material.";

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
                resetLoadingButton("btnEditarMaterial", content_button);
            },
            error: function (xhr, textStatus) {
                hideLoader();
                var mensajeError = "Error al editar el material.";
                var colormensaje = 'red';
                if (xhr.responseJSON != "undefined" && xhr.responseJSON != null) {
                    mensajeError = xhr.responseJSON.Message.replaceAll("||", " ");
                } else {
                    if (xhr.status == 400) {
                        mensajeError = "Debe agregar los datos obligatorios.";
                        colormensaje = 'orange';
                    }
                    if (xhr.status == 404) {
                        mensajeError = "No se encontró el material a editar.";
                        colormensaje = 'orange';
                    }
                }
                
                
                verMensaje('', mensajeError, 'red',
                    'Ok', function () { }, function () { });
                resetLoadingButton("btnEditarMaterial", content_button);
            }

        });
    } catch (e) {
        hideLoader();
        resetLoadingButton("btnEditarMaterial", content_button);
        verMensaje('', "Error de la página al guardar los datos del material", 'red',
            'Ok', function () { }, function () { });
        console.error('Error editar el material', e);
    }
}



function CancelarMaterial() {
    verMensaje('', "¿Deseas cancelar la edición del material?", 'orange',
        'Si', function () { location.href = `${rutaPrincipal}Material/Material` }, function () { }, 'No');
}


function ListarArchivos(dataArchivos) {
    if ($.fn.DataTable.isDataTable('#TablaDatos')) {
        tablaDatos.destroy();
    }

    tablaDatos = $("#TablaDatos").DataTable({
        language: _languageDataTables,      
        ordering: false,
        responsive: true,
        searching: false,
        paging: false,
        fixedColumns: false,
        data: dataArchivos,
        "columns": [
            { "data": "fecha_archivo" },
            {
                "data": "url_archivo",
                "render": function (data, type, full, meta) {
                    return `
                            <button type="button" class="btn btn-round btn-outline-primary" onclick="window.open('${full.url_archivo}')"><i class="mdi mdi-download"></i></button>
                            <button type="button" class="btn btn-round btn-outline-danger" onclick="eliminarArchivo_advertencia('${full.id_materiales_archivo}')" id="btnEliminacionArchivo${full.id_materiales_archivo}"><i class="mdi mdi-delete-sweep"></i></button>`;

                }
            },
        ],
        initComplete: function () {

        }
    });
}

function iniciarDropzoneProcesoCarga() {
    var cantMaxFiles = 1;
    var optionsDropzoneProcesoCarga = {
        dictDefaultMessage: 'Arrastre los archivos aquí para subirlos',
        dictMaxFilesExceeded: "No puede cargar más de " + cantMaxFiles + " archivo(s).",
        paramName: "file", // The name that will be used to transfer the file
        maxFilesize: 20, // MB
        dictFileTooBig: "El archivo no debe pesar más de 20MB.",
        maxFiles: cantMaxFiles,
        error: function (file, message) {
            verMensaje('', message, 'red', 'Ok', function () { }, function () { });
            this.removeFile(file);
        },
        addRemoveLinks: true,
        dictRemoveFile: "Eliminar",
        //parallelUploads: 1,
        //uploadMultiple: false,
        autoProcessQueue: false,
        acceptedFiles: 'application/pdf,' +
            'audio/aac,audio/midi,audio/ogg,audio/x-wav,audio/webm,audio/x-aiff,audio/mpeg,audio/mp4,application/ogg,' +
            'image/jpeg,image/png,image/tiff,image/gif,image/svg+xml',
        dictInvalidFileType: 'Solo se pueden cargar imágenes, PDFs y audios.',
        init: function () {
            iniciarDropzoneProcesoCarga_ActionButton(this);
        },
        success: function (file, data) {
            hideLoader();
            $("#btnProcesoCarga").removeAttr('disabled').text('Cargar archivo');
            this.removeAllFiles();
            let mensajeExito = "Se cargó el documento correctamente";
            if (data != null && typeof data.Message != "undefined") {
                mensajeExito = data.Message;
            }
            obtenerDatosMaterial();
            verMensaje('', mensajeExito, 'green',
                'Ok', function () {  }, function () { });
        },
        error: function (a, b, c) {
            hideLoader();
            $("#btnProcesoCarga").removeAttr('disabled').text('Cargar archivo');
            this.removeAllFiles();
        }        
    };
    dropzoneCargaRuta = new Dropzone("#frmProcesoCargaDropzone", optionsDropzoneProcesoCarga);
}

function iniciarDropzoneProcesoCarga_ActionButton(myDropzone) {
    var submitButton = document.querySelector("#btnProcesoCarga");
    submitButton.addEventListener("click", function () {
        if (dropzoneCargaRuta.files.length > 0) {
            showLoader();
            $(this).text('Enviando...');
            $(this).attr('disabled', true);

            myDropzone.options.url = `${rutaPrincipal}Material/RegistrarArchivoMaterial/${_id_materiales}`;
            myDropzone.processQueue(); // Tell Dropzone to process all queued files.


        } else {
            $("#btnProcesoCarga").removeAttr('disabled').text('Cargar archivo');
            showMessage('', 'Debe cargar un archivo.', 'orange', 'Ok', function () { }, function () { });
        }
    });
}

function eliminarArchivo_advertencia(id_materiales_archivo) {
    verMensaje('', "¿Está seguro de eliminar el archivo del material?", 'orange',
        'Sí', function () { eliminarArchivo(id_materiales_archivo) }, function () { }, 'No');
}

function eliminarArchivo(id_materiales_archivo) {
    let content_button = `<i class="mdi mdi-delete-sweep"></i>`;
    try {
        showLoader();        

        $.ajax({
            url: rutaPrincipal + `Material/EliminacionMaterial/${id_materiales_archivo}`,
            method: 'GET',
            success: function (data, textStatus, xhr) {
                hideLoader();
                if (xhr.status == 200) {
                    obtenerDatosMaterial();
                    verMensaje('', "Se ha eliminado correctamente el archivo", 'green',
                        'Ok', function () { }, function () { });

                } else {
                    var mensajeSuccessError = "No se pudo editar el material.";

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
                resetLoadingButton(`btnEliminacionArchivo${id_materiales_archivo}`, content_button);
            },
            error: function (xhr, textStatus) {
                hideLoader();
                var mensajeError = "Error al editar el material.";
                if (xhr.responseJSON != "undefined" && xhr.responseJSON != null) {
                    mensajeError = xhr.responseJSON.Message.replaceAll("||", " ");
                } else {
                    if (xhr.status == 400) {
                        mensajeError = "Debe agregar los datos obligatorios.";
                    }
                }
                verMensaje('', mensajeError, 'red',
                    'Ok', function () { }, function () { });
                resetLoadingButton(`btnEliminacionArchivo${id_materiales_archivo}`, content_button);
            }

        });
    } catch (e) {
        hideLoader();
        resetLoadingButton(`btnEliminacionArchivo${id_materiales_archivo}`, content_button);
        verMensaje('', "Error de la página al eliminar el archivo del material", 'red',
            'Ok', function () { }, function () { });
        console.error('Error eliminar archivo del material', e);
    }
}