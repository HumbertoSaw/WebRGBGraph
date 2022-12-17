const imagen= document.getElementById('testImg');
const output= document.getElementById('salida');
const red = [];
const green = [];
const blue = [];
const alpha = [];
const imgLinkList = ["nzL5D6SX","NGCtpx1h","tgp8X1ht","RFPkpMJ1","HkqX55SX","9MV9g2Hf"];
var cont = 0;
var imageList = Array();

var punterox = 0;
var punteroy = 0;
var punterow = 0;
var punteroh = 0;

var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");

context.drawImage(imagen,0,0,canvas.width,canvas.height);
fetch("json/json1.json").then((response) => {
  return response.json();
})
.then((json) => jsonPrint.innerHTML = "Nombre: " + json.nombre + "<br>" + "Formato: " + json.formato + "<br>"+ "Peso: " + json.peso+ "<br>"+ "URL: " + json.url+ "<br>"+ "Resolución: " + json.res+ "<br>"+ "Descripción: " + json.des + "<br>"+ "Fecha: " + json.date);

for (var i = 0; i <= 7; i++) {
    imageList[i] = new Image(70, 70);
    imageList[i].src = "https://i.postimg.cc/" + imgLinkList[i-1] + "/" +i+ ".jpg";
}
function switchImage() {
    var selectedImage = document.myForm.switch.options[document.myForm.switch.selectedIndex].value;
    document.myImage.src = imageList[selectedImage].src;
    context.drawImage(imagen,0,0,canvas.width,canvas.height);

    fetch("json/json" + selectedImage +".json").then((response) => {
      return response.json();
    })
    .then((json) => jsonPrint.innerHTML = "Nombre: " + json.nombre + "<br>" + "Formato: " + json.formato + "<br>"+ "Peso: " + json.peso+ "<br>"+ "URL: " + json.url+ "<br>"+ "Res: " + json.res+ "<br>"+ "Descripción: " + json.des + "<br>"+ "Fecha: " + json.date);
}

$(document).ready(function(){
  $('#canvas').Jcrop({
    onSelect: function(c){
      punterox = (c.x);
      punteroy = (c.y);
      console.log(punterox);
      console.log(punteroy);

      punterow = (c.w);
      punteroh = (c.h);
      console.log(punterow);
      console.log(punteroh)

      const red = [];
      const green = [];
      const blue = [];
      const alpha = [];

      const pixel = context.getImageData(punterox, punteroy, punterow, punteroh).data;
      console.log("esto es pixel: "+pixel);

      for(let i = 0; i < pixel.length; i++){
        red[cont] = pixel[i];
        i += 1;
        green[cont] = pixel[i];
        i += 1;
        blue[cont] = pixel[i];
        i += 1;
        alpha[cont] = pixel[i];
        cont += 1;
      }
      var red0 = _.without(red, 0);
      var green0 =_.without(green, 0);
      var blue0 = _.without(blue, 0);
      var traceRed = {
        x: red0,
        type: 'histogram',
        name: "Rojo",
        marker: {
          color: '#ff7c73',
        },
      };  
      var traceGreen = {
        x: green0,
        type: 'histogram',
        name: "Verde",
        marker: {
        color: '#6ff77f',
        },
      };
      var traceBlue = {
        x: blue0,
        type: 'histogram',
        name: "Azul",
        marker: {
          color: '#6fc7f7',
        },
      };
      var layout = {
        autosize: false,
        width: 500,
        height: 300,
      };
      
      var data1 = [traceRed];
      var data2 = [traceGreen];
      var data3 = [traceBlue];
    
      Plotly.newPlot('rojoHisto', data1, layout);
      Plotly.newPlot('verdeHisto', data2, layout);
      Plotly.newPlot('azulHisto', data3, layout);  
    }
  })
})

