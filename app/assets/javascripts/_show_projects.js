
(function(){

$(document).ready(function () {
    queryProject();
    $('#update').click(updateProject);
    $('#version-selection').on('change', changeVersion);
  });

 function queryProject(){
  var path = window.location.pathname.split('/');
  var params = path[1];
  $.ajax({
      type: "GET",
      dataType: "json",
      url: params,
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
    document.getElementById('results').contentWindow.document.write('<!DOCTYPE html><html>'+data.library+'<style>'+data.css+'</style><body>'+data.html+'<script>'+data.javascript+'</script></body></html>');
 }


function updateProject(e){
  var path = window.location.pathname.split('/');
  var params = path[1];
  var html = htmlEditor.getValue();
  var js = javascriptEditor.getValue();
  var css = cssEditor.getValue();
  var name = $('#project-name').val();
  var library = $('#library-selection').val()
  var project_id = $('#project_id').data('id');
  console.log(project_id);
    $.ajax({
      type: "POST",
      url: "/versions/" +params,
      data: { version: { name: name, html: html, javascript: js, css:css, library:library, project_id:project_id } }
    });

  e.preventDefault();
} 

function changeVersion(){
  var path = $('#version-selection').val();
  window.location = path;
}


})();