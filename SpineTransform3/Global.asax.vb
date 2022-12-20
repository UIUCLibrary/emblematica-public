Imports System.Web.Mvc
Imports System.Web.Routing
Imports System.Xml
Imports System.Xml.Xsl
Imports System.Xml.XPath

Public Class MvcApplication
    Inherits System.Web.HttpApplication
	Public Shared Property XsltBook As New XslCompiledTransform()
    Public Shared Property XsltEmblem As New XslCompiledTransform()

    Protected Sub Application_Start()
        AreaRegistration.RegisterAllAreas()
        RouteConfig.RegisterRoutes(RouteTable.Routes)
        XsltBook.Load(Server.MapPath("~\Xslt\mods2html.xslt"))
        XsltEmblem.Load(Server.MapPath("~\Xslt\emblem2html.xslt"))		
    End Sub
End Class
