
Public Class CacheHelper
    Public Shared Function Retrieve(key As String)
        Return HttpContext.Current.Cache.Get(key)
    End Function

    Public Shared Sub Add(key, value)
        ' check if data is already in cache
        If Retrieve(key) Is Nothing AndAlso
            value IsNot Nothing Then

            ' set cache validity time to 12 hours
            Dim time As New System.TimeSpan(12, 0, 0)
            HttpContext.Current.Cache.Insert(key, value, Nothing,
                System.Web.Caching.Cache.NoAbsoluteExpiration, time)
        End If
    End Sub
End Class
