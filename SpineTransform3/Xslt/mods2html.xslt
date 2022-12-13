<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:emblem="http://diglib.hab.de/rules/schema/emblem"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:html="http://www.w3.org/1999/xhtml"
  xmlns:xlink="http://www.w3.org/1999/xlink" version="2.0" xmlns:mods="http://www.loc.gov/mods/v3"
  xmlns:oa="http://www.w3.org/ns/oa#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"  
  xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
  exclude-result-prefixes="xsl xsi html xlink mods oa rdf rdfs">
  <xsl:output method="html" encoding="UTF-8"/>
  <xsl:template match="/">
    <xsl:apply-templates select="//mods:mods"/>
  </xsl:template>
  <xsl:template match="mods:mods">
      <div vocab="http://schema.org/" typeof="Book">
        <div class="row">
          <div class="col-sm-3">Title</div>
          <div class="col-sm-9">
            <span property="name">
              <xsl:value-of select="mods:titleInfo/mods:title"/>
              <xsl:value-of select="mods:titleInfo/mods:subTitle"/>
            </span>
          </div>
        </div>
        <xsl:if test="mods:name">
          <div class="row">
            <div class="col-sm-3">Authors and contributors</div>
            <div class="col-sm-9">
            <ul>
              <xsl:for-each select="mods:name">
                <xsl:element name="li">
                  <xsl:attribute name="class">name</xsl:attribute>
                  <xsl:choose>
                    <xsl:when test="position()=1">
                      <!-- arguably we should test for usage="primary" -->
                      <xsl:attribute name="rel">author</xsl:attribute>
                    </xsl:when>
                    <xsl:otherwise>
                      <xsl:attribute name="rel">contributor</xsl:attribute>
                    </xsl:otherwise>
                  </xsl:choose>
                  <xsl:choose>
                    <xsl:when test="./@type='personal'">
                      <xsl:attribute name="typeOf">Person</xsl:attribute>
                    </xsl:when>
                    <xsl:otherwise>
                      <xsl:attribute name="typeOf">Organization</xsl:attribute>
                    </xsl:otherwise>
                  </xsl:choose>
                  <xsl:if test="./@valueURI">
                    <xsl:attribute name="resource">
                      <xsl:value-of select="./@valueURI"/>
                    </xsl:attribute>
                  </xsl:if>
                  <xsl:element name="span">
                    <xsl:if test="not(./@valueURI)">
                      <xsl:attribute name="property">name</xsl:attribute>
                    </xsl:if>
                    <xsl:value-of select="mods:namePart[1]"/>
                    <xsl:if test="mods:namePart[2]">
                      <xsl:text>, </xsl:text>
                      <xsl:value-of select="mods:namePart[2]"/>
                    </xsl:if>
                    <xsl:text>. </xsl:text>
                  </xsl:element>
                  <xsl:if test="./mods:role/mods:roleTerm">
                    <xsl:element name="span">
                      <xsl:attribute name="property">jobTitle</xsl:attribute>
                      <xsl:value-of select="./mods:role/mods:roleTerm"/>
                    </xsl:element>
                  </xsl:if>
                </xsl:element>
              </xsl:for-each>
            </ul>
          </div>
          </div>
        </xsl:if>
        <xsl:if test="mods:originInfo/mods:publisher">
          <div class="row">
            <div class="col-sm-3">Publisher</div>
            <div class="col-sm-9" rel="publisher" typeOf="Organization">
              <span property="name">
                <xsl:value-of select="mods:originInfo/mods:publisher"/>
              </span>
            </div>
          </div>
        </xsl:if>
        <xsl:if test="mods:originInfo/mods:place/mods:placeTerm[@type='text']">
          <div class="row">
            <div class="col-sm-3">Place of Publication</div>
            <div class="col-sm-9">
              <span>
                <xsl:value-of select="mods:originInfo/mods:place/mods:placeTerm[@type='text']"/>
              </span>
            </div>
          </div>
        </xsl:if>
        <xsl:if test="mods:originInfo/mods:dateIssued">
          <div class="row">
            <div class="col-sm-3">Publication Date</div>
            <div class="col-sm-9">
              <span property="datePublished">
                <xsl:value-of select="mods:originInfo/mods:dateIssued"/>
              </span>
            </div>
          </div>
        </xsl:if>
        <xsl:if test="mods:physicalDescription">
          <div class="row">
            <div class="col-sm-3">Physical Description</div>
            <div class="col-sm-9">
              <xsl:choose>
                <xsl:when test="count(mods:physicalDescription) = 1">
                  <span property="description">
                    <xsl:value-of select="normalize-space(mods:physicalDescription)"/>
                  </span>
                </xsl:when>
                <xsl:otherwise>
                  <ul>
                    <xsl:for-each select="mods:physicalDescription">
                      <xsl:for-each select="./*">
                        <li property="description">
                          <xsl:value-of select="normalize-space(.)"/>
                        </li>
                      </xsl:for-each>
                    </xsl:for-each>
                  </ul>
                </xsl:otherwise>
              </xsl:choose>
            </div>
          </div>
        </xsl:if>

        <xsl:if test="mods:language/mods:languageTerm">
          <div class="row">
            <div class="col-sm-3">Language</div>
            <div class="col-sm-9">
              <xsl:choose>
                <xsl:when test="count(mods:language/mods:languageTerm) = 1">
                  <span property="inLanguage">
                    <xsl:if test="mods:language/mods:languageTerm='lat'">
                      <xsl:text>Latin</xsl:text>
                    </xsl:if>
                    <xsl:if test="mods:language/mods:languageTerm='ger'">
                      <xsl:text>German</xsl:text>
                    </xsl:if>
                    <xsl:if test="mods:language/mods:languageTerm='fre'">
                      <xsl:text>French</xsl:text>
                    </xsl:if>
                    <xsl:if test="mods:language/mods:languageTerm='ita'">
                      <xsl:text>Italian</xsl:text>
                    </xsl:if>
                  </span>
                </xsl:when>
                <xsl:otherwise>
                  <ul>
                    <xsl:for-each select="mods:language/mods:languageTerm">
                      <li property="inLanguage">
                        <xsl:if test=".='lat'">
                          <xsl:text>Latin</xsl:text>
                        </xsl:if>
                        <xsl:if test=".='ger'">
                          <xsl:text>German</xsl:text>
                        </xsl:if>
                        <xsl:if test=".='fre'">
                          <xsl:text>French</xsl:text>
                        </xsl:if>
                        <xsl:if test=".='ita'">
                          <xsl:text>Italian</xsl:text>
                        </xsl:if>
                      </li>
                    </xsl:for-each>
                  </ul>
                </xsl:otherwise>
              </xsl:choose>

            </div>
          </div>
        </xsl:if>

        <xsl:if test="mods:note">
          <div class="row">
            <div class="col-sm-3">Notes</div>
            <div class="col-sm-9">
              <xsl:choose>
                <xsl:when test="count(mods:note) = 1">
                  <span property="description">
                    <xsl:value-of select="normalize-space(mods:note)"/>
                  </span>
                </xsl:when>
                <xsl:otherwise>
                  <ul>
                    <xsl:for-each select="mods:note">
                      <li property="description">
                        <xsl:value-of select="normalize-space(.)"/>
                      </li>
                    </xsl:for-each>
                  </ul>
                </xsl:otherwise>
              </xsl:choose>
            </div>
          </div>
        </xsl:if>

        <xsl:if test="mods:location/mods:url or mods:mods/mods:identifier[@type='purl']"/>
        <div class="row">
          <div class="col-sm-3">Links
            <xsl:if test="//emblem:biblioDesc/rdf:RDF/rdf:Description/oa:motivatedBy[@rdf:resource='http://www.w3.org/ns/oa#linking']">
              <xsl:variable name="b1"><xsl:value-of select="//emblem:biblioDesc/rdf:RDF/rdf:Description[oa:motivatedBy/@rdf:resource='http://www.w3.org/ns/oa#linking'][1]/oa:hasBody/rdf:Description/@rdf:about"/></xsl:variable>
              <xsl:variable name="b2"><xsl:value-of select="//emblem:biblioDesc/rdf:RDF/rdf:Description[oa:motivatedBy/@rdf:resource='http://www.w3.org/ns/oa#linking'][2]/oa:hasBody/rdf:Description/@rdf:about"/></xsl:variable>
              <xsl:variable name="inst1"><xsl:value-of select="//emblem:biblioDesc/rdf:RDF/rdf:Description[oa:motivatedBy/@rdf:resource='http://www.w3.org/ns/oa#linking'][1]/oa:hasBody/rdf:Description/rdfs:label"/></xsl:variable>
              <xsl:variable name="inst2"><xsl:value-of select="//emblem:biblioDesc/rdf:RDF/rdf:Description[oa:motivatedBy/@rdf:resource='http://www.w3.org/ns/oa#linking'][2]/oa:hasBody/rdf:Description/rdfs:label"/></xsl:variable>
              <xsl:element name="img">
                <xsl:attribute name="src">/app/img/Transparent2.gif</xsl:attribute>
                <xsl:attribute name="onload">otherCopiesB('<xsl:value-of select="$b1"/>', '<xsl:value-of select="$inst1"/>', '<xsl:value-of select="$b2"/>',  '<xsl:value-of select="$inst2"/>')</xsl:attribute>
              </xsl:element>                  
            </xsl:if>            
          </div>
          <div class="col-sm-9">
            <xsl:choose>
              <xsl:when test="mods:location/mods:url">
                <ul>
                  <xsl:for-each select="mods:location/mods:url">
                    <xsl:if test="./@displayLabel != 'Full text - UIUC' and ./@displayLabel != 'Full Text - UIUC'">
                      <li property="url">
                        <a>
                          <xsl:attribute name="href">
                            <xsl:value-of select="."/>
                          </xsl:attribute>
                          <xsl:choose>
                            <xsl:when test="./@displayLabel = 'Full text - OCA'">
                              <xsl:text>Internet Archive</xsl:text>
                            </xsl:when>
                            <xsl:otherwise>
                              <xsl:value-of select="./@displayLabel"/>
                            </xsl:otherwise>
                          </xsl:choose>
                        </a>
                      </li>
                    </xsl:if>
                  </xsl:for-each>
                </ul>
              </xsl:when>
              <xsl:otherwise>
                <ul>
                  <xsl:for-each select="mods:identifier[@type='purl']">
                    <li property="url">
                      <a>
                        <xsl:attribute name="href">
                          <xsl:value-of select="."/>
                        </xsl:attribute>
                        <xsl:value-of select="."/>
                      </a>
                    </li>
                  </xsl:for-each>
                </ul>
              </xsl:otherwise>
            </xsl:choose>
          </div>
        </div>
      </div>
  </xsl:template>
</xsl:stylesheet>
