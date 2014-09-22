(function(){

$(document).ready(init);

function init(){
  $('#run').click(buildCode);
}


 function buildCode(e){
    console.log('in _index.js');
    var html = htmlEditor.getValue();
    var js = javascriptEditor.getValue();
    var css = cssEditor.getValue();
    var library = $('#library-selection').val()

    $('head', window.frames['results'].document).append(library);

    // var ifrm = document.getElementById('results');

    $("#results").attr(
     "src", "data:text/html;charset=utf-8," + 
     "<html>" + 
     html +
     "<style>"+css+"</style>" + 
     "<script src=\""+library+"\"><" + "/script>" +   
     "<script>"+js+"<" + "/script>" +         
     "</html>"
  );

    e.preventDefault();
 }

 

})();