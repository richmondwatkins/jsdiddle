
(function(){

$(document).ready(function () {
    queryProject();
    $('#save').click(updateProject);
    $("#menu-toggle").click(toggleMenu);
    $('#run').click(buildCode);
  });

 function queryProject(){

  var path = window.location.pathname.split('/');
  var params = path[2];
  var version = path[3];
  $.ajax({
      type: "GET",
      dataType: "json",
      url: "/projects/" + params + "/" + version,
      success: function(data){
        htmlEditor.setValue(data.html);
        javascriptEditor.setValue(data.javascript);
        cssEditor.setValue(data.css);

        loadIframe(data);
      }
    });
 }

 function loadIframe(data){
    $('#project-name').val(data.name);
 
    $('iframe').remove();
    var iframe = $('<iframe id="results"></iframe>');
    $('#iframe-container').append(iframe);
    document.getElementById('results').contentWindow.document.write('<html class="results-html">'+data.library+'</script><style>'+data.css+'</style><body>'+data.html+'<script>'+data.javascript+'</script></body></html>');
 }


function updateProject(e){
  var path = window.location.pathname.split('/');
  var params = path[2];
  var version = path[3];

  var html = htmlEditor.getValue();
  var js = javascriptEditor.getValue();
  var css = cssEditor.getValue();
  var name = $('#project-name').val();
    $.ajax({
      type: "POST",
      url: "/projects/" +params+"/update/"+version,
      data: { project: { name: "Project", html: html, javascript: js, css:css } }
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
    document.getElementById('results').contentWindow.document.write('<html class="results-html">'+library+'<style>'+css+'</style><body>'+html+'<script>'+js+'</script></body></html>');
  };

  $('#iframe-container').append(iframe);

  e.preventDefault();
 }

 

})();