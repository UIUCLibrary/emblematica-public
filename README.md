# emblematica-public (Emblematica Online)
This is the publicly accessible version of the code behind [Emblematica Online](http://emblematica.library.illinois.edu/).

### Purpose

[Emblematica Online](http://emblematica.library.illinois.edu/) provides integrated search over 7 rare book library collections of digitized emblems. Each contributor maintains original, full resolution page images and additional details about collections, how materials were digitized, etc.

### Context (as currently deployed)
* The application is written in VB.NET and currently runs under IIS on a Windows 2012 Server. 
* Requires Bootstrap and Backbone JavaScript libraries
* Uses Solr for searching and browsing digitized emblems and emblem books 
* Uses Cantaloupe IIIF image server to display full resolution page images from specific contributors

### Sample Metadata
Metadata from each of the contributors is gathered normalized and indexed using solr. The [Sample Metadata](sample metadata/) illustrates the metadata files (including larger 'thumbnails' of digitized emblem page images) assumed by the application. The   and   files are indexed in solr according to the [solr schemas](sample metadata/Solr-Schemas) in the Sample Metadata folder.   

### EmblematicaAPI


### IconclassAPI


### SpineTransform3


### app (static content)


