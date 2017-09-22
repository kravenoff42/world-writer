function Page(pageFromDB,pageID, pageTitle,content,lastModified,dateCreated){
    //properties
    this.pageID = null;
    this.pageTitle = null;
    this.content = null;
    this.lastModified = null;
    this.dateCreated = null;
    if(pageFromDB){
        if ( pageFromDB.pageID){
            this.pageID = pageFromDB.pageID;
        }
        if ( pageFromDB.pageTitle){
            this.pageTitle = pageFromDB.pageTitle;
        }
        if ( pageFromDB.content){
            this.content = pageFromDB.content;
        }
        if ( pageFromDB.lastModified){
            this.lastModified = pageFromDB.lastModified;
        }
        if ( pageFromDB.dateCreated){
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

Page.prototype.insertPage = function(){
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
            var pid = results[0]['LAST_INSERT_ID()'];
            window.currPage.pageID = pid;
            window.topics.insertNewTopics(pid);
            window.topics.pageID = pid;
            window.questions.pageID = pid;
          }catch(e){
              console.log(e);
              var footerLog = document.getElementById('log');
              footerLog.innerHTML = xhr.responseText;
          }
      }
    });
};

Page.prototype.getPage = function(){
    window.$.ajax({
        url: '/models/DB.php',
        type: 'POST',
        datatype: 'jsonp',
        jsonp: 'callback',
        data: {
            'table':'pages',
            'function':'getPagesByID',
            'pageTitle':this.pageID
            },
         id:this.pageID,
         error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log('insertPage',data);
         }
    });
    window.$( document ).ajaxSuccess(function( event, xhr, settings ) {
        var d = settings.data;
        var id = settings.id;
      if ( settings.url == "/models/DB.php"  && d.includes("getPagesByID")) {
          try{
            var results = JSON.parse(xhr.responseText);
            // results[0].pageID = id;
            window.currPage = new window.Page(results[0]);
            window.currPage.pageID = id;
            console.log('currPage Set');
          }catch(e){
              console.log(e);
              var footerLog = document.getElementById('log');
              footerLog.innerHTML = xhr.responseText;
          }
      }
    });
};

Page.prototype.updatePage = function(){
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
          }catch(e){
              console.log(e);
              var footerLog = document.getElementById('log');
              footerLog.innerHTML = xhr.responseText;
          }
      }
    });
};

Page.prototype.getNewInfo = function(){
    var frame = document.getElementById('tny_ifr');
    var body = frame.contentDocument.getElementById('tinymce');
    var title = document.getElementById('pTitle').innerHTML;
    var content = body.innerHTML;
    this.pageTitle = title;
    this.content = content;
};