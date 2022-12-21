Imports System.Web.Mvc
Imports System.Xml
Imports System.Xml.Xsl
Imports System.Xml.XPath
Imports System.IO

Namespace Controllers
    Public Class spinetransformController
        Inherits Controller

        ' Checked, and the two functions only differ by
        ' the xslt file. Trying to help avoid copy and paste 
        ' mistakes down the road
        Private Function myTransform(xslt As XslCompiledTransform, url As String) As String

            Dim metaXml As XPathDocument
            Dim myStream As New MemoryStream()
            Dim msArg As New XsltArgumentList
            Dim myResultString As String = ""

            If Not XmlTargetUrlValidator.Validate(url) Then
                Return "<h2>Url failed.</h2>"
            End If

            Try
                metaXml = New XPathDocument(url)
            Catch ex As Exception
                Return "<h2>Failed to open XML file.</h2>"
            End Try

            Try
                xslt.Transform(metaXml, msArg, myStream)
                myStream.Seek(0, SeekOrigin.Begin)
            Catch ex As Exception
                Return "<h2>Meta/XML Transform Failed.</h2>"
            End Try

            myResultString = New StreamReader(myStream).ReadToEnd()

            Return myResultString

        End Function

        Function book(url As String) As ActionResult

            ViewData("html") = myTransform(MvcApplication.XsltBook, url)
            Return View()

        End Function

        Function emblem(url As String) As ActionResult

            ViewData("html") = myTransform(MvcApplication.XsltEmblem, url)
            Return View()

        End Function

    End Class
End Namespace
