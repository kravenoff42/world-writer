function Template(catID,varCnt,template,tempID){
    this.tempID;
    
    this.catID = catID; 
    this.varCnt = varCnt;
    this.template = template; 
    
    if(tempID!=null){
        this.tempID = tempID;
    }else{
        this.insertTemplate(this.catID, this.varCnt, this.template);
    }
}

Template.prototype.insertTemplate = function( catID, varCnt, template){
    var tid = 0;
    $.ajax({
        url: '/models/DB.php',
        type: 'POST',
        jsonp: 'callback',
        data: {
            'table':'questionTemplates',
            'function':'insertTemplate', 
            'catID': catID,
            'varCnt': varCnt,
            'template': template,
        },
        error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log(data);
        }
    });
    $( document ).ajaxSuccess(function( event, xhr, settings ) {
        var d = settings.data;
      if ( settings.url == "/models/DB.php"  && d.includes("insertTemplate")) {
          try{
          var results = JSON.parse(xhr.responseText);
          tid = results[0]['LAST_INSERT_ID()'];
          console.log(results[0]);
          location.reload();
          }catch(e){
              console.log(e);
              console.log(xhr.responseText);
          }
      }
    });
    this.tempID = tid;
}

Template.prototype.createListGroupItem = function(){
    var div = document.createElement('div');
    div.classList.add('list-group-item');
    var span = document.createElement('span');
    span.classList.add('list-group-item-text');
    var text = 'Template-'+this.tempID+": "+this.template+"?";
    span.innerHTML = text;
    div.appendChild(span)
    return div;
}