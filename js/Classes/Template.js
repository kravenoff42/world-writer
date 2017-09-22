function Template(tempFromDB,index,catID,varCnt,template,tempID){
    //Properties
    this.index = index;
    this.tempID = null;
    this.catID = null; 
    this.varCnt = null;
    this.template = null;
    this.additionalCats = [];
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
    window.$.ajax({
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
    window.$( document ).ajaxSuccess(function( event, xhr, settings ) {
        var d = settings.data;
      if ( settings.url == "/models/DB.php"  && d.includes("insertTemplate")) {
          try{
          var results = JSON.parse(xhr.responseText);
          var id = results[0]['LAST_INSERT_ID()'];
          window.location.reload();
          }catch(e){
              console.log(e);
              var footerLog = document.getElementById('log');
              footerLog.innerHTML = xhr.responseText;
          }
      }
    });
};

Template.prototype.createListGroupItem = function(){
    var div = document.createElement('div');
    div.classList.add('list-group-item');
    div.classList.add('TemplistGroupItems');
    var span = document.createElement('span');
    span.classList.add('list-group-item-text');
    var text = 'Template-'+this.tempID+": "+this.template+"?";
    span.innerHTML = text;
    div.appendChild(span);
    return div;
};

Template.prototype.getAdditionalCats = function(){
    if(this.varCnt>1){
        var array=[];
        var tArr = this.template.split("0");
        for(var i=0, len=tArr.length;i<len;i++){
            if(window.cats.toID(tArr[i])){
                array.push(window.cats.toID(tArr[i]));
            }
        }
        this.additionalCats=array;
    }
};