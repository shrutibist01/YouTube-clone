export const API_KEY= 'AIzaSyA3HVE0XtFwTEqPalmHleucpWbveDcrTKY'

export const value_converter=(value)=>{
    if(value>=1000000){
        return Math.floor(value/1000000)+"Lac";
    }else if(value>=1000){
        return Math.floor(value/1000)+"k";
    }else{
        return value;
    }
}