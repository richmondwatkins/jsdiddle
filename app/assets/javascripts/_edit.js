
(function(){

$(document).ready(function () {
    queryProject();
    $('#update').click(updateProject);
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
  var library = $('#library-selection').val()

    $.ajax({
      type: "POST",
      url: "/projects/" +params+"/update/"+version,
      data: { project: { name: name, html: html, javascript: js, css:css, library:library } }
    });

  e.preventDefault();
} 


})();