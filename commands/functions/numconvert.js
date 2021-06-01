module.exports = (value) => {
    var param = {};
    var k = 10000,
        sizes = ['', '萬', '億', '兆', '萬兆'],
        i;
        if(value < k){
            param.value =value;
            param.unit='';
        }else{
            i = Math.floor(Math.log(value) / Math.log(k)); 
      
            param.value = ((value / Math.pow(k, i))).toFixed(4);
            param.unit = sizes[i];
        }
return `${param.value} ${param.unit}`;
}