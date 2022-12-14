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
Metadata from each of the contributing libraries is gathered, normalized, and indexed using solr. Metadata is stored in XML and JSON in an application-specific, web accessible folder and file structure. [Sample Metadata](<sample metadata/>) contains a small sample these metadata files (including for [one book](https://github.com/UIUCLibrary/emblematica-public/tree/main/sample%20metadata/depaceinterhispa00molu), larger 'thumbnails' of digitized emblem *pictura* and page images) all named (based on unique book identifier strings) and organized as required by the application. Book and emblem JSON files are indexed in solr according to application-specific [solr schemas](<sample metadata/Solr-Schemas>) contained in the Sample Metadata folder. Book and emblem metadata files (stored as XML files) are transformed using application-specific [XSLT files](https://github.com/UIUCLibrary/emblematica-public/tree/main/SpineTransform3/Xslt) to populate Emblematica Online information displays (with links to relevant pages on contributing library websites).   

### [EmblematicaAPI](https://github.com/UIUCLibrary/emblematica-public/tree/main/EmblematicaAPI/EmblematicaAPI)

Emblematica Online consists of 3 server-side Web Applications as well as metadata files and supplemental static Web content (CSS, JavaScript modules (executed on browser), about pages, etc.) on which the applications rely. EmblematicaAPI is the main application that fields user requests (e.g., to search and browse), queries Solr and constructs responses to client browsers including facets that can be used to filter search results. This application runs on our webserver in the /api virtual application directory. The webserver also uses URLRewrite and other standard webserver configuration features to redirect select user queries to EmblematicaAPI services for resolution.

### [IconclassAPI](https://github.com/UIUCLibrary/emblematica-public/tree/main/IconclassAPI)

Many of the emblems indexed by Emblematica Online have been cataloged using [Iconclass](https://iconclass.org/) classification system for the content of images. The emblem metadata (emblem descriptions) maintained by Emblematica Online include only references to Iconclass notation values -- Iconclass headings (which are available from Iconclass.org in 6 different languages) are retrieved from Iconclass.org by the IconclassAPI web application in real time using Iconclass.org linked data services and APIs. The IconclassAPI application also makes it possible for Emblematica Online users to browse the Iconclass vocabulary. This application runs on our webserver in the iconclass/api/ virtual application directory.

### [SpineTransform3](https://github.com/UIUCLibrary/emblematica-public/tree/main/SpineTransform3)

The SpineTransform3 application is called to convert an XML metadata file (describing a book or individual emblem) into an HTML fragment using one of the XSLT files mentioned above. The URL of XML file to be transformed is provided as an argument in the URL invoking this application. (The URL is checked to ensure it resolves to an XML file on a \*.library.illinois.edu webserver before the transform is attempted.) The URLs of the XSLT files are hardcoded.

### [app](https://github.com/UIUCLibrary/emblematica-public/tree/main/app) -- static content

Stylesheets, JavaScript modules and libraries, HTML templates (e.g., for page headers and footers), images, etc. that are used in the Emblematica Online application are largely maintained on the host webserver separate from the 3 applications/services in the /app folder. 

### Disclaimer

The current incarnation of Emblematica Online code has been developed over more than a dozen years by a cadre of different and ever-changing developers. Parts of the code in this repository was written and last touched as much as a decade ago. Code is made available as-is with no guarantee as to quality, correctness, consistency or robustness. Code portability and adaptability was not in mind when creating this application.

