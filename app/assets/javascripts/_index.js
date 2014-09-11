(function(){
$(document).ready(init);

function init(){
  $('#save').click(saveProject);
  $("#menu-toggle").click(toggleMenu);
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


var menuToggle = false;
function toggleMenu(e){
  var width = $(window).width();
  var panelSize = (width  / 2);
  var height = $(window).height();
  if(menuToggle === false){
    $("#wrapper").toggleClass("toggled");
    $('#mainSplitter').jqxSplitter({ width: width, height: height, panels: [{ size: panelSize }] });

    menuToggle = true;
  }else{
    panelSize = ((width * 0.85) / 2);
    $("#wrapper").toggleClass("toggled");
    $('#mainSplitter').jqxSplitter({ width: '85%', height: height, panels: [{ size: panelSize }] });
    menuToggle = false;
  }
  e.preventDefault();  
}

})();