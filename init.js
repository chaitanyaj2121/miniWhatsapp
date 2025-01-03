const mongoose=require("mongoose");

const Chat=require("./models/chat.js")     

main()
.then(()=>{console.log("Connection successful!");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

Chat.insertMany([
    {
        from: "neha",
        to: "priya",
        msg: "Good morning",
        created_at: new Date()
    },
    {
        from: "alex",
        to: "john",
        msg: "Hello!",
        created_at: new Date()
    },
    {
        from: "maria",
        to: "sara",
        msg: "How are you?",
        created_at: new Date()
    },
    {
        from: "priya",
        to: "neha",
        msg: "Good morning, Neha!",
        created_at: new Date()
    },
    {
        from: "james",
        to: "emily",
        msg: "Are you coming to the meeting?",
        created_at: new Date()
    },
    {
        from: "emily",
        to: "james",
        msg: "Yes, I'll be there.",
        created_at: new Date()
    },
    {
        from: "robert",
        to: "alice",
        msg: "What's up?",
        created_at: new Date()
    },
    {
        from: "alice",
        to: "robert",
        msg: "Not much, just relaxing.",
        created_at: new Date()
    },
    {
        from: "linda",
        to: "charles",
        msg: "Have you finished the report?",
        created_at: new Date()
    },
    {
        from: "charles",
        to: "linda",
        msg: "Almost done, just finalizing.",
        created_at: new Date()
    }
]).then((result) => {
    console.log("Data inserted:", result);
}).catch((error) => {
    console.error("Error inserting data:", error);
});

 