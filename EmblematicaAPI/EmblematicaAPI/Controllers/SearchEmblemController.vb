Imports System.Web.Mvc
Imports System.Web.Http
Imports SolrNet
Imports Microsoft.Practices.ServiceLocation
Imports SolrNet.Commands.Parameters

Public Class SearchEmblemController
    Inherits ApiController

    ' GET api/SearchBook
    Function GetValues(Optional keyword As String = Nothing,
                       Optional motto As String = Nothing,
                       Optional iconclassTerm As String = Nothing,
                       Optional iconclassNotation As String = Nothing,
                       Optional inst As String = Nothing,
                       Optional place As String = Nothing,
                       Optional pubDate As String = Nothing,
                       Optional skip As Integer = 0,
                       Optional take As Integer = 10) As EmblemView

        Dim solr As ISolrOperations(Of Emblem) = ServiceLocator.Current.GetInstance(Of ISolrOperations(Of Emblem))()

        Dim keywordQuery As SolrQueryInList
        If keyword IsNot Nothing Then
            keywordQuery = CreateQuery("search_all", keyword)
        End If

        Dim mottoQuery As SolrQueryInList
        If motto IsNot Nothing Then
            mottoQuery = CreateQuery("search_motto", motto)
        End If

        Dim iconclassNotationQuery As SolrQueryInList
        If iconclassNotation IsNot Nothing Then
            iconclassNotationQuery = CreateQuery("search_iconclass", iconclassNotation)
        End If


        Dim placeFilter As New SolrQueryByField("facet_pubPlace", place)
        Dim dateFilter As New SolrQueryByField("facet_pubDate", pubDate)
        Dim instFilter As New SolrQueryByField("facet_collection", inst)

        Dim facetFields = New String() {"facet_pubDate", "facet_pubPlace", "facet_collection"}

        Dim emblems As New EmblemView(solr.Query(keywordQuery And mottoQuery And iconclassNotationQuery, New QueryOptions() With {
                                     .Start = skip,
                                     .Rows = take,
                                     .FilterQueries = New ISolrQuery() {placeFilter, dateFilter, instFilter},
                                     .Facet = New FacetParameters With {
                                         .Queries = facetFields.Select(Function(f) New SolrFacetFieldQuery(f) With {.MinCount = 1}).Cast(Of ISolrFacetQuery)().ToList()}}))
        Return emblems
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