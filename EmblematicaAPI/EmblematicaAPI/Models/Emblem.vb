Imports SolrNet.Attributes

Public Class Emblem
    <SolrUniqueKey("bookID")>
    Public Property BookID As String

    <SolrField("emblemID")>
    Public Property EmblemID As String

    <SolrField("display_motto")>
    Public Property Motto As String

    <SolrField("display_picturaURI")>
    Public Property PicturaURI As String

    <SolrField("xml")>
    Public Property SpineXML As String
End Class
