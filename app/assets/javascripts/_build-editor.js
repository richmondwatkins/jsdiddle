var htmlEditor;
var javascriptEditor;
var cssEditor;

(function(){
$(document).ready(init);


function init(){
  if($('#mainSplitter').length){
    makePanes();

    $('#theme-selection').on('change', changeTheme);

    createEditors();

  }
}

function makePanes(){
  var width = $(window).width();
  var panelSize = ((width * 0.85) / 2);
  var height = $(window).height();
  $('#mainSplitter').jqxSplitter({ width: '86%', height: height, panels: [{ size: panelSize }] });
  $('#leftSplitter').jqxSplitter({ width: '100%', height: '100%', orientation: 'horizontal', panels: [{ size: '50%', collapsible: false }] });
  $('#rightSplitter').jqxSplitter({ width: '100%', height: '100%', orientation: 'horizontal', panels: [{ size: '50%', collapsible: false }] });
}

function createEditors(){
 htmlEditor = (function() {
    var aceEditor = ace.edit("upper-left-editor");
    aceEditor.setTheme("ace/theme/clouds");
    aceEditor.getSession().setMode("ace/mode/html");
    return aceEditor;
  })();

 javascriptEditor = (function() {
    var aceEditor = ace.edit("lower-left-editor");
    aceEditor.setTheme("ace/theme/clouds");
    aceEditor.getSession().setMode("ace/mode/javascript");
    return aceEditor;
  })();

 cssEditor = (function() {
    var aceEditor = ace.edit("upper-right-editor");
    aceEditor.setTheme("ace/theme/clouds");
    aceEditor.getSession().setMode("ace/mode/css");
    return aceEditor;
  })();

}

function changeTheme(){
  var theme = $('#theme-selection').val();
  javascriptEditor.setTheme(theme);
  htmlEditor.setTheme(theme);
  cssEditor.setTheme(theme);
}


})();