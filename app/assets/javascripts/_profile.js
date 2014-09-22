(function(){

$(document).ready(init);

var isOwner;
function init(){
  checkForOwner();

  window.onscroll = function(event){
      if ( $(window).scrollTop() + $(window).height() === $(document).height()  ){
        getUserProjects();
      }
    }
}

function checkForOwner(project){
   var id = $('#user-id').data('id');  

  $.ajax({
      type: "GET",
      dataType: "json",
      url: "/current/user/"+id,
      success: function(result){
        if(result === true){
          isOwner = true;
        }else {
          isOwner = false;
        }
         getUserProjects();
      }
    });
}

var page = 1;
function getUserProjects(){
  var id = $('#user-id').data('id');  
  $.ajax({
      type: "GET",
      dataType: "json",
      url: "/user/" + id + "/projects/" + page,
      success: function(data){
        // console.log(data);
        data.forEach(function(p){
          loadIframes(p);
        });

        page += 1;
      }
    });
}

 function loadIframes(data){
  // console.log(data);
    data.javascript = data.project.javascript.replace(/"/g, "'");

    var iframe = $('<div class="project-div" id="project-'+data.project.params+'">' +
                      '<div id="profile-sub-menu'+data.project.params+'">' +
                        '<a href="/' + data.project.params + '"class="run-'+data.project.params+'" id="project-link-'+data.project.params+'">' + data.project.name + '</a>'+
                        '<div id="content">'+
                          '<ul id="tabs" class="nav nav-tabs" data-tabs="tabs">' +
                            '<li class="active"><a href="#output-'+data.project.params+'" data-toggle="tab">Output</a></li>' +
                            '<li><a href="#html-'+data.project.params+'" id="html-click-handler" data-toggle="tab">HTML</a></li>' +
                            '<li><a href="#css-'+data.project.params+'" data-toggle="tab">CSS</a></li>'+
                            '<li><a href="#javascript-'+data.project.params+'" data-toggle="tab" id="js-link-'+data.project.params+'" data-javascript=" ">Javascript</a></li>' +
                         '</ul>' +
                           '<div id="my-tab-content" class="tab-content">' +
                              '<div class="tab-pane html" id="html-'+data.project.params+'">' +                            
                              '</div>' +
                              '<div class="tab-pane css" id="css-'+data.project.params+'">' +
                              '</div>' +
                              '<div class="tab-pane javascript" id="javascript-'+data.project.params+'">' +
                              '</div>' +
                              '<div class="tab-pane active" id="output-'+data.project.params+'" >' +
                                  '<iframe class="project-iframe" , id="' + data.project.id + '"></iframe>' +
                              '</div>' +
                          '</div>' +
                        '</div>' +
                      '</div>' +
                  '</div>'
  );
    

    $('#projects-container').append(iframe);

    if(data.project.javascript.length > 4){
      $('#project-link-'+data.project.params).after('<a href="#" class="profile-icon" class="run-js-'+data.project.params+' run" >' +
                                                      '<span class="glyphicon glyphicon-play run-js-'+data.project.params+' run" data-javascript="' + data.project.javascript + '" data-id="' + data.project.id + '"></span>' +
                                                    '</a>');
      $('.run-js-'+data.project.params+'').click(runJS);
    }


      document.getElementById(data.project.id).contentWindow.document.write('<!DOCTYPE html>' +
                                                                    '<html class="results-html">' +
                                                                      data.project.library+ 
                                                                      '<style>'+data.project.css+'</style>'+
                                                                      '<body>' 
                                                                        +data.project.html+
                                                                        '<script>' 
                                                                            +data.project.javascript+
                                                                        '</script>'+
                                                                      '</body>' +
                                                                    '</html>');


      if(data.versions.length){
         var $select = $('<select class="profile-version-select" id="profile-versions-'+data.project.params+'">'+
                            '<option>Select Version</option>' +
                            '<option value="'+data.project.params+'">Original</option>' +
                          '</select>');

        data.versions.forEach(function(v){
         var $option = $('<option value="/'+data.project.params+'/'+v.version+'">Version '+v.version+'</option>');
         $($select).append($option);
        });

        $('#project-link-'+data.project.params).after($select);

        $('#profile-versions-'+data.project.params).on('change', changeVersion);
      }


      if(isOwner === true){
        var $trashIcon =  $('<a href="#" class= "profile-icon" id=trash-'+data.project.params+' data-id="'+data.project.id+'"> ' +
                          '<span class="glyphicon glyphicon-trash"></span>' +
                        '</a>');
         $('#project-link-'+data.project.params).after($trashIcon);
         $('#trash-'+data.project.params).click(destroyProject);
      }

    loadEditors(data);

 }

 function runJS(e){
  var js = $(this).data('javascript');
  var projectId = $(this).data('id');
  var doc = document.getElementById(projectId).contentWindow.document.write('<script>'+js+'</script>');
  e.preventDefault();
 }

 function destroyProject(e){
  var projectId = $(this).data('id');
  console.log(projectId);
  $.ajax({
      type: "DELETE",
      dataType: "json",
      url: "/projects/" + projectId,
      success: function(data){
       $('#project-'+data.params).remove();
      }
    });
  e.preventDefault();
 }

 var profileHtmlEditor;
 var profilecCssEditor;
 var profileJavascriptEditor;
 function loadEditors(data){
   profileHtmlEditor = (function() {
                    var aceEditor = ace.edit("html-"+data.project.params);
                    aceEditor.setTheme("ace/theme/clouds");
                    aceEditor.getSession().setMode("ace/mode/html");
                    aceEditor.setReadOnly(true);    
                    aceEditor.session.setUseSoftTabs(false)               
                    return aceEditor;
                  })();
                
  profileHtmlEditor.setValue(data.project.html);

   profileCssEditor = (function() {
                    var aceEditor = ace.edit("css-"+data.project.params);
                    aceEditor.setTheme("ace/theme/clouds");
                    aceEditor.getSession().setMode("ace/mode/html");
                    aceEditor.setReadOnly(true);                    
                    return aceEditor;
                  })();
  profileCssEditor.setValue(data.project.css);

  profileJavascriptEditor = (function() {
                    var aceEditor = ace.edit("javascript-"+data.project.params);
                    aceEditor.setTheme("ace/theme/clouds");
                    aceEditor.getSession().setMode("ace/mode/html");
                    aceEditor.setReadOnly(true);
                    return aceEditor;
                  })();
  profileJavascriptEditor.setValue(data.project.javascript);
}


function changeVersion(){
  var path = $(this).val();
  window.location = path;
}

})();