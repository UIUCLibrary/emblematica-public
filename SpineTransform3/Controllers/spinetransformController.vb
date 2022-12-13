Imports System.Web.Mvc
Imports System.Xml
Imports System.Xml.Xsl
Imports System.Xml.XPath
Imports System.IO
Imports System.Text.RegularExpressions

Namespace Controllers
    Public Class spinetransformController
        Inherits Controller

        ' GET: spinetransform
        Function book(url As String) As ActionResult
            Dim xsltUrl As String = ""
            Dim metaXml As XPathDocument
            Dim myRegEx4url As String = "^https?:\/\/[A-Za-z]{1,20}\.library\.illinois\.edu\/[.\S]*\.xml$"
            Dim myXslt As New XslCompiledTransform()
            Dim myStream As New MemoryStream()
            Dim msArg As New XsltArgumentList
            Dim myResultString As String = ""

            xsltUrl = "http://" + Request.Url.Authority + "/spinetransform/Xslt/mods2html.xslt"
            myXslt.Load(xsltUrl)

            Dim regex As Regex = New Regex(myRegEx4url)
            Dim match As Match = regex.Match(url)
            If Not match.Success Then
                ViewData("html") = "<h2>Url failed.</h2>"
                Return View()
            End If

            Try
                metaXml = New XPathDocument(url)
            Catch ex As Exception
                ViewData("html") = "<h2>Failed to open XML file.</h2>"
                Return View()
            End Try

            Try
                myXslt.Transform(metaXml, msArg, myStream)
                myStream.Seek(0, SeekOrigin.Begin)
            Catch ex As Exception
                ViewData("html") = "<h2>Meta/XML Transform Failed.</h2>"
                Return View()
            End Try

            myResultString = New StreamReader(myStream).ReadToEnd()
            ViewData("html") = myResultString

            myStream.Close()

            Return View()

            'Response.Write(myResultString)
            'Return New EmptyResult()

        End Function

        Function emblem(url As String) As ActionResult
            Dim xsltUrl As String = ""
            Dim metaXml As XPathDocument
            Dim myRegEx4url As String = "^https?:\/\/[A-Za-z]{1,20}\.library\.illinois\.edu\/[.\S]*\.xml$"
            Dim myXslt As New XslCompiledTransform()
            Dim myStream As New MemoryStream()
            Dim msArg As New XsltArgumentList
            Dim myResultString As String = ""

            xsltUrl = "http://" + Request.Url.Authority + "/spinetransform/Xslt/emblem2html.xslt"
            myXslt.Load(xsltUrl)

            Dim regex As Regex = New Regex(myRegEx4url)
            Dim match As Match = regex.Match(url)
            If Not match.Success Then
                ViewData("html") = "<h2>Url failed.</h2>"
                Return View()
            End If

            Try
                metaXml = New XPathDocument(url)
            Catch ex As Exception
                ViewData("html") = "<h2>Failed to open XML file.</h2>"
                Return View()
            End Try

            Try
                myXslt.Transform(metaXml, msArg, myStream)
                myStream.Seek(0, SeekOrigin.Begin)
            Catch ex As Exception
                ViewData("html") = "<h2>Meta/XML Transform Failed.</h2>"
                Return View()
            End Try

            myResultString = New StreamReader(myStream).ReadToEnd()
            ViewData("html") = myResultString

            myStream.Close()

            Return View()

            'Response.Write(myResultString)
            'Return New EmptyResult()

        End Function

    End Class
End Namespace