function Page(){
    this.pageID;
    this.pageTitle;
    this.content;
    this.lastModified;
    this.dateCreated;
}

Page.prototype.getPagesAll = function(){
     var tempList = [];
    $.ajax({
        url: '/models/DB.php',
        type: 'POST',
        datatype: 'jsonp',
        jsonp: 'callback',
        data: {
            'table':'pages',
            'function':'getPagesAll', 
            },
         error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log(data)
         }
    });
    $( document ).ajaxSuccess(function( event, xhr, settings ) {
        var d = settings.data;
      if ( settings.url == "/models/DB.php"  && d.includes("getPagesAll")) {
          try{
              var results = JSON.parse(xhr.responseText);
              for(var i = 0;i<results.length;i++){
                   tempList.push(results[i]);
              }
          }catch(e){
              console.log(e);
              console.log(xhr.responseText);
          }
      }
    });
    return tempList;
}