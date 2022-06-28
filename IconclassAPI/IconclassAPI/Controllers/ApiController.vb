Imports HtmlAgilityPack
Imports System.Net
Imports Newtonsoft.Json.Linq
Imports Newtonsoft.Json
Imports AutoMapper

Public Class ApiController
    Inherits System.Web.Mvc.Controller

    Function Search(term As String, language As String)
        'changed size variable in querystring below to 7 to limit results
        Dim searchURL = String.Format("https://iconclass.org/api/search?q={0}&lang={1}&size=7&page=1&sort=rank&keys=0",
                                      term, language)
        Dim numresults = 1
        Try
            Dim notations As New List(Of String)

            Dim jsonString As String = WebHelper.GetResource(searchURL)
            Dim searchresults As SearchResults = JsonConvert.DeserializeObject(Of SearchResults)(jsonString)
            For Each result In searchresults.result
                notations.Add(Server.HtmlEncode(result))
            Next

            Return Json(notations, JsonRequestBehavior.AllowGet)
        Catch Exception As Exception
            Return Nothing
        End Try
    End Function

    Function GetTopLevel()
        Dim url As String = "https://iconclass.org/ICONCLASS.json"

        ' take data from cache if available, else query remotely and add to cache
        Dim cache = CacheHelper.Retrieve("top")
        If cache IsNot Nothing Then
            Return Json(cache, JsonRequestBehavior.AllowGet)
        Else
            Dim jsonString As String = WebHelper.GetResource(url)
            Dim iconclass As IconclassDetail = JsonConvert.DeserializeObject(Of IconclassDetail)(jsonString)
            CacheHelper.Add("top", iconclass)

            Return Json(iconclass, JsonRequestBehavior.AllowGet)
        End If
    End Function

    Function GetDetails(notations As String)
        Return Json(GetIconclassList(notations), JsonRequestBehavior.AllowGet)
    End Function

    Function GetLabels(notations As String)
        Dim iconclassDetailList As List(Of IconclassDetail) = GetIconclassList(notations)
        Dim iconclassSummaryList As List(Of IconclassSummary) = Mapper.Map(Of List(Of IconclassSummary))(iconclassDetailList)

        Return Json(iconclassSummaryList, JsonRequestBehavior.AllowGet)
    End Function

    Private Function GetIconclassList(notations As String) As List(Of IconclassDetail)
        ' updated 6-12-22 Dim url As String = "http://iconclass.org/json/?notation="
        Dim url As String = "https://iconclass.org/json?notation="

        ' notations separated using semi-colon; can't use comma because some notations have commas
        Dim notationList As New List(Of String)(notations.Split("|"))

        Dim iconclassList As New List(Of IconclassDetail)
        Dim queryList As New List(Of String)
        For Each notation In notationList
            ' take data from cache if available, else, add to query parameters
            Dim cache = CacheHelper.Retrieve(notation)
            If cache IsNot Nothing Then
                iconclassList.Add(New IconclassDetail(cache.n, cache.txt, cache.p, cache.c))
            Else
                queryList.Add(HttpUtility.UrlEncode(notation))
            End If
        Next

        ' query items not in cache and add result to cache
        If queryList.Count > 0 Then
            Dim queryURL As String = url & String.Join("&notation=", queryList)
            Dim jsonString As String = WebHelper.GetResource(queryURL)
            Dim results As IconResults = JsonConvert.DeserializeObject(Of IconResults)(jsonString)
            Dim resultList = results.result
            Dim iconclassListNew As New List(Of IconclassDetail)


            For Each result In resultList
                If result IsNot Nothing Then
                    CacheHelper.Add(result.n, result)
                    iconclassListNew.Add(New IconclassDetail(result.n, result.txt, result.p, result.c))
                Else
                    iconclassListNew.Add(New IconclassDetail())
                End If
            Next

            ' combine cached items and newly queried items
            iconclassList.AddRange(iconclassListNew)
        End If

        Return iconclassList
    End Function
End Class
