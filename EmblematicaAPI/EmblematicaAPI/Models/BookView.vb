Imports SolrNet

Public Class BookView
    Public Property Total As Integer
    Public Property Books As List(Of Book)
    Public Property Facets As Facets

    Sub New(results As SolrQueryResults(Of Book))
        Total = results.NumFound
        Books = results

        Facets = New Facets
        Facets.PublicationPlace = results.FacetFields("display_facet_pubPlace")
        Facets.PublicationDate = results.FacetFields("facet_pubDate")
        Facets.Institution = results.FacetFields("display_facet_collection")
        Facets.Language = results.FacetFields("facet_language")
    End Sub
End Class
