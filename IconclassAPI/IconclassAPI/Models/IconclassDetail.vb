Imports Newtonsoft.Json
Imports AutoMapper

Public Class IconclassDetail
    Public Sub New(ByVal Notation As String, ByVal Labels As Dictionary(Of String, String), ByVal Ancestors As List(Of String), ByVal Children As List(Of String))
        Me.Notation = Notation
        Me.Labels = Labels
        Me.Ancestors = Ancestors
        Me.Children = Children
    End Sub


    <JsonProperty("n")>
    Public Property Notation As String

    <JsonProperty("txt")>
    Public Property Labels As Dictionary(Of String, String)

    <JsonProperty("p")>
    <IgnoreMap>
    Public Property Ancestors As List(Of String)

    <JsonProperty("c")>
    <IgnoreMap>
    Public Property Children As List(Of String)
End Class


Public Class Txt
    Public Property pl As String
    Public Property it As String
    Public Property pt As String
    Public Property nl As String
    Public Property de As String
    Public Property fi As String
    Public Property fr As String
    Public Property es As String
    Public Property jp As String
    Public Property en As String
    Public Property zh As String
End Class

Public Class Kw
    Public Property it As String()
    Public Property pt As String()
    Public Property nl As String()
    Public Property de As String()
    Public Property fi As String()
    Public Property fr As String()
    Public Property es As String()
    Public Property en As String()
End Class

Public Class Result
    Public Property c As List(Of String)
    Public Property txt As Dictionary(Of String, String)
    Public Property kw As Kw
    Public Property n As String
    Public Property p As List(Of String)
    Public Property r As String()
End Class

Public Class IconResults
    Public Property result As Result()
    Public Property requested As String()
End Class


Public Class SearchResults
    Public Property result As List(Of String)
    Public Property total As Integer
End Class


