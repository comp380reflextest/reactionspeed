  var elementNum = 2;
  var down = 0;
  var left = 0;
  var rows = 1;
  var columns = 1;
  var disp = 10;
  var chArea = 10;
  var objID = 0;
  var numobj = 0;
  function tableCreate(){
    numobj += 1;
    objID = numobj;
    var body = document.body,
        div =  document.createElement('div'),
        tbl  = document.createElement('table');
    tbl.cellSpacing= 0;
    tbl.border = '1px';
    tbl.style.width  = '20px';
    tbl.style.height = '20px';
    tbl.style.border = '1px solid black';
    tbl.id = 'hi'+objID;
    div.id = 'margindiv'+objID;
    var tr = tbl.insertRow();
    var td = tr.insertCell();
    td.id = 'td10'
    td.style.backgroundColor = 'white';
    td.setAttribute( "onClick", "checkClick(this)" )
    div.appendChild(tbl);
    body.appendChild(div);    
    var select = document.getElementById("chOb");
    var opt = document.createElement('option');
    opt.value = numobj;
    opt.innerHTML = numobj;
    select.appendChild(opt);
    select.value=numobj;
  }

  function modOb(value){
    objID = parseInt(value);
  }

  function modDisp(value){
    disp = parseInt(value);
  }
  function modchArea(value){
    chArea = parseInt(value);
  }
  function tablemodDown(){
      down += disp;
      var div = document.getElementById("margindiv"+objID);
      div.style.marginTop = down + "px";
  }
    function tablemodRight(){
      left += disp;
      var div = document.getElementById("margindiv"+objID);
      div.style.marginLeft = left + "px";
  }
    function tablemodUp(){
      //if (down > 0){
        down -= disp;
      //  }
      var div = document.getElementById("margindiv"+objID);
      div.style.marginTop = down + "px";
  }
    function tablemodLeft(){
      if (left > 0){left -= disp;}
      var div = document.getElementById("margindiv"+objID);
      div.style.marginLeft = left + "px";
  }
  
  function tablemodWp(){
    var tbl = document.getElementById("hi"+objID);
    var initial_width = tbl.style.width;
    var initial_pixels = parseFloat(initial_width);
    tbl.style.width = initial_pixels + chArea + "px";
  }

  function tablemodHp(){
    var tbl = document.getElementById("hi"+objID);
    var initial_height = tbl.style.height;
    var initial_pixels = parseFloat(initial_height);
    tbl.style.height = initial_pixels + chArea + "px";
  }

  function tablemodWm(){
    var tbl = document.getElementById("hi"+objID);
    var initial_width = tbl.style.width;
    var initial_pixels = parseFloat(initial_width);
    tbl.style.width = initial_pixels - chArea + "px";
  }

  function tablemodHm(){
    var tbl = document.getElementById("hi"+objID);
    var initial_height = tbl.style.height;
    var initial_pixels = parseFloat(initial_height);
    tbl.style.height = initial_pixels - chArea + "px";
  }

  function tablemodR(){
    var tbl = document.getElementById("hi"+objID);
    var tr = tbl.insertRow();
    for (i = 0; i < tbl.rows[0].cells.length; i++) {
        var td = tr.insertCell();
        td.id = "td" + elementNum;
        elementNum += 1;
        td.style.backgroundColor = 'white';
        td.setAttribute( "onClick", "checkClick(this)" )
    }
    rows += 1;
    renumber();
  }
   function tablemodC(){
    var tbl = document.getElementById("hi"+objID);
    for (i = 0; i < tbl.rows.length; i++) {
        var td = tbl.rows[i].insertCell(tbl.rows[i].cells.length);
        td.id = "td" + elementNum;
        elementNum += 1;
        td.style.backgroundColor = 'white';
        td.setAttribute( "onClick", "checkClick(this)" )
    }
    columns += 1;
    renumber();
  } 

    function tablemodRM(){
    var tbl = document.getElementById("hi"+objID),
    lastRow = tbl.rows.length - 1,
    i;
    tbl.deleteRow(lastRow);
    rows -= 1;
    renumber();
  } 

   function tablemodCM(){
    var tbl = document.getElementById("hi"+objID),
    lastCol = tbl.rows[0].cells.length - 1,
    i;
    for (i = 0; i < tbl.rows.length; i++) {
            tbl.rows[i].deleteCell(lastCol);
        }
    columns -= 1;
    renumber();
  } 

  function tablemodBP(){
    var tbl = document.getElementById("hi"+objID);
    var tr = tbl.insertRow();
    for (i = 0; i < tbl.rows[0].cells.length; i++) {
        var td = tr.insertCell();
        td.id = "td" + elementNum;
        elementNum += 1;
        td.style.backgroundColor = 'white';
        td.setAttribute( "onClick", "checkClick(this)" )
    }
    rows += 1;
    for (i = 0; i < tbl.rows.length; i++) {
        var td = tbl.rows[i].insertCell(tbl.rows[i].cells.length);
        td.id = "td" + elementNum;
        elementNum += 1;
        td.style.backgroundColor = 'white';
        td.setAttribute( "onClick", "checkClick(this)" )
    }
    columns += 1;
    renumber();
  } 

  function tablemodBM(){
    var tbl = document.getElementById("hi"+objID),
    lastCol = tbl.rows[0].cells.length - 1,
    lastRow = tbl.rows.length - 1,
    i,j,k;
      for (i = 0; i < tbl.rows.length; i++) {
          tbl.rows[i].deleteCell(lastCol);
      }
    tbl.deleteRow(lastRow);
    rows -= 1;
    columns -= 1;
    renumber();
  } 


  function renumber(){
  var k;
  if (objID > 1){
    var x = objID-1
    var tbF = document.getElementById("hi"+x).getElementsByTagName('tbody')[0].id
    k = parseInt(tbF); //Read the ID from the previous object's tbody, use as floor
  }
  else{k=10;}
  var tbl = document.getElementById("hi"+objID),
  i,j;
  
    for (i = 0; i < tbl.rows.length; i++) {
      for (j = 0; j < tbl.rows[0].cells.length; j++) {
        var td = tbl.rows[i].cells[j];
        td.id = "td" + k;
        k++;
      }
    }
    elementNum = k-1;
    var tb = tbl.getElementsByTagName('tbody')[0];
    tb.id = elementNum; //Put the highest ID in the tbody
  }

  function save(){
    var a = numobj,i,b="";
    b+=(a+";");
    if (a == 0)
    {console.log("No objects")}
    else{
      for(i = 1; i <= a; i++)
      { var tbl = document.getElementById("hi"+i), div = document.getElementById("margindiv"+i);
        var width = parseFloat(tbl.style.width);
        var height = parseFloat(tbl.style.height);
        var rows = tbl.rows.length;
        var columns = tbl.rows[0].cells.length;
        var x= div.style.marginLeft;
        var y= div.style.marginTop;
        b+=(width+","+height+","+rows+","+columns+","+x+","+y+";");     
      }
      var ref = document.getElementById("load");
      var box = document.createElement("INPUT");
      var close = document.createElement("INPUT");
      box.id="savebox";
      box.value=btoa(b);
      ref.appendChild(box);
      close.type="submit";
      close.value="OK";
      close.setAttribute( "onClick", "savebutton()" )
      close.id="savesubmit";
      ref.appendChild(close);
    }
  }

  function savebutton(){
    var ref = document.getElementById("savebox");
    var button = document.getElementById("savesubmit");
    var div = document.getElementById("load");
    div.removeChild(button);
    div.removeChild(ref);
  }

  function loadbutton(){
  var x = document.getElementById("loadinput")
  if (x === null){
  var ref = document.getElementById("load");
  var input = document.createElement("INPUT");
  var submit = document.createElement("INPUT");
  input.id="loadinput";
  ref.appendChild(input);
  submit.type="submit";
  submit.setAttribute( "onClick", "load()" )
  submit.id="loadsubmit"
  ref.appendChild(submit);
  }
  }

  function load(){
    var ref = document.getElementById("loadinput");
    var button = document.getElementById("loadsubmit");
    var div = document.getElementById("load");
    var i,j=chArea,k=disp,l;

    var objects = atob(ref.value).split(";")
    for (i=1; i<=objects[0];i++)
    {
      var subsplit = objects[i].split(",")
      var width = subsplit[0]
      var height = subsplit[1]
      var rows = subsplit[2]
      var columns = subsplit[3]
      var x= parseInt(subsplit[4].slice(0,-2))
      var y= parseInt(subsplit[5].slice(0,-2))

      tableCreate();
      chArea = width-20;
      tablemodWp();
      chArea = height-20;
      tablemodHp();
      chArea=j; // reset
      disp = x;
      tablemodRight();
      disp = y;
      tablemodDown();
      disp = k; // reset
      for (l=1; l<rows; l++){
        tablemodR()}
      for (l=1; l<columns; l++){
        tablemodC()}      

      //console.log(width+","+height+","+rows+","+columns+","+x+","+y+";")
    }
    //console.log(objects)
   
    div.removeChild(button);
    div.removeChild(ref);    
  }