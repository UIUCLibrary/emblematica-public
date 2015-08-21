Imports SolrNet.Attributes

Public Class Book
    <SolrUniqueKey("bookID")>
    Public Property BookID As String

    <SolrField("display_title")>
    Public Property Title As String

    <SolrField("display_pubDate")>
    Public Property PublicationDate As String

    <SolrField("display_facet_pubPlace")>
    Public Property PublicationPlace As String

    <SolrField("display_facet_collection")>
    Public Property Institution As String

    <SolrField("display_author")>
    Public Property Authors As List(Of String)

    <SolrField("display_hasEmblems")>
    Public Property HasEmblems As String

    <SolrField("xml")>
    Public Property ModsXML As String
End Class
