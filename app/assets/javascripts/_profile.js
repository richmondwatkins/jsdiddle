(function(){

$(document).ready(init);

function init(){
  getUserProjects();

  window.onscroll = function(event){
      if ( $(window).scrollTop() + $(window).height() >= $(document).height() -100 ){
        getUserProjects();
      }
    }
}

var page = 1;
function getUserProjects(){
  var id = $('#user-id').data('id');  
  $.ajax({
      type: "GET",
      dataType: "json",
      url: "/user/" + id + "/projects/" + page,
      success: function(data){
        data.forEach(function(p){
          loadIframes(p);
        });

        page += 1;
      }
    });
}

 function loadIframes(data){
    data.javascript = data.javascript.replace(/"/g, "'");

    var iframe = $('<div class="project-div" id="project-'+data.params+'">' +
                      '<div class="profile-sub-menu">' +
                        '<a href="/' + data.params + '"class="run-'+data.params+'" id="project-link-'+data.params+'">' + data.name + '</a>'+
                        '<a href="#" class= "profile-icon" id=trash-'+data.params+' data-id="'+data.id+'"> ' +
                          '<span class="glyphicon glyphicon-trash"></span>' +
                        '</a>'+
                        '<div id="content">'+
                          '<ul id="tabs" class="nav nav-tabs" data-tabs="tabs">' +
                            '<li class="active"><a href="#output-'+data.params+'" data-toggle="tab">Output</a></li>' +
                            '<li><a href="#html-'+data.params+'" id="html-click-handler" data-toggle="tab">HTML</a></li>' +
                            '<li><a href="#css-'+data.params+'" data-toggle="tab">CSS</a></li>'+
                            '<li><a href="#javascript-'+data.params+'" data-toggle="tab" id="js-link-'+data.params+'" data-javascript=" ">Javascript</a></li>' +
                         '</ul>' +
                           '<div id="my-tab-content" class="tab-content">' +
                              '<div class="tab-pane html" id="html-'+data.params+'">' +                            
                              '</div>' +
                              '<div class="tab-pane css" id="css-'+data.params+'">' +
                              '</div>' +
                              '<div class="tab-pane javascript" id="javascript-'+data.params+'">' +
                              '</div>' +
                              '<div class="tab-pane active" id="output-'+data.params+'" >' +
                                  '<iframe class="project-iframe" , id="' + data.id + '"></iframe>' +
                              '</div>' +
                          '</div>' +
                        '</div>' +
                      '</div>' +
                  '</div>'
  );
    

    $('#projects-container').append(iframe);

    if(data.javascript.length > 4){
      $('#project-link-'+data.params).after('<a href="#" class="profile-icon" class="run-js-'+data.params+' run" >' +
                                               '<span class="glyphicon glyphicon-play run-js-'+data.params+' run" data-javascript="' + data.javascript + '" data-id="' + data.id + '"></span>' +
                                              '</a>');
      $('.run-js-'+data.params+'').click(runJS);
    }

      $('#trash-'+data.params).click(destroyProject);
    document.getElementById(data.id).contentWindow.document.write('<!DOCTYPE html>' +
                                                                  '<html class="results-html">' +
                                                                    data.library+ 
                                                                    '<style>'+data.css+'</style>'+
                                                                    '<body>' 
                                                                      +data.html+
                                                                      '<script>' 
                                                                          +data.javascript+
                                                                      '</script>'+
                                                                    '</body>' +
                                                                  '</html>');

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
                    var aceEditor = ace.edit("html-"+data.params);
                    aceEditor.setTheme("ace/theme/clouds");
                    aceEditor.getSession().setMode("ace/mode/html");
                    aceEditor.setReadOnly(true);    
                    aceEditor.session.setUseSoftTabs(false)               
                    return aceEditor;
                  })();
                
  profileHtmlEditor.setValue(data.html);

   profileCssEditor = (function() {
                    var aceEditor = ace.edit("css-"+data.params);
                    aceEditor.setTheme("ace/theme/clouds");
                    aceEditor.getSession().setMode("ace/mode/html");
                    aceEditor.setReadOnly(true);                    
                    return aceEditor;
                  })();
  profileCssEditor.setValue(data.css);

  profileJavascriptEditor = (function() {
                    var aceEditor = ace.edit("javascript-"+data.params);
                    aceEditor.setTheme("ace/theme/clouds");
                    aceEditor.getSession().setMode("ace/mode/html");
                    aceEditor.setReadOnly(true);
                    return aceEditor;
                  })();
  profileJavascriptEditor.setValue(data.javascript);
}

})();