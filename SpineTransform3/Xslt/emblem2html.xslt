<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:html="http://www.w3.org/1999/xhtml"
  xmlns:xlink="http://www.w3.org/1999/xlink" version="2.0" xmlns:mods="http://www.loc.gov/mods/v3"
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  xmlns:rdf2="http://www.w3.org/1999/02/22-rdf-syntax-ns"
  xmlns:emblem="http://diglib.hab.de/rules/schema/emblem"
  xmlns:skos="http://www.w3.org/2004/02/skos/core#" xmlns:tei="http://www.tei-c.org/ns/1.0"
  xmlns:oa="http://www.w3.org/ns/oa#" 
  xmlns:svg="http://www.w3.org/2000/svg"
  exclude-result-prefixes="xsl xsi xlink html rdf rdf2 mods emblem skos tei oa">
  <xsl:output method="html" encoding="UTF-8"/>

  <xsl:template match="/">
    <xsl:apply-templates select="//emblem:emblem"/>
  </xsl:template>
  <xsl:template match="emblem:emblem">
    <div vocab="http://schema.org/" prefix="em: http://emblematica.library.illinois.edu/spine/" typeof="em:Emblem">
      <xsl:choose>
        <xsl:when test="/emblem:biblioDesc/emblem:copyDesc/emblem:copyID = 'nwbWingMs279'">
          <div class="row" style="display:none">
            <div style="overflow-x: auto">
              <xsl:element name="a">
                <xsl:attribute name="href"><xsl:value-of select="/emblem:biblioDesc/emblem:emblem/emblem:pictura/@xlink:href"/></xsl:attribute>
                <xsl:attribute name="target"><xsl:text>_blank</xsl:text></xsl:attribute>
                <xsl:element name="img">
                  <xsl:attribute name="style"><xsl:text>max-height:80vh; display:block; margin-top:0px; margin-right:auto; margin-bottom:0px; margin-left:auto; border: 2px solid blue</xsl:text></xsl:attribute>
                  <xsl:attribute name="src"><xsl:value-of select="concat('http://emblemimages.grainger.illinois.edu/NewberryVols/WingMs279/JPGthumbnail/emblem/', /emblem:biblioDesc/emblem:emblem/emblem:pictura/@page, '.jpg')"/></xsl:attribute>
                  <xsl:attribute name="onload"><xsl:text></xsl:text>multiPix(0,1);</xsl:attribute>
                </xsl:element>
              </xsl:element>
              <a href="javascript:multiPix(1,0);" class="jcarousel-control-next" data-jcarouselcontrol="true">&gt;</a>
            </div>
          </div>
          <xsl:for-each select="/emblem:biblioDesc/emblem:emblem/emblem:subscriptio/emblem:transcription">
            <div class="row" style="display:none">
              <div style="overflow-x:auto">
                <xsl:element name="a">
                  <xsl:attribute name="href"><xsl:value-of select="./@xlink:href"/></xsl:attribute>
                  <xsl:attribute name="target"><xsl:text>_blank</xsl:text></xsl:attribute>
                  <xsl:variable name="thumbNailUrl"><xsl:value-of select="concat('http://emblemimages.grainger.illinois.edu/NewberryVols/WingMs279/JPGthumbnail/emblem/', ./@page, '.jpg')"/></xsl:variable>
                  <xsl:choose>
                    <xsl:when test="/emblem:biblioDesc/rdf:RDF//oa:hasTarget//oa:hasSource/@rdf:resource=$thumbNailUrl">
                      <div class="img-overlay-wrap"> 
                        <xsl:element name="img">
                          <xsl:attribute name="style"><xsl:text>max-height:80vh; display:block; margin-top:0px; margin-right:auto; margin-bottom:0px; margin-left:auto; border: 2px solid blue</xsl:text></xsl:attribute>
                          <xsl:attribute name="src"><xsl:value-of select="$thumbNailUrl"/></xsl:attribute>
                        </xsl:element> 
                        <svg width="100%" height="100%">
                          <xsl:element name="rect">
                            <xsl:attribute name="stroke">#000000</xsl:attribute>
                            <xsl:attribute name="fill">none</xsl:attribute>                            
                            <xsl:attribute name="x"><xsl:value-of select="/emblem:biblioDesc/rdf:RDF//oa:hasTarget//oa:SvgSelector//svg:rect/@x"/></xsl:attribute>
                            <xsl:attribute name="y"><xsl:value-of select="/emblem:biblioDesc/rdf:RDF//oa:hasTarget//oa:SvgSelector//svg:rect/@y"/></xsl:attribute>
                            <xsl:attribute name="width"><xsl:value-of select="/emblem:biblioDesc/rdf:RDF//oa:hasTarget//oa:SvgSelector//svg:rect/@width"/></xsl:attribute>
                            <xsl:attribute name="height"><xsl:value-of select="/emblem:biblioDesc/rdf:RDF//oa:hasTarget//oa:SvgSelector//svg:rect/@height"/></xsl:attribute>
                          </xsl:element>                          
                        </svg>
                      </div>
                    </xsl:when>
                    <xsl:otherwise>
                      <xsl:element name="img">
                        <xsl:attribute name="style"><xsl:text>max-height:80vh; display:block; margin-top:0px; margin-right:auto; margin-bottom:0px; margin-left:auto; border: 2px solid blue</xsl:text></xsl:attribute>
                        <xsl:attribute name="src"><xsl:value-of select="$thumbNailUrl"/></xsl:attribute>
                      </xsl:element>                      
                    </xsl:otherwise>                  
                  </xsl:choose>
                </xsl:element>
                <!-- xsl:variable name="crrnt"><xsl:value-of select="position()"/></xsl:variable -->
                <xsl:element name="a" >
                  <xsl:attribute name="class">jcarousel-control-prev</xsl:attribute>
                  <xsl:attribute name="data-jcarouselcontrol">true</xsl:attribute>
                  <xsl:attribute name="href">javascript:multiPix(<xsl:value-of select="position()-1"/>, <xsl:value-of select="position()"/>);</xsl:attribute>
                  <xsl:text>&lt;</xsl:text>
                </xsl:element>
                <xsl:if test="position() != last()">
                  <xsl:element name="a" >
                    <xsl:attribute name="class">jcarousel-control-next</xsl:attribute>
                    <xsl:attribute name="data-jcarouselcontrol">true</xsl:attribute>
                    <xsl:attribute name="href">javascript:multiPix(<xsl:value-of select="position()+1"/>, <xsl:value-of select="position()"/>);</xsl:attribute>
                    <xsl:text>&gt;</xsl:text>
                  </xsl:element>
                </xsl:if>
              </div>
            </div>
          </xsl:for-each>
        </xsl:when>
      </xsl:choose>
      
      <div id="descriptors" class="row">
        <xsl:choose>
          <xsl:when test="count(emblem:pictura/emblem:iconclass) = 0">
            <div class="col-sm-12">
              <span class="font-20">No available descriptors for this emblem (Iconclass Headings)</span>
            </div>
          </xsl:when>
          <xsl:otherwise>
            <div id="label" class="col-sm-9">
              <span class="font-20">Descriptors for this Emblem (Iconclass Headings)</span>
            </div>
            <div id="language" class="col-sm-3 dropdown">
              <button class="btn btn-default dropdown-toggle font-12" type="button"
                data-toggle="dropdown">
                Language : <span id="btn-language">English</span> <span class="caret"/>
              </button>
              <ul class="dropdown-menu font-12">
                <li>
                  <a href="#">
                    <img src="/app/img/flags/usa_square_icon_64.png"/>
                    English
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/app/img/flags/germany_square_icon_64.png"/>
                    German
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/app/img/flags/france_square_icon_64.png"/>
                    French
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/app/img/flags/italy_square_icon_64.png"/>
                    Italian
                  </a>
                </li>
              </ul>
            </div>
            <xsl:for-each select="emblem:pictura/emblem:iconclass">
              <p class="iconclass">
                <xsl:attribute name="id">
                  <xsl:value-of select="concat('iconclass-', position())"/>
                </xsl:attribute>
                <xsl:value-of select="skos:notation"/>
              </p>
            </xsl:for-each>
          </xsl:otherwise>  
        </xsl:choose>
      </div>
      <div id="motto-transcriptions" class="row">
          <div id="label" class="col-sm-12">
            <span class="font-20">Motto Transcription(s)</span>
          </div>
        <xsl:for-each select="emblem:motto/emblem:transcription">
          <xsl:if test="normalize-space(string(. ) ) != ''">
            <div class="font-16">
              <xsl:choose>
                <xsl:when test=".//@xml:lang  = 'de'">
                  <div class="col-sm-3">
                    <span class="indent">
                      <xsl:text>German (Original): </xsl:text>
                    </span>
                  </div>
                  <div class="col-sm-9">
                    <xsl:value-of select="(. | ./tei:p)/text() |./tei:p//text()"/>
                  </div>
                  <xsl:if test="emblem:normalisation">
                    <div class="col-sm-3">
                      <span class="indent">
                        <xsl:text>German (Normalized): </xsl:text>
                      </span>
                    </div>
                    <div class="col-sm-9">
                      <xsl:value-of select="(emblem:normalisation | emblem:normalisation/tei:p)//text()"/>
                    </div>
                  </xsl:if>
                </xsl:when>
                <xsl:otherwise>
        				  <xsl:if test=".//@xml:lang">
                          <div class="col-sm-3">
                            <span class="indent">
                              <xsl:choose>
                                <xsl:when test="@xml:lang  = 'la'">Latin</xsl:when>
                                <xsl:when test="@xml:lang  = 'en'">English</xsl:when>
                                <xsl:when test="@xml:lang  = 'nl'">Dutch</xsl:when>
                                <xsl:when test="@xml:lang  = 'it'">Italian</xsl:when>
                                <xsl:when test="@xml:lang  = 'fr'">French</xsl:when>
                                <xsl:when test="@xml:lang  = 'el'">Greek</xsl:when>
                              <xsl:when test="@xml:lang  = 'es'">Spanish</xsl:when>
                              </xsl:choose>
                              <xsl:text>: </xsl:text>
                            </span>
                          </div>
        				  </xsl:if>
                  <div class="col-sm-9">
                    <xsl:value-of select="(. | ./tei:p)"/>
                  </div>
                </xsl:otherwise>
              </xsl:choose>
            </div>
          </xsl:if>
        </xsl:for-each>
      </div>
      
      <div id="figure-description" class="row">
       <xsl:for-each select="emblem:pictura/emblem:figDesc">
         <xsl:if test="( normalize-space(string(. ) ) != '' ) and ( normalize-space(string(. ) ) != 'INFORMAL DESCRIPTION' )  ">
            <div id="label" class="col-sm-12">
              <span class="font-20">Description of the Pictura</span>
            </div> 
            <div class="font-16">
                    <div class="col-sm-3">
                      <span class="indent">
                        <xsl:choose>
                          <xsl:when test="@xml:lang">                            
                            <xsl:choose>
                              <xsl:when test="@xml:lang  = 'de'">German</xsl:when>
                              <xsl:when test="@xml:lang  = 'la'">Latin</xsl:when>
                              <xsl:when test="@xml:lang  = 'en'">English</xsl:when>
                              <xsl:when test="@xml:lang  = 'nl'">Dutch</xsl:when>
                              <xsl:when test="@xml:lang  = 'it'">Italian</xsl:when>
                              <xsl:when test="@xml:lang  = 'fr'">French</xsl:when>
                              <xsl:when test="@xml:lang  = 'el'">Greek</xsl:when>
                              <xsl:when test="@xml:lang  = 'es'">Spanish</xsl:when>
                            </xsl:choose>
                          </xsl:when>
                          <xsl:otherwise>English (assumed)</xsl:otherwise>
                        </xsl:choose>
                        <xsl:text>: </xsl:text>
                      </span>
                    </div>
                  <div class="col-sm-9">
                    <xsl:value-of select="(. | ./tei:p)"/>
                  </div>
            </div>
          </xsl:if>
        </xsl:for-each>
      </div>  

      <div id="subscriptio-transcriptions" class="row">
        <xsl:for-each select="emblem:subscriptio">
          <xsl:if test="normalize-space(string(. ) ) != ''">
            <xsl:if test="position()=1">
              <div id="label" class="col-sm-12">
                <span class="font-20">Subscriptio Transcription(s)</span>
              </div>
            </xsl:if>
            <xsl:for-each select="./emblem:transcription">
              <div class="font-16">
              <xsl:if test="@xml:lang">
                <div class="col-sm-3">
                  <span class="indent">
                    <xsl:choose>
                      <xsl:when test="@xml:lang  = 'de'">German</xsl:when>
                      <xsl:when test="@xml:lang  = 'la'">Latin</xsl:when>
                      <xsl:when test="@xml:lang  = 'en'">English</xsl:when>
                      <xsl:when test="@xml:lang  = 'nl'">Dutch</xsl:when>
                      <xsl:when test="@xml:lang  = 'it'">Italian</xsl:when>
                      <xsl:when test="@xml:lang  = 'fr'">French</xsl:when>
                      <xsl:when test="@xml:lang  = 'el'">Greek</xsl:when>
                      <xsl:when test="@xml:lang  = 'es'">Spanish</xsl:when>
                    </xsl:choose>
                    <xsl:text>: </xsl:text>
                  </span>
                </div>
              </xsl:if>
              <div class="col-sm-9">
                <xsl:value-of select="(. | ./tei:p)"/>
              </div>
            </div>
        </xsl:for-each>
          </xsl:if>
        </xsl:for-each>
      </div>  
      

      <div class="row">
        <div class="col-sm-12">
          <span class="font-20">Persistent Link: 
                <xsl:if test="/emblem:biblioDesc/rdf:RDF/rdf:Description/oa:motivatedBy[@rdf:resource='http://www.w3.org/ns/oa#linking']">
                  <xsl:variable name="e1"><xsl:value-of select="substring-after(/emblem:biblioDesc/rdf:RDF/rdf:Description[oa:motivatedBy/@rdf:resource='http://www.w3.org/ns/oa#linking'][1]/oa:hasBody, 'EmblemRegistry:E')"/></xsl:variable>
                  <xsl:variable name="e2"><xsl:value-of select="substring-after(/emblem:biblioDesc/rdf:RDF/rdf:Description[oa:motivatedBy/@rdf:resource='http://www.w3.org/ns/oa#linking'][2]/oa:hasBody, 'EmblemRegistry:E')"/></xsl:variable>
                  <xsl:element name="img">
                    <xsl:attribute name="src">/app/img/Transparent2.gif</xsl:attribute>
                    <xsl:attribute name="onload">otherVersE('<xsl:value-of select="$e1"/>', '<xsl:value-of select="$e2"/>')</xsl:attribute>
                  </xsl:element>                  
                </xsl:if>
            <a class="font-16">
              <xsl:attribute name="href">
                <xsl:value-of select="@globalID"/>
              </xsl:attribute>
              <xsl:value-of select="@globalID"/>
            </a>
          </span>
        </div>
      </div>
  </div>
  </xsl:template>
</xsl:stylesheet>
