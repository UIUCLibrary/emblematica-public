Imports System.Net
Imports Newtonsoft.Json.Linq

Public Class WebHelper
    Public Shared Function GetResource(url As String)
        Try
            Using webClient As New WebClient()
				webClient.Encoding = Encoding.UTF8
                Return webClient.DownloadString(url)
            End Using
        Catch exception As Exception
            Return Nothing
        End Try
    End Function
End Class
