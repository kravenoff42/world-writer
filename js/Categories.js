function Categories() { 
    //Properties
   this.list = this.setList();
//   ,
//   {"abbrev":"Per","name":"Person"},
//   {"abbrev":"Pla","name":"Place"},
//   {"abbrev":"Occ","name":"Occupation"},
//   {"abbrev":"Evt","name":"Event"},
//   {"abbrev":"Obj","name": "Object"},
//   {"abbrev":"Spc","name":"Species"},
//   {"abbrev":"Act","name":"Action"},
//   {"abbrev":"Ida","name":"Idea"},
//   {"abbrev":"Qlt","name":"Quality"},
//   {"abbrev":"GpO","name":"Group-Object"},
//   {"abbrev":"GpP","name":"Group-Person"},
//   {"abbrev":"GpI","name":"Group-Idea"},
//   {"abbrev":"GpE","name":"Group-Event"}];
 
}
    //Methods
Categories.prototype.toAbbrev = function(name){ 
    var ans = null;
    for(var i = 0; i<this.list.length;i++){
        if(name == this.list[i].name){
            ans = this.list[i].abbrev;
        }
    }
    return ans;
} 
Categories.prototype.toFullName = function(abbrev){ 
    var ans = null;
    for(var i = 0; i<this.list.length;i++){
        if(abbrev == this.list[i].abbrev){
            ans = this.list[i].name;
        }
    }
    return ans;
} 
Categories.prototype.createDDL = function(topID){ 
    var ddl = document.createElement("select");
    ddl.id = "ddlWordCat_"+topID;
    for(var i = 0; i<this.list.length;i++){
        var opt = document.createElement("option");
        opt.value = this.list[i].abbrev;
        opt.label = this.list[i].name;
        ddl.options.add(opt);
    }
    return ddl;
}
Categories.prototype.setList = function(){
    $.ajax({
        url: '/models/DB.php',
        type: 'POST',
        datatype: 'jsonp',
        jsonp: 'callback',
        data: {
            'table':'wordCategories',
            'function':'getCategoriesAll', 
            },
         success: function(data){
            //access the members
            console.log('success');
         },
         error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log(data)
         }
    });
    $( document ).ajaxSuccess(function( event, xhr, settings ) {
      if ( settings.url == "/models/DB.php" ) {
          var tempList = [];
          var results = JSON.parse(xhr.responseText);
          var firstObj = {"abbrev":"NaN","name":"Choose Category"}
          tempList.push(firstObj);
          for(var i = 0;i<results.length;i++){
              var obj = {};
              obj.abbrev = results[i].catAbbrev;
              obj.name = results[i].catName;
              tempList.push(obj);
          }
          return tempList;
      }
      return false;
    });
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
        success: function(data){
            console.log(data)
        },
        error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log(data);
        }
    });
    $( document ).ajaxSuccess(function( event, xhr, settings ) {
      if ( settings.url == "/models/DB.php" ) {
          var results = JSON.parse(xhr.responseText);
        $( ".log" ).text( "Respnse: CatID = " +
           results[0]["LAST_INSERT_ID()"]);
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
         success: function(data){
            //access the members
            console.log('success');
            

         },
         error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log(data)
         }
    });
    $( document ).ajaxSuccess(function( event, xhr, settings ) {
      if ( settings.url == "/models/DB.php" ) {
          var results = JSON.parse(xhr.responseText);
          for(var i = 0;i<results.length;i++){
        $( ".log" ).append( "Respnse: <br/>" +
           results[i]);
          }
      }
});
}
/*
var c = new Categories();
c.insertCategory("Idea", "Ida");

var c = new Categories();
c.getCategoriesAll();
*/