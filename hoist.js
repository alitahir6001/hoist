//Rewrite the code the way it would be seen by the interpreter and predict the output. An example is shown here:

// GIVEN
console.log(example);
var example = "I'm the example!";  // NOTE - Since this is a 'var', it's gonna have a global scope and gets 'floated' to the top of the code, so when it's interpreted it's gonna say it's undefined. If it was 'let', it wouldn't get hoisted to the top and would throw an error message.

// AFTER HOISTING BY THE INTERPRETER
var example;
console.log(example); // logs undefined
example = "I'm the example!";



// 1


console.log(hello);                                   
var hello = 'world';         

// Rewritten as:

var hello
console.log(hello) // My prediction - since there is a 'var' instead of 'let', it's going to get hoisted to the top but the output will be 'undefined' 
hello = "world"
// yay i was right


// 2 


var needle = 'haystack'; // hoisted to the top of the scope (global)
test(); // also gets hoisted to the top
function test(){
    var needle = 'magnet'; // hoisted to the top of its local scope i think, but the assignment stays anchored due to '=' being used.
    console.log(needle); // we're console logging inside the function
}

// Rewritten as:

var needle 
function test(){
    var needle;
    needle = 'magnet';
    console.log(needle); // My prediction - there's only one console.log here, so only 'magnet' will be outputted when we call the function outside the curly braces
}
test()
// yay i was right


// 3 


var brendan = 'super cool'; // global scope
function print(){
    brendan = 'only okay';
    console.log(brendan);
}
console.log(brendan);

// predicted output - 'only okay' first, and then 'super cool'
// WRONG, but i think i know why -- we're console logging the globally scoped and hoisted (brendan), not the function (and the local scope 'brendan' inside). The function executed, but we didn't call on it. So I think the interpreter read it like this:

var brendan
brendan = 'super cool'
console.log(brendan)

// the machine did what the function asked it to do (which is set a local scope var of brendan, with the value of 'only okay'), but didn't show us because we didn't call on the function print().


// 4

var food = 'chicken';
console.log(food); // Prediction: var food is hoisted to the top and is scoped globally, so it'll get console logged first.
eat();
function eat(){
    food = 'half-chicken';
    console.log(food);
    var food = 'gone'; // since there is no console.log that follows this locally scoped variable declaration, it will not be outputted, so 'half-chicken' will be outputted second. This seems to follow the pattern of the previous examples
}

// Rewritten as:

var food;
food = 'chicken';
console.log(food);
function eat(){
    var food; // locally scoped and hoisted to the top of the cage
    food = 'half-chicken'; //key:value pair of var food
    console.log(food);
}


// 5 


mean(); // The function hasn't been defined anywhere in the code block, so it's hoisting something that's undefined. 
console.log(food); // food hasn't been defined, so what would it log? Nothing!
var mean = function() { // none of this will execute because line 1 was an undefined function
    food = "chicken";
    console.log(food);
    var food = "fish";
    console.log(food);
}
console.log(food); // if this was console.log(mean), then there would actually be output because that var has been defined.

// The interpreter read this as:

function mean(){ // the machine wouldn't throw an error if it was just this
}
console.log(food); // but since food wasn't anywhere in the global scope, it reads as undefined.



// 6 


console.log(genre); // Predicted output = undefined ()
var genre = "disco"; // globally scoped variable gets hoisted to the top
rewind();
function rewind() {
    genre = "rock"; // even though 'var' isn't typed out, a variable is being declared and defined here, with the value of 'rock'.  This is the first locally scoped variable to get hoisted.
    console.log(genre);
    var genre = "r&b"; // the second locally scoped variable to get hoisted up, #2 on the list
    console.log(genre);
}
console.log(genre);  // Predicted output = Undefined, rock, r&b. 'Disco' gets outputted last because even though it wasn't definied in the beginning, the very next line did give it a value. After the function runs its course, we're asking it to console.log again, and it would show up.

// Rewritten as:

function rewind(){ // a standalone function gets hoisted to the top
    var genre;
    genre = 'rock'; // The first locally scoped variable to get logged
    console.log(genre);
    genre = 'r&b'; // the second locally scoped variable to get logged
    console.log(genre);
}
rewind(); // we're calling on the function here, so 'rock' and 'r&b' will get logged in that order
var genre; 
genre = 'disco';
console.log(genre)


// 7 


dojo = "san jose"; // globally scoped variable, hoisted all the way up
console.log(dojo); // Prediction: first logged output will be 'san jose'
learn();
function learn() {
    dojo = "seattle"; // even though a variable is declared here, 'var' wasn't used so it's not as high in the 'hoisting heirarchy' as var dojo below.
    console.log(dojo);
    var dojo = "burbank"; // locally scoped var is hoisted to the 'top' of the cage.
    console.log(dojo); // Prediction: output will be 'san jose', 'burbank', 'seattle', and 'san jose' again.
}
console.log(dojo);

// Rewritten as:

var dojo;
dojo = 'san jose';
console.log(dojo);
function learn(){
    var dojo;
    dojo = 'burbank'
    console.log(dojo);
    var dojo;
    dojo = 'seattle';
    console.log(dojo);
}
learn();
console.log(dojo);


// 8 BONUS ES6: const  (remember: let and const dont get hoisted)


console.log(makeDojo("Chicago", 65));
console.log(makeDojo("Berkeley", 0));
function makeDojo(name, students){
    const dojo = {}; // if this was changed to var, the else if statement below would run because it's not a constant value.
    dojo.name = name;
    dojo.students = students;
    if(dojo.students > 50){
        dojo.hiring = true;
    }
    else if(dojo.students <= 0){
        dojo = "closed for now";
    }
    return dojo;
}


// if const was changed to var, it would be rewritten as:

function makeDojo(name, students){ // Function being defined and passed values of a name and students
    var dojo = {}; // creating an empty dictionary
    dojo.name = name;
    dojo.students = students;
    if(dojo.students > 50){
        dojo.hiring = true;
    }
    else if(dojo.students <= 0){
        dojo = "closed for now";
    }
    return dojo;
}
console.log(makeDojo("Chicago", 65));
console.log(makeDojo("Berekly", 0));


// Prediction: OK honestly I jumped ahead and ran the code without making a prediction, but I think I understand why: const = constant variable, meaning unchanged. Line 187 tried to change a constant variable value to something else (in this case, a string), and it threw an error.

// Had line 180 been var dojo = {}, the empty dictionary inside the curly braces would satisfy all the function logic. The second else if statement doesn't even execute, because the first if statement's conditions are met with the Chiacgo Dojo (it has > 50 students, which sets the dojo.hiring boolean to true)

// the placement of the console logs in the beginning before the function is defined, is kinda like, 'corrected' by the fact that the standalone function gets hoisted to the top, just like a var would.