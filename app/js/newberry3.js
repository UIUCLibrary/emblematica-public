function multiPix(show, hide) {
  if ($("div#main div#detail div.row:eq(1)").css("display")=="block") {
      $("div#main div#detail div.row:eq(1)").hide() ;
  }
  $("div." + show + ")").show() ;
  $("div." + hide + ")").hide() ;
}