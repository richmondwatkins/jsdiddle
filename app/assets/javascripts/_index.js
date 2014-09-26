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

    $("#results").remove();
    var iframe = $('<iframe id="results" sandbox="allow-forms allow-popups allow-scripts allow-same-origin"></iframe>');
    $('#iframe-container').append(iframe);

    $("#results").attr(
     "src", "data:text/html;charset=utf-8," + 
     "<html>" + 
         "<head>" +
            "<script src=\""+library+"\"><" + "/script>" +  
            "<style>"+css+"</style>" +  
         "</head>" +
     html +
     "<script>"+js+"<" + "/script>" +         
     "</html>"
  );

    e.preventDefault();
 }

 

})();