# emblematica-public (Emblematica Online)

This is the publicly accessible version of the code behind [Emblematica Online](http://emblematica.library.illinois.edu/).

### Purpose

[Emblematica Online](http://emblematica.library.illinois.edu/) provides integrated search over 7 rare book library collections of digitized emblem books. Each contributor maintains original, full resolution page images and additional details about collections, how materials were digitized, etc. Emblematica Online contains only metadata and links back to contributor websites for full resolution page images and ancillary information about individual items, emblem book collections and digitization projects.

### Context (as currently deployed)
* The application is written in VB.NET (MVC), was developed using the Visual Studio IDE, and currently runs under IIS on a Windows 2012 Server. 
* Requires .NET Framework (various versions up to and including 4.8).
* Requires Bootstrap and Backbone JavaScript Frameworks. These in turn rely on JQuery libraries.
* Relies on Microsoft XML and XSLT libraries.
* Uses Solr for searching and browsing digitized emblems and emblem books. 
* Uses Cantaloupe IIIF image server to display full resolution page images from specific contributors.

### [Sample Metadata](<sample metadata/>)
Metadata from each of the contributing libraries is gathered, normalized, and indexed using solr. Metadata is stored in XML and JSON in an application-specific, web accessible folder and file structure. [Sample Metadata](<sample metadata/>) contains a small sample these metadata files (including larger 'thumbnails' of digitized emblem page images) named (based on unique book identifier strings) and organized as required by the application. Book and emblem JSON files are indexed in solr according to application-specific [solr schemas](<sample metadata/Solr-Schemas>) contained in the Sample Metadata folder. Book and emblem metadata files (stored as XML files) are transformed using application-specific [XSLT files](https://github.com/UIUCLibrary/emblematica-public/tree/main/SpineTransform3/Xslt) to populate Emblematica Online information displays (with links to relevant pages on contributing library websites).   

### EmblematicaAPI


### IconclassAPI


### SpineTransform3


### app (static content)






