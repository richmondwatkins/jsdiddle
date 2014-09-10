(function(){

$(document).ready(init);

function init(){
  getUserProjects();
}

function getUserProjects(){
  var id = $('#user-id').data('id');
  $.ajax({
      type: "GET",
      dataType: "json",
      url: "/user/" + id + "/projects",
      success: function(data){
        data.forEach(function(p){
          loadIframes(p);
        });
      }
    });
}

function loadIframes(data){
    var iframe = $('<iframe class="project-iframe", id="'+data.id+'"></iframe>');
    $('#projects-container').append(iframe);
    document.getElementById(data.id).contentWindow.document.write('<html class="results-html"><script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js">alert("adf");</script></script><style>'+data.css+'</style><body>'+data.html+'<script>'+data.javascript+'</script></body></html>');
 }


})();