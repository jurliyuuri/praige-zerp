var linzi1 = new Image();
linzi1.src = "linzi1.png";

function draw(id, s1, s2, proportion, offsetx, offsety) {
  proportion = proportion || 1;
  offsetx = offsetx || 0;
  offsety = offsety || 0;
  var canvas = document.getElementById(id);
  if ( ! canvas || ! canvas.getContext ) { return false; }
  var ctx = canvas.getContext('2d');

  var w = 240;
  var h = 240;

  var t;

  if(s2 < 10){
    //我:  159,  245 --->  0,0
    //位: 4658,  254 ---> 19,0
    //硬: 4645, 3290 ---> 19,9
    //形:  150, 3281 --->  0,9
    t = [[ 160.        ,  236.68421053,   -1.22222222],
         [ 245.        ,    0.47368421,  337.33333333]];
  }
  ctx.drawImage(linzi1, 
  	t[0][0] + t[0][1]*s1 + t[0][2]*s2,
  	t[1][0] + t[1][1]*s1 + t[1][2]*s2,
  	w, h, offsetx, offsety, w*proportion, h*proportion);





}
