(function(){

  $(document).ready(init);

  function init(){
    getAllProjects();
  }


  function getAllProjects(){
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "/projects/get_all",
      success: function(data){
        data.forEach(function(d){
          loadIframes(d);
        });
      }
    });
  }


  function loadIframes(data){
  if(data.javascript.length > 4){
    var iframe = $('<div class="project-div"><div><button class="run-js" data-javascript="'+data.javascript+'" data-id="'+data.id+'">Run JS</button><a href="/projects/'+data.params+'/'+data.version+'">'+data.name+'</a></div> \
      <iframe class="project-iframe", id="'+data.id+'"></iframe></div>');

    $('#all-projects-container').append(iframe);

    document.getElementById(data.id).contentWindow.document.write('<!DOCTYPE html><html class="results-html"> '+data.library+'</script> \
      <style>'+data.css+'</style><body>'+data.html+'</body></html>');

    $('.run-js').click(runJS);

  }else{
    var iframe = $('<div class="project-div"><div><a href="/'+data.params+'">'+data.name+'</a></div><iframe class="project-iframe", id="'+data.id+'"></iframe></div>');

    $('#all-projects-container').append(iframe);

    document.getElementById(data.id).contentWindow.document.write('<!DOCTYPE html><html class="results-html"><script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script></script> \
      <style>'+data.css+'</style><body>'+data.html+'</body></html>');
  }
 }

 function runJS(){
  var js = $(this).data('javascript');
  var projectId = $(this).data('id');

  document.getElementById(projectId).contentWindow.document.write('<script>'+js+'</script>');

 }


})();




