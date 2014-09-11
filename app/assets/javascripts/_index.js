(function(){
$(document).ready(init);

function init(){
  $('#save').click(saveProject);
}
 

function saveProject(e){
  var html = htmlEditor.getValue();
  var js = javascriptEditor.getValue();
  var css = cssEditor.getValue();
  var name = $('#project-name').val();
    $.ajax({
      type: "POST",
      url: "/projects",
      data: { project: { name: name, html: html, javascript: js, css:css } }
    });

  e.preventDefault();
} 

})();