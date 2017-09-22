function Word(wordFromDB,index,wordStr,topID,plural,wordID){
    //Properties
    this.index = null;
    this.wordID = null;
    this.wordStr = null;
    this.topID = null;
    this.plural = false;
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
        if(wordFromDB.plural){
            this.plural = wordFromDB.plural;
        }
    }else{
        if(index){
            this.index = index;
        }
        if(wordID){
            this.wordID = wordID;
        }
        if(wordStr){
            this.wordStr = wordStr;
        }
        if(topID){
            this.topID = topID;
        }
        if(plural){
            this.plural = plural;
        }
    }
}

Word.prototype.insertWord = function(){
    window.$.ajax({
        url: '/models/DB.php',
        type: 'POST',
        jsonp: 'callback',
        data: {
            'table':'topicWords',
            'function':'insertWord', 
            'wordStr': this.wordStr,
            'topID': this.topID,
            'plural': this.plural
        },
        index:this.index,
        error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log(data);
        }
    });
    window.$( document ).ajaxSuccess(function( event, xhr, settings ) {
        var d = settings.data;
        var i = settings.index;
      if ( settings.url == "/models/DB.php"  && d.includes("insertWord")) {
          try{
            var results = JSON.parse(xhr.responseText);
            var id = results[0]['LAST_INSERT_ID()'];
            window.words.list[i].wordID = id;
        window.$( ".log" ).text( "Respnse: wordID = " +
           results[0]["LAST_INSERT_ID()"]);
           
          }catch(e){
              console.log(e);
              console.log(xhr.responseText);
          }
      }
    });
};
Word.prototype.createCandidateCard = function(index){ 
    //card
    var tCard = document.createElement("li");
    tCard.classList.add('topic_card');
    tCard.classList.add('dropIn');

    //t div
    var tDiv = document.createElement("div");
    tDiv.classList.add('q_div');
    var tSpan = document.createElement('span');
    tSpan.id = 'wid_'+index;
    tSpan.classList.add('topic');
    tSpan.innerHTML = this.wordStr;
    tDiv.appendChild(tSpan);
    
    //select div
    var ddlDiv = document.createElement("div");
    ddlDiv.classList.add('q_div');
    var ddl = window.cats.createDDL(index);
    ddlDiv.appendChild(ddl);
    
    // confirm div
    var conDiv = document.createElement("div");
    conDiv.classList.add('q_div');
    var conSpan = document.createElement('span');
    var conI = document.createElement('i');
    conSpan.id = "confirmT_"+index;
    conI.innerHTML = 'done';
    conSpan.classList.add('clickable');
    conSpan.classList.add('hidden');
    conSpan.classList.add('tCardBtn');
    // conSpan.setAttribute('disabled', 'true');
    conI.classList.add('material-icons');
    conSpan.appendChild(conI);
    conDiv.appendChild(conSpan);
    
    // dismiss div
    var disDiv = document.createElement("div");
    disDiv.classList.add('q_div');
    var disSpan = document.createElement('span');
    var disI = document.createElement('i');
    disI.id = "dismisT_"+index;
    disI.innerHTML = 'not_interested';
    disSpan.classList.add('clickable');
    disI.classList.add('tCardBtn');
    disI.classList.add('material-icons');
    disSpan.appendChild(disI);
    disDiv.appendChild(disSpan);
    
    //adding everything to list
    tCard.appendChild(tDiv);
    tCard.appendChild(ddlDiv);
    tCard.appendChild(conDiv);
    tCard.appendChild(disDiv);
    
    return tCard;
};
Word.prototype.updateWord = function(){
    if(!this.wordID){
        
    }
};

