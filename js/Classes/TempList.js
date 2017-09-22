function TempList(){
    this.list = [];
    
}

TempList.prototype.setList = function(){
    window.$.ajax({
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
            console.log(data);
         }
    });
    window.$( document ).ajaxSuccess(function( event, xhr, settings ) {
        var d = settings.data;
        if ( settings.url == "/models/DB.php"  && d.includes("getTemplatesAll")) {
          try{
              var results = JSON.parse(xhr.responseText);
    
              for(var i = 0;i<results.length;i++){
                //   console.log(results[i])
                  var template = new window.Template(results[i],i);
                  if(window.templatesView!==null){
                      var div = template.createListGroupItem();
                      window.$(window.templatesView).prepend(div);
                  }
                  window.templates.list.push(template);
              }
              console.log('templates.list Set');
          }catch(e){
              console.log(e);
             // console.log(xhr.responseText);
            //   var footerLog = document.getElementById('log');
            //   footerLog.innerHTML = xhr.responseText;
          }
        }
    });
};