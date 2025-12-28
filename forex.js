const express = require("express");
const mongoose = require("mongoose");
const Forex = require("./models/forex");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Forex DB connected"))
  .catch(err => console.error(err));

app.get("/forex", async (req, res) => {
  const pair = req.query.pair;
  const data = await Forex.findOne({ pair });
  if (!data) return res.status(404).json({ error: "Pair not found" });
  res.json(data);
});



//forex suggestion
app.get('/forex-suggest',async(req,res)=>{
  try{
    const q = req.query.q;
    if(!q) return res.json([]);

    const pairs = await Forex.find(
        { pair: { $regex: q, $options: "i" } }, // case-insensitive search
      { pair: 1, _id: 0 }
    ).limit(5);
    res.json(pairs.map(p=> p.pair));
  }
  catch(err){
    console.error(err);
    res.status(500).json([]);
  }
});



app.listen(4002, "0.0.0.0", () => console.log("Forex running on port 4002"));
