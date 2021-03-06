
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
    $('#library-selection').val(data.library);
    
    $("#results").remove();
    var iframe = $('<iframe id="results" sandbox="allow-forms allow-popups allow-scripts allow-same-origin"></iframe>');
    $('#iframe-container').append(iframe);
    
    $("#results").attr(
     "src", "data:text/html;charset=utf-8," + 
     "<html>" + 
       "<head>" +
          "<script src=\""+data.library+"\"><" + "/script>" +  
          "<style>"+data.css+"</style>" +  
       "</head>" +
      data.html +
     "<script>"+data.javascript+"<" + "/script>" +         
     "</html>"
  );
 }


function updateProject(e){
  console.log('update');
  var path = window.location.pathname.split('/');
  var params = path[1];
  var html = htmlEditor.getValue();
  var js = javascriptEditor.getValue();
  var css = cssEditor.getValue();
  var name = $('#project-name').val();
  var library = $('#library-selection').val()
  var project_id = $('#project_id').data('id');
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