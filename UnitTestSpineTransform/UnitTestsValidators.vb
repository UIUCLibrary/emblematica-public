Imports System.Text
Imports Microsoft.VisualStudio.TestTools.UnitTesting
Imports SpineTransform3

<TestClass()> Public Class UnitTestsValidators

    <TestMethod()> Public Sub XmlTargetUrlAcceptsGoodUrls()

        ' Some smaples simplified, some taken from spunk data
        ' e excample domain name should be 254, just under the max of 255
        Dim valid_urls As List(Of String) = New List(Of String) From {
            "https://lib-iis-prod.library.illinois.edu/somepath/foo.xml",
            "https://lib-iis-prod1.library.illinois.edu/somepath/foo.xml",
            "https://foo.library.illinois.edu/somepath/foo.xml",
            "https://foo-bar.library.illinois.edu/somepath/foo.xml",
            "https://eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.library.illinois.edu/somepath/foo.xml",
            "http://emblemimages.library.illinois.edu/497872102/emblematica/emblem000414.xml",
            "http://emblemimages.library.illinois.edu/497872102/emblematica/emblem000414.xml",
            "http://emblemimages.library.illinois.edu/moralemblemswith00cats/supplementary/moralemblemswith00cats_spine.xml"
        }

        For Each url As String In valid_urls
            Assert.IsTrue(XmlTargetUrlValidator.Validate(url), $"{url} should be valid")
        Next

    End Sub


    <TestMethod()> Public Sub XmlTargetUrlRejectsBadUrls()
        ' f example has more than 255 

        Dim invalid_urls As List(Of String) = New List(Of String) From {
                "https://foo.illinois.edu/somepath/foo.xml",
                "https://weird.com/somepath/foo.xml",
                "fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffflibrary.illinois.edu",
                "https://lib-iis-prod.library.illinois.edu/somepath/foo"
            }

        For Each url As String In invalid_urls
            Assert.IsFalse(XmlTargetUrlValidator.Validate(url), $"{url} should not be valid")
        Next

    End Sub

End Class