(function(){

$(document).ready(function () {
    queryProject();
    $('#save').click(updateProject);
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
 
    $('iframe').remove();
    var iframe = $('<iframe id="results"></iframe>');
    $('#iframe-container').append(iframe);
    document.getElementById('results').contentWindow.document.write('<html class="results-html"><script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js">alert("adf");</script></script><style>'+data.css+'</style><body>'+data.html+'<script>'+data.javascript+'</script></body></html>');
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

})();