function Categories() { 
    //Properties
   this.list = [];
 
}
    //Methods

Categories.prototype.toID = function(abbrev){ 
    for(var i = 0; i<this.list.length;i++){
        if(abbrev == this.list[i].catAbbrev){
            return this.list[i].catID;
        }
    }
    return false;
} ;
Categories.prototype.setList = function(){
    window.$.ajax({
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
            console.log(data);
         }
    });
    window.$( document ).ajaxSuccess(function( event, xhr, settings ) {
        var d = settings.data;
      if ( settings.url == "/models/DB.php"  && d.includes("getCategoriesAll")) {
          try{
              var results = JSON.parse(xhr.responseText);
              var firstObj = {"catAbbrev":"NaN","catName":"Pick Category"};
              var secondObj = {"catAbbrev":"Top","catName":"Part of Topic"};
               window.cats.list.push(firstObj);
               window.cats.list.push(secondObj);
              for(var i = 0;i<results.length;i++){
                   window.cats.list.push(results[i]);
              }
              console.log('cats.list Set');
          }catch(e){
              console.log(e);
              console.log(xhr.responseText);
          }
      }
    });
};


Categories.prototype.createDDL = function(index){
    var ddl = document.createElement("select");
    ddl.classList.add('form-control');
    ddl.classList.add('wordCatSelect');
    ddl.id = "ddlWordCat_"+index;
    // console.log(this.list.length);
    for(var i = 0; i<this.list.length;i++){
        var opt = document.createElement("option");
        // console.log(this.list[i]);
        opt.value = this.list[i].catAbbrev;
        opt.label = this.list[i].catName;
        ddl.options.add(opt);
    }
    return ddl;
};