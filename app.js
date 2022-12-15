const imagen= document.getElementById('testImg');
const output= document.getElementById('salida');
const red = [];
const green = [];
const blue = [];
const alpha = [];
const imgLinkList = ["nzL5D6SX","NGCtpx1h","tgp8X1ht","RFPkpMJ1","HkqX55SX","9MV9g2Hf"];
var cont = 0;
var imageList = Array();

fetch("json/json1.json").then((response) => {
  return response.json();
})
.then((json) => jsonPrint.innerHTML = json.nombre + "<br>" + json.formato + "<br>"+ json.peso+ "<br>"+json.url+ "<br>"+json.res+ "<br>"+ json.des + "<br>"+json.date);

for (var i = 0; i <= 7; i++) {
    imageList[i] = new Image(70, 70);
    imageList[i].src = "https://i.postimg.cc/" + imgLinkList[i-1] + "/" +i+ ".jpg";
}
function switchImage() {
    var selectedImage = document.myForm.switch.options[document.myForm.switch.selectedIndex].value;
    document.myImage.src = imageList[selectedImage].src;

    fetch("json/json" + selectedImage +".json").then((response) => {
      return response.json();
    })
    .then((json) => jsonPrint.innerHTML = json.nombre + "<br>" + json.formato + "<br>"+ json.peso+ "<br>"+json.url+ "<br>"+json.res+ "<br>"+ json.des + "<br>"+json.date);
}

imagen.addEventListener('click', function (e) {
  const red = [];
  const green = [];
  const blue = [];
  const alpha = [];
  let ctx;

  if(!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      ctx=this.canvas.getContext('2d');
      ctx.drawImage(this, 0, 0, this.width, this.height);
  } else {
    ctx=this.canvas.getContext('2d');
  }
  const pixel = ctx.getImageData(e.offsetX, e.offsetY, 5, 5).data;
    
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
    var traceRed = {
      x: red,
      type: 'histogram',
      name: "Rojo",
      marker: {
        color: '#ff7c73',
      },
    };  
    var traceGreen = {
      x: green,
      type: 'histogram',
      name: "Verde",
      marker: {
        color: '#6ff77f',
      },
    };
    var traceBlue = {
      x: blue,
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
               
});


