(function(){

$(document).ready(function () {
    queryProject();
    makePanes();
    syntax(); 
    $('#run').click(buildCode);
    $('#save').click(saveProject);
  });

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

  var data = {html: html, javascript: js, css: css};
  loadIframe(data);

  e.preventDefault();
 }

 function queryProject(){

  var path = window.location.pathname;
  var regex =  /\d+/;
  var id = path.match(regex);

  $.ajax({
      type: "GET",
      dataType: "json",
      url: "/projects/" + id,
      success: function(data){
        htmlEditor.setValue(data.html);
        javascriptEditor.setValue(data.javascript);
        cssEditor.setValue(data.css);

        loadIframe(data);
      }
    });
 }

 function loadIframe(data){
 
    $('iframe').remove();
    var iframe = $('<iframe id="results"></iframe>');
    $('#iframe-container').append(iframe);
    document.getElementById('results').contentWindow.document.write('<html class="results-html"><script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js">alert("adf");</script></script><style>'+data.css+'</style><body>'+data.html+'<script>'+data.javascript+'</script></body></html>');
 }


function saveProject(e){
  var path = window.location.pathname;
  var regex =  /\d+/;
  var id = path.match(regex);

  var html = htmlEditor.getValue();
  var js = javascriptEditor.getValue();
  var css = cssEditor.getValue();
    $.ajax({
      type: "PUT",
      url: "/projects/" +id,
      data: { project: { name: "Project", html: html, javascript: js, css:css } }
    });

  e.preventDefault();
} 

})();