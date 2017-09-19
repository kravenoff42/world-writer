function Page(pageFromDB, pageTitle,content,lastModified,dateCreated,pageID){
    if(pageFromDB){
        this.pageID = pageFromDB.pageID;
        this.pageTitle = pageFromDB.pageTitle;
        this.content = pageFromDB.content;
        this.lastModified = pageFromDB.lastModified;
        this.dateCreated = pageFromDB.dateCreated;
    }else{
        if (pageID){
            this.pageID = pageID;
        }else{
            this.pageID = null;
        }
        if (pageTitle){
            this.pageTitle = pageTitle;
        }else{
            this.pageTitle = null;
        }
        if (content){
            this.content = content;
        }else{
            this.content = null;
        }
        if (lastModified){
            this.lastModified = lastModified;
        }else{
            this.lastModified = null;
        }
        if (dateCreated){
            this.dateCreated = dateCreated;
        }else{
            this.dateCreated = null;
        }
    }
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
            'function':'getPagesAll' 
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
              var footerLog = document.getElementById('log');
              footerLog.innerHTML = xhr.responseText;
          }
      }
    });
    return tempList;
}

Page.prototype.insertPage = function(){
    if(!(this.pageTitle && this.content)) { return false;}
    var tempList = [];
    $.ajax({
        url: '/models/DB.php',
        type: 'POST',
        datatype: 'jsonp',
        jsonp: 'callback',
        data: {
            'table':'pages',
            'function':'insertPage',
            'pageTitle':this.pageTitle,
            'content':this.content
            },
         error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log('insertPage',data)
         }
    });
    $( document ).ajaxSuccess(function( event, xhr, settings ) {
        var d = settings.data;
      if ( settings.url == "/models/DB.php"  && d.includes("insertPage")) {
          try{
              var results = JSON.parse(xhr.responseText);
              for(var i = 0;i<results.length;i++){
                   tempList.push(results[i]);
              }
              
          }catch(e){
              console.log(e);
              var footerLog = document.getElementById('log');
              footerLog.innerHTML = xhr.responseText;
          }
      }
    });
    console.log(tempList);
}

Page.prototype.updatePage = function(){
    if(!(this.pageID && this.pageTitle && this.content)) { return false;}
    var tempList = [];
    $.ajax({
        url: '/models/DB.php',
        type: 'POST',
        datatype: 'jsonp',
        jsonp: 'callback',
        data: {
            'table':'pages',
            'function':'updatePage',
            'pageID': this.pageID,
            'pageTitle': this.pageTitle,
            'content': this.content,
            },
         error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log(data)
         }
    });
    $( document ).ajaxSuccess(function( event, xhr, settings ) {
        var d = settings.data;
      if ( settings.url == "/models/DB.php"  && d.includes("updatePage")) {
          try{
              var results = JSON.parse(xhr.responseText);
              for(var i = 0;i<results.length;i++){
                   tempList.push(results[i]);
              }
          }catch(e){
              console.log(e);
              var footerLog = document.getElementById('log');
              footerLog.innerHTML = xhr.responseText;
          }
      }
    });
    console.log(tempList) ;
}

Page.prototype.getNewInfo = function(){
    var lblTitle = document.getElementById('lblPageTitleSave');
    
    var frame = document.getElementById('tny_ifr');
    var body = frame.contentDocument.getElementById('tinymce');
    var title = document.getElementById('pTitle').innerHTML;
    var content = body.innerHTML;
    this.pageTitle = title;
    this.content = content;
}