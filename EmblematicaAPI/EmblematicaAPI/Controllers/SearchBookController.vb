Imports System.Web.Mvc
Imports SolrNet
Imports Microsoft.Practices.ServiceLocation
Imports System.Web.Http
Imports SolrNet.Commands.Parameters

Public Class SearchBookController
    Inherits ApiController

    ' GET api/SearchBook
    Function GetValues(Optional keyword As String = Nothing,
                       Optional title As String = Nothing,
                       Optional name As String = Nothing,
                       Optional pub As String = Nothing,
                       Optional inst As String = Nothing,
                       Optional lang As String = Nothing,
                       Optional place As String = Nothing,
                       Optional pubDate As String = Nothing,
                       Optional skip As Integer = 0,
                       Optional take As Integer = 10) As BookView

        Dim solr As ISolrOperations(Of Book) = ServiceLocator.Current.GetInstance(Of ISolrOperations(Of Book))()

        Dim keywordQuery As SolrQueryInList
        If keyword IsNot Nothing Then
            keywordQuery = CreateQuery("search_all", keyword)
        End If

        Dim titleQuery As SolrQueryInList
        If title IsNot Nothing Then
            titleQuery = CreateQuery("search_title", title)
        End If

        Dim nameQuery As SolrQueryInList
        If name IsNot Nothing Then
            nameQuery = CreateQuery("search_author", name)
        End If

        Dim pubQuery As SolrQueryInList
        If pub IsNot Nothing Then
            pubQuery = CreateQuery("search_publication", pub)
        End If

        Dim placeFilter As New SolrQueryByField("display_facet_pubPlace", place)
        Dim dateFilter As New SolrQueryByField("facet_pubDate", pubDate)
        Dim instFilter As New SolrQueryByField("display_facet_collection", inst)
        Dim langFilter As New SolrQueryByField("facet_language", lang)

        Dim facetFields = New String() {"facet_pubDate", "display_facet_pubPlace", "display_facet_collection", "facet_language"}

        Dim books As New BookView(solr.Query(keywordQuery And titleQuery And nameQuery And pubQuery, New QueryOptions() With {
                                     .Start = skip,
                                     .Rows = take,
                                     .FilterQueries = New ISolrQuery() {langFilter, placeFilter, dateFilter, instFilter},
                                     .Facet = New FacetParameters With {
                                         .Queries = facetFields.Select(Function(f) New SolrFacetFieldQuery(f) With {.MinCount = 1}).Cast(Of ISolrFacetQuery)().ToList()}}))
        Return books
    End Function

    Function CreateQuery(field As String, searchTerm As String) As SolrQueryInList
        ' if searchTerm is in quotes, do an exact string search
        ' else do a right hand truncated search for each keyword
        If searchTerm.StartsWith("""") And searchTerm.EndsWith("""") Then
            Return New SolrQueryInList(field, searchTerm)

        Else
            Dim keywords As String() = searchTerm.Split
            For i As Integer = 0 To keywords.Length - 1 Step 1
                keywords(i) = keywords(i) & "*"
            Next
            Return New SolrQueryInList(field, keywords)
        End If
    End Function

    Public Sub Add(Of T)(ByRef arr As T(), item As T)
        Array.Resize(arr, arr.Length + 1)
        arr(arr.Length - 1) = item
    End Sub
End Class