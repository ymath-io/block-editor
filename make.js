var root = document.querySelector("#root");
var info = [{type:"none"}];
var uinfo = [];
var lastFocused={id:"e0"};
var pnum=0;
var soltext;
function addEquation(){
    n = document.createElement("SPAN");
    /*if(!!document.getElementById(lastFocused.id)){
    $(n).insertAfter("#"+lastFocused.id);}
    else{$(n).insertAfter("#"+(lastFocused.id));}*/
    root.appendChild(n);
    n.outerHTML = `<div class="rgba-indigo-strong form-control-sm answerb or" style="display: inline-block"><span id='e${info.length}' class='text-light' style="border:none !important;" onclick='lastFocused=this.parentElement;'>&nbsp;&nbsp;</span><button  class="badge btn close" onclick="rmFromInfo('e${info.length}');rmFromDOM('e${info.length}')">&times;</button></div>`;
    document.getElementById("e"+info.length).click();
    var answerMathField = MQ.MathField(document.querySelector("#e"+info.length), {
    handlers: {}});
    l =info.length;
    info.push({type:"mq",
    id: "e"+info.length,
    elem: document.querySelector("#e"+info.length),
    mathfield: answerMathField
    });
    uinfo.push({type:"mq",
    id: "e"+l,
    elem: document.querySelector("#e"+l),
    mathfield: answerMathField
    });
    answerMathField.focus()
    return answerMathField;
};

function addDisplayEquation(){
    n = document.createElement("DIV");
    /*if(!!document.getElementById(lastFocused.id)){
    $(n).insertAfter("#"+lastFocused.id);}
    else{$(n).insertAfter("#"+(lastFocused.id-1));}*/
    root.appendChild(n);
    n.outerHTML = `<div class="form-control-sm answerb darken-3 cyan or mt-0 text-center" onclick="info[${info.length}].mathfield.focus()" ><span id="e${info.length}" style="border:none !important;" class="answerb form-control-sm text-light  or" onclick="lastFocused = this.parentElement.parentElement;"></span><button  class="badge btn close float-right" onclick="rmFromInfo('e${info.length}');rmFromDOM('e${info.length}')">&times;</button></div>`;
    
    var answerMathField = MQ.MathField(document.querySelector("#e"+info.length), {
    handlers: {}});
    l = info.length;
    info.push({type:"dmq",
    id: "e"+info.length,
    elem: document.querySelector("#e"+info.length),
    mathfield: answerMathField
    });
    uinfo.push({type:"dmq",
    id: "e"+l,
    elem: document.querySelector("#e"+l),
    mathfield: answerMathField
    });
    n.onclick=`info[${info.length}].mathfield.focus()`;
answerMathField.focus();
return answerMathField;
};

function addText(){
    n = document.createElement("span");
    /*if(!!document.getElementById(lastFocused.id)){
    $(n).insertAfter("#"+lastFocused.id);}
    else{$(n).insertAfter("#"+(lastFocused.id-1));}*/
    root.appendChild(n);
    n.outerHTML = `<span class="form-control-sm answerb my-2 input-sm rgba-green-strong or"><span contenteditable="true" id="e`+info.length+`" class=" or text-light" style="font-size:14pt" onfocus="lastFocused=this.parentElement;">&nbsp;&nbsp</span><button  class="badge btn close" onclick="rmFromInfo('e${info.length}');rmFromDOM('e${info.length}')">&times;</button></span>`;
document.getElementById("e"+info.length).focus();
l = info.length;
    info.push({type:"text",
    id: "e"+l,
    elem: document.querySelector("#e"+l)

    });
    

};






function addProblem(){
pnum+=1;
n = document.createElement("LI");
/*if(!!document.getElementById(lastFocused.id)){
    $(n).insertAfter("#"+lastFocused.id);}
    else{$(n).insertAfter("#"+(lastFocused.id-1));}*/
    root.appendChild(n);
    n.className = "card-body card no-def my-3 pop  blue-grey text-light";
    n.innerHTML = `<p><span id='q${info.length}' class='form-control-sm answerb  blue-grey darken-1 or' ></span>$\ =\ $<span id='a${info.length}' class='form-control-sm answerb  blue-grey darken-1 or' ></span><button  class="badge btn close float-right" onclick="rmFromInfo('e${info.length}');rmFromDOM('e${info.length}')">&times;</button></p>
    <div class="form-group ">
    <!--<label for="h1${info.length}">Hint 1</label>-->
    <textarea class="form-control  blue-grey darken-1 or text-light" placeholder="Hint 1" id="h1${info.length}" rows="3"></textarea>
  </div>
  <div class="form-group">
    <!--<label for="h2${info.length}">Hint 2</label>-->
    <textarea class="form-control  blue-grey darken-1 or text-light " id="h2${info.length}" rows="3"></textarea>
  </div>
  <div class="form-group">
    <!--<label for="s${info.length}">Solution</label>-->
    <textarea class="form-control  blue-grey darken-1 or text-light" id="s${info.length}" rows="3"></textarea>
  </div>`;
    n.id = "e"+info.length;
    n.onclick='lastFocused=this;'
    var answerMathField = MQ.MathField(document.querySelector("#q"+info.length), {
    handlers: {}});
    var answerMathField2 = MQ.MathField(document.querySelector("#a"+info.length), {
        handlers: {}});
    l = info.length;
    info.push({type:"problem",
    id: "e"+l,
    elem: document.querySelector("#e"+l),
    qfield:answerMathField,
    afield: answerMathField2,
    pnum:pnum,
    h1field:("h1"+l),
    h2field:("h2"+l),
    sfield:("s"+l),
    });
    console.log(info);
    lastFocused=n;
//added an answer space as well.
MathJax.typeset();
return {type:"problem",
id: "e"+l,
elem: document.querySelector("#e"+l),
qfield:answerMathField,
afield: answerMathField2,
pnum:pnum,
h1field:("h1"+l),
h2field:("h2"+l),
sfield:("s"+l),
};
}

function addBreak(){
    n = document.createElement("hr");
    /*if(!!document.getElementById(lastFocused.id)){
    $(n).insertAfter("#"+lastFocused.id);}
    else{$(n).insertAfter("#"+(lastFocused.id-1));}*/
    root.appendChild(n);
    n.outerHTML=`<div class="row"><hr class="rgba-lime-strong col-11" id="e`+info.length+`" onclick="lastFocused=this.parentElement;"><button  class="badge btn close float-right col" onclick="rmFromInfo('e${info.length}');rmFromDOM('e${info.length}')">&times;</button><span>`;
    document.getElementById("e"+info.length).click();
    l = info.length;
    info.push({type:"break",
    id: "e"+l,
    elem: document.querySelector("#e"+l)

    });
    uinfo.push({type:"break",
    id: "e"+l,
    elem: document.querySelector("#e"+l)

    });

};

function makeCourse(data){
var final = "<h2>"+document.querySelector("#ctitle").value+"</h2><p>";
var fscript = ``;
var runscript = [];
for (num in data){
obj = data[num];
if (obj.type == "text"){
    e = document.createElement("p");
    e.innerHTML = document.querySelector("#"+obj.id).innerHTML;
    final += e.innerHTML

}
if (obj.type == "mq"){
e = document.createElement("p");
    e.innerHTML = " $"+obj.mathfield.latex()+"$ ";
    final += e.innerHTML;

}
if (obj.type == "dmq"){
e = document.createElement("p");
    e.innerHTML = " $$"+obj.mathfield.latex()+"$$ ";
    final += e.innerHTML;

}
if (obj.type =="break"){
e = document.createElement("BR");
//final+=e.outerHTML;
final += "</p><p>"
}
if (obj.type =="problem"){
final += `</p>
<li class="card card-body no-def my-3 pop">

    <p>$\\displaystyle{ ${obj.qfield.latex()}= }$ <span id="answer${obj.pnum}" class="form-control-sm answerb"></span><svg id="tu${obj.pnum}" class="bi bi-hand-thumbs-up" width="2em" height="2em" style="display:none" viewBox="0 0 16 16" fill="var(--success)" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd"
        d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
</svg></p>
            <!--Hints--><details><summary class="btn btn-outline-success btn-sm mt-2">Hint</summary> ${document.getElementById(obj.h1field).value}</details>
            <details><summary class="btn btn-outline-success btn-sm mt-2">Hint</summary> ${document.getElementById(obj.h2field).value}</details>
            <!--Solution--><details><summary class="btn btn-sm btn-outline-success mt-2">Show/Hide Solution</summary>
                ${document.getElementById(obj.sfield).value}
        </details>
        </li><p>`;
        //initfield(obj.pnum,"",[obj.afield.latex()]);
        fscript += `initfield(${obj.pnum},"",["${obj.afield.latex()}"]);`;
        runscript.push({n:obj.pnum, ans:[obj.afield.latex()]});
        console.log(runscript);
}
}
final += "</p>"
//fscript = "<script>"+fscript+"</script>"
document.querySelector("#out").innerHTML = final;
MathJax.typeset();
document.querySelector("#out2").innerText = final;
if (fscript!==""){
document.querySelector("#out3").innerHTML = fscript;}
Prism.highlightAll();
for (a in runscript){
    b = runscript[a];
    initfield(b.n,"",b.ans);
}

}

function make(data){
var final = "<p>";
for (num in data){
obj = data[num];
if (obj.type == "text"){
    e = document.createElement("p");
    e.innerHTML = document.querySelector("#"+obj.id).innerHTML;
    final += e.innerHTML

}
if (obj.type == "mq"){
e = document.createElement("p");
    e.innerHTML = " $"+obj.mathfield.latex()+"$ ";
    final += e.innerHTML;

}
if (obj.type == "dmq"){
e = document.createElement("p");
    e.innerHTML = " $$"+obj.mathfield.latex()+"$$ ";
    final += e.innerHTML;

}
if (obj.type =="break"){
e = document.createElement("BR");
//final+=e.outerHTML;
final += "</p><p>"
}
}
final += "</p>"
return final;

}

function rmFromInfo(id){
    for (n in info){
        b= info[n];
        if (b.id==id){
            info.splice(n,1);
            return true
        }
    }
    return false
    }
    function rmFromDOM(id){
        var el  = document.getElementById(id);
        if (el.parentElement==root){el.remove()}
        else if (el.parentElement.parentElement==root){el.parentElement.remove()}
        else if (el.parentElement.parentElement.parentElement==root){el.parentElement.parentElement.remove()}
    }