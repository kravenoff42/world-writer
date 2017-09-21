function Word(wordFromDB,wordStr,topID,plural,wordID,topTitle,relevant){
    this.wordID = null;
    this.wordStr = null;
    this.topID = null;
    this.topTitle = null;
    this.plural = false;
    this.relevant = null;
    this.validTemps = [];
    if(wordFromDB){
        if(wordFromDB.wordID){
            this.wordID = wordFromDB.wordID;
        }
        if(wordFromDB.wordStr){
            this.wordStr = wordFromDB.wordStr;
        }
        if(wordFromDB.topID){
            this.topID = wordFromDB.topID;
        }
        if(wordFromDB.topTitle){
            this.topTitle = wordFromDB.topTitle;
        }
        if(wordFromDB.plural){
            this.plural = wordFromDB.plural;
        }
        if(wordFromDB.relevant){
            this.relevant = wordFromDB.relevant;
        }
    }else{
        if(wordID){
            this.wordID = wordID;
        }
        if(wordStr){
            this.wordStr = wordStr;
        }
        if(topID){
            this.topID = topID;
        }
        if(topTitle){
            this.topTitle = topTitle;
        }
        if(plural){
            this.plural = plural;
        }
        if(relevant){
            this.relevant = relevant;
        }
    }
}

Word.prototype.getValidTemps = function(){
    if(!this.topID) { return false;}
    $.ajax({
        url: '/models/DB.php',
        type: 'POST',
        datatype: 'jsonp',
        jsonp: 'callback',
        data: {
            'table':'templates',
            'function':'getTemplateByTopic', 
            'topID':this.topID
            },
         error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log(data)
         }
    });
    $( document ).ajaxSuccess(function( event, xhr, settings ) {
        if ( settings.url == "/models/DB.php"  && d.includes("getTemplateByTopic") ) {
        var results = JSON.parse(xhr.responseText);
            for(var i = 0;i<results.length;i++){
                var temp = new Template(results[i]);
                this.validTemps = [];
                this.validTemps.push(temp);
            }
        }
    });
}
Word.prototype.insertWord = function(){
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
Word.prototype.createCandidateCard = function(i, catArr){ 
    //card
    var tCard = document.createElement("li");
    tCard.classList.add('topic_card');
    tCard.classList.add('dropIn');
    

    //t div
    var tDiv = document.createElement("div");
    tDiv.classList.add('q_div');
    var tSpan = document.createElement('span');
    tSpan.id = 'wid_'+i;
    tSpan.classList.add('topic');
    tSpan.innerHTML = this.wordStr;
    tDiv.appendChild(tSpan);
    
    //select div
    var ddlDiv = document.createElement("div");
    ddlDiv.classList.add('q_div');
    var ddl = catArr.createDDL(i);
    ddlDiv.appendChild(ddl);
    
    // confirm div
    var conDiv = document.createElement("div");
    conDiv.classList.add('q_div');
    var conSpan = document.createElement('span');
    var conI = document.createElement('i');
    conSpan.id = "confirmT_"+i;
    conI.innerHTML = 'done';
    conSpan.classList.add('clickable');
    conSpan.classList.add('hidden');
    // conSpan.setAttribute('disabled', 'true');
    conI.classList.add('material-icons');
    conSpan.appendChild(conI);
    conDiv.appendChild(conSpan);
    
    // dismiss div
    var disDiv = document.createElement("div");
    disDiv.classList.add('q_div');
    var disSpan = document.createElement('span');
    var disI = document.createElement('i');
    disSpan.id = "dismissT_"+i;
    disI.innerHTML = 'not_interested';
    disSpan.classList.add('clickable');
    disI.classList.add('material-icons');
    disSpan.appendChild(disI);
    disDiv.appendChild(disSpan);
    
    //adding everything to list
    tCard.appendChild(tDiv);
    tCard.appendChild(ddlDiv);
    tCard.appendChild(conDiv);
    tCard.appendChild(disDiv);
    
    return tCard;
}
Word.prototype.updateWord = function(){
    if(!this.wordID){
        
    }
}

