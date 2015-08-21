Imports SolrNet

Public Class EmblemView
    Public Property Total As Integer
    Public Property Emblems As List(Of Emblem)
    Public Property Facets As Facets

    Sub New(results As SolrQueryResults(Of Emblem))
        Total = results.NumFound
        Emblems = results

        Facets = New Facets
        Facets.PublicationPlace = results.FacetFields("facet_pubPlace")
        Facets.PublicationDate = results.FacetFields("facet_pubDate")
        Facets.Institution = results.FacetFields("facet_collection")
    End Sub
End Class
