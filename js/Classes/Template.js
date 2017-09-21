function Template(tempFromDB,catID,varCnt,template,tempID){
    this.tempID = null;
    this.catID = null; 
    this.varCnt = null;
    this.template = null; 
    if(tempFromDB){
        if(tempFromDB.tempID){
            this.tempID = tempFromDB.tempID; 
        }
        if(tempFromDB.catID){
            this.catID = tempFromDB.catID; 
        }
        if(tempFromDB.catID){
            this.varCnt = tempFromDB.varCnt;
        }
        if(tempFromDB.catID){
            this.template = tempFromDB.template; 
        }
    }else{
        if(catID){
            this.catID = catID; 
        }
        if(varCnt){
            this.varCnt = varCnt;
        }
        if(template){
            this.template = template; 
        }
    }
}

Template.prototype.insertTemplate = function(){
    if(!(this.catID && this.varCnt && this.template)) { return false;}
    var tid = 0;
    $.ajax({
        url: '/models/DB.php',
        type: 'POST',
        jsonp: 'callback',
        data: {
            'table':'questionTemplates',
            'function':'insertTemplate', 
            'catID': this.catID,
            'varCnt': this.varCnt,
            'template': this.template,
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
              var footerLog = document.getElementById('log');
              footerLog.innerHTML = xhr.responseText;
          }
      }
    });
    this.tempID = tid;
}

Template.prototype.createListGroupItem = function(){
    var div = document.createElement('div');
    div.classList.add('list-group-item');
    div.classList.add('TemplistGroupItems');
    var span = document.createElement('span');
    span.classList.add('list-group-item-text');
    var text = 'Template-'+this.tempID+": "+this.template+"?";
    span.innerHTML = text;
    div.appendChild(span)
    return div;
}