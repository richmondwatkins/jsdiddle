(function(){

$(document).ready(init);

function init(){
  $('#run').click(buildCode);
}


 function buildCode(e){
    var html = htmlEditor.getValue();
    var js = javascriptEditor.getValue();
    var css = cssEditor.getValue();
    var library = $('#library-selection').val()

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