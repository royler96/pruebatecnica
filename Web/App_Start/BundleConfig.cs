using Brotli.Bundle;
using System.Web;
using System.Web.Optimization;

namespace Web
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Utilice la versión de desarrollo de Modernizr para desarrollar y obtener información sobre los formularios. De este modo, estará
            // para la producción, use la herramienta de compilación disponible en https://modernizr.com para seleccionar solo las pruebas que necesite.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new BrotliStyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap/css/bootstrap.min.css",
                      "~/Content/bootstrap/css/icons.css",
                       "~/Content/bootstrap/css/style.css"));

            bundles.Add(new BrotliStyleBundle("~/Content/plugins/select2_libreria").Include(
                     "~/Content/plugins/select2/select2.min.css"));

            bundles.Add(new BrotliStyleBundle("~/Content/datatable_libreria").Include(
                     "~/Content/datatables/dataTables.bootstrap4.min.css",
                      "~/Content/datatables/buttons.bootstrap4.min.css"
                      ));

            bundles.Add(new BrotliStyleBundle("~/Content/responsive/datatable_libreria").Include(
                       "~/Content/datatables/responsive.bootstrap4.min.css"
                       ));

            bundles.Add(new BrotliScriptBundle("~/bundles/bootstrap/end").Include(
                    "~/Scripts/modulos/Configuration.js",
                    "~/Scripts/modulos/MetodosGenerico.js"
                      ));

            bundles.Add(new BrotliScriptBundle("~/bundles/general").Include(
                "~/Scripts/bootstrap/jquery.min.js",
                "~/Scripts/bootstrap/popper.min.js",
               "~/Scripts/bootstrap/bootstrap.min.js",
               "~/Scripts/bootstrap/modernizr.min.js",
               "~/Scripts/bootstrap/detect.js",
               "~/Scripts/bootstrap/jquery.slimscroll.js",
               "~/Scripts/bootstrap/sidebar-menu.js"));

            bundles.Add(new BrotliScriptBundle("~/bundles/main").Include(
              "~/Scripts/bootstrap/main.js"));

            bundles.Add(new BrotliScriptBundle("~/bundles/datatable_libreria").Include(
              "~/Scripts/datatables/jquery.dataTables.min.js",
              "~/Scripts/datatables/dataTables.bootstrap4.min.js"
              ));

            bundles.Add(new BrotliScriptBundle("~/bundles/select2_libreria").Include(
              "~/Scripts/bootstrap/plugins/select2/select2.min.js"
              ));

            bundles.Add(new BrotliScriptBundle("~/bundles/boostrap/select2_libreria").Include(
              "~/Scripts/bootstrap/plugins/bootstrap-tagsinput/bootstrap-tagsinput.min.js",
              "~/Scripts/bootstrap/plugins/bootstrap-tagsinput/typeahead.bundle.js"
              ));

            bundles.Add(new BrotliScriptBundle("~/bundles/buttons/datatable_libreria").Include(
           "~/Scripts/datatables/dataTables.buttons.min.js",
           "~/Scripts/datatables/buttons.bootstrap4.min.js",
            "~/Scripts/datatables/jszip.min.js",
           "~/Scripts/datatables/pdfmake.min.js",
            "~/Scripts/datatables/vfs_fonts.js",
           "~/Scripts/datatables/buttons.html5.min.js",
            "~/Scripts/datatables/buttons.print.min.js",
           "~/Scripts/datatables/buttons.colVis.min.js"
           ));

            bundles.Add(new BrotliScriptBundle("~/bundles/responsive/datatable_libreria").Include(
              "~/Scripts/datatables/dataTables.responsive.min.js",
              "~/Scripts/datatables/responsive.bootstrap4.min.js"
              ));

            bundles.Add(new BrotliScriptBundle("~/bundles/init/datatable_libreria").Include(
            "~/Scripts/datatables/table-datatable-init.js"
            ));

            bundles.Add(new BrotliStyleBundle("~/Content/datepicker_libreria").Include(
                         "~/Content/plugins/datepicker/datepicker.min.css"));

            bundles.Add(new BrotliScriptBundle("~/bundles/datepicker_libreria").Include(
              "~/Scripts/bootstrap/plugins/datepicker/datepicker.min.js",
              "~/Scripts/bootstrap/plugins/datepicker/i18n/datepicker.es.js"
              ));

            bundles.Add(new BrotliScriptBundle("~/bundles/jquery-confirm").Include(
           "~/Scripts/alert/jquery-confirm.min.js"
           ));

            bundles.Add(new BrotliStyleBundle("~/Content/alerts").Include(
                         "~/Content/alerts/jquery-confirm.css"));


            bundles.Add(new BrotliStyleBundle("~/Content/estilo/general/Master").Include(
                "~/Content/bootstrap/css/bootstrap.min.css",
                "~/Content/bootstrap/css/icons.min.css",
                "~/Content/bootstrap/css/style.min.css",//tiene rutas //casi hecho
                "~/Content/alerts/jquery-confirm.min.css"
                ));

            bundles.Add(new BrotliScriptBundle("~/bundles/scripts/general/Master").Include(
           "~/Scripts/bootstrap/jquery.min.js",
           "~/Scripts/bootstrap/popper.min.js",
           "~/Scripts/bootstrap/bootstrap.min.js",
            "~/Scripts/bootstrap/modernizr.min.js",
            "~/Scripts/bootstrap/detect.js",
            "~/Scripts/bootstrap/jquery.slimscroll.min.js",
            "~/Scripts/bootstrap/sidebar-menu.min.js"

           ));

            bundles.Add(new BrotliScriptBundle("~/bundles/scripts/general/Master/main").Include(
           "~/Scripts/bootstrap/main.min.js",
           "~/Scripts/modulos/Configuration.min.js",
           "~/Scripts/modulos/MetodosGenerico.min.js",
           "~/Scripts/alert/jquery-confirm.min.js"
           ));

            bundles.UseCdn = true;
            bundles.Add(new BrotliStyleBundle("~/Content/fuente/poppins",
                                         "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700"));

            bundles.Add(new BrotliScriptBundle("~/bundles/sede").Include(
            "~/Scripts/modulos/sede/sede.js"
            ));
            bundles.Add(new BrotliScriptBundle("~/bundles/agregarsede").Include(
            "~/Scripts/modulos/sede/agregarsede.js"
            ));
            bundles.Add(new BrotliScriptBundle("~/bundles/editarsede").Include(
            "~/Scripts/modulos/sede/editarsede.js"
            ));

            BundleTable.EnableOptimizations = true;

        }
    }
}
