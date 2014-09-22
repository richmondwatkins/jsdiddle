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
  // $('iframe').remove();
  // var iframe = document.createElement("iframe");
  // iframe.setAttribute("id", "results");  
  // iframe.setAttribute("sandbox", "allow-forms allow-popups allow-scripts allow-same-origin" );

  // iframe.onload = function() {
    console.log(library);
  $('head', window.frames['results'].document).append(library);

  var ifrm = document.getElementById('results');
  // console.log(ifrm);
  // var script   = document.createElement("script");
  // script.type  = "text/javascript";
  // // script.src   = "path/to/your/javascript.js";    // use this for linked script
  // script.text  = "alert('voila!');"               // use this for inline script
  // ifrm.body.appendChild(script);
  $("#results").attr(
   "src", "data:text/html;charset=utf-8," + 
   "<html>" + 
   html +
   "<style>"+css+"</style>" + 
   "<script src=\""+library+"\"><" + "/script>" +   
   "<script>"+js+"<" + "/script>" +         
   "</html>"
);


  // ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;
  // ifrm.document.open();
  // ifrm.document.write('Hello World!');
  // ifrm.document.close();

  //   document.getElementById('results').contentWindow.document.write(
  //                                                                       '<style>'+css+'</style>'+
  //                                                                       '<script type="text/javascript">' +
  //                                                                          'window.onload = function(){'+js+'}' +
  //                                                                       '</script>' +
  //                                                                       '<body>'
  //                                                                         +html+
  //                                                                       '</body>' 
  //                                                                     );
  // // };

  // $('#iframe-container').append(iframe);

  e.preventDefault();
 }

 

// <iframe name="result" sandbox="allow-forms allow-popups allow-scripts allow-same-origin" frameborder="0"></iframe>




})();