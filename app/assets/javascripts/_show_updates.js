
(function(){

$(document).ready(function () {
    queryProject();
    $('#update').click(updateProject);
  });

 function queryProject(){

  var path = window.location.pathname.split('/');
  var params = path[1];
  var version = path[2];
  $.ajax({
      type: "GET",
      dataType: "json",
      url: version,
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
    document.getElementById('results').contentWindow.document.write('<!DOCTYPE html><html><script>'+data.library+'</script><style>'+data.css+'</style><body>'+data.html+'<script>'+data.javascript+'</script></body></html>');
 }


function updateProject(e){
  var path = window.location.pathname.split('/');
  var params = path[1];
  var version = path[2];

  var html = htmlEditor.getValue();
  var js = javascriptEditor.getValue();
  var css = cssEditor.getValue();
  var name = $('#project-name').val();
  var library = $('#library-selection').val()
  var project_id = $('#project_id').data('id');

    $.ajax({
      type: "PATCH",
      url: "/versions",
      data: { version: { name: name, html: html, javascript: js, css:css, library:library, version:version, params:params, project_id:project_id } }
    });

  e.preventDefault();
} 


})();