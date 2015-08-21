Imports System.Web.Http
Imports System.Web.Optimization
Imports SolrNet

Public Class WebApiApplication
    Inherits System.Web.HttpApplication

    Sub Application_Start()
        AreaRegistration.RegisterAllAreas()
        GlobalConfiguration.Configure(AddressOf WebApiConfig.Register)
        FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters)
        RouteConfig.RegisterRoutes(RouteTable.Routes)
        BundleConfig.RegisterBundles(BundleTable.Bundles)

        GlobalConfiguration.Configuration.Formatters.XmlFormatter.SupportedMediaTypes.Clear()
        Startup.Init(Of Book)("http://libstfgre35.ad.uillinois.edu:8888/solr/emblem_books")
        Startup.Init(Of Emblem)("http://libstfgre35.ad.uillinois.edu:8888/solr/emblems")
    End Sub
End Class
