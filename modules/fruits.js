const fruits = [
    {
        name:'apple',
        color: 'red',
        readyToEat: true
    },
    {
        name:'pear',
        color: 'green',
        readyToEat: false
    },
    {
        name:'banana',
        color: 'yellow',
        readyToEat: true
    }
];

//this tells the file that the data can leave the file
//so you are exporting the fruits 
//you can only have one module.export so to export more than
//one thing you need to make an object or array 
modules.exports = fruits