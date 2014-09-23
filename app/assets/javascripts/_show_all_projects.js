(function(){

  $(document).ready(init);

  function init(){
    getAllProjects();

    window.onscroll = function(event){
      if ( $(window).scrollTop() + $(window).height() >= $(document).height() - 100 ){
        getAllProjects();
      }
    }
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
    data.project.javascript = data.project.javascript.replace(/"/g, "'");

    var iframe = $('<div class="project-div">' +
                      '<div id="sub-menu-'+data.project.params+'">' +
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
                    '<a id="user-link'+data.project.params+'" href="/users/'+data.owner.id+'">'+data.owner.name+'</a>' +
                  '</div>'
  );
    
    $('#all-projects-container').append(iframe);

      var gravatar = (function(){
        var hash = CryptoJS.MD5(data.owner.email);
        var url = "http://www.gravatar.com/avatar/"+hash+"?s=20&d=identicon";
        return url;
       })();

      var image = $('<img id="thumb-gravatar"src='+gravatar+'>');
      $('#sub-menu-'+data.project.params).after(image);

    // if(data.project.javascript.length > 4){

    //   $('#project-link-'+data.project.params).append('<a href="#" class="run-js-'+data.project.params+' run" data-javascript="' + data.project.javascript + '" data-id="' + data.project.id + '">' +
    //                                            '<span class="glyphicon glyphicon-play"></span>' +
    //                                           '</a>');

    //   $('.run-js-'+data.project.params+'').click(runJS);
    // }



    $("#"+data.project.id).attr(
     "src", "data:text/html;charset=utf-8," + 
     "<html>" + 
     data.project.html +
     "<style>"+data.project.css+"</style>" + 
     "<script src=\""+data.project.library+"\"><" + "/script>" +   
     "<script>"+data.project.javascript+"<" + "/script>" +         
     "</html>"
  );



    loadEditors(data.project);

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





