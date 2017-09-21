function Categories() { 
    //Properties
   this.list = [];
 
}
    //Methods
Categories.prototype.toAbbrev = function(name){ 
    var ans = null;
    for(var i = 0; i<this.list.length;i++){
        if(name == this.list[i].catName){
            ans = this.list[i].catAbbrev;
        }
    }
    return ans;
} 
Categories.prototype.toFullName = function(abbrev){ 
    var ans = null;
    for(var i = 0; i<this.list.length;i++){
        if(abbrev == this.list[i].catAbbrev){
            ans = this.list[i].catName;
        }
    }
    return ans;
} 
Categories.prototype.toID = function(abbrev){ 
    var ans = null;
    for(var i = 0; i<this.list.length;i++){
        if(abbrev == this.list[i].catAbbrev){
            ans = this.list[i].catID;
        }
    }
    return ans;
} 
Categories.prototype.setList = function(){
    var tempList = [];
    $.ajax({
        url: '/models/DB.php',
        type: 'POST',
        datatype: 'jsonp',
        jsonp: 'callback',
        data: {
            'table':'wordCategories',
            'function':'getCategoriesAll', 
            },
         error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log(data)
         }
    });
    $( document ).ajaxSuccess(function( event, xhr, settings ) {
        var d = settings.data;
      if ( settings.url == "/models/DB.php"  && d.includes("getCategoriesAll")) {
          try{
              var results = JSON.parse(xhr.responseText);
              var firstObj = {"catAbbrev":"NaN","catName":"Pick Category"}
              tempList.push(firstObj);
              for(var i = 0;i<results.length;i++){
                   tempList.push(results[i]);
              }
          }catch(e){
              console.log(e);
              console.log(xhr.responseText);
          }
      }
    });
    this.list = tempList;
}

Categories.prototype.insertCategory = function(catName, catAbbrev){
    $.ajax({
        url: '/models/DB.php',
        type: 'POST',
        jsonp: 'callback',
        data: {
            'table':'wordCategories',
            'function':'insertCategory', 
            'catName': catName,
            'catAbbrev': catAbbrev
        },
        error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log(data);
        }
    });
    $( document ).ajaxSuccess(function( event, xhr, settings ) {
        var d = settings.data;
      if ( settings.url == "/models/DB.php"  && d.includes("insertCategory")) {
          try{
          var results = JSON.parse(xhr.responseText);
        $( ".log" ).text( "Respnse: CatID = " +
           results[0]["LAST_INSERT_ID()"]);
          }catch(e){
              console.log(e);
              console.log(xhr.responseText);
          }
      }
    });
}
Categories.prototype.getCategoriesAll = function(){
    $.ajax({
        url: '/models/DB.php',
        type: 'POST',
        datatype: 'jsonp',
        jsonp: 'callback',
        data: {
            'table':'wordCategories',
            'function':'getCategoriesAll', 
            },
         error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log(data)
         }
    });
    $( document ).ajaxSuccess(function( event, xhr, settings ) {
        var d = settings.data;
      if ( settings.url == "/models/DB.php"   && d.includes("getCategoriesAll")) {
          try{
              var results = JSON.parse(xhr.responseText);
              for(var i = 0;i<results.length;i++){
            $( ".log" ).append( "Respnse: <br/>" +
               results[i]);
              }
          }catch(e){
              console.log(e);
              console.log(xhr.responseText);
          }
      }
});
}
Categories.prototype.createDDL = function(wordID){
    var ddl = document.createElement("select");
    ddl.classList.add('form-control');
    ddl.classList.add('wordCatSelect');
    ddl.id = "ddlWordCat_"+wordID;
    // console.log(this.list.length);
    for(var i = 0; i<this.list.length;i++){
        var opt = document.createElement("option");
        // console.log(this.list[i]);
        opt.value = this.list[i].catAbbrev;
        opt.label = this.list[i].catName;
        ddl.options.add(opt);
    }
    return ddl;
}