(function(){
$(document).ready(init);

function init(){
  $('#run').click(buildCode);
  $('#save').click(saveProject);
  syntax(); 
  makePanes();
}
 function makePanes(){
    var width = $(window).width();
    var panelSize = (width / 2);
    var height = $(window).height();
    $('#mainSplitter').jqxSplitter({ width: width, height: height, panels: [{ size: panelSize }] });
    $('#leftSplitter').jqxSplitter({ width: '100%', height: '100%', orientation: 'horizontal', panels: [{ size: '50%', collapsible: false }] });
    $('#rightSplitter').jqxSplitter({ width: '100%', height: '100%', orientation: 'horizontal', panels: [{ size: '50%', collapsible: false }] });
 }

  var htmlEditor;
  var javascriptEditor;
  var cssEditor;

 function syntax(){
    
  htmlEditor = ace.edit("upper-left-editor");
  javascriptEditor = ace.edit("lower-left-editor");
  cssEditor = ace.edit("upper-right-editor");

  htmlEditor.setTheme("ace/theme/monokai");
  javascriptEditor.setTheme("ace/theme/monokai");
  cssEditor.setTheme("ace/theme/monokai");

  htmlEditor.getSession().setMode("ace/mode/html");
  javascriptEditor.getSession().setMode("ace/mode/javascript");
  cssEditor.getSession().setMode("ace/mode/css");

  htmlEditor.getSession().setUseSoftTabs(true);
  javascriptEditor.getSession().setUseSoftTabs(true);
  cssEditor.getSession().setUseSoftTabs(true);
 }

 function buildCode(e){
  var html = htmlEditor.getValue();
  var js = javascriptEditor.getValue();
  var css = cssEditor.getValue();

  $('iframe').remove();
  var iframe = document.createElement("iframe");
  iframe.setAttribute("id", "results");  

  iframe.onload = function() {
    document.getElementById('results').contentWindow.document.write('<html class="results-html"><script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script><style>'+css+'</style><body>'+html+'<script>'+js+'</script></body></html>');
  };

  $('#iframe-container').append(iframe);

  e.preventDefault();
 }

function saveProject(e){
  var html = htmlEditor.getValue();
  var js = javascriptEditor.getValue();
    var css = cssEditor.getValue();
    $.ajax({
      type: "POST",
      url: "/projects",
      data: { project: { name: "Project", html: html, javascript: js, css:css } },
      success: function(data){
        window.location = '/projects/' + data.id;
      }
    });

  e.preventDefault();
} 

})();