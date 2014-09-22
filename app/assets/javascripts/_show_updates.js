
(function(){

$(document).ready(function () {
    queryProject();
    $('#update').click(updateProject);
    getVersions();
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
  console.log(data.library);
    $('#project-name').val(data.name);
 
    $("#results").attr(
     "src", "data:text/html;charset=utf-8," + 
     "<html>" + 
     data.html +
     "<style>"+data.css+"</style>" + 
     "<script src=\""+data.library+"\"><" + "/script>" +   
     "<script>"+data.javascript+"<" + "/script>" +         
     "</html>"
  );
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

function getVersions(){
  var path = window.location.pathname.split('/');
  var params = path[1];
  $.ajax({
      type: "GET",
      dataType: "json",
      url: "/versions/"+params,
      success: function(data){
        appendVersions(data);
      }
    });
}

function appendVersions(versions){
  var params = versions[0].params;
  var $select = $('<select id="version-selection">'+
                    '<option>Select Version</option>' +
                    '<option value="/'+params+'">Original</option>' +
                  '</select>')

  versions.forEach(function(v){
    var $option = $('<option value=/'+v.params+'/'+v.version+'>Version '+v.version+'</option>');
    $select.append($option);
  });

  $('#version-selector').append($select);

  $('#version-selection').on('change', changeVersion);
}

function changeVersion(){
  var path = $('#version-selection').val();
  window.location = path;
}

})();