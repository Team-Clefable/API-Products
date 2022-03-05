//count how many nodes
//go through list
    //note value of list and if < or >= x
    //put < x nodes into an array
    //put >= x nodes into another array
//put two arrays together [<][>=]
//add all the connections back in for new list

{
head: 0,
value: 1,
next: 1
}


{
head: 1,
value: 5,
next: 2
}

function ( linkedList, x ) {
  var count = 0;
  var lessThanX = [];
  var greaterThanX = []; //or equal to

  let nextHead = linkedList;

  while (nextHead.next !== null) {
    count++;
    nextHead = nextHead.next;
  }

  let numberOfNodes = count+1;

  for (let i = 0; i < numberOfNodes; i++) {
    if (linkedList.value < x) {
      lessThanX.push(linkedList);
    }

    if (linkedList.value >= x) {
      greaterThanX.push(linkedList);
    }

    linkedList = linkedList.next; //potential error at last node?
  }

  let newList = lessThanX.push(greaterThanX);

  for (let j = 0; j < newList.length; j++) {
    newList[j].next = newList[j+1].head;
  }

  //take newList out of array?
  return newList;

}