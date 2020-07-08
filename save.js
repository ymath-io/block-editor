var FileSaver = require('file-saver');
function pack(){
    var out = {title:null,data:[]};
    out.title = document.querySelector("#ctitle").value;
    for (i of info){
        var v;
        var t = i.type;
        if (t=="text"){
            v = document.querySelector("#"+i.id).innerHTML;
        }
        else if (t=="mq" || t=="dmq"){
            v= i.mathfield.latex();
        }
        else if (t=="break"){
            v= null;
        }
        else if (t=="problem"){
            v = {
                q:i.qfield.latex(),
                a:i.afield.latex(),
                h1:document.getElementById(i.h1field).value,
                h2:document.getElementById(i.h2field).value,
                s:document.getElementById(i.sfield).value
            }
        }
        out.data.push({"type":t, "value":v})
    }

    
    var jsonse = JSON.stringify(out);
    var blob = new Blob([jsonse], {type: "application/json"});
    var title=out.title + ".json";
    if (title==".json"){title="course.json"}
    FileSaver.saveAs(blob, title);
    $('.navbar-toggler').click(); 
}