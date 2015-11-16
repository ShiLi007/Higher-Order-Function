//A close look to forEach, filter,map and reduce functions.
reference:   function noisy(f)      http://stackoverflow.com/questions/23535316/higher-order-functions-in-javascript

//forEach: the original function 

function forEach(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i]);
}

forEach(["Wampeter", "Foma", "Granfalloon"], console.log);
// → Wampeter
// → Foma
// → Granfalloon



//forEach: Often, you don’t pass a predefined function to forEach but create a function value on the spot instead.

var numbers = [1, 2, 3, 4, 5], sum = 0;
forEach(numbers, function(number) {
  sum += number;
});
console.log(sum);
// → 15






//filter 

function filter(array, test) {
  var passed = [];
  for (var i = 0; i < array.length; i++) {
    if (test(array[i]))
      passed.push(array[i]);
  }
  return passed;
}

console.log(filter(ancestry, function(person) {
  return person.born > 1900 && person.born < 1925;
}));
// → [{name: "Philibert Haverbeke", …}, …]

//filter

console.log(ancestry.filter(function(person) {
  return person.father == "Carel Haverbeke";
}));
// → [{name: "Carolus Haverbeke", …}]





//map

function map(array, transform) {
  var mapped = [];
  for (var i = 0; i < array.length; i++)
    mapped.push(transform(array[i]));
  return mapped;
}

var overNinety = ancestry.filter(function(person) {
  return person.died - person.born > 90;
});
console.log(map(overNinety, function(person) {
  return person.name;
}));
// → ["Clara Aernoudts", "Emile Haverbeke",
//    "Maria Haverbeke"]



//reduce

function reduce(array, combine, start) {
  var current = start;
  for (var i = 0; i < array.length; i++)
    current = combine(current, array[i]);
  return current;
}

console.log(reduce([1, 2, 3, 4], function(a, b) {
  return a + b;
}, 0));
// → 10

//reduce 

console.log(ancestry.reduce(function(min, cur) {
  if (cur.born < min.born) return cur;
  else return min;
}));     //If your array contains at least one element, you are allowed to leave off the start argument. The method will take the first element of the array as its start value and start reducing at the second element.
// → {name: "Pauwels van Haverbeke", born: 1535, …}



--------------------------------------------------------------
function each(collection,iterator){
  if(Array.isArray(collection))
  for (var i=0;i<collection;i++){
    iterator(collection[i],i,collection)
  else 
  for(var key in collection)
  iterator(collection[key],key,collection)
  }
}

function filter(collection,test){
  var result=[]
each(collection,function(value){
  if(test(value)){
    result.push(value)
  }
})
  return result
}

function map(collection,iterator){
  var result=[]
  each(collection,function(value,key,collection){
    var value=iterator(value,key,collection)
    value.push(value)
    
  })
  return result
}

function reduce(collection,iterator,accumulator){
  each(collection,function(value){
    accumulator = iterator(accumulator,value)
    
  })
  
  return accumulator
  
  
  
}
