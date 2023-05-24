var tablaDatos;
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
            //"processing": true,
            //"serverSide": true,
            ordering: false,
            responsive: true,
            searching: false,
            //paging: true,
            fixedColumns: true,
            "ajax": {
                "url": rutaPrincipal + `Sede/getAll?nombre_sede=${nombre_sede}&draw=0`,
                "type": "GET",
                "datatype": "json",
                "data": function (d) {
                    /*d.num_pagina = (d.length > 0) ? (d.start / d.length) + 1 : 1;                    
                    pageNumber = d.pagina;
                    d.columns = null;
                    d.order = null;*/
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
                { "data": "numero_complejos" },
                { "data": "presupuesto" },                 
                { "data": "estado" },
                { "data": "fecha_actualizacion" },
                {
                    "data": "id_sede",
                    //"data": "username",
                    "render": function (data, type, full, meta) {

                        return '<button class="tabledit-edit-button btn btn-sm btn-info active"  onclick="editar(\'' + full.id_sede + '\')"><snap class="ti-pencil" style="float: none; margin: -16px;"></snap></button>  ' +
                            '<button class="tabledit-edit-button btn btn-sm btn-danger active"  onclick="eliminar(\'' + full.id_sede + '\')"><snap class="ti-trash" style="float: none; margin: -16px;"></snap></button>  ';

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

function eliminar(id_sede) {
    verMensaje('', "¿Está seguro de eliminar la sede?", 'warning',
        'Sí', function () { eliminar_sede(id_sede) }, function () {  }, 'No');
}
function eliminar_sede(id_sede) {
    showLoader();
    $.ajax({
        url: rutaPrincipal + `Sede/deleteSede/${id_sede}`,
        method: 'POST',
        
        success: function (data, textStatus, xhr) {
            hideLoader();
            if (xhr.status == 200) {
                $('#btnBuscar').click();
                verMensaje('', "Se ha eliminado correctamente la sede", 'green',
                    'Ok', function () { }, function () { });

            } else {               
                verMensaje('', "No se pudo eliminar la sede.", 'orange',
                    'Ok', function () { }, function () { });
            }            
        },
        error: function (xhr, textStatus) {
            hideLoader();
            
            verMensaje('', "Error al eliminar la sede", 'red',
                'Ok', function () { }, function () { });            
        }

    });
}