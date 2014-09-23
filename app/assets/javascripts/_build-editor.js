var htmlEditor;
var javascriptEditor;
var cssEditor;

(function(){
$(document).ready(init);


function init(){
  ace.config.set("workerPath", "/perm_assets/javascripts");

  if($('#mainSplitter').length){
    makePanes();
    $('#theme-selection').on('change', changeTheme);
    $('#font-size').on('change', changeFontSize);
    createEditors();
    $('#export-gist').click(exportGist);
    // $(window).on('beforeunload', checkLeave);
}

function checkLeave(e){
  console.log('check');
   if(htmlEditor.getValue().length > 2 || cssEditor.getValue().length > 2 || javascriptEditor.getValue().length > 2){
      console.log(cssEditor.getValue().length);
        return 'Are you sure?';
    }
  }
}

function makePanes(){
  var width = $(window).width();
  var panelSize = ((width * 0.85) / 2);
  $('#mainSplitter').jqxSplitter({ width: '86%', height: '90%', panels: [{ size: panelSize }] });
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

function changeFontSize(){
  var fontSize = $('#font-size').val();
  javascriptEditor.setFontSize(fontSize);
  htmlEditor.setFontSize(fontSize);
  cssEditor.setFontSize(fontSize);
}

function exportGist(e){
  $('#gist-url').remove();

  var html = htmlEditor.getValue();
  var js = javascriptEditor.getValue();
  var css = cssEditor.getValue();
  // var name = $('#project-name').val();
  // var library = $('#library-selection').val()

  if(js.length < 4 ){
    js = "No Content";
  }

  if (css.length < 4){
    css = "No Content";
  }

  if (html.length < 4){
    html = "No Content";
  }

  var gistData = {
              "description": "From jsdiddle",
              "public": true,
              "files": {
                "jsdiddle.html": {
                  "content": html
                },
                "jsdiddle.js": {
                  "content": js
                },
                "jsdiddle.css": {
                  "content": css
                }
              }
            };

   $.ajax({
      type: "POST",
      dataType: "json",
      url: 'https://api.github.com/gists',
      data: JSON.stringify(gistData),
      dataType: "json",
      crossDomain: !0,
      success: function(data){
      appendGistUrl(data.html_url);
      }
    });

   e.preventDefault();
}

function appendGistUrl(url){
  var $li = $('<li id="gist-url"><a href="'+url+'" target="_blank">Gist Created!</a></li>');

  $('.sidebar-nav').append($li);
}


})();