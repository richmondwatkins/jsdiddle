(function(){
$(document).ready(init);

function init(){
  $('#save').click(saveProject);
  $("#menu-toggle").click(toggleMenu);
  $('#run').click(buildCode);
}
 

function saveProject(e){
  var html = htmlEditor.getValue();
  var js = javascriptEditor.getValue();
  var css = cssEditor.getValue();
  var name = $('#project-name').val();
  var library = $('#library-selection').val()
    $.ajax({
      type: "POST",
      url: "/projects",
      data: { project: { name: name, html: html, javascript: js, css:css, library: library } }
    });

  e.preventDefault();
} 


var menuToggle = false;
function toggleMenu(e){
  var width = $(window).width();
  var panelSize = (width  / 2);
  var height = $(window).height();
  if(menuToggle === false){
    $("#wrapper").toggleClass("toggled");
    $('#mainSplitter').jqxSplitter({ width: width, height: height, panels: [{ size: panelSize }] });

    menuToggle = true;
  }else{
    panelSize = ((width * 0.85) / 2);
    $("#wrapper").toggleClass("toggled");
    $('#mainSplitter').jqxSplitter({ width: '85%', height: height, panels: [{ size: panelSize }] });
    menuToggle = false;
  }
  e.preventDefault();  
}

 function buildCode(e){
  var html = htmlEditor.getValue();
  var js = javascriptEditor.getValue();
  var css = cssEditor.getValue();
  var library = $('#library-selection').val()
  $('iframe').remove();
  var iframe = document.createElement("iframe");
  iframe.setAttribute("id", "results");  

  iframe.onload = function() {
    document.getElementById('results').contentWindow.document.write('<!DOCTYPE html><html class="results-html">'+library+'<style>'+css+'</style><body>'+html+'<script>'+js+'</script></body></html>');
  };

  $('#iframe-container').append(iframe);

  e.preventDefault();
 }

})();