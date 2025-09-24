/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use("employees");

//delete database
db.dropDatabase();

//creating collection
db.createCollection("object")

 //inserting documents
db.object.insertOne({
  item: "canvas",
  qty: 100,
  tags: ["cotton"],
  size: { h: 28, w: 35.5, uom: "cm" },
});

db.object.insertMany([
  {
    item: "canvas1",
    qty: 100,
    tags: ["copper"],
    size: { h: 2, w: 35.5, uom: "cm" },
  },
  {
    item: "canvas2",
    qty: 100,
    tags: ["zinc"],
    size: { h: 8, w: 3.5, uom: "cm" },
  },
  {
    item: "canvas3",
    qty: 100,
    tags: ["brass"],
    size: { h: 2.8, w: 5, uom: "cm" },
  },
  {
    item: "canvas4",
    qty: 100,
    tags: ["aluminium"],
    size: { h: 28.5, w: 35, uom: "cm" },
  },
]);

//find
db.object.find();

db.createCollection("inventory");

db.inventory.insertMany([
   { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
   { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "A" },
   { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
   { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
   { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" }
]);
//in
db.inventory.find( { status: { $in: [ "A", "D" ] } } );
//and
db.inventory.find( { status: "A", qty: { $lt: 30 } } );
//or
db.inventory.find( { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] } );
//find one
db.inventory.findOne( { status: { $in: [ "A", "D" ] } } );
//delete all documents
db.inventory.deleteMany({});
//delete collection
db.inventory.drop();


db.createCollection("inventory1");

db.inventory1.insertMany( [
   { item: "canvas", qty: 100, size: { h: 28, w: 35.5, uom: "cm" }, status: "A" },
   { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
   { item: "mat", qty: 85, size: { h: 27.9, w: 35.5, uom: "cm" }, status: "A" },
   { item: "mousepad", qty: 25, size: { h: 19, w: 22.85, uom: "cm" }, status: "P" },
   { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "P" },
   { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
   { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
   { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" },
   { item: "sketchbook", qty: 80, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
   { item: "sketch pad", qty: 95, size: { h: 22.85, w: 30.5, uom: "cm" }, status: "A" }
] );

//update one document
db.inventory1.updateOne(
   { item: "paper" },
   {
     $set: { "size.uom": "cm", status: "P" },
     $currentDate: { lastModified: true }
   }
);

//update many documents
db.inventory1.updateMany(
   { "qty": { $lt: 50 } },
   {
     $set: { "size.uom": "in", status: "P" },
     $currentDate: { lastModified: true }
   }
);

//replace
db.inventory1.replaceOne(
   { item: "paper" },
   { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 40 } ] }
);


db.createCollection("inventory2");

db.inventory2.insertMany( [
   { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
   { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "P" },
   { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
   { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
   { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" },
] );

//delete one with condition
db.inventory2.deleteOne( { status: "D" } );

//delete many with condition
db.inventory2.deleteMany({ status : "A" });

//delete many
db.inventory2.deleteMany({});

//sort
db.inventory.find().sort({qty:-1}); //descending
db.inventory.find().sort({qty:1}); //ascending

//skip
db.inventory.find().skip(1) //skips first 1 document
db.inventory.find().skip(2) // skips first 2 documents

//limits
db.inventory.find().limit(1) //limits to 1 document as output
db.inventory.find().limit(2) //limits to 2 documents as output

//achieving pagination using MongoDB find and limit
no = 8
db.blogs.find().skip((pageNo-1)*no).limit(no);
pageno = 1 db.blogs.find().skip(0).limit(8);
pageno = 2 db.blogs.find().skip(8).limit(8);



//Aggregation Pipeline
db.orders.aggregate( [

   // Stage 1: Filter pizza order documents by pizza size
   {
      $match: { size: "medium" }
   },

   // Stage 2: Group remaining documents by pizza name and calculate total quantity
   {
      $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } }
   }

] )