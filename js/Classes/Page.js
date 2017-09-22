function Page(pageFromDB, pageTitle,content,lastModified,dateCreated,pageID){
    //properties
    this.pageID = null;
    this.pageTitle = null;
    this.content = null;
    this.lastModified = null;
    this.dateCreated = null;
    if(pageFromDB){
        if (pageID){
            this.pageID = pageFromDB.pageID;
        }
        if (pageTitle){
            this.pageTitle = pageFromDB.pageTitle;
        }
        if (content){
            this.content = pageFromDB.content;
        }
        if (lastModified){
            this.lastModified = pageFromDB.lastModified;
        }
        if (dateCreated){
            this.dateCreated = pageFromDB.dateCreated;
        }
    }else{
        if (pageID){
            this.pageID = pageID;
        }
        if (pageTitle){
            this.pageTitle = pageTitle;
        }
        if (content){
            this.content = content;
        }
        if (lastModified){
            this.lastModified = lastModified;
        }
        if (dateCreated){
            this.dateCreated = dateCreated;
        }
    }
}

Page.prototype.getPagesAll = function(){
    var tempList = [];
    window.$.ajax({
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
            console.log(data);
         }
    });
    window.$( document ).ajaxSuccess(function( event, xhr, settings ) {
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
};

Page.prototype.insertPage = function(){
    if(!(this.pageTitle && this.content)) { return false;}
    var pid = 0;
    var tempList = [];
    window.$.ajax({
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
            console.log('insertPage',data);
         }
    });
    window.$( document ).ajaxSuccess(function( event, xhr, settings ) {
        var d = settings.data;
      if ( settings.url == "/models/DB.php"  && d.includes("insertPage")) {
          try{
            var results = JSON.parse(xhr.responseText);
            for(var i = 0;i<results.length;i++){
                pid = results[0]['LAST_INSERT_ID()'];
                tempList.push(results[i]);
            }
            this.pageID = pid;
            window.topics.insertNewTopics(pid);
          }catch(e){
              console.log(e);
              var footerLog = document.getElementById('log');
              footerLog.innerHTML = xhr.responseText;
          }
      }
    });
};

Page.prototype.updatePage = function(){
    if(!(this.pageID && this.pageTitle && this.content)) { return false;}
    var tempList = [];
    window.$.ajax({
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
            console.log(data);
         }
    });
    window.$( document ).ajaxSuccess(function( event, xhr, settings ) {
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
};

Page.prototype.getNewInfo = function(){
    var frame = document.getElementById('tny_ifr');
    var body = frame.contentDocument.getElementById('tinymce');
    var title = document.getElementById('pTitle').innerHTML;
    var content = body.innerHTML;
    this.pageTitle = title;
    this.content = content;
};