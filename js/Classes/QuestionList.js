function QuestionList(){
    this.list;
}

QuestionList.prototype.getQuestionsAll = function(){
    $.ajax({
        url: '/models/DB.php',
        type: 'POST',
        datatype: 'jsonp',
        jsonp: 'callback',
        data: {
            'table':'questions',
            'function':'getQuestionsAll' 
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

QuestionList.prototype.setList = function(){
    var tempList = [];
    $.ajax({
        url: '/models/DB.php',
        type: 'POST',
        datatype: 'jsonp',
        jsonp: 'callback',
        data: {
            'table':'questions',
            'function':'getQuestionsAll' 
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
        var d = settings.data;
      if ( settings.url == "/models/DB.php"  && d.includes("getQuestionsAll")) {
          try{
              var results = JSON.parse(xhr.responseText);
    
              for(var i = 0;i<results.length;i++){
                  console.log(results[i])
                  var question = new Question(results[i]);
                  tempList.push(question);
              }
          }catch(e){
              console.log(e);
              var footerLog = document.getElementById('log');
              footerLog.innerHTML = xhr.responseText;
          }
      }
    });
    this.list = tempList;
}