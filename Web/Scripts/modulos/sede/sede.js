﻿var tablaDatos;
var cant_registros = 20;

$(document).ready(function () {
    $('#btnLoading').hide();

    $('.datapicker-here').datepicker({
        language: 'es',
        dateFormat: 'dd/mm/yyyy',
    })

    tablaDatos = $("#TablaDatos").DataTable({
        language: _languageDataTables,
        responsive: true,
        dom: "<'pull-left'Bf>rtip",
        searching: false,
        ordering: false,
        initComplete: function () {
        }
    });

    $('#btnBuscar').click(function () {
        loadingButton("btnBuscar", "Cargando...");
        Buscar(this);
    });

    $('#btnAgregar').click(function () {
        Crear();
    });
});

function Crear() {
    location.href = rutaPrincipal + "Sede/Agregar"
}


function Buscar(btnElement) {
    let content_button = `<i class="fa fa-search" aria-hidden="true"></i> Buscar`;
    try {
        var nombre_sede = $("#" + 'txtNombreSede').val();        

        if ($.fn.DataTable.isDataTable('#TablaDatos')) {
            tablaDatos.destroy();
        }

        tablaDatos = $("#TablaDatos").DataTable({
            language: _languageDataTables,
            "processing": true,
            "serverSide": true,
            ordering: false,
            responsive: true,
            searching: false,
            paging: true,
            fixedColumns: true,
            "ajax": {
                "url": rutaPrincipal + `Sede/Listar?nombre_sede=${nombre_sede}`,
                "type": "POST",
                "datatype": "json",
                "data": function (d) {
                    d.num_pagina = (d.length > 0) ? (d.start / d.length) + 1 : 1;
                    d.cant_registros = d.length;
                    pageNumber = d.pagina;
                    d.columns = null;
                    d.order = null;
                },               
                "dataSrc": function (data) {

                    if (data != null && data.data != null) {
                        $('#btnLoading').hide();
                        $(btnElement).show();
                        return data.data;

                    } else {
                        return [];
                    }
                },
                "error": function (xhr, textStatus) {
                    if ($.fn.DataTable.isDataTable('#TablaDatos')) {
                        tablaDatos.destroy();
                    }
                    tablaDatos = $("#TablaDatos").DataTable({
                        language: _languageDataTables,
                        responsive: true,
                        dom: "<'pull-left'Bf>rtip",
                        searching: false,
                        ordering: false,
                        initComplete: function () {
                        }
                    });
                    resetLoadingButton("btnBuscar", content_button);

                    var mensajeError = "Error al obtener los datos de las sedes.";
                    if (xhr.responseJSON != "undefined" && xhr.responseJSON != null) {
                        mensajeError = xhr.responseJSON.Message;
                    }
                    var colormensaje = 'red';
                    if (xhr.status == 404) {
                        colormensaje = 'orange';
                        mensajeError = "No se encontraron datos de las sedes.";
                    }
                    verMensaje('', mensajeError, colormensaje,
                        'Ok', function () { }, function () { });
                }
            },
            "columns": [
                { "data": "cod_sede" },
                { "data": "nombre_sede" },
                { "data": "presupuesto" }, 
                { "data": "numero_complejos" },
                { "data": "estado" },
                { "data": "fecha_actualizacion" },
                {
                    "data": "id_sede",
                    //"data": "username",
                    "render": function (data, type, full, meta) {

                        return '<button class="tabledit-edit-button btn btn-sm btn-info active"  onclick="editar(\'' + full.id_sede + '\')"><snap class="ti-pencil" style="float: none; margin: -16px;"></snap></button>  ';

                    }
                },
            ],
            initComplete: function () {
                resetLoadingButton("btnBuscar", content_button);
            }
        });
    } catch (e) {
        if ($.fn.DataTable.isDataTable('#TablaDatos')) {
            tablaDatos.destroy();
        }
        tablaDatos = $("#TablaDatos").DataTable({
            language: _languageDataTables,
            responsive: true,
            dom: "<'pull-left'Bf>rtip",
            searching: false,
            ordering: false,
            initComplete: function () {
            }
        });
        resetLoadingButton("btnBuscar", content_button);
        verMensaje('', "Error de la página al buscar las sedes", "red",
            'Ok', function () { }, function () { });
        console.error('Error buscar sede', e);
    }
}




function editar(id_sede) {
    location.href = `${rutaPrincipal}Sede/Editar/${id_sede}`;

}