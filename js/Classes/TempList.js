function TempList(){
    this.list = [];
    
}

TempList.prototype.setList = function(){
    var tempList = [];
    $.ajax({
        url: '/models/DB.php',
        type: 'POST',
        datatype: 'jsonp',
        jsonp: 'callback',
        data: {
            'table':'questionTemplates',
            'function':'getTemplatesAll' 
            },
         error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log(data)
         }
    });
    $( document ).ajaxSuccess(function( event, xhr, settings ) {
        var d = settings.data;
        if ( settings.url == "/models/DB.php"  && d.includes("getTemplatesAll")) {
          try{
              var results = JSON.parse(xhr.responseText);
    
              for(var i = 0;i<results.length;i++){
                //   console.log(results[i])
                  var template = new Template(results[i]);
                  var div = template.createListGroupItem();
                  $(templatesView).prepend(div);
                  tempList.push(template);
                   
              }
          }catch(e){
              console.log(e);
             // console.log(xhr.responseText);
            //   var footerLog = document.getElementById('log');
            //   footerLog.innerHTML = xhr.responseText;
          }
        }
    });
    this.list = tempList;
}