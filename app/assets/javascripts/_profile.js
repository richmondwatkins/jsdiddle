(function(){

$(document).ready(init);

function init(){
  getUserProjects();
}

function getUserProjects(){
  var id = $('#user-id').data('id');
  $.ajax({
      type: "GET",
      dataType: "json",
      url: "/user/" + id + "/projects",
      success: function(data){
        data.forEach(function(p){
          loadIframes(p);
        });
      }
    });
}

function loadIframes(data){
  data.javascript = data.javascript.replace(/"/g, "'");
  if(data.javascript.length > 4){
    var iframe = $('<div class="project-div">' +
                      '<div>' +
                        '<a href="/' + data.params + '">' + data.name + '</a><a href="#" class="run-js-'+data.params+'" data-javascript="' + data.javascript + '" data-id="' + data.id + '">' +
                          '<span class="glyphicon glyphicon-play"></span>' +
                        '</a>' +
                        '<div id="content">'+
                          '<ul id="tabs" class="nav nav-tabs" data-tabs="tabs">' +
                            '<li class="active"><a href="#output-'+data.params+'" data-toggle="tab">Output</a></li>' +
                            '<li><a href="#html-'+data.params+'" id="html-click-handler" data-toggle="tab">HTML</a></li>' +
                            '<li><a href="#css-'+data.params+'" data-toggle="tab">CSS</a></li>'+
                            '<li><a href="#javascript-'+data.params+'" data-toggle="tab">Javascript</a></li>' +
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

    document.getElementById(data.id).contentWindow.document.write('<!DOCTYPE html><html class="results-html"> '+data.library+'</script> \
      <style>'+data.css+'</style><body>'+data.html+'</body></html>');

    
    $('.run-js-'+data.params+'').click(runJS);


  }else{
    var iframe = $('<div class="project-div">' +
                      '<div>' +
                        '<a href="/' + data.params + '">' + data.name + '</a><a href="#" class="run-js" data-javascript="' + data.javascript + '" data-id="' + data.id + '"></a>' +
                        '<div id="content">'+
                          '<ul id="tabs" class="nav nav-tabs" data-tabs="tabs">' +
                            '<li class="active"><a href="#output-'+data.params+'" data-toggle="tab">Output</a></li>' +
                            '<li><a href="#html-'+data.params+'" id="html-click-handler" data-toggle="tab">HTML</a></li>' +
                            '<li><a href="#css-'+data.params+'" data-toggle="tab">CSS</a></li>'+
                            '<li><a href="#javascript-'+data.params+'" data-toggle="tab">Javascript</a></li>' +
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

    document.getElementById(data.id).contentWindow.document.write('<!DOCTYPE html>' +
                                                                  '<html class="results-html">' +
                                                                    '<script src="'+data.library+'"></script>'+ 
                                                                    '<style>'+data.css+'</style>'+
                                                                    '<body>'+data.html+'</body>' +
                                                                  '</html>');
  }

        loadEditors(data);


 }

 function runJS(e){
  var js = $(this).data('javascript');
  var projectId = $(this).data('id');
  var doc = document.getElementById(projectId).contentWindow.document.write('<script>'+js+'</script>');
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
                    // aceEditor.setReadOnly(true);    
                    aceEditor.session.setUseSoftTabs(false)               
                    return aceEditor;
                  })();
                
  profileHtmlEditor.setValue(data.html);

   profileCssEditor = (function() {
                    var aceEditor = ace.edit("css-"+data.params);
                    aceEditor.setTheme("ace/theme/clouds");
                    aceEditor.getSession().setMode("ace/mode/html");
                    // aceEditor.setReadOnly(true);                    
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