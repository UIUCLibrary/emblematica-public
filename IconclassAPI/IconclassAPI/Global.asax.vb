Imports System.Web.Optimization
Imports AutoMapper

Public Class MvcApplication
    Inherits System.Web.HttpApplication

    Protected Sub Application_Start()
        AreaRegistration.RegisterAllAreas()
        FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters)
        RouteConfig.RegisterRoutes(RouteTable.Routes)

        Mapper.Initialize(Function(iconclass) iconclass.CreateMap(Of IconclassDetail, IconclassSummary)())
    End Sub
End Class
