Public Class XmlTargetUrlValidator

    Public Shared Function Validate(raw_url As String) As Boolean

        ' We might want to refactor this so this exception isn't 
        ' handled here but handled higher up for 
        ' more detailed error messages...

        Dim url As Uri
        Try
            url = New Uri(raw_url)
        Catch ex As System.UriFormatException
            Return False
        End Try


        Dim uiucLibraryHostname As String = ".library.illinois.edu"

        Dim hostname As String = url.Host

        Dim is_valid As Boolean = hostname.ToLower().Equals("library.illinois.edu") _
                                     OrElse (hostname.EndsWith(uiucLibraryHostname) _
                                            AndAlso hostname.EndsWith(".xml"))

        Return is_valid

    End Function


End Class
