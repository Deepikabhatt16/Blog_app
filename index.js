import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 4000;

// setting example post 
let posts = [
  {
    id: 1,
    title: "Self-Love",
    content:
      "When you love yourself, you have an overall positive view of yourself. This doesnt mean you feel positive about yourself all the time. That would be unrealistic! For example, I can temporarily feel upset, angry, or disappointed with myself and still love myself. If this is confusing, think about how this works in other relationships. I can love my son even though I sometimes feel angry or disappointed with him. Even in the midst of my anger and disappointment, my love for him informs how I relate to him. It allows me to forgive him, consider his feelings, meet his needs, and make decisions that will support his wellbeing. Self-love is very much the same. Which means, if you know how to love others, you know how to love yourself!",
    author: "Reena Alexjander",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Goal-Oriented Mindset",
    content:
      "Goal-oriented means setting goals and planning tasks, then taking action to complete the tasks that lead to the larger, overall accomplishment while staying focused on the desired results. Becoming goal-oriented allows you to effectively allocate your time and energy to tasks that drive progress toward the results you want. Developing a goal-oriented mindset means focusing your energy in three major areas: planning and organizing your tasks, completing tasks, and maintaining your motivation.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Pet Lover",
    content:
      "The bond between owner and pet is like no other—they're our companions, always along for the ride no matter what ups and downs life brings. They show us joy and make us laugh, and even listen to us like they know exactly what we're saying.As the expression goes, a dog is a man's best friend—and it's easy to see why. They greet us at the door every day, love us unconditionally, and even help humans live longer, happier lives. It's time to show love for that furry family member in return, so whether you're looking for quotes about dog love to honor that adorable pup of yours with a personalized photo, or posting a snap of you and your fur baby to Instagram with the perfect caption, we've got you covered.",
    author: "Ryan",
    date: "2023-08-10T09:15:00Z",
  },
];

let nextId = 3;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET request
app.get("/posts", (req,res)=>{ res.json(posts);});

// GET a specific post by id
app.get("/posts/:id",(req,res)=>{
  const id=parseInt(req.params.id);
  const findpost=posts.find((p)=>p.id===id);
  if (!findpost) return res.status(404).json({ message: "Post not found" });
  res.json(findpost);
});

// POST a new post
app.post("/posts",(req,res)=>{
  const newid=nextId+=1;

  const newpost={
    id:newid,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  }
  nextId=newid;
  posts.push(newpost);
  res.status(201).json(newpost);


});
// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const id=parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (!post) return res.status(404).json({ message: "Post not found" });
const updatepost={
  id:id,
  title:req.body.title||post.title,
  content:req.body.content||post.content,
  author:req.body.author||post.author

}
const searchid=posts.findIndex((p)=>p.id===id);
posts[searchid]=updatepost;
  res.json(updatepost);
});


// DELETE a specific post by providing the post id

app.delete("/posts/:id", (req, res) => {
  const id=parseInt(req.params.id);
  const deletedid = posts.findIndex((p) => p.id === id);
  if (id === -1) return res.status(404).json({ message: "Post not found" });
posts.splice(deletedid,1);
res.json({message:"post is deleted now"})


});
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
