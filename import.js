//var fs = require('fs');
//const type = require('jquery');
//const app = require('electron').remote.app;

var fileList;
var t;

/*
app.on('open-file', (event,path) => {
    console.log("hi");
    event.preventDefault();
    
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) throw err;
        console.log('OK: ' + filename);
        console.log(data);
        console.log(type(data));
      });
  })
*/

const readUploadedFileAsText = (temporaryFileReader, inputFile) => {
    //const temporaryFileReader = new FileReader();
  
    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
  
      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsText(inputFile);
    });
  };

function readFile(file) {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      const result = event.target.result;
      //console.log(result);
      t=JSON.parse(result);
      $('#importm').modal('hide');
      document.querySelector(".modal-backdrop").remove();
      $('.navbar-toggler').click(); 
      importData(t.data,t.title);
      return t.data;
    });
  
    reader.addEventListener('progress', (event) => {
      if (event.loaded && event.total) {
        const percent = (event.loaded / event.total) * 100;
        console.log(`Progress: ${Math.round(percent)}`);
      }
    });
    reader.readAsText(file);
    
  }

  /* listen for an upload */
fbutton=document.getElementById("importfbtn");
fselector = document.getElementById("importfinp");
fselector.addEventListener("change",(event)=>{
    fileList = event.target.files;
    console.log(fileList);
    fbutton.className="btn btn-primary";
    
  })
/* when confirmed, read the file.*/
  fbutton.addEventListener("click", (e)=>{
    d = readFile(fileList[0]);
    
    

})
/* import the contents into the page. */
function importData(data,title){
    info = [{type:"none"}];
    root.innerHTML = "";
    document.querySelector("#ctitle").value=title;
    pnum=0;
    for (obj of data){
        if (obj.type=="text"){
            
            addText();
            root.lastChild.firstChild.innerHTML = obj.value;
        }
        else if (obj.type=="mq"){
            mf = addEquation(false);
            mf.latex(obj.value);
        }
        else if (obj.type=="dmq"){
            mf = addDisplayEquation(false);
            mf.latex(obj.value);
        }
        else if (obj.type=="break"){
            addBreak();
        }
        else if (obj.type=="problem"){
            d = addProblem();
            console.log(obj);
            d.qfield.latex(obj.value.q);
            d.afield.latex(obj.value.a);
            document.getElementById(d.h1field).value = obj.value.h1;
            document.getElementById(d.h2field).value = obj.value.h2;
            document.getElementById(d.sfield).value = obj.value.s;
        }
    }
    /*var n;
    focused = false;
    for (i in info){
        n = info[i];
        if ((n.type=="mq"||n.type=="dmq")&&!focused){
            
            focused=true;
            break
        }

    }
    n.mathfield.focus();*/
}

function clearAll(){
    info = [{type:"none"}];
    root.innerHTML = "";
    document.querySelector("#ctitle").value="";
    pnum=0;
    $('.navbar-toggler').click(); 
}