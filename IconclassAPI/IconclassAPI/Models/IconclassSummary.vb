Imports Newtonsoft.Json

Public Class IconclassSummary
    <JsonProperty("n")>
    Public Property Notation As String

    <JsonProperty("txt")>
    Public Property Labels As Dictionary(Of String, String)
End Class
