(function(){

  $(document).ready(init);

  function init(){
    getAllProjects();
    $('#view-more').click(getAllProjects);
  }

  var page = 1;
  function getAllProjects(){
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "/projects/get_all/" + page,
      success: function(data){
        data.forEach(function(d){
          loadIframes(d);
        });
      }
    });
    page += 1;
  }




  function loadIframes(data){
  data.javascript = data.javascript.replace(/"/g, "'");
  // if(data.javascript.length > 4){
  // }
    var iframe = $('<div class="project-div">' +
                      '<div>' +
                        '<a href="/' + data.params + '"class="run-'+data.params+'" id="project-link-'+data.params+'">' + data.name + '</a>'+
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
    

    $('#all-projects-container').append(iframe);

    if(data.javascript.length > 4){

      $('#project-link-'+data.params).append('<a href="#" class="run-js-'+data.params+' run" data-javascript="' + data.javascript + '" data-id="' + data.id + '">' +
                                '<span class="glyphicon glyphicon-play"></span>' +
                                '</a>');

      $('.run-js-'+data.params+'').click(runJS);
    }


    document.getElementById(data.id).contentWindow.document.write('<!DOCTYPE html>' +
                                                                  '<html class="results-html">' +
                                                                    ''+data.library+''+ 
                                                                    '<style>'+data.css+'</style>'+
                                                                    '<body>'+data.html+'</body>' +
                                                                  '</html>');


        loadEditors(data);

 }


 function runJS(e){
  var js = $(this).data('javascript');
  var projectId = $(this).data('id');

  document.getElementById(projectId).contentWindow.document.write('<script>'+js+'</script>');

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





